require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const Client = require("./models/client-model.js");
const authRoute = require("./router/auth-router.js");
const detailRoute = require("./router/detail-router");
const connectDb = require("./utils/db.js");
const errorMiddleware = require("./middlewares/error-middleware.js");

const path = require("path");
const fs = require("fs");
const corsOptions = {
  origin: "https://www.scan-taps.com/",
  method: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
  optionSuccessStatus: 200,
};

let cachedDefaultOgImagePath = null;
function pickDefaultOgImagePath() {
  if (cachedDefaultOgImagePath) return cachedDefaultOgImagePath;
  try {
    const assetsDir = path.join(__dirname, "..", "client", "dist", "assets");
    const files = fs.readdirSync(assetsDir, { withFileTypes: true });
    const candidates = files
      .filter((d) => d.isFile())
      .map((d) => d.name)
      .filter((name) => /\.(png|jpe?g)$/i.test(name))
      // Prefer something logo-ish if it exists
      .sort((a, b) => {
        const aScore = /logo|profile/i.test(a) ? 0 : 1;
        const bScore = /logo|profile/i.test(b) ? 0 : 1;
        return aScore - bScore || a.localeCompare(b);
      });
    cachedDefaultOgImagePath = candidates.length
      ? `/assets/${candidates[0]}`
      : null;
    return cachedDefaultOgImagePath;
  } catch {
    cachedDefaultOgImagePath = null;
    return null;
  }
}

function isCrawlerUserAgent(userAgent = "") {
  const ua = String(userAgent).toLowerCase();
  // WhatsApp uses Facebook's crawler user-agent in many cases.
  return (
    ua.includes("facebookexternalhit") ||
    ua.includes("whatsapp") ||
    ua.includes("twitterbot") ||
    ua.includes("linkedinbot") ||
    ua.includes("slackbot") ||
    ua.includes("discordbot") ||
    ua.includes("telegrambot") ||
    ua.includes("pinterest") ||
    ua.includes("googlebot") ||
    ua.includes("bingbot")
  );
}

function escapeHtml(s = "") {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function absoluteUrl(req, pathPart = "/") {
  // Prefer explicit origin if provided by proxies; fallback to https.
  const origin =
    req.get("x-forwarded-proto") && req.get("host")
      ? `${req.get("x-forwarded-proto")}://${req.get("host")}`
      : `https://${req.get("host")}`;
  return new URL(pathPart, origin).toString();
}

function normalizePublicUrl(req, maybeUrl) {
  const raw = String(maybeUrl || "").trim();
  if (!raw) return "";
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  if (raw.startsWith("//")) return `https:${raw}`;
  if (raw.startsWith("/")) return absoluteUrl(req, raw);
  // Best-effort: treat as a path relative to site root.
  return absoluteUrl(req, `/${raw}`);
}

function isLikelyUnsupportedForWhatsAppImage(url) {
  const u = String(url || "").toLowerCase();
  // WhatsApp previews are most reliable with JPG/PNG.
  return u.endsWith(".webp") || u.endsWith(".avif") || u.endsWith(".svg");
}

function renderOgHtml({ title, description, image, url }) {
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const safeImage = escapeHtml(image);
  const safeUrl = escapeHtml(url);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDescription}" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDescription}" />
    <meta property="og:image" content="${safeImage}" />
    <meta property="og:image:secure_url" content="${safeImage}" />
    <meta property="og:image:alt" content="${safeTitle}" />
    <meta property="og:url" content="${safeUrl}" />
    <meta property="og:site_name" content="ScanTaps" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDescription}" />
    <meta name="twitter:image" content="${safeImage}" />

    <link rel="canonical" href="${safeUrl}" />
  </head>
  <body>
    <a href="${safeUrl}">Open</a>
  </body>
</html>`;
}

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/data", detailRoute);

function isPrivateIp(ip) {
  const s = String(ip || "");
  // IPv6 localhost / private-ish
  if (s === "::1") return true;
  // IPv4 localhost
  if (s.startsWith("127.")) return true;
  // RFC1918
  if (s.startsWith("10.")) return true;
  if (s.startsWith("192.168.")) return true;
  const m = s.match(/^172\.(\d+)\./);
  if (m) {
    const n = Number(m[1]);
    if (n >= 16 && n <= 31) return true;
  }
  // Link-local
  if (s.startsWith("169.254.")) return true;
  return false;
}

function isBlockedHostname(hostname) {
  const h = String(hostname || "").toLowerCase();
  if (!h) return true;
  if (h === "localhost" || h.endsWith(".localhost")) return true;
  if (h === "0.0.0.0") return true;
  if (h.endsWith(".local")) return true;
  // If hostname is a raw IP, block private ranges.
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(h) && isPrivateIp(h)) return true;
  return false;
}

// Fetch remote image server-side for vCard embedding (avoids browser CORS).
app.get("/api/vcard/image", async (req, res) => {
  const rawUrl = String(req.query.url || "").trim();
  if (!rawUrl) return res.status(400).json({ error: "Missing url" });

  let parsed;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return res.status(400).json({ error: "Invalid url" });
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    return res.status(400).json({ error: "Only http/https allowed" });
  }

  if (isBlockedHostname(parsed.hostname)) {
    return res.status(400).json({ error: "Blocked hostname" });
  }

  try {
    const response = await axios.get(parsed.toString(), {
      responseType: "arraybuffer",
      timeout: 10000,
      maxContentLength: 2 * 1024 * 1024,
      maxBodyLength: 2 * 1024 * 1024,
      validateStatus: (s) => s >= 200 && s < 300,
      headers: {
        // Some CDNs require a UA.
        "User-Agent": "ScanTaps vCard Image Fetcher",
        Accept: "image/*,*/*;q=0.8",
      },
    });

    const contentType = String(response.headers?.["content-type"] || "").split(";")[0].trim();
    if (!contentType.startsWith("image/")) {
      return res.status(415).json({ error: "URL did not return an image" });
    }

    const base64 = Buffer.from(response.data).toString("base64");
    return res.status(200).json({ mime: contentType, base64 });
  } catch (err) {
    return res.status(502).json({ error: "Failed to fetch image" });
  }
});

// Server-side OpenGraph for WhatsApp/Facebook crawlers.
// Important: crawlers do NOT execute JS, so we return OG tags directly for profile links.
app.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  // Don't hijack known SPA/static routes; let the normal handler serve the SPA.
  const reserved = new Set([
    "api",
    "home",
    "login",
    "shop",
    "contact",
    "edit",
    "dashboard",
    "reviews",
    "assets",
    "favicon.ico",
  ]);
  if (!id || reserved.has(id)) return next();

  if (!isCrawlerUserAgent(req.get("user-agent"))) return next();

  try {
    const client = await Client.findOne({ companyName: id }).lean();

    const url = absoluteUrl(req, `/${encodeURIComponent(id)}`);
    // WhatsApp preview order you want:
    // - image (og:image)
    // - clientName (og:title)
    // - name (og:description)
    const title =
      client?.clientName || client?.companyName || client?.name || "ScanTaps";
    const description =
      client?.name ||
      client?.companyName ||
      client?.description ||
      client?.services ||
      "Tap to view the digital profile.";

    // WhatsApp is most reliable with absolute HTTPS JPG/PNG.
    // Prefer client logo/cover if usable; otherwise fall back to a real built asset.
    const preferred = [
      client?.logo,
      client?.images,
      client?.img01,
      client?.img02,
      client?.img03,
    ]
      .map((v) => normalizePublicUrl(req, v))
      .filter(Boolean)
      .find((u) => !isLikelyUnsupportedForWhatsAppImage(u));

    const defaultPath = pickDefaultOgImagePath();
    const image =
      preferred || (defaultPath ? absoluteUrl(req, defaultPath) : url);

    const html = renderOgHtml({ title, description, image, url });
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    // Avoid overly sticky caching while debugging previews
    res.setHeader("Cache-Control", "public, max-age=60");
    return res.status(200).send(html);
  } catch (err) {
    return next(err);
  }
});

// Visit count endpoint
app.post("/api/visit/:clientId", async (req, res) => {
  const clientId = req.params.clientId;
  try {
    let client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    client.visitCount += 1;
    await client.save();
    res.json({ count: client.visitCount });
  } catch (error) {
    console.error("Error updating visit count:", error);
    res.status(500).json({ message: "Error updating visit count" });
  }
});

app.use(express.static(path.join(__dirname, "..", "/client/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "dist", "index.html"));
});

connectDb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server is running at port: ${process.env.PORT}`);
  });
});

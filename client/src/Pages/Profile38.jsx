/* PROFILE36_COVER_MATCHED_PETAL_PINK_GOLD_FINAL_20260902 */
/* COVER: https://res.cloudinary.com/dxokfhkhu/image/upload/v1788372597/18682472-742a-4d3d-98a5-ba1637c62a93_pvi3qm.jpg */
/* THEME CHECK: #f7c8d2 petal pink | #5a3140 deep rose | #b58a12 antique gold | gradient INSIDE profile only */
import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import axios from "axios";
import {
  FaDownload,
  FaEnvelope,
  FaFacebookF,
  FaGlobe,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRegStar,
  FaSnapchatGhost,
  FaStar,
  FaUserPlus,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaTiktok, FaXTwitter } from "react-icons/fa6";
import { IoQrCodeSharp } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { MdMenuBook, MdOutlineRemoveRedEye } from "react-icons/md";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { LuFileText } from "react-icons/lu";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";
import { FaTelegramPlane } from "react-icons/fa";

const PROFILE36_COVER =
  "https://res.cloudinary.com/dxokfhkhu/image/upload/v1788372597/18682472-742a-4d3d-98a5-ba1637c62a93_pvi3qm.jpg";

const THEME = {
  petalPink: "#f7c8d2",
  petalSoft: "#fde8ed",
  deepRose: "#5a3140",
  deepRoseSoft: "#704753",
  antiqueGold: "#b58a12",
  champagneGold: "#d8b858",
  paleGold: "#f0dfa9",
  cream: "#fff9f6",
  page: "#f4f1ef",
};

const PROFILE_GRADIENT =
  "radial-gradient(circle at 16% 0%, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0) 34%), radial-gradient(circle at 92% 12%, rgba(216,184,88,0.20) 0%, rgba(216,184,88,0) 28%), linear-gradient(165deg, #fff3f6 0%, #f9d4dc 32%, #f7c8d2 56%, #fbe2e6 76%, #fff0e6 100%)";

const cleanText = (value = "") =>
  String(value || "")
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .trim();

const normalizeWhatsApp = (value = "") =>
  String(value || "").replace(/[^0-9]/g, "");

const externalHref = (value = "") => {
  const text = String(value || "").trim();
  if (!text) return "";
  if (/^(https?:|mailto:|tel:)/i.test(text)) return text;
  return `https://${text}`;
};

const DividerTitle = ({ children }) => (
  <div className="mb-3 mt-6 flex items-center gap-3">
    <span className="h-px flex-1 bg-[#b58a12] opacity-60" />
    <FaRegStar className="text-[#b58a12]" size={11} />
    <span className="font-serif text-[12px] font-bold uppercase tracking-[0.18em] text-[#5a3140]">
      {children}
    </span>
    <FaRegStar className="text-[#b58a12]" size={11} />
    <span className="h-px flex-1 bg-[#b58a12] opacity-60" />
  </div>
);

const LinkCard = ({ icon, label, value, href }) => {
  if (!href && !value) return null;

  const body = (
    <div className="flex w-full items-center justify-between gap-3 px-4 py-3.5">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-[#b58a12]/80 bg-white/62 text-[#704753] shadow-[0_4px_12px_rgba(90,49,64,0.10)]">
          {icon}
        </div>
        <div className="min-w-0 text-left">
          <div className="font-serif text-[13px] font-bold text-[#4a2933]">
            {label}
          </div>
          {value ? (
            <div className="mt-0.5 break-all text-[12px] font-medium text-[#704753]">
              {value}
            </div>
          ) : null}
        </div>
      </div>
      <span className="shrink-0 text-xl font-semibold text-[#b58a12]">›</span>
    </div>
  );

  if (!href) return body;

  return (
    <a
      href={href}
      target={href.startsWith("tel:") || href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="block transition duration-200 hover:bg-[#fff0f3]"
    >
      {body}
    </a>
  );
};

const Profile38 = () => {
  const { id: clientId } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visitCount, setVisitCount] = useState(0);
  const [showQr, setShowQr] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchClient = async () => {
      try {
        const response = await axios.get(
          `https://www.scan-taps.com/api/data/client/${clientId}`,
        );
        if (active) setClient(response.data);
      } catch (error) {
        console.error("Unable to load Profile36 client:", error);
        if (active) setClient(null);
      } finally {
        if (active) setLoading(false);
      }
    };

    if (clientId) fetchClient();
    else setLoading(false);

    return () => {
      active = false;
    };
  }, [clientId]);

  useEffect(() => {
    if (!client?._id) return;

    axios
      .post(`https://www.scan-taps.com/api/visit/${client._id}`)
      .then((response) => setVisitCount(response.data?.count || 0))
      .catch((error) =>
        console.error("Unable to increment Profile36 visit count:", error),
      );
  }, [client?._id]);

  const currentPageUrl = typeof window !== "undefined" ? window.location.href : "";

  const downloadContactCard = () => {
    if (!client) return;

    const phones = [client.phone01, client.phone02, client.phone03]
      .filter(Boolean)
      .map((number) => `TEL;TYPE=CELL:${number}`)
      .join("\n");
    const telephones = [client.telephone01, client.telephone02, client.telephone03]
      .filter(Boolean)
      .map((number) => `TEL;TYPE=WORK:${number}`)
      .join("\n");
    const emails = [client.email, client.email02, client.email03]
      .filter(Boolean)
      .map((address) => `EMAIL:${address}`)
      .join("\n");

    const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:${client.clientName || ""};;;;\nFN:${client.clientName || ""}\nORG:${client.name || ""}\nTITLE:${client.designation || ""}\n${phones}\n${telephones}\n${emails}\nURL:${client.website || ""}\nEND:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      window.location.href = url;
    } else {
      const link = document.createElement("a");
      link.download = `${client.clientName || "contact"}.vcf`;
      link.href = url;
      link.click();
    }

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const downloadQr = async () => {
    const input = document.getElementById("profile36-qr");
    if (!input) return;

    const canvas = await html2canvas(input, { backgroundColor: "#ffffff" });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const scale = Math.min(
      (pageWidth - margin * 2) / canvas.width,
      (pageHeight - margin * 2) / canvas.height,
    );
    const width = canvas.width * scale;
    const height = canvas.height * scale;

    pdf.addImage(
      imgData,
      "PNG",
      (pageWidth - width) / 2,
      (pageHeight - height) / 2,
      width,
      height,
    );
    pdf.save("QR.pdf");
  };

  const linkGroups = useMemo(() => {
    if (!client) return [];

    const rows = [];
    const push = (group, item) => {
      if (!item.href && !item.value) return;
      let existing = rows.find((entry) => entry.title === group);
      if (!existing) {
        existing = { title: group, items: [] };
        rows.push(existing);
      }
      existing.items.push(item);
    };

    [client.phone01, client.phone02, client.phone03].forEach((value, index) => {
      if (!value) return;
      push("Contact", {
        label: `Phone${index ? ` ${index + 1}` : ""}`,
        value,
        href: `tel:${value}`,
        icon: <FaPhoneAlt size={18} />,
      });
    });

    [client.telephone01, client.telephone02, client.telephone03].forEach(
      (value, index) => {
        if (!value) return;
        push("Contact", {
          label: `Telephone${index ? ` ${index + 1}` : ""}`,
          value,
          href: `tel:${value}`,
          icon: <FaPhoneAlt size={18} />,
        });
      },
    );

    [client.whatsapp01, client.whatsapp02, client.whatsapp03].forEach(
      (value, index) => {
        const normalized = normalizeWhatsApp(value);
        if (!normalized) return;
        push("Contact", {
          label: `WhatsApp${index ? ` ${index + 1}` : ""}`,
          value,
          href: `https://wa.me/${normalized}`,
          icon: <FaWhatsapp size={20} />,
        });
      },
    );

    [client.email, client.email02, client.email03].forEach((value, index) => {
      if (!value) return;
      push("Contact", {
        label: `Email${index ? ` ${index + 1}` : ""}`,
        value,
        href: `mailto:${value}`,
        icon: <FaEnvelope size={18} />,
      });
    });

    const addTriple = (group, label, links, names, icon) => {
      links.forEach((link, index) => {
        if (!link) return;
        push(group, {
          label: `${label}${index ? ` ${index + 1}` : ""}`,
          value: cleanText(names[index]) || cleanText(link),
          href: externalHref(link),
          icon,
        });
      });
    };

    addTriple(
      "Social & Online",
      "Instagram",
      [client.instagramLink, client.instagramLink02, client.instagramLink03],
      [client.instagramName, client.instagramName02, client.instagramName03],
      <FaInstagram size={21} />,
    );
    addTriple(
      "Social & Online",
      "Snapchat",
      [client.snapchatLink, client.snapchatLink02, client.snapchatLink03],
      [client.snapchatName, client.snapchatName02, client.snapchatName03],
      <FaSnapchatGhost size={21} />,
    );
    addTriple(
      "Social & Online",
      "YouTube",
      [client.youtubeLink, client.youtubeLink02, client.youtubeLink03],
      [client.youtubeName, client.youtubeName02, client.youtubeName03],
      <FaYoutube size={21} />,
    );
    addTriple(
      "Social & Online",
      "TikTok",
      [client.tiktokLink, client.tiktokLink02, client.tiktokLink03],
      [client.tiktokName, client.tiktokName02, client.tiktokName03],
      <FaTiktok size={20} />,
    );
    addTriple(
      "Social & Online",
      "X / Twitter",
      [client.twitterLink, client.twitterLink02, client.twitterLink03],
      [client.twitterName, client.twitterName02, client.twitterName03],
      <FaXTwitter size={19} />,
    );
    addTriple(
      "Social & Online",
      "Facebook",
      [client.facebookLink, client.facebookLink02, client.facebookLink03],
      [client.facebookName, client.facebookName02, client.facebookName03],
      <FaFacebookF size={19} />,
    );
    addTriple(
      "Social & Online",
      "Google Review",
      [
        client.googleReviewLink,
        client.googleReviewLink02,
        client.googleReviewLink03,
      ],
      [
        client.googleReviewName,
        client.googleReviewName02,
        client.googleReviewName03,
      ],
      <FaStar size={19} />,
    );
    addTriple(
      "Social & Online",
      "Website",
      [client.website, client.website02, client.website03],
      [client.websiteName, client.websiteName02, client.websiteName03],
      <FaGlobe size={20} />,
    );
    addTriple(
      "Social & Online",
      "LinkedIn",
      [
        client.youtubeShortsLink,
        client.youtubeShortsLink02,
        client.youtubeShortsLink03,
      ],
      [
        client.youtubeShortsName,
        client.youtubeShortsName02,
        client.youtubeShortsName03,
      ],
      <FaLinkedinIn size={20} />,
    );
    addTriple(
      "Locations",
      "Google Map",
      [client.googleMapLink, client.googleMapLink02, client.googleMapLink03],
      [client.googleMapName, client.googleMapName02, client.googleMapName03],
      <FaMapMarkerAlt size={20} />,
    );

    if (client.menuLink) {
      push("Documents & Links", {
        label: "Menu",
        value: cleanText(client.menuName) || cleanText(client.menuLink),
        href: externalHref(client.menuLink),
        icon: <MdMenuBook size={21} />,
      });
    }

    if (client.catalogueLink) {
      push("Documents & Links", {
        label: "Catalogue",
        value: cleanText(client.catalogueName) || cleanText(client.catalogueLink),
        href: externalHref(client.catalogueLink),
        icon: <LuFileText size={20} />,
      });
    }

    if (client.profileLink01) {
      push("Documents & Links", {
        label: "Price List",
        value: cleanText(client.profileName01) || cleanText(client.profileLink01),
        href: externalHref(client.profileLink01),
        icon: <LuFileText size={20} />,
      });
    }

    if (client.profileLink02) {
      push("Documents & Links", {
        label: "Profile",
        value: cleanText(client.profileName02) || cleanText(client.profileLink02),
        href: externalHref(client.profileLink02),
        icon: <HiOutlineBuildingOffice2 size={21} />,
      });
    }

    return rows;
  }, [client]);

  if (loading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-[#f4f1ef]"
      >
        <ScaleLoader color={THEME.deepRose} aria-label="Loading Profile36" />
      </div>
    );
  }

  if (!client) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-[#f4f1ef] px-5 text-center"
      >
        <div className="max-w-sm rounded-3xl border border-[#b58a12] bg-white/90 px-7 py-8 shadow-xl">
          <h1 className="font-serif text-3xl font-bold text-[#704753]">
            Profile not found
          </h1>
          <p className="mt-3 text-[#704753]">Unable to load this profile.</p>
        </div>
      </div>
    );
  }

  const {
    companyName,
    name,
    description,
    clientName,
    designation,
    logo,
    images,
    services,
    location,
    img01,
    img02,
    img03,
    img04,
    img05,
    img06,
    img07,
    img08,
    img09,
    img10,
  } = client;

  const galleryImages = [
    img01,
    img02,
    img03,
    img04,
    img05,
    img06,
    img07,
    img08,
    img09,
    img10,
  ].filter(Boolean);

  const firstPhone = client.phone01 || client.telephone01;
  const firstWhatsapp = normalizeWhatsApp(client.whatsapp01);
  const firstInstagram = externalHref(client.instagramLink || client.instagramLink02 || client.instagramLink03);
  const firstSnapchat = externalHref(client.snapchatLink || client.snapchatLink02 || client.snapchatLink03);
  const firstFacebook = externalHref(client.facebookLink || client.facebookLink02 || client.facebookLink03);
  const firstTiktok = externalHref(client.tiktokLink || client.tiktokLink02 || client.tiktokLink03);
  const canonicalUrl = `https://www.scan-taps.com/${companyName || clientId}`;

  return (
    <section className="min-h-screen bg-[#f4f1ef] px-0 py-0 sm:px-3 sm:py-4">
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{clientName || name}</title>
        {logo ? <link rel="icon" href={logo} /> : null}
        <meta name="description" content={designation || name || "Profile"} />
        <meta property="og:title" content={clientName || name} />
        <meta property="og:description" content={designation || name || "Profile"} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={images} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={clientName || name} />
        <meta name="twitter:description" content={designation || name || "Profile"} />
        <meta name="twitter:image" content={images} />
      </Helmet>

      {showQr ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-5"
          style={{ background: "rgba(58, 42, 47, 0.40)" }}
        >
          <div className="relative w-full max-w-sm rounded-3xl border-2 border-[#b58a12]/80 bg-[#fff9f6] px-6 pb-7 pt-14 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowQr(false)}
              className="absolute right-5 top-5 text-[#704753]"
              aria-label="Close QR"
            >
              <ImCross size={18} />
            </button>

            <div className="flex flex-col items-center gap-6">
              <div
                id="profile36-qr"
                className="rounded-2xl border-2 border-[#b58a12]/80 bg-white p-5 shadow"
              >
                <QRCodeCanvas value={currentPageUrl} size={190} />
              </div>

              <button
                type="button"
                onClick={downloadQr}
                className="flex items-center gap-2 rounded-xl border-2 border-[#b58a12]/80 bg-white/70 px-5 py-3 font-semibold text-[#5a3140] shadow-sm transition hover:bg-white"
              >
                <FaDownload /> Download QR
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mx-auto min-h-screen w-full max-w-[430px] overflow-hidden shadow-[0_14px_38px_rgba(90,49,64,0.14)] sm:rounded-[26px] sm:border sm:border-white/80"
        style={{ backgroundColor: THEME.petalPink, backgroundImage: PROFILE_GRADIENT, backgroundAttachment: "fixed" }}>
        <article className="relative min-h-screen overflow-hidden bg-transparent pb-8">
          <div className="relative z-10">
            <div className="bg-transparent">
  <a
    href={images}
    target="_blank"
    rel="noopener noreferrer"
    className="block w-full"
    aria-label="Open cover image"
  >
    <img
      src={images}
      alt="Profile cover"
      className="block h-auto max-h-[240px] w-full object-contain"
    />
  </a>
</div>

<div className="relative z-20 mt-3 px-5">
  <div className="flex items-center justify-between gap-4">
    {logo ? (
      <a
        href={logo}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block shrink-0"
        aria-label="Open profile logo"
      >
        <img
          src={logo}
          alt="logo"
          className="h-24 w-24 rounded-2xl border-2 border-[#b58a12]/80 bg-white/90 object-cover shadow-[0_8px_24px_rgba(90,49,64,0.12)]"
        />
      </a>
    ) : (
      <div />
    )}

    <button
      type="button"
      onClick={downloadContactCard}
      className="flex shrink-0 items-center gap-2 rounded-xl border-2 border-[#b58a12]/80 px-4 py-2.5 text-sm font-semibold text-[#5a3140] shadow-[0_5px_14px_rgba(90,49,64,0.08)] backdrop-blur-sm transition"
    >
      <FaUserPlus size={16} /> Save Contact
    </button>
  </div>
</div>

            <div className="px-5">
              <div className="text-left">
                <p className="font-serif text-[15px] font-bold text-[#5a3140]">
                  {name}
                </p>
                <h1 className="mt-1 font-serif text-[28px] font-bold leading-tight text-[#704753]">
                  {clientName}
                </h1>
                {designation ? (
                  <p className="mt-1 text-[15px] font-semibold text-[#704753]">
                    {designation}
                  </p>
                ) : null}
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {firstWhatsapp ? (
                    <a
                      href={`https://wa.me/${firstWhatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#b58a12]/80 bg-white/62 text-[#704753] shadow-sm"
                      aria-label="WhatsApp"
                    >
                      <FaWhatsapp size={19} />
                    </a>
                  ) : null}
                  {firstInstagram ? (
                    <a
                      href={firstInstagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#b58a12]/80 bg-white/62 text-[#704753] shadow-sm"
                      aria-label="Instagram"
                    >
                      <FaInstagram size={18} />
                    </a>
                  ) : null}
                  {firstSnapchat ? (
                    <a
                      href={firstSnapchat}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#b58a12]/80 bg-white/62 text-[#704753] shadow-sm"
                      aria-label="Snapchat"
                    >
                      <FaSnapchatGhost size={18} />
                    </a>
                  ) : null}
                  {firstFacebook ? (
                    <a
                      href={firstFacebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#b58a12]/80 bg-white/62 text-[#704753] shadow-sm"
                      aria-label="Facebook"
                    >
                      <FaFacebookF size={17} />
                    </a>
                  ) : null}
                  {firstTiktok ? (
                    <a
                      href={firstTiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#b58a12]/80 bg-white/62 text-[#704753] shadow-sm"
                      aria-label="TikTok"
                    >
                      <FaTiktok size={17} />
                    </a>
                  ) : null}
                </div>

                <div className="flex items-center gap-2 rounded-full border-2 border-[#b58a12]/80 bg-white/62 px-3 py-2 text-sm font-semibold text-[#5a3140] shadow-sm backdrop-blur-sm">
                  <MdOutlineRemoveRedEye size={18} />
                  {visitCount}
                </div>
              </div>

             

              {description ? (
                <div className="mt-4 rounded-2xl border-2 border-[#b58a12]/80 bg-white/44 px-4 py-4 shadow-[0_5px_16px_rgba(90,49,64,0.07)] backdrop-blur-sm">
                  <p className="whitespace-pre-line text-left text-sm font-medium leading-6 text-[#4a343a]">
                    {cleanText(description)}
                  </p>
                </div>
              ) : null}

              {linkGroups.map((group) => (
                <React.Fragment key={group.title}>
                  <DividerTitle>{group.title}</DividerTitle>
                  <div className="overflow-hidden rounded-2xl border-2 border-[#b58a12]/80 bg-white/42 shadow-[0_6px_18px_rgba(90,49,64,0.07)] backdrop-blur-sm">
                    {group.items.map((item, index) => (
                      <div
                        key={`${group.title}-${item.label}-${index}`}
                        className="border-b border-[#efb8c4] last:border-b-0"
                      >
                        <LinkCard {...item} />
                      </div>
                    ))}
                  </div>
                </React.Fragment>
              ))}

              {services ? (
                <>
                  <DividerTitle>Services</DividerTitle>
                  <div className="rounded-2xl border-2 border-[#b58a12]/80 bg-white/42 px-4 py-4 text-left shadow-[0_6px_18px_rgba(90,49,64,0.07)] backdrop-blur-sm">
                    {cleanText(services)
                      .split(/\r?\n/)
                      .filter(Boolean)
                      .map((line, index) => (
                        <div
                          key={`${line}-${index}`}
                          className="flex items-start gap-2 py-1 text-sm font-medium text-[#4a343a]"
                        >
                          <span className="mt-0.5 text-[#b58a12]">•</span>
                          <span>{line}</span>
                        </div>
                      ))}
                  </div>
                </>
              ) : null}

              {galleryImages.length ? (
                <>
                  <DividerTitle>Image Gallery</DividerTitle>
                  <div className="grid grid-cols-2 gap-2 rounded-2xl border-2 border-[#b58a12]/80 bg-white/42 p-2 shadow-[0_6px_18px_rgba(90,49,64,0.07)] backdrop-blur-sm">
                    {galleryImages.map((image, index) => (
                      <a
                        href={image}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={`${image}-${index}`}
                      >
                        <img
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          loading="lazy"
                          className="aspect-square w-full rounded-xl object-cover"
                        />
                      </a>
                    ))}
                  </div>
                </>
              ) : null}

              {location ? (
                <>
                  <DividerTitle>Location</DividerTitle>
                  <div className="overflow-hidden rounded-2xl border-2 border-[#b58a12]/80 bg-white/58 shadow-[0_6px_18px_rgba(90,49,64,0.07)]">
                    <iframe
                      src={location}
                      title="Location"
                      width="100%"
                      height="300"
                      allowFullScreen
                      loading="lazy"
                      className="block w-full"
                    />
                  </div>
                </>
              ) : null}

              <DividerTitle>Share Profile</DividerTitle>
              <div className="flex flex-wrap justify-center gap-3">
                <FacebookShareButton url={currentPageUrl}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#b58a12]/80 bg-white/62 text-[#704753] shadow-sm">
                    <FaFacebookF size={20} />
                  </span>
                </FacebookShareButton>
                <LinkedinShareButton url={currentPageUrl}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#b58a12]/80 bg-white/62 text-[#704753] shadow-sm">
                    <FaLinkedinIn size={20} />
                  </span>
                </LinkedinShareButton>
                <TelegramShareButton url={currentPageUrl}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#b58a12]/80 bg-white/62 text-[#704753] shadow-sm">
                    <FaTelegramPlane size={20} />
                  </span>
                </TelegramShareButton>
                <WhatsappShareButton url={currentPageUrl}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#b58a12]/80 bg-white/62 text-[#704753] shadow-sm">
                    <FaWhatsapp size={21} />
                  </span>
                </WhatsappShareButton>
              </div>

              <DividerTitle>Share Contact & QR</DividerTitle>
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowQr(true)}
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#b58a12]/80 bg-white/62 text-[#704753] shadow-sm"
                  aria-label="Show QR"
                >
                  <IoQrCodeSharp size={28} />
                </button>
                <button
                  type="button"
                  onClick={downloadContactCard}
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#b58a12]/80 bg-white/62 text-[#704753] shadow-sm"
                  aria-label="Download contact"
                >
                  <FaDownload size={23} />
                </button>
              </div>

              <p className="pt-6 text-center text-sm font-medium text-[#5a3140]">
                Copyright © <span className="font-bold">{companyName}</span>. All Rights Reserved.
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Profile38;

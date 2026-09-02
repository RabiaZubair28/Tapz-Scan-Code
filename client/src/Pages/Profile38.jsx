/* PROFILE36_PINK_GOLD_FINAL_20260902 */
/* COVER: https://res.cloudinary.com/dxokfhkhu/image/upload/v1788082399/v1z2rrrtg8enr7fs4bqa.jpg */
/* THEME CHECK: #5d0618 pink | #d9aa62 gold */
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
  "https://res.cloudinary.com/dxokfhkhu/image/upload/v1788082399/v1z2rrrtg8enr7fs4bqa.jpg";

const THEME = {
  pink: "#5d0618",
  pinkDark: "#470411",
  pinkText: "#7b1223",
  pinkSoft: "#a04555",
  gold: "#d9aa62",
  goldLight: "#ead9c9",
  cream: "#fffaf3",
};

const PINK_GOLD_GRADIENT =
  "radial-gradient(circle at 18% 0%, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0) 38%), radial-gradient(circle at 88% 14%, rgba(217,170,98,0.26) 0%, rgba(217,170,98,0) 34%), linear-gradient(180deg, #fff3f7 0%, #f8dbe5 48%, #f8e7df 100%)";

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
    <span className="h-px flex-1 bg-[#d9aa62] opacity-60" />
    <FaRegStar className="text-[#d9aa62]" size={11} />
    <span className="font-serif text-[12px] font-bold uppercase tracking-[0.18em] text-[#7b1223]">
      {children}
    </span>
    <FaRegStar className="text-[#d9aa62]" size={11} />
    <span className="h-px flex-1 bg-[#d9aa62] opacity-60" />
  </div>
);

const LinkCard = ({ icon, label, value, href }) => {
  if (!href && !value) return null;

  const body = (
    <div className="flex w-full items-center justify-between gap-3 px-4 py-3.5">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#e8cda7] bg-[#5d0618] text-white shadow-[0_5px_14px_rgba(93,6,24,0.18)]">
          {icon}
        </div>
        <div className="min-w-0 text-left">
          <div className="font-serif text-[13px] font-bold text-[#4b2630]">
            {label}
          </div>
          {value ? (
            <div className="mt-0.5 break-all text-[12px] font-medium text-[#a04555]">
              {value}
            </div>
          ) : null}
        </div>
      </div>
      <span className="shrink-0 text-xl font-semibold text-[#d9aa62]">›</span>
    </div>
  );

  if (!href) return body;

  return (
    <a
      href={href}
      target={href.startsWith("tel:") || href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="block transition duration-200 hover:bg-[#fff4f7]"
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
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundImage: PINK_GOLD_GRADIENT }}
      >
        <ScaleLoader color={THEME.pink} aria-label="Loading Profile36" />
      </div>
    );
  }

  if (!client) {
    return (
      <div
        className="flex min-h-screen items-center justify-center px-5 text-center"
        style={{ backgroundImage: PINK_GOLD_GRADIENT }}
      >
        <div className="max-w-sm rounded-3xl border border-[#d9aa62] bg-white/90 px-7 py-8 shadow-xl">
          <h1 className="font-serif text-3xl font-bold text-[#5d0618]">
            Profile not found
          </h1>
          <p className="mt-3 text-[#a04555]">Unable to load this profile.</p>
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
    address,
    logo,
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
  const canonicalUrl = `https://www.scan-taps.com/${companyName || clientId}`;

  return (
    <section
      className="min-h-screen px-0 py-0 sm:px-3 sm:py-4"
      style={{ backgroundImage: PINK_GOLD_GRADIENT, backgroundAttachment: "fixed" }}
    >
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{clientName || name}</title>
        {logo ? <link rel="icon" href={logo} /> : null}
        <meta name="description" content={designation || name || "Profile"} />
        <meta property="og:title" content={clientName || name} />
        <meta property="og:description" content={designation || name || "Profile"} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={PROFILE36_COVER} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={clientName || name} />
        <meta name="twitter:description" content={designation || name || "Profile"} />
        <meta name="twitter:image" content={PROFILE36_COVER} />
      </Helmet>

      {showQr ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-5"
          style={{ background: "rgba(93, 6, 24, 0.72)" }}
        >
          <div className="relative w-full max-w-sm rounded-3xl border-2 border-[#d9aa62] bg-[#fffaf3] px-6 pb-7 pt-14 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowQr(false)}
              className="absolute right-5 top-5 text-[#5d0618]"
              aria-label="Close QR"
            >
              <ImCross size={18} />
            </button>

            <div className="flex flex-col items-center gap-6">
              <div
                id="profile36-qr"
                className="rounded-2xl border border-[#ead9c9] bg-white p-5 shadow"
              >
                <QRCodeCanvas value={currentPageUrl} size={190} />
              </div>

              <button
                type="button"
                onClick={downloadQr}
                className="flex items-center gap-2 rounded-xl border border-[#d9aa62] bg-[#5d0618] px-5 py-3 font-semibold text-white shadow-lg"
              >
                <FaDownload /> Download QR
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mx-auto min-h-screen w-full max-w-[430px] overflow-hidden bg-white/45 shadow-[0_14px_38px_rgba(93,6,24,0.16)] sm:rounded-[26px] sm:border sm:border-white/70">
        <article className="relative min-h-screen overflow-hidden bg-[#fffaf3]/90 pb-8">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: PINK_GOLD_GRADIENT, opacity: 0.72 }}
          />

          <div className="relative z-10">
            <div className="relative mb-16 bg-white">
              <a
                href={PROFILE36_COVER}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
                aria-label="Open cover image"
              >
                <img
                  src={PROFILE36_COVER}
                  alt="Profile cover"
                  className="block h-auto max-h-[240px] w-full object-contain"
                />
              </a>

              {logo ? (
                <a
                  href={logo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute left-5 -bottom-12"
                  aria-label="Open profile logo"
                >
                  <img
                    src={logo}
                    alt="logo"
                    className="h-24 w-24 rounded-2xl border-[3px] border-[#d9aa62] bg-white object-cover shadow-[0_8px_24px_rgba(93,6,24,0.22)]"
                  />
                </a>
              ) : null}

              <button
                type="button"
                onClick={downloadContactCard}
                className="absolute bottom-3 right-4 flex items-center gap-2 rounded-xl border border-[#d9aa62] bg-[#5d0618] px-3.5 py-2.5 text-sm font-bold text-white shadow-[0_6px_16px_rgba(93,6,24,0.28)]"
              >
                <FaUserPlus size={16} /> Save Contact
              </button>
            </div>

            <div className="px-5">
              <div className="text-left">
                <p className="font-serif text-[15px] font-bold text-[#7b1223]">
                  {name}
                </p>
                <h1 className="mt-1 font-serif text-[28px] font-bold leading-tight text-[#5d0618]">
                  {clientName}
                </h1>
                {designation ? (
                  <p className="mt-1 text-[15px] font-semibold text-[#a04555]">
                    {designation}
                  </p>
                ) : null}
                {address ? (
                  <p className="mt-2 flex items-start gap-2 text-sm font-medium text-[#6f4c56]">
                    <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#d9aa62]" />
                    <span>{address}</span>
                  </p>
                ) : null}
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex gap-2">
                  {firstPhone ? (
                    <a
                      href={`tel:${firstPhone}`}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d9aa62] bg-white text-[#5d0618] shadow"
                      aria-label="Call"
                    >
                      <FaPhoneAlt />
                    </a>
                  ) : null}
                  {firstWhatsapp ? (
                    <a
                      href={`https://wa.me/${firstWhatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d9aa62] bg-white text-[#5d0618] shadow"
                      aria-label="WhatsApp"
                    >
                      <FaWhatsapp size={19} />
                    </a>
                  ) : null}
                  {client.email ? (
                    <a
                      href={`mailto:${client.email}`}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d9aa62] bg-white text-[#5d0618] shadow"
                      aria-label="Email"
                    >
                      <FaEnvelope />
                    </a>
                  ) : null}
                </div>

                <div className="flex items-center gap-2 rounded-full border border-[#e8cda7] bg-white/80 px-3 py-2 text-sm font-semibold text-[#7b1223] shadow-sm">
                  <MdOutlineRemoveRedEye size={18} />
                  {visitCount}
                </div>
              </div>

              {description ? (
                <div className="mt-4 rounded-2xl border border-[#ead9c9] bg-white/80 px-4 py-4 shadow-[0_5px_16px_rgba(93,6,24,0.08)]">
                  <p className="whitespace-pre-line text-left text-sm font-medium leading-6 text-[#4b343b]">
                    {cleanText(description)}
                  </p>
                </div>
              ) : null}

              {linkGroups.map((group) => (
                <React.Fragment key={group.title}>
                  <DividerTitle>{group.title}</DividerTitle>
                  <div className="overflow-hidden rounded-2xl border border-[#d9aa62]/70 bg-white/85 shadow-[0_6px_18px_rgba(93,6,24,0.09)]">
                    {group.items.map((item, index) => (
                      <div
                        key={`${group.title}-${item.label}-${index}`}
                        className="border-b border-[#ead9c9] last:border-b-0"
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
                  <div className="rounded-2xl border border-[#d9aa62]/70 bg-white/85 px-4 py-4 text-left shadow-[0_6px_18px_rgba(93,6,24,0.09)]">
                    {cleanText(services)
                      .split(/\r?\n/)
                      .filter(Boolean)
                      .map((line, index) => (
                        <div
                          key={`${line}-${index}`}
                          className="flex items-start gap-2 py-1 text-sm font-medium text-[#4b343b]"
                        >
                          <span className="mt-0.5 text-[#d9aa62]">•</span>
                          <span>{line}</span>
                        </div>
                      ))}
                  </div>
                </>
              ) : null}

              {galleryImages.length ? (
                <>
                  <DividerTitle>Image Gallery</DividerTitle>
                  <div className="grid grid-cols-2 gap-2 rounded-2xl border border-[#d9aa62]/70 bg-white/80 p-2 shadow-[0_6px_18px_rgba(93,6,24,0.09)]">
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
                  <div className="overflow-hidden rounded-2xl border border-[#d9aa62] bg-white shadow-[0_6px_18px_rgba(93,6,24,0.09)]">
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
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d9aa62] bg-[#5d0618] text-white shadow">
                    <FaFacebookF size={20} />
                  </span>
                </FacebookShareButton>
                <LinkedinShareButton url={currentPageUrl}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d9aa62] bg-[#5d0618] text-white shadow">
                    <FaLinkedinIn size={20} />
                  </span>
                </LinkedinShareButton>
                <TelegramShareButton url={currentPageUrl}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d9aa62] bg-[#5d0618] text-white shadow">
                    <FaTelegramPlane size={20} />
                  </span>
                </TelegramShareButton>
                <WhatsappShareButton url={currentPageUrl}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d9aa62] bg-[#5d0618] text-white shadow">
                    <FaWhatsapp size={21} />
                  </span>
                </WhatsappShareButton>
              </div>

              <DividerTitle>Share Contact & QR</DividerTitle>
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowQr(true)}
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#d9aa62] bg-white text-[#5d0618] shadow"
                  aria-label="Show QR"
                >
                  <IoQrCodeSharp size={28} />
                </button>
                <button
                  type="button"
                  onClick={downloadContactCard}
                  className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#d9aa62] bg-white text-[#5d0618] shadow"
                  aria-label="Download contact"
                >
                  <FaDownload size={23} />
                </button>
              </div>

              <p className="pt-6 text-center text-sm font-medium text-[#7b1223]">
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

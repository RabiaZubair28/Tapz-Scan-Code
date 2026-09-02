import React, { useEffect, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Helmet } from "react-helmet";
import {
  FaDownload,
  FaEnvelope,
  FaFacebookF,
  FaGift,
  FaGlobe,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaPhoneSquareAlt,
  FaShoppingBag,
  FaSnapchatGhost,
  FaStar,
  FaTelegramPlane,
  FaUtensils,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import {
  FaMapLocation,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";
import { IoQrCodeSharp } from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";
import { SlArrowRight } from "react-icons/sl";
import { ImCross } from "react-icons/im";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import vCardsJS from "vcards-js";
import axios from "axios";

const THEME = {
  page: "linear-gradient(180deg, #fff7fb 0%, #fde8f1 42%, #f8d4e2 100%)",
  accent: "#c14978",
  accentDark: "#8f2f58",
  accentSoft: "#f7d7e4",
  border: "#dfa3ba",
  text: "#4b1830",
  muted: "#8d5a70",
  card: "#fffafd",
};

const ProfileLinkCard = ({ href, icon, title, value }) => {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      style={{
        backgroundColor: THEME.card,
        border: `1px solid ${THEME.border}`,
        color: THEME.text,
      }}
    >
      <div className="flex items-center gap-4 min-w-0">
        <div
          className="w-12 h-12 shrink-0 flex items-center justify-center rounded-2xl"
          style={{ backgroundColor: THEME.accentSoft, color: THEME.accentDark }}
        >
          {icon}
        </div>
        <div className="min-w-0 text-left">
          <p className="font-semibold leading-tight" style={{ color: THEME.text }}>
            {title}
          </p>
          {value ? (
            <p
              className="text-sm mt-1 break-words"
              style={{ color: THEME.muted }}
            >
              {value}
            </p>
          ) : null}
        </div>
      </div>
      <SlArrowRight className="shrink-0" style={{ color: THEME.accentDark }} />
    </a>
  );
};

const Profile38 = () => {
  const [showQr, setShowQr] = useState(false);
  const [client, setClient] = useState("");
  const [loading, setLoading] = useState(true);
  const [visitCount, setVisitCount] = useState(0);
  const { id: clientId } = useParams();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(
          `https://www.scan-taps.com/api/data/client/${clientId}`,
        );
        setClient(response.data);
      } catch (error) {
        console.error("Error fetching client:", error);
      } finally {
        setLoading(false);
      }
    };

    if (clientId) fetchClient();
    else setLoading(false);
  }, [clientId]);

  const {
    _id,
    companyName,
    name,
    description,
    phone01,
    phone02,
    phone03,
    telephone01,
    telephone02,
    telephone03,
    services,
    clientName,
    designation,
    address,
    whatsapp01,
    whatsapp02,
    whatsapp03,
    location,
    instagramLink,
    instagramLink02,
    instagramLink03,
    instagramName,
    instagramName02,
    instagramName03,
    snapchatLink,
    snapchatLink02,
    snapchatLink03,
    snapchatName,
    snapchatName02,
    snapchatName03,
    youtubeLink,
    youtubeLink02,
    youtubeLink03,
    youtubeName,
    youtubeName02,
    youtubeName03,
    tiktokLink,
    tiktokLink02,
    tiktokLink03,
    tiktokName,
    tiktokName02,
    tiktokName03,
    twitterLink,
    twitterLink02,
    twitterLink03,
    twitterName,
    twitterName02,
    twitterName03,
    facebookLink,
    facebookLink02,
    facebookLink03,
    facebookName,
    facebookName02,
    facebookName03,
    googleReviewLink,
    googleReviewLink02,
    googleReviewLink03,
    googleReviewName,
    googleReviewName02,
    googleReviewName03,
    website,
    website02,
    website03,
    websiteName,
    websiteName02,
    websiteName03,
    email,
    email02,
    email03,
    youtubeShortsLink,
    youtubeShortsLink02,
    youtubeShortsLink03,
    youtubeShortsName,
    youtubeShortsName02,
    youtubeShortsName03,
    googleMapLink,
    googleMapLink02,
    googleMapLink03,
    googleMapName,
    googleMapName02,
    googleMapName03,
    menuLink,
    menuName,
    catalogueLink,
    catalogueName,
    profileLink01,
    profileLink02,
    profileName01,
    profileName02,
    logo,
    images,
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
  } = client || {};

  useEffect(() => {
    const fetchAndIncrementVisitCount = async () => {
      if (!_id) return;
      try {
        const response = await axios.post(
          `https://www.scan-taps.com/api/visit/${_id}`,
        );
        setVisitCount(response.data.count || 0);
      } catch (error) {
        console.error("Error fetching or incrementing visit count:", error);
      }
    };

    fetchAndIncrementVisitCount();
  }, [_id]);

  const downloadContactCard = async () => {
    const blobToJpegBase64 = async (
      blob,
      { maxSize = 512, maxBytes = 256 * 1024 } = {},
    ) => {
      const blobUrl = URL.createObjectURL(blob);
      try {
        return await new Promise((resolve) => {
          const img = new Image();
          img.onload = async () => {
            const width = img.naturalWidth || img.width;
            const height = img.naturalHeight || img.height;
            if (!width || !height) return resolve(null);

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return resolve(null);

            const makeJpegBlob = (targetW, targetH, quality) =>
              new Promise((done) => {
                canvas.width = targetW;
                canvas.height = targetH;
                ctx.clearRect(0, 0, targetW, targetH);
                ctx.drawImage(img, 0, 0, targetW, targetH);
                canvas.toBlob(
                  (result) => done(result || null),
                  "image/jpeg",
                  Math.max(0.1, Math.min(1, quality)),
                );
              });

            const blobToBase64 = (fileBlob) =>
              new Promise((done) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  const result = String(reader.result || "");
                  done(result.split(",")[1] || null);
                };
                reader.onerror = () => done(null);
                reader.readAsDataURL(fileBlob);
              });

            const scales = [1, 0.85, 0.7, 0.55, 0.45, 0.35, 0.25];
            const qualities = [0.9, 0.82, 0.74, 0.66, 0.58, 0.5, 0.42];

            for (const scaleStep of scales) {
              const scale = Math.min(
                1,
                (maxSize / Math.max(width, height)) * scaleStep,
              );
              const targetW = Math.max(1, Math.round(width * scale));
              const targetH = Math.max(1, Math.round(height * scale));

              for (const quality of qualities) {
                // eslint-disable-next-line no-await-in-loop
                const jpegBlob = await makeJpegBlob(targetW, targetH, quality);
                if (!jpegBlob || jpegBlob.size > maxBytes) continue;
                // eslint-disable-next-line no-await-in-loop
                const base64 = await blobToBase64(jpegBlob);
                if (base64) return resolve(base64);
              }
            }

            const fallbackScale = Math.min(1, maxSize / Math.max(width, height));
            const fallbackBlob = await makeJpegBlob(
              Math.max(1, Math.round(width * fallbackScale)),
              Math.max(1, Math.round(height * fallbackScale)),
              0.6,
            );
            if (!fallbackBlob) return resolve(null);
            return resolve(await blobToBase64(fallbackBlob));
          };
          img.onerror = () => resolve(null);
          img.src = blobUrl;
        });
      } finally {
        URL.revokeObjectURL(blobUrl);
      }
    };

    const base64ToBlob = (base64, mime) => {
      const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
      return new Blob([bytes], { type: mime || "application/octet-stream" });
    };

    const foldVcardLines = (vcardText) =>
      String(vcardText || "")
        .split(/\r?\n/)
        .map((line) => {
          const maxLen = 75;
          if (line.length <= maxLen) return line;
          let output = "";
          for (let index = 0; index < line.length; index += maxLen) {
            const chunk = line.slice(index, index + maxLen);
            output += index === 0 ? chunk : `\r\n ${chunk}`;
          }
          return output;
        })
        .join("\r\n");

    const getLogoJpegData = async () => {
      if (!logo) return null;
      try {
        const response = await axios.get(
          `https://www.scan-taps.com/api/vcard/image?url=${encodeURIComponent(
            logo,
          )}`,
        );
        const mimeRaw = String(response.data?.mime || "");
        const base64 = String(response.data?.base64 || "");
        if (!mimeRaw.startsWith("image/") || !base64) return null;
        const normalizedMime =
          mimeRaw.toLowerCase() === "image/jpg" ? "image/jpeg" : mimeRaw;
        const jpegBase64 = await blobToJpegBase64(
          base64ToBlob(base64, normalizedMime),
        );
        return jpegBase64 ? { type: "JPEG", base64: jpegBase64 } : null;
      } catch {
        return null;
      }
    };

    const card = vCardsJS();
    card.firstName = String(clientName || "");
    card.formattedName = String(clientName || "");
    card.organization = String(name || "");
    card.title = String(designation || "");
    if (phone01) card.cellPhone = String(phone01);
    if (phone02) card.workPhone = String(phone02);
    if (phone03) card.homePhone = String(phone03);
    if (email) card.email = String(email);
    if (website) card.url = String(website);

    const logoData = await getLogoJpegData();
    if (logoData?.base64) {
      card.logo.embedFromString(logoData.base64, logoData.type);
      card.photo.embedFromString(logoData.base64, logoData.type);
    }

    let vCardString = foldVcardLines(card.getFormattedString());
    const whatsappNumbers = [whatsapp01, whatsapp02, whatsapp03]
      .filter(Boolean)
      .map((number) => String(number).trim())
      .filter(Boolean);

    if (whatsappNumbers.length) {
      const whatsappLines = whatsappNumbers.map(
        (number) => `TEL;TYPE=CELL;TYPE=WHATSAPP:${number}`,
      );
      const endIndex = vCardString.lastIndexOf("END:VCARD");
      if (endIndex !== -1) {
        const beforeEnd = vCardString.slice(0, endIndex).replace(/\r?\n$/, "");
        vCardString = `${beforeEnd}\r\n${whatsappLines.join(
          "\r\n",
        )}\r\nEND:VCARD\r\n`;
      }
    }

    const blob = new Blob([vCardString], {
      type: "text/vcard;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      window.location.href = url;
    } else {
      const link = document.createElement("a");
      link.download = `${clientName || "contact"}.vcf`;
      link.href = url;
      link.click();
    }

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const downloadQr = (rootEle) => {
    const input = document.getElementById(rootEle);
    if (!input) return;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const horizontalMargin = 20;
      const availableWidth = pageWidth - horizontalMargin * 2;
      const scaleFactor = Math.min(
        availableWidth / canvas.width,
        pageHeight / canvas.height,
      );
      const width = canvas.width * scaleFactor;
      const height = canvas.height * scaleFactor;
      const x = (pageWidth - width) / 2;
      const y = (pageHeight - height) / 2;
      pdf.addImage(imgData, "PNG", x, y, width, height);
      pdf.save("QR.pdf");
    });
  };

  const currentPageUrl = window.location.href;

  const profileLinks = [
    phone01 && {
      href: `tel:${phone01}`,
      title: "Phone",
      value: phone01,
      icon: <FaPhone size={22} />,
    },
    phone02 && {
      href: `tel:${phone02}`,
      title: "Phone 2",
      value: phone02,
      icon: <FaPhone size={22} />,
    },
    phone03 && {
      href: `tel:${phone03}`,
      title: "Phone 3",
      value: phone03,
      icon: <FaPhone size={22} />,
    },
    telephone01 && {
      href: `tel:${telephone01}`,
      title: "Telephone",
      value: telephone01,
      icon: <FaPhoneSquareAlt size={24} />,
    },
    telephone02 && {
      href: `tel:${telephone02}`,
      title: "Telephone 2",
      value: telephone02,
      icon: <FaPhoneSquareAlt size={24} />,
    },
    telephone03 && {
      href: `tel:${telephone03}`,
      title: "Telephone 3",
      value: telephone03,
      icon: <FaPhoneSquareAlt size={24} />,
    },
    whatsapp01 && {
      href: `https://wa.me/${whatsapp01}`,
      title: "WhatsApp",
      value: whatsapp01,
      icon: <FaWhatsapp size={25} />,
    },
    whatsapp02 && {
      href: `https://wa.me/${whatsapp02}`,
      title: "WhatsApp 2",
      value: whatsapp02,
      icon: <FaWhatsapp size={25} />,
    },
    whatsapp03 && {
      href: `https://wa.me/${whatsapp03}`,
      title: "WhatsApp 3",
      value: whatsapp03,
      icon: <FaWhatsapp size={25} />,
    },
    menuLink && {
      href: menuLink,
      title: "Menu",
      value: menuName,
      icon: <FaUtensils size={23} />,
    },
    catalogueLink && {
      href: catalogueLink,
      title: "Catalogue",
      value: catalogueName,
      icon: <FaShoppingBag size={23} />,
    },
    profileLink01 && {
      href: profileLink01,
      title: "Company Profile / Price List",
      value: profileName01,
      icon: <FaGift size={23} />,
    },
    profileLink02 && {
      href: profileLink02,
      title: "Profile",
      value: profileName02,
      icon: <FaGift size={23} />,
    },
    instagramLink && {
      href: instagramLink,
      title: "Instagram",
      value: instagramName,
      icon: <FaInstagram size={24} />,
    },
    instagramLink02 && {
      href: instagramLink02,
      title: "Instagram 2",
      value: instagramName02,
      icon: <FaInstagram size={24} />,
    },
    instagramLink03 && {
      href: instagramLink03,
      title: "Instagram 3",
      value: instagramName03,
      icon: <FaInstagram size={24} />,
    },
    snapchatLink && {
      href: snapchatLink,
      title: "Snapchat",
      value: snapchatName,
      icon: <FaSnapchatGhost size={24} />,
    },
    snapchatLink02 && {
      href: snapchatLink02,
      title: "Snapchat 2",
      value: snapchatName02,
      icon: <FaSnapchatGhost size={24} />,
    },
    snapchatLink03 && {
      href: snapchatLink03,
      title: "Snapchat 3",
      value: snapchatName03,
      icon: <FaSnapchatGhost size={24} />,
    },
    youtubeLink && {
      href: youtubeLink,
      title: "YouTube",
      value: youtubeName,
      icon: <FaYoutube size={24} />,
    },
    youtubeLink02 && {
      href: youtubeLink02,
      title: "YouTube 2",
      value: youtubeName02,
      icon: <FaYoutube size={24} />,
    },
    youtubeLink03 && {
      href: youtubeLink03,
      title: "YouTube 3",
      value: youtubeName03,
      icon: <FaYoutube size={24} />,
    },
    tiktokLink && {
      href: tiktokLink,
      title: "TikTok",
      value: tiktokName,
      icon: <FaTiktok size={23} />,
    },
    tiktokLink02 && {
      href: tiktokLink02,
      title: "TikTok 2",
      value: tiktokName02,
      icon: <FaTiktok size={23} />,
    },
    tiktokLink03 && {
      href: tiktokLink03,
      title: "TikTok 3",
      value: tiktokName03,
      icon: <FaTiktok size={23} />,
    },
    twitterLink && {
      href: twitterLink,
      title: "X / Twitter",
      value: twitterName,
      icon: <FaXTwitter size={22} />,
    },
    twitterLink02 && {
      href: twitterLink02,
      title: "X / Twitter 2",
      value: twitterName02,
      icon: <FaXTwitter size={22} />,
    },
    twitterLink03 && {
      href: twitterLink03,
      title: "X / Twitter 3",
      value: twitterName03,
      icon: <FaXTwitter size={22} />,
    },
    facebookLink && {
      href: facebookLink,
      title: "Facebook",
      value: facebookName,
      icon: <FaFacebookF size={22} />,
    },
    facebookLink02 && {
      href: facebookLink02,
      title: "Facebook 2",
      value: facebookName02,
      icon: <FaFacebookF size={22} />,
    },
    facebookLink03 && {
      href: facebookLink03,
      title: "Facebook 3",
      value: facebookName03,
      icon: <FaFacebookF size={22} />,
    },
    googleReviewLink && {
      href: googleReviewLink,
      title: "Google Review",
      value: googleReviewName,
      icon: <FaStar size={22} />,
    },
    googleReviewLink02 && {
      href: googleReviewLink02,
      title: "Google Review 2",
      value: googleReviewName02,
      icon: <FaStar size={22} />,
    },
    googleReviewLink03 && {
      href: googleReviewLink03,
      title: "Google Review 3",
      value: googleReviewName03,
      icon: <FaStar size={22} />,
    },
    website && {
      href: website,
      title: "Website",
      value: websiteName,
      icon: <FaGlobe size={23} />,
    },
    website02 && {
      href: website02,
      title: "Website 2",
      value: websiteName02,
      icon: <FaGlobe size={23} />,
    },
    website03 && {
      href: website03,
      title: "Website 3",
      value: websiteName03,
      icon: <FaGlobe size={23} />,
    },
    email && {
      href: `mailto:${email}`,
      title: "Email",
      value: email,
      icon: <FaEnvelope size={22} />,
    },
    email02 && {
      href: `mailto:${email02}`,
      title: "Email 2",
      value: email02,
      icon: <FaEnvelope size={22} />,
    },
    email03 && {
      href: `mailto:${email03}`,
      title: "Email 3",
      value: email03,
      icon: <FaEnvelope size={22} />,
    },
    youtubeShortsLink && {
      href: youtubeShortsLink,
      title: "LinkedIn",
      value: youtubeShortsName,
      icon: <FaLinkedinIn size={22} />,
    },
    youtubeShortsLink02 && {
      href: youtubeShortsLink02,
      title: "LinkedIn 2",
      value: youtubeShortsName02,
      icon: <FaLinkedinIn size={22} />,
    },
    youtubeShortsLink03 && {
      href: youtubeShortsLink03,
      title: "LinkedIn 3",
      value: youtubeShortsName03,
      icon: <FaLinkedinIn size={22} />,
    },
    googleMapLink && {
      href: googleMapLink,
      title: "Google Map",
      value: googleMapName,
      icon: <FaMapLocation size={23} />,
    },
    googleMapLink02 && {
      href: googleMapLink02,
      title: "Google Map 2",
      value: googleMapName02,
      icon: <FaMapLocation size={23} />,
    },
    googleMapLink03 && {
      href: googleMapLink03,
      title: "Google Map 3",
      value: googleMapName03,
      icon: <FaMapLocation size={23} />,
    },
  ].filter(Boolean);

  const quickLinks = [
    instagramLink && {
      href: instagramLink,
      label: "Instagram",
      icon: <FaInstagram size={23} />,
    },
    whatsapp01 && {
      href: `https://wa.me/${whatsapp01}`,
      label: "WhatsApp",
      icon: <FaWhatsapp size={23} />,
    },
    tiktokLink && {
      href: tiktokLink,
      label: "TikTok",
      icon: <FaTiktok size={22} />,
    },
    snapchatLink && {
      href: snapchatLink,
      label: "Snapchat",
      icon: <FaSnapchatGhost size={22} />,
    },
    email && {
      href: `mailto:${email}`,
      label: "Email",
      icon: <FaEnvelope size={21} />,
    },
    website && {
      href: website,
      label: "Website",
      icon: <FaGlobe size={21} />,
    },
  ].filter(Boolean);

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

  if (loading || !client) {
    return (
      <div
        className="min-h-screen w-full max-w-md mx-auto shadow-lg flex items-center justify-center"
        style={{ background: THEME.page }}
      >
        <ScaleLoader color={THEME.accentDark} size={50} />
      </div>
    );
  }

  return (
    <section>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{clientName}</title>
        <link rel="icon" type="image/x-icon" href={`${logo || ""}`} />
        <meta name="description" content={designation || name || ""} />
        <meta property="article:section" content={designation || name || ""} />
        <meta property="og:title" content={clientName || ""} />
        <meta property="og:description" content={designation || name || ""} />
        <meta
          property="og:url"
          content={`https://www.scan-taps.com/${companyName || ""}`}
        />
        <meta property="og:image" content={`${logo || ""}`} />
      </Helmet>

      {showQr && (
        <div
          className="qr-modal min-h-screen w-full max-w-md mx-auto shadow-lg flex items-center justify-center fixed inset-0 z-50"
          style={{ background: THEME.page }}
        >
          <div
            className="rounded-3xl pb-8 pt-14 px-10 relative shadow-xl"
            style={{
              backgroundColor: THEME.card,
              border: `1px solid ${THEME.border}`,
            }}
          >
            <ImCross
              className="absolute top-5 right-5 cursor-pointer"
              style={{ color: THEME.accentDark }}
              onClick={() => setShowQr(false)}
            />

            <div className="flex flex-col items-center gap-7">
              <div
                id="qr"
                className="p-4 rounded-2xl bg-white"
                style={{ border: `1px solid ${THEME.border}` }}
              >
                <QRCodeCanvas value={currentPageUrl} size={180} />
              </div>

              <div className="flex justify-center gap-2 flex-wrap">
                <button
                  type="button"
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: THEME.accentSoft,
                    color: THEME.accentDark,
                    border: `1px solid ${THEME.border}`,
                  }}
                  onClick={() => downloadQr("qr")}
                >
                  <FaDownload size={20} />
                </button>
                <FacebookShareButton url={currentPageUrl}>
                  <span
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ border: `1px solid ${THEME.border}`, color: THEME.accentDark }}
                  >
                    <FaFacebookF size={21} />
                  </span>
                </FacebookShareButton>
                <LinkedinShareButton url={currentPageUrl}>
                  <span
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ border: `1px solid ${THEME.border}`, color: THEME.accentDark }}
                  >
                    <FaLinkedinIn size={21} />
                  </span>
                </LinkedinShareButton>
                <TelegramShareButton url={currentPageUrl}>
                  <span
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ border: `1px solid ${THEME.border}`, color: THEME.accentDark }}
                  >
                    <FaTelegramPlane size={21} />
                  </span>
                </TelegramShareButton>
                <WhatsappShareButton url={currentPageUrl}>
                  <span
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ border: `1px solid ${THEME.border}`, color: THEME.accentDark }}
                  >
                    <FaWhatsapp size={22} />
                  </span>
                </WhatsappShareButton>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className="min-h-screen w-full max-w-md mx-auto shadow-xl pb-8 text-center overflow-hidden"
        style={{ background: THEME.page }}
      >
        {/* Profile34-style cover with overlapping logo */}
        {images ? (
          <div className="relative mb-16">
            <a href={images} target="_blank" rel="noopener noreferrer">
              <img
                src={images}
                alt="Cover"
                className="w-full h-[220px] object-cover"
              />
            </a>
            <div
              className="absolute inset-x-0 bottom-0 h-20"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,238,246,0.88) 100%)",
              }}
            />
            {logo && (
              <a
                href={logo}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-5 -bottom-12 z-10"
              >
                <img
                  src={logo}
                  alt="Logo"
                  className="w-24 h-24 object-cover rounded-3xl bg-white shadow-xl"
                  style={{ border: `3px solid ${THEME.card}` }}
                />
              </a>
            )}
          </div>
        ) : (
          <div
            className="h-28 relative mb-16"
            style={{
              background:
                "linear-gradient(135deg, #f4b8cf 0%, #df8ead 52%, #bf5f88 100%)",
            }}
          >
            {logo && (
              <a
                href={logo}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-5 -bottom-12 z-10"
              >
                <img
                  src={logo}
                  alt="Logo"
                  className="w-24 h-24 object-cover rounded-3xl bg-white shadow-xl"
                  style={{ border: `3px solid ${THEME.card}` }}
                />
              </a>
            )}
          </div>
        )}

        <div className="px-5">
          <div className="text-left pt-1">
            {name && (
              <p className="text-sm font-semibold" style={{ color: THEME.accentDark }}>
                {name}
              </p>
            )}
            <h1
              className="text-2xl font-bold mt-1 leading-tight"
              style={{ color: THEME.text }}
            >
              {clientName}
            </h1>
            {designation && (
              <p className="text-sm font-medium mt-1" style={{ color: THEME.muted }}>
                {designation}
              </p>
            )}
          </div>

          <div className="flex justify-between items-center gap-3 mt-4">
            <div className="flex gap-2">
              {phone01 && (
                <a
                  href={`tel:${phone01}`}
                  className="w-11 h-11 rounded-full flex items-center justify-center shadow-sm"
                  style={{
                    backgroundColor: THEME.card,
                    color: THEME.accentDark,
                    border: `1px solid ${THEME.border}`,
                  }}
                  aria-label="Call"
                >
                  <FaPhone size={18} />
                </a>
              )}
              {whatsapp01 && (
                <a
                  href={`https://wa.me/${whatsapp01}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full flex items-center justify-center shadow-sm"
                  style={{
                    backgroundColor: THEME.card,
                    color: THEME.accentDark,
                    border: `1px solid ${THEME.border}`,
                  }}
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp size={20} />
                </a>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5" style={{ color: THEME.muted }}>
                <MdRemoveRedEye size={19} />
                <span className="text-sm">{visitCount}</span>
              </div>
              <button
                type="button"
                onClick={downloadContactCard}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm"
                style={{
                  backgroundColor: THEME.accent,
                  color: "white",
                  border: `1px solid ${THEME.accentDark}`,
                }}
              >
                Save Contact
              </button>
            </div>
          </div>

          {description && (
            <p
              className="text-sm text-left mt-4 whitespace-pre-line break-words leading-relaxed"
              style={{ color: THEME.text }}
            >
              {String(description).replace(/<br\s*\/?>/gi, "\n")}
            </p>
          )}

          {address && (
            <div
              className="mt-4 px-4 py-3 rounded-2xl text-left"
              style={{
                backgroundColor: "rgba(255,255,255,0.68)",
                border: `1px solid ${THEME.border}`,
                color: THEME.text,
              }}
            >
              <div className="flex gap-3 items-start">
                <FaMapLocation className="mt-0.5 shrink-0" color={THEME.accentDark} />
                <div>
                  <p className="font-semibold text-sm">Address</p>
                  <p className="text-sm mt-1" style={{ color: THEME.muted }}>
                    {address}
                  </p>
                </div>
              </div>
            </div>
          )}

          {quickLinks.length > 0 && (
            <div className="flex flex-wrap justify-start gap-2.5 mt-5">
              {quickLinks.map((item, index) => (
                <a
                  key={`${item.label}-${index}`}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-11 h-11 rounded-full flex items-center justify-center shadow-sm"
                  style={{
                    backgroundColor: THEME.card,
                    color: THEME.accentDark,
                    border: `1px solid ${THEME.border}`,
                  }}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          )}

          {profileLinks.length > 0 && (
            <div className="mt-6">
              <h2
                className="text-lg font-bold text-left mb-3"
                style={{ color: THEME.text }}
              >
                Links & Contact
              </h2>
              <div className="flex flex-col gap-3">
                {profileLinks.map((item, index) => (
                  <ProfileLinkCard key={`${item.title}-${index}`} {...item} />
                ))}
              </div>
            </div>
          )}

          {services && String(services).trim() && (
            <div className="mt-7">
              <h2
                className="text-lg font-bold text-left mb-3"
                style={{ color: THEME.text }}
              >
                Services
              </h2>
              <div
                className="rounded-2xl p-4 text-left shadow-sm"
                style={{
                  backgroundColor: THEME.card,
                  border: `1px solid ${THEME.border}`,
                }}
              >
                {String(services)
                  .split("\n")
                  .filter((line) => line.trim())
                  .map((line, index) => (
                    <div key={index} className="flex gap-2 items-start py-1">
                      <span style={{ color: THEME.accentDark }}>•</span>
                      <span className="text-sm" style={{ color: THEME.text }}>
                        {line}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {galleryImages.length > 0 && (
            <div className="mt-7">
              <h2
                className="text-lg font-bold text-left mb-3"
                style={{ color: THEME.text }}
              >
                Image Gallery
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {galleryImages.map((image, index) => (
                  <a
                    key={index}
                    href={image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl overflow-hidden shadow-sm"
                    style={{ border: `1px solid ${THEME.border}` }}
                  >
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="w-full aspect-square object-cover"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}

          {location && (
            <div className="mt-7">
              <h2
                className="text-lg font-bold text-left mb-3"
                style={{ color: THEME.text }}
              >
                Location
              </h2>
              <div
                className="overflow-hidden rounded-2xl bg-white shadow-sm"
                style={{ border: `1px solid ${THEME.border}` }}
              >
                <iframe
                  title="Location"
                  src={location}
                  width="100%"
                  height="300"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          )}

          <div className="mt-8">
            <h2
              className="text-lg font-bold text-left mb-3"
              style={{ color: THEME.text }}
            >
              Share Profile
            </h2>
            <div className="flex justify-start gap-3 flex-wrap">
              <FacebookShareButton url={currentPageUrl}>
                <span
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: THEME.card, border: `1px solid ${THEME.border}`, color: THEME.accentDark }}
                >
                  <FaFacebookF size={22} />
                </span>
              </FacebookShareButton>
              <TwitterShareButton url={currentPageUrl}>
                <span
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: THEME.card, border: `1px solid ${THEME.border}`, color: THEME.accentDark }}
                >
                  <FaXTwitter size={21} />
                </span>
              </TwitterShareButton>
              <LinkedinShareButton url={currentPageUrl}>
                <span
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: THEME.card, border: `1px solid ${THEME.border}`, color: THEME.accentDark }}
                >
                  <FaLinkedinIn size={22} />
                </span>
              </LinkedinShareButton>
              <TelegramShareButton url={currentPageUrl}>
                <span
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: THEME.card, border: `1px solid ${THEME.border}`, color: THEME.accentDark }}
                >
                  <FaTelegramPlane size={22} />
                </span>
              </TelegramShareButton>
              <WhatsappShareButton url={currentPageUrl}>
                <span
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: THEME.card, border: `1px solid ${THEME.border}`, color: THEME.accentDark }}
                >
                  <FaWhatsapp size={23} />
                </span>
              </WhatsappShareButton>
            </div>
          </div>

          <div className="mt-8">
            <h2
              className="text-lg font-bold text-left mb-3"
              style={{ color: THEME.text }}
            >
              Share Contact & QR
            </h2>
            <div className="flex justify-start gap-3">
              <button
                type="button"
                onClick={() => setShowQr(true)}
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: THEME.card,
                  border: `1px solid ${THEME.border}`,
                  color: THEME.accentDark,
                }}
              >
                <IoQrCodeSharp size={29} />
              </button>
              <button
                type="button"
                onClick={downloadContactCard}
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: THEME.card,
                  border: `1px solid ${THEME.border}`,
                  color: THEME.accentDark,
                }}
              >
                <FaDownload size={25} />
              </button>
            </div>
          </div>

          <p className="pt-7 text-xs" style={{ color: THEME.muted }}>
            Copyright © <span className="company">{companyName}</span>. All Rights Reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Profile38;

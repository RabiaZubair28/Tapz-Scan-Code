/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import vCardsJS from "vcards-js";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import { ImCross } from "react-icons/im";
import { IoQrCodeSharp } from "react-icons/io5";
import {
  FaDownload,
  FaEnvelope,
  FaFacebook,
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
  FaTrash,
  FaUtensils,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaMapLocation, FaPencil, FaTiktok, FaTwitter, FaXTwitter } from "react-icons/fa6";
import { MdRemoveRedEye } from "react-icons/md";

const API_BASE = "https://www.scan-taps.com/api";
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dxokfhkhu/image/upload";

const DEFAULT_LOGO_THEME = {
  primary: "#1f7a3f",
  contrast: "#ffffff",
};

const rgbToHex = ({ r, g, b }) =>
  `#${[r, g, b]
    .map((value) =>
      Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, "0"),
    )
    .join("")}`;

const getRelativeLuminance = ({ r, g, b }) => {
  const channels = [r, g, b].map((value) => {
    const normalized = value / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  });

  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
};

const getContrastRatio = (colorA, colorB) => {
  const lumA = getRelativeLuminance(colorA);
  const lumB = getRelativeLuminance(colorB);
  const light = Math.max(lumA, lumB);
  const dark = Math.min(lumA, lumB);
  return (light + 0.05) / (dark + 0.05);
};

const mixRgb = (colorA, colorB, amount) => ({
  r: colorA.r + (colorB.r - colorA.r) * amount,
  g: colorA.g + (colorB.g - colorA.g) * amount,
  b: colorA.b + (colorB.b - colorA.b) * amount,
});

const getSaturation = ({ r, g, b }) => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max === 0) return 0;
  return (max - min) / max;
};

const getGreenScore = ({ r, g, b }) => {
  const saturation = getSaturation({ r, g, b });
  const greenDominance = g - Math.max(r, b);
  if (greenDominance <= 0 || saturation < 0.08) return 0;
  return Math.min(1, greenDominance / 120) * (0.45 + saturation * 0.55);
};

const normalizeLogoGreenForTheme = (rgb) => {
  const white = { r: 255, g: 255, b: 255 };
  const black = { r: 0, g: 0, b: 0 };
  let accent = rgb;

  for (let i = 0; i < 8 && getContrastRatio(accent, white) < 2.4; i += 1) {
    accent = mixRgb(accent, black, 0.12);
  }

  return accent;
};

const getReadableTextColor = (rgb) => {
  const white = { r: 255, g: 255, b: 255 };
  const black = { r: 17, g: 17, b: 17 };
  return getContrastRatio(rgb, white) >= getContrastRatio(rgb, black)
    ? "#ffffff"
    : "#111111";
};

const buildThemeFromLogoColor = (rgb) => {
  const accent = normalizeLogoGreenForTheme(rgb);
  return {
    primary: rgbToHex(accent),
    contrast: getReadableTextColor(accent),
  };
};

const extractLogoColorFromDataUrl = (dataUrl) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const maxSize = 80;
      const width = img.naturalWidth || img.width || maxSize;
      const height = img.naturalHeight || img.height || maxSize;
      const scale = Math.min(1, maxSize / Math.max(width, height));
      canvas.width = Math.max(1, Math.round(width * scale));
      canvas.height = Math.max(1, Math.round(height * scale));

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return resolve(null);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const buckets = new Map();

      for (let i = 0; i < imageData.length; i += 4) {
        const alpha = imageData[i + 3];
        if (alpha < 128) continue;

        const raw = {
          r: imageData[i],
          g: imageData[i + 1],
          b: imageData[i + 2],
        };
        const avg = (raw.r + raw.g + raw.b) / 3;
        const saturation = getSaturation(raw);
        const greenScore = getGreenScore(raw);
        const isNeutralEdge = saturation < 0.08 && (avg > 245 || avg < 12);
        const bucketStep = 24;
        const rgb = {
          r: Math.round(raw.r / bucketStep) * bucketStep,
          g: Math.round(raw.g / bucketStep) * bucketStep,
          b: Math.round(raw.b / bucketStep) * bucketStep,
        };
        const key = `${rgb.r},${rgb.g},${rgb.b}`;
        const existing = buckets.get(key) || {
          rgb,
          count: 0,
          saturation,
          greenScore: 0,
          skippedNeutralEdge: isNeutralEdge,
        };
        existing.count += isNeutralEdge ? 0.2 : 1;
        existing.saturation = Math.max(existing.saturation, saturation);
        existing.greenScore = Math.max(existing.greenScore, greenScore);
        existing.skippedNeutralEdge = existing.skippedNeutralEdge && isNeutralEdge;
        buckets.set(key, existing);
      }

      let bestGreen = null;
      let bestFallback = null;

      buckets.forEach((bucket) => {
        const luminance = getRelativeLuminance(bucket.rgb);
        const neutralPenalty = bucket.skippedNeutralEdge ? 0.25 : 1;
        const saturationBonus = 0.65 + bucket.saturation * 1.7;
        const extremeLightPenalty = luminance > 0.92 ? 0.55 : 1;
        const extremeDarkPenalty = luminance < 0.03 ? 0.35 : 1;
        const baseScore =
          bucket.count *
          neutralPenalty *
          saturationBonus *
          extremeLightPenalty *
          extremeDarkPenalty;

        const greenScore = baseScore * (bucket.greenScore > 0 ? 3 + bucket.greenScore * 8 : 0);
        const fallbackScore = baseScore;

        if (greenScore > 0 && (!bestGreen || greenScore > bestGreen.score)) {
          bestGreen = { ...bucket, score: greenScore };
        }

        if (!bestFallback || fallbackScore > bestFallback.score) {
          bestFallback = { ...bucket, score: fallbackScore };
        }
      });

      resolve(bestGreen?.rgb || bestFallback?.rgb || null);
    };
    img.onerror = () => resolve(null);
    img.src = dataUrl;
  });

const isFilled = (value) =>
  value !== undefined && value !== null && String(value).trim() !== "";

const safeWhatsappNumber = (value) => String(value || "").replace(/[^0-9]/g, "");

const EditPortal33 = () => {
  const params = useParams();
  const navigate = useNavigate();
  const clientId = params.id;

  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [visitCount, setVisitCount] = useState(0);
  const [logoTheme, setLogoTheme] = useState(DEFAULT_LOGO_THEME);
  const [editor, setEditor] = useState(null);
  const [formValues, setFormValues] = useState({});

  const themeStyle = {
    "--profile-theme-color": logoTheme.primary,
    "--profile-theme-contrast-color": logoTheme.contrast,
    "--profile-bg-gradient": `linear-gradient(180deg, #ffffff 0%, ${logoTheme.primary} 100%)`,
    "--profile-card-gradient": `linear-gradient(135deg, rgba(255, 255, 255, 0.88) 0%, ${logoTheme.primary} 100%)`,
  };

  const fetchClient = async () => {
    if (!clientId) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_BASE}/data/clients/${clientId}`);
      setClient(response.data);
    } catch (error) {
      console.error("Error fetching client:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClient();
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
    romanName,
    images,
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
  } = client || {};

  useEffect(() => {
    if (!_id) return;

    const fetchAndIncrementVisitCount = async () => {
      try {
        const incrementResponse = await axios.post(`${API_BASE}/visit/${_id}`);
        setVisitCount(incrementResponse.data.count);
      } catch (error) {
        console.error("Error fetching or incrementing visit count:", error);
      }
    };

    fetchAndIncrementVisitCount();
  }, [_id]);

  useEffect(() => {
    let isMounted = true;

    const loadLogoTheme = async () => {
      if (!logo) {
        setLogoTheme(DEFAULT_LOGO_THEME);
        return;
      }

      try {
        const response = await axios.get(
          `${API_BASE}/vcard/image?url=${encodeURIComponent(logo)}`,
        );
        const mimeRaw = String(response.data?.mime || "image/png");
        const b64 = String(response.data?.base64 || "");
        if (!b64 || !mimeRaw.startsWith("image/")) {
          throw new Error("Logo image data unavailable");
        }

        const logoColor = await extractLogoColorFromDataUrl(`data:${mimeRaw};base64,${b64}`);

        if (isMounted) {
          setLogoTheme(logoColor ? buildThemeFromLogoColor(logoColor) : DEFAULT_LOGO_THEME);
        }
      } catch (error) {
        if (isMounted) setLogoTheme(DEFAULT_LOGO_THEME);
      }
    };

    loadLogoTheme();

    return () => {
      isMounted = false;
    };
  }, [logo]);

  const currentPageUrl = window.location.href;

  const updateClient = async (updates) => {
    if (!_id) return;
    setSaving(true);
    try {
      const response = await axios.put(`${API_BASE}/data/update/${_id}`, updates);
      if (response.status === 200) {
        setClient((prev) => ({ ...prev, ...updates }));
        setEditor(null);
        setFormValues({});
        alert("Updated successfully!");
      }
    } catch (error) {
      console.error("Error updating client:", error);
      alert("Error updating data!");
    } finally {
      setSaving(false);
    }
  };

  const openEditor = (config) => {
    const values = {};
    config.fields.forEach((field) => {
      values[field.key] = client?.[field.key] || "";
    });
    setFormValues(values);
    setEditor(config);
  };

  const saveEditor = async () => {
    if (!editor) return;
    const updates = {};
    editor.fields.forEach((field) => {
      updates[field.key] = formValues[field.key] || "";
    });
    await updateClient(updates);
  };

  const deleteFields = async (fields) => {
    const updates = {};
    fields.forEach((field) => {
      updates[field] = "";
    });
    await updateClient(updates);
  };

  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "first_time_using_cloudinary");
    data.append("cloud_name", "dxokfhkhu");

    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: data,
    });

    const uploadedImgURL = await response.json();
    return uploadedImgURL.url;
  };

  const updateImageField = async (field, file) => {
    if (!_id || !file) return;
    setSaving(true);

    try {
      const newImg = await uploadImageToCloudinary(file);
      if (!newImg) return;

      const endpointMap = {
        logo: `${API_BASE}/data/updateLogo/${_id}`,
        images: `${API_BASE}/data/updateCover/${_id}`,
        img01: `${API_BASE}/data/updateImg01/${_id}`,
        img02: `${API_BASE}/data/updateImg02/${_id}`,
        img03: `${API_BASE}/data/updateImg03/${_id}`,
        img04: `${API_BASE}/data/updateImg04/${_id}`,
        img05: `${API_BASE}/data/updateImg05/${_id}`,
        img06: `${API_BASE}/data/updateImg06/${_id}`,
        img07: `${API_BASE}/data/updateImg07/${_id}`,
        img08: `${API_BASE}/data/updateImg08/${_id}`,
        img09: `${API_BASE}/data/updateImg09/${_id}`,
        img10: `${API_BASE}/data/updateImg10/${_id}`,
      };

      const url = endpointMap[field] || `${API_BASE}/data/update/${_id}`;
      const response = await axios.put(url, { [field]: newImg });

      if (response.status === 200) {
        setClient((prev) => ({ ...prev, [field]: newImg }));
        alert("Image updated successfully!");
      }
    } catch (error) {
      console.error("Error updating image:", error);
      alert("Error updating image!");
    } finally {
      setSaving(false);
    }
  };

  const deleteImageField = async (field) => {
    await deleteFields([field]);
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
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const availableWidth = pageWidth - horizontalMargin * 2;
      const scaleFactor = Math.min(availableWidth / imgWidth, pageHeight / imgHeight);
      const imgScaledWidth = imgWidth * scaleFactor;
      const imgScaledHeight = imgHeight * scaleFactor;
      const x = (pageWidth - imgScaledWidth) / 2;
      const y = (pageHeight - imgScaledHeight) / 2;
      pdf.addImage(imgData, "PNG", x, y, imgScaledWidth, imgScaledHeight);
      pdf.save("QR.pdf");
    });
  };

  const downloadContactCard = async () => {
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

    const blob = new Blob([card.getFormattedString()], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      window.location.href = url;
    } else {
      const newLink = document.createElement("a");
      newLink.download = `${clientName || "contact"}.vcf`;
      newLink.href = url;
      newLink.click();
    }

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const editTextConfig = (title, fields) => ({
    title,
    fields: fields.map((field) => (typeof field === "string" ? { key: field, label: field } : field)),
  });

  const profileFields = [
    editTextConfig("Business Name", [{ key: "name", label: "Business Name" }]),
    editTextConfig("Client Name", [{ key: "clientName", label: "Client Name" }]),
    editTextConfig("Roman Name", [{ key: "romanName", label: "Roman Name" }]),
    editTextConfig("Designation", [{ key: "designation", label: "Designation" }]),
    editTextConfig("Description", [{ key: "description", label: "Description", multiline: true }]),
    editTextConfig("Services", [{ key: "services", label: "Services", multiline: true }]),
    editTextConfig("Address", [{ key: "address", label: "Address", multiline: true }]),
    editTextConfig("Map Embed", [{ key: "location", label: "Google Map Embed URL", multiline: true }]),
  ];

  const actionCards = [
    {
      value: menuLink,
      href: menuLink,
      title: "Menu قائمة المشروبات",
      subtitle: menuName || menuLink,
      icon: <FaUtensils size={35} />,
      fields: ["menuLink", "menuName"],
      labels: ["Menu Link", "Menu Name"],
    },
    ...[
      ["phone01", phone01],
      ["phone02", phone02],
      ["phone03", phone03],
    ].map(([field, value]) => ({
      value,
      href: value ? `tel:${value}` : "",
      title: "Phone هاتف",
      subtitle: value,
      icon: <FaPhone size={32} />,
      fields: [field],
      labels: ["Phone"],
    })),
    ...[
      ["telephone01", telephone01],
      ["telephone02", telephone02],
      ["telephone03", telephone03],
    ].map(([field, value]) => ({
      value,
      href: value ? `tel:${value}` : "",
      title: "Telephone هاتف ثابت",
      subtitle: value,
      icon: <FaPhoneSquareAlt size={35} />,
      fields: [field],
      labels: ["Telephone"],
    })),
    ...[
      ["whatsapp01", whatsapp01],
      ["whatsapp02", whatsapp02],
      ["whatsapp03", whatsapp03],
    ].map(([field, value]) => ({
      value,
      href: value ? `https://wa.me/${safeWhatsappNumber(value)}` : "",
      title: "WhatsApp واتساب",
      subtitle: value,
      icon: <FaWhatsapp size={35} />,
      fields: [field],
      labels: ["WhatsApp"],
    })),
    ...[
      ["instagramLink", instagramLink, "instagramName", instagramName],
      ["instagramLink02", instagramLink02, "instagramName02", instagramName02],
      ["instagramLink03", instagramLink03, "instagramName03", instagramName03],
    ].map(([linkField, linkValue, nameField, nameValue]) => ({
      value: linkValue,
      href: linkValue,
      title: "Instagram انستغرام",
      subtitle: nameValue || linkValue,
      icon: <FaInstagram size={35} />,
      fields: [linkField, nameField],
      labels: ["Instagram Link", "Instagram Name"],
    })),
    ...[
      ["snapchatLink", snapchatLink, "snapchatName", snapchatName],
      ["snapchatLink02", snapchatLink02, "snapchatName02", snapchatName02],
      ["snapchatLink03", snapchatLink03, "snapchatName03", snapchatName03],
    ].map(([linkField, linkValue, nameField, nameValue]) => ({
      value: linkValue,
      href: linkValue,
      title: "Snapchat سناب شات",
      subtitle: nameValue || linkValue,
      icon: <FaSnapchatGhost size={35} />,
      fields: [linkField, nameField],
      labels: ["Snapchat Link", "Snapchat Name"],
    })),
    ...[
      ["youtubeLink", youtubeLink, "youtubeName", youtubeName],
      ["youtubeLink02", youtubeLink02, "youtubeName02", youtubeName02],
      ["youtubeLink03", youtubeLink03, "youtubeName03", youtubeName03],
    ].map(([linkField, linkValue, nameField, nameValue]) => ({
      value: linkValue,
      href: linkValue,
      title: "YouTube يوتيوب",
      subtitle: nameValue || linkValue,
      icon: <FaYoutube size={35} />,
      fields: [linkField, nameField],
      labels: ["YouTube Link", "YouTube Name"],
    })),
    ...[
      ["youtubeShortsLink", youtubeShortsLink, "youtubeShortsName", youtubeShortsName],
      ["youtubeShortsLink02", youtubeShortsLink02, "youtubeShortsName02", youtubeShortsName02],
      ["youtubeShortsLink03", youtubeShortsLink03, "youtubeShortsName03", youtubeShortsName03],
    ].map(([linkField, linkValue, nameField, nameValue]) => ({
      value: linkValue,
      href: linkValue,
      title: "YouTube Shorts يوتيوب شورتس",
      subtitle: nameValue || linkValue,
      icon: <FaYoutube size={35} />,
      fields: [linkField, nameField],
      labels: ["YouTube Shorts Link", "YouTube Shorts Name"],
    })),
    ...[
      ["tiktokLink", tiktokLink, "tiktokName", tiktokName],
      ["tiktokLink02", tiktokLink02, "tiktokName02", tiktokName02],
      ["tiktokLink03", tiktokLink03, "tiktokName03", tiktokName03],
    ].map(([linkField, linkValue, nameField, nameValue]) => ({
      value: linkValue,
      href: linkValue,
      title: "TikTok تيك توك",
      subtitle: nameValue || linkValue,
      icon: <FaTiktok size={30} />,
      fields: [linkField, nameField],
      labels: ["TikTok Link", "TikTok Name"],
    })),
    ...[
      ["twitterLink", twitterLink, "twitterName", twitterName],
      ["twitterLink02", twitterLink02, "twitterName02", twitterName02],
      ["twitterLink03", twitterLink03, "twitterName03", twitterName03],
    ].map(([linkField, linkValue, nameField, nameValue]) => ({
      value: linkValue,
      href: linkValue,
      title: "X إكس",
      subtitle: nameValue || linkValue,
      icon: <FaXTwitter size={30} />,
      fields: [linkField, nameField],
      labels: ["X Link", "X Name"],
    })),
    ...[
      ["facebookLink", facebookLink, "facebookName", facebookName],
      ["facebookLink02", facebookLink02, "facebookName02", facebookName02],
      ["facebookLink03", facebookLink03, "facebookName03", facebookName03],
    ].map(([linkField, linkValue, nameField, nameValue]) => ({
      value: linkValue,
      href: linkValue,
      title: "Facebook فيسبوك",
      subtitle: nameValue || linkValue,
      icon: <FaFacebook size={30} />,
      fields: [linkField, nameField],
      labels: ["Facebook Link", "Facebook Name"],
    })),
    ...[
      ["googleReviewLink", googleReviewLink, "googleReviewName", googleReviewName],
      ["googleReviewLink02", googleReviewLink02, "googleReviewName02", googleReviewName02],
      ["googleReviewLink03", googleReviewLink03, "googleReviewName03", googleReviewName03],
    ].map(([linkField, linkValue, nameField, nameValue]) => ({
      value: linkValue,
      href: linkValue,
      title: "Google Review تقييمات جوجل",
      subtitle: nameValue || linkValue,
      icon: <FaStar size={30} />,
      fields: [linkField, nameField],
      labels: ["Google Review Link", "Google Review Name"],
    })),
    ...[
      ["website", website, "websiteName", websiteName],
      ["website02", website02, "websiteName02", websiteName02],
      ["website03", website03, "websiteName03", websiteName03],
    ].map(([linkField, linkValue, nameField, nameValue]) => ({
      value: linkValue,
      href: linkValue,
      title: "Website الموقع الإلكتروني",
      subtitle: nameValue || linkValue,
      icon: <FaGlobe size={32} />,
      fields: [linkField, nameField],
      labels: ["Website Link", "Website Name"],
    })),
    ...[
      ["email", email],
      ["email02", email02],
      ["email03", email03],
    ].map(([field, value]) => ({
      value,
      href: value ? `mailto:${value}` : "",
      title: "Email البريد الإلكتروني",
      subtitle: value,
      icon: <FaEnvelope size={30} />,
      fields: [field],
      labels: ["Email"],
    })),
    ...[
      ["googleMapLink", googleMapLink, "googleMapName", googleMapName],
      ["googleMapLink02", googleMapLink02, "googleMapName02", googleMapName02],
      ["googleMapLink03", googleMapLink03, "googleMapName03", googleMapName03],
    ].map(([linkField, linkValue, nameField, nameValue]) => ({
      value: linkValue,
      href: linkValue,
      title: "Location الموقع",
      subtitle: nameValue || linkValue,
      icon: <FaMapLocation size={30} />,
      fields: [linkField, nameField],
      labels: ["Location Link", "Location Name"],
    })),
    {
      value: catalogueLink,
      href: catalogueLink,
      title: "Catalogue الكتالوج",
      subtitle: catalogueName || catalogueLink,
      icon: <FaShoppingBag size={35} />,
      fields: ["catalogueLink", "catalogueName"],
      labels: ["Catalogue Link", "Catalogue Name"],
    },
    {
      value: profileLink01,
      href: profileLink01,
      title: "Company Profile ملف الشركة",
      subtitle: profileName01 || profileLink01,
      icon: <FaGift size={35} />,
      fields: ["profileLink01", "profileName01"],
      labels: ["Profile Link", "Profile Name"],
    },
    {
      value: profileLink02,
      href: profileLink02,
      title: "Company Profile ملف الشركة",
      subtitle: profileName02 || profileLink02,
      icon: <FaGift size={35} />,
      fields: ["profileLink02", "profileName02"],
      labels: ["Profile Link", "Profile Name"],
    },
  ];

  const imageFields = [
    ["img01", img01],
    ["img02", img02],
    ["img03", img03],
    ["img04", img04],
    ["img05", img05],
    ["img06", img06],
    ["img07", img07],
    ["img08", img08],
    ["img09", img09],
    ["img10", img10],
  ];

  const renderEditButton = (onClick, label = "Edit") => (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[var(--profile-theme-color)] border border-[var(--profile-theme-color)]"
    >
      <FaPencil size={12} /> {label}
    </button>
  );

  const renderDeleteButton = (onClick) => (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white"
    >
      <FaTrash size={12} /> Delete
    </button>
  );

  const renderProfileField = (config) => {
    const field = config.fields[0];
    const value = client?.[field.key];

    return (
      <div key={field.key} className="rounded-xl border-2 border-[var(--profile-theme-color)] bg-white p-4 text-left">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-bold text-[var(--profile-theme-color)]">{config.title}</p>
            <p className="mt-1 break-words whitespace-pre-line text-sm text-[var(--profile-theme-color)] opacity-85">
              {isFilled(value) ? String(value).replace(/<br\s*\/?>/gi, "\n") : "Not added"}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2">
            {renderEditButton(() => openEditor(config), isFilled(value) ? "Edit" : "Add")}
            {isFilled(value) && renderDeleteButton(() => deleteFields([field.key]))}
          </div>
        </div>
      </div>
    );
  };

  const renderActionCard = (item, index) => {
    const fields = item.fields || [];
    const labels = item.labels || fields;
    const config = editTextConfig(
      item.title,
      fields.map((key, idx) => ({ key, label: labels[idx] || key })),
    );

    if (!isFilled(item.value)) {
      return (
        <div
          key={`${item.title}-${index}`}
          className="w-full flex items-center justify-between gap-3 px-4 py-4 border-2 border-dashed border-[var(--profile-theme-color)] bg-white text-[var(--profile-theme-color)]"
        >
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-12 h-12 flex items-center justify-center text-[var(--profile-theme-color)]">
              {React.isValidElement(item.icon)
                ? React.cloneElement(item.icon, { color: "var(--profile-theme-color)" })
                : item.icon}
            </div>
            <div className="min-w-0 text-left">
              <p className="text-[var(--profile-theme-color)] font-semibold truncate">{item.title}</p>
              <p className="text-sm opacity-70">Not added</p>
            </div>
          </div>
          {renderEditButton(() => openEditor(config), "Add")}
        </div>
      );
    }

    return (
      <div
        key={`${item.title}-${index}`}
        className="w-full border-2 border-[var(--profile-theme-color)] bg-white text-[var(--profile-theme-color)]"
      >
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-3 px-4 py-4 text-[var(--profile-theme-color)]"
        >
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-12 h-12 flex items-center justify-center text-[var(--profile-theme-color)]">
              {React.isValidElement(item.icon)
                ? React.cloneElement(item.icon, { color: "var(--profile-theme-color)" })
                : item.icon}
            </div>
            <div className="min-w-0 text-left">
              <p className="text-[var(--profile-theme-color)] font-semibold truncate">{item.title}</p>
              {isFilled(item.subtitle) && (
                <p
                  className="text-sm truncate"
                  dir="rtl"
                  style={{ color: "var(--profile-theme-color)", opacity: 0.82 }}
                >
                  {item.subtitle}
                </p>
              )}
            </div>
          </div>
          <span className="text-[var(--profile-theme-color)] text-2xl leading-none">⋮</span>
        </a>
        <div className="flex items-center justify-end gap-2 border-t border-[var(--profile-theme-color)]/20 px-4 py-2">
          {renderEditButton(() => openEditor(config))}
          {renderDeleteButton(() => deleteFields(fields))}
        </div>
      </div>
    );
  };

  if (loading || !client) {
    return (
      <div
        className="min-h-screen w-full max-w-md mx-auto shadow-lg pb-5 text-center flex justify-center align-center pt-[25%]"
        style={{
          background: `linear-gradient(180deg, #ffffff 0%, ${DEFAULT_LOGO_THEME.primary} 100%)`,
          backgroundAttachment: "fixed",
        }}
      >
        <ScaleLoader color="white" size={50} aria-label="Loading Spinner" data-testid="loader" />
      </div>
    );
  }

  return (
    <section style={themeStyle}>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{clientName}</title>
        <link rel="icon" type="image/x-icon" href={`${logo}`} />
        <meta name="description" content={designation || name} />
        <meta property="article:section" content={designation || name} />
        <meta property="og:title" content={client?.clientName} />
        <meta property="og:description" content={designation || name} />
        <meta property="og:url" content={`https://www.scan-taps.com/${companyName}`} />
        <meta property="og:image" content={`${logo}`} />
        <meta name="twitter:title" content={client?.clientName} />
        <meta name="twitter:description" content={designation || name} />
      </Helmet>

      {showQr && (
        <div
          className="qr-modal min-h-screen w-full max-w-md mx-auto shadow-lg flex flex-col items-center justify-center relative"
          style={{ background: "var(--profile-bg-gradient)", backgroundAttachment: "fixed" }}
        >
          <div className="bg-white border-[var(--profile-theme-color)] rounded-lg pb-8 pt-16 px-10 relative">
            <ImCross
              className="absolute top-4 right-4 cursor-pointer text-[var(--profile-theme-color)]"
              onClick={() => setShowQr(false)}
            />
            <div className="flex flex-col items-center justify-center space-y-8">
              <div className="qr flex items-center justify-center" id="qr">
                <QRCodeCanvas value={window.location.href} />
              </div>
              <div className="flex justify-center space-x-2">
                <div
                  className="w-12 h-12 text-[var(--profile-theme-color)] bg-white p-3 rounded-full flex items-center justify-center border-[2px] border-[var(--profile-theme-color)]"
                  onClick={() => {
                    downloadQr("qr");
                    setShowQr(false);
                  }}
                >
                  <FaDownload size={20} color="var(--profile-theme-color)" />
                </div>

                <FacebookShareButton url={currentPageUrl} quote="please share this">
                  <div className="w-12 h-12 rounded-full border-[2px] border-[var(--profile-theme-color)] bg-white flex items-center justify-center">
                    <FaFacebookF size={26} color="var(--profile-theme-color)" />
                  </div>
                </FacebookShareButton>
                <LinkedinShareButton url={currentPageUrl} quote="please share this">
                  <div className="w-12 h-12 rounded-full border-[2px] border-[var(--profile-theme-color)] bg-white flex items-center justify-center">
                    <FaLinkedinIn size={26} color="var(--profile-theme-color)" />
                  </div>
                </LinkedinShareButton>
                <TelegramShareButton url={currentPageUrl} quote="please share this">
                  <div className="w-12 h-12 rounded-full border-[2px] border-[var(--profile-theme-color)] bg-white flex items-center justify-center">
                    <FaTelegramPlane size={22} color="var(--profile-theme-color)" />
                  </div>
                </TelegramShareButton>
                <WhatsappShareButton url={currentPageUrl} quote="please share this">
                  <div className="w-12 h-12 rounded-full border-[2px] border-[var(--profile-theme-color)] bg-white flex items-center justify-center">
                    <FaWhatsapp size={26} color="var(--profile-theme-color)" />
                  </div>
                </WhatsappShareButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {!showQr && (
        <div
          className="min-h-screen pt-2 w-full max-w-md mx-auto shadow-lg pb-10 text-center"
          style={{ background: "var(--profile-bg-gradient)", backgroundAttachment: "fixed" }}
        >
          

          <div className="flex items-center justify-center mx-auto rounded-x ps-6 pe-4 space-y-2 mt-4">
            <div className="relative mb-2">
              {logo ? (
                <img
                  src={logo}
                  alt="profile"
                  className="w-48 h-48 mt-5 mx-auto rounded-full border-[3px] border-[var(--profile-theme-color)] shadow-md object-cover"
                />
              ) : (
                <div className="w-48 h-48 mt-5 mx-auto rounded-full border-[3px] border-[var(--profile-theme-color)] bg-white flex items-center justify-center text-[var(--profile-theme-color)] font-bold">
                  Logo
                </div>
              )}
            </div>
          </div>

          <div className="px-5 pb-4">
            <div className="flex justify-center gap-2 pb-4">
              <label className="cursor-pointer rounded-full border-2 border-[var(--profile-theme-color)] bg-white px-4 py-2 text-xs font-bold text-[var(--profile-theme-color)]">
                Edit Logo
                <input
                  type="file"
                  className="hidden"
                  onChange={(event) => updateImageField("logo", event.target.files?.[0])}
                />
              </label>
              {logo && renderDeleteButton(() => deleteImageField("logo"))}
            </div>

      

            <div className="pt-2 pb-5">
              <h1 className="text-white text-3xl font-semibold pb-3" dir="rtl">
                {clientName || "Client Name"}
              </h1>
              <p className="text-md text-center text-white pt-1 pb-1 w-full break-words whitespace-pre-line">
                {String(description || "")
                  .replace(/<br\s*\/?>/gi, "\n")
                  .split(/\r?\n/)
                  .map((line, index, arr) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < arr.length - 1 ? <br /> : null}
                    </React.Fragment>
                  ))}
              </p>
              <div className="mt-3 flex items-center justify-center gap-2 text-white">
                <MdRemoveRedEye size={20} color="white" />
                <span>{visitCount}</span>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-3">
              {profileFields.map((config) => renderProfileField(config))}
            </div>

            <div className="flex items-center justify-center gap-4 pb-8">
              {instagramLink && (
                <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="border-[2px] border-[var(--profile-theme-color)] rounded-full p-3 bg-white">
                  <FaInstagram size={26} color="var(--profile-theme-color)" />
                </a>
              )}
              {whatsapp01 && (
                <a href={`https://wa.me/${safeWhatsappNumber(whatsapp01)}`} target="_blank" rel="noopener noreferrer" className="border-[2px] border-[var(--profile-theme-color)] rounded-full p-3 bg-white">
                  <FaWhatsapp size={26} color="var(--profile-theme-color)" />
                </a>
              )}
              {tiktokLink && (
                <a href={tiktokLink} target="_blank" rel="noopener noreferrer" className="border-[2px] border-[var(--profile-theme-color)] rounded-full p-3 bg-white">
                  <FaTiktok size={26} color="var(--profile-theme-color)" />
                </a>
              )}
              {snapchatLink && (
                <a href={snapchatLink} target="_blank" rel="noopener noreferrer" className="border-[2px] border-[var(--profile-theme-color)] rounded-full p-3 bg-white">
                  <FaSnapchatGhost size={26} color="var(--profile-theme-color)" />
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" className="border-[2px] border-[var(--profile-theme-color)] rounded-full p-3 bg-white">
                  <FaEnvelope size={26} color="var(--profile-theme-color)" />
                </a>
              )}
            </div>

            <div className="flex flex-col gap-4">
              {actionCards.map((item, index) => renderActionCard(item, index))}
            </div>

            <div className="px-0">
              <h2 className="text-xl font-semibold text-white mb-3 mt-5">Image Gallery</h2>
              <hr className="border-[var(--profile-theme-color)]" />

              {imageFields.map(([field, value], index) => (
                <div key={field} className="mt-4 rounded-xs border-[2px] border-[var(--profile-theme-color)] bg-white p-2 shadow-md">
                  {value ? (
                    <a href={value} target="_blank" rel="noopener noreferrer">
                      <img src={value} alt={`Image ${index + 1}`} className="w-full h-auto rounded-xs shadow-md hover:shadow-lg" />
                    </a>
                  ) : (
                    <div className="flex h-28 items-center justify-center rounded-xs bg-gray-100 text-sm font-semibold text-[var(--profile-theme-color)]">
                      Image {index + 1} not added
                    </div>
                  )}
                  <div className="mt-2 flex items-center justify-end gap-2">
                    <label className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[var(--profile-theme-color)] border border-[var(--profile-theme-color)]">
                      <FaPencil size={12} /> {value ? "Edit" : "Add"}
                      <input
                        type="file"
                        className="hidden"
                        onChange={(event) => updateImageField(field, event.target.files?.[0])}
                      />
                    </label>
                    {value && renderDeleteButton(() => deleteImageField(field))}
                  </div>
                </div>
              ))}
            </div>

            {location && (
              <div className="px-0">
                <h2 className="text-xl font-semibold text-white mb-3 mt-5">Location</h2>
                <hr className="border-gray-300" />
                <div className="flex flex-col items-center bg-white mx-auto rounded-xl border-[1px] border-white shadow-md space-y-4 mt-3">
                  <iframe
                    src={location}
                    width="100%"
                    height="300"
                    allowFullScreen=""
                    loading="lazy"
                    className="rounded-xl"
                    title="Location"
                  ></iframe>
                </div>
              </div>
            )}

            <div className="px-4">
              <h2 className="text-xl font-semibold text-white mb-3 mt-5">Share Profile</h2>
              <hr className="border-[var(--profile-theme-color)]" />
              <div className="flex justify-center space-x-3 mt-3">
                <FacebookShareButton url={currentPageUrl} quote="please share this">
                  <FaFacebookF size={40} color="var(--profile-theme-color)" className="w-12 h-12 p-2 rounded-full border-[2px] border-[var(--profile-theme-color)] bg-white" />
                </FacebookShareButton>
                <TwitterShareButton url={currentPageUrl} quote="please share this">
                  <FaTwitter size={40} color="var(--profile-theme-color)" className="w-12 h-12 p-2 rounded-full border-[2px] border-[var(--profile-theme-color)] bg-white" />
                </TwitterShareButton>
                <LinkedinShareButton url={currentPageUrl} quote="please share this">
                  <FaLinkedinIn size={40} color="var(--profile-theme-color)" className="w-12 h-12 p-2 rounded-full border-[2px] border-[var(--profile-theme-color)] bg-white" />
                </LinkedinShareButton>
                <TelegramShareButton url={currentPageUrl} quote="please share this">
                  <FaTelegramPlane size={40} color="var(--profile-theme-color)" className="w-12 h-12 p-2 rounded-full border-[2px] border-[var(--profile-theme-color)] bg-white" />
                </TelegramShareButton>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `Hey there! 🌟 \nIts ${clientName} !\n\nHere’s my digital card:\nhttps://www.scan-taps.com/${companyName}\n\nPowered by ScanTaps!`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp size={40} color="var(--profile-theme-color)" className="w-12 h-12 p-2 rounded-full border-[2px] border-[var(--profile-theme-color)] bg-white" />
                </a>
              </div>
            </div>

            <div className="px-4">
              <h2 className="text-xl font-semibold text-white mb-3 mt-5 px-4">Share Contact & QR</h2>
              <hr className="border-[var(--profile-theme-color)]" />
              <div className="flex justify-center space-x-3 mt-3 px-4">
                <div
                  className="flex justify-center items-center w-16 h-16 rounded-full border-[2px] border-[var(--profile-theme-color)] bg-white hover:border-[var(--profile-theme-color)]"
                  onClick={() => setShowQr(true)}
                >
                  <IoQrCodeSharp size={35} color="var(--profile-theme-color)" />
                </div>

                <div
                  className="flex justify-center items-center w-16 h-16 rounded-full border-[2px] border-[var(--profile-theme-color)] bg-white hover:border-[var(--profile-theme-color)]"
                  onClick={downloadContactCard}
                >
                  <FaDownload size={30} color="var(--profile-theme-color)" />
                </div>
              </div>

              <p className="pt-4 text-white">
                Copyright © <span className="company">{companyName}</span>. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      )}

      {editor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[var(--profile-theme-color)]">{editor.title}</h3>
              <ImCross className="cursor-pointer text-[var(--profile-theme-color)]" onClick={() => setEditor(null)} />
            </div>

            <div className="space-y-3">
              {editor.fields.map((field) => (
                <label key={field.key} className="block text-left">
                  <span className="mb-1 block text-sm font-semibold text-[var(--profile-theme-color)]">
                    {field.label}
                  </span>
                  {field.multiline ? (
                    <textarea
                      className="min-h-[110px] w-full rounded-xl border border-[var(--profile-theme-color)] px-3 py-2 text-sm outline-none"
                      value={formValues[field.key] || ""}
                      onChange={(event) =>
                        setFormValues((prev) => ({ ...prev, [field.key]: event.target.value }))
                      }
                    />
                  ) : (
                    <input
                      className="w-full rounded-xl border border-[var(--profile-theme-color)] px-3 py-2 text-sm outline-none"
                      value={formValues[field.key] || ""}
                      onChange={(event) =>
                        setFormValues((prev) => ({ ...prev, [field.key]: event.target.value }))
                      }
                    />
                  )}
                </label>
              ))}
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                className="rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700"
                onClick={() => setEditor(null)}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-full bg-[var(--profile-theme-color)] px-5 py-2 text-sm font-semibold text-white"
                onClick={saveEditor}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EditPortal33;

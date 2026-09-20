/* EDIT_PORTAL_38_PROFILE38_UI + EDIT_PORTAL04_FUNCTIONALITY */
import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import axios from "axios";
import phoneLogo from "../assets/phone.png";
import addressLogo from "../assets/adress.png";
import whatsappLogo from "../assets/whatsapp.png";
import emailLogo from "../assets/gmail.png";
import telephoneLogo from "../assets/telephone01.png";
import locationLogo from "../assets/location.png";
import menuLogo from "../assets/menu.png";
import catalogLogo from "../assets/catalog.jpg";
import profileLogo from "../assets/profile.png";
import facebookLogo from "../assets/fb.png";
import instagramLogo from "../assets/insta.png";
import snapchatLogo from "../assets/snap.png";
import youtubeLogo from "../assets/yt.png";
import tiktokLogo from "../assets/tiktok.png";
import twitterLogo from "../assets/threads.png";
import googleReviewLogo from "../assets/greview.png";
import websiteLogo from "../assets/web.png";
import linkedinLogo from "../assets/download.png";
import {
  FaDownload,
  FaEdit,
  FaEnvelope,
  FaFacebookF,
  FaGlobe,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPlus,
  FaRegStar,
  FaSnapchatGhost,
  FaStar,
  FaTelegramPlane,
  FaUserPlus,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaTiktok, FaXTwitter } from "react-icons/fa6";
import { IoQrCodeSharp } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { MdDelete, MdMenuBook, MdOutlineRemoveRedEye } from "react-icons/md";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { LuFileText } from "react-icons/lu";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";

const API_BASE = "https://www.scan-taps.com";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dxokfhkhu/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "first_time_using_cloudinary";
const PROFILE38_COVER =
  "https://res.cloudinary.com/dxokfhkhu/image/upload/v1788372597/18682472-742a-4d3d-98a5-ba1637c62a93_pvi3qm.jpg";

const THEME = {
  petalPink: "#f7c8d2",
  deepRose: "#5a3140",
  deepRoseSoft: "#704753",
  antiqueGold: "#b58a12",
  cream: "#fff9f6",
  page: "#f4f1ef",
};

const PROFILE_GRADIENT =
  "radial-gradient(circle at 16% 0%, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0) 34%), radial-gradient(circle at 92% 12%, rgba(216,184,88,0.20) 0%, rgba(216,184,88,0) 28%), linear-gradient(165deg, #fff3f6 0%, #f9d4dc 32%, #f7c8d2 56%, #fbe2e6 76%, #fff0e6 100%)";

const ROW_LOGOS = {
  Phone: phoneLogo,
  Telephone: telephoneLogo,
  WhatsApp: whatsappLogo,
  Email: emailLogo,
  Address: addressLogo,
  Instagram: instagramLogo,
  Snapchat: snapchatLogo,
  YouTube: youtubeLogo,
  TikTok: tiktokLogo,
  "X / Twitter": twitterLogo,
  Facebook: facebookLogo,
  "Google Review": googleReviewLogo,
  Website: websiteLogo,
  LinkedIn: linkedinLogo,
  "Google Map": locationLogo,
  Menu: menuLogo,
  Catalogue: catalogLogo,
  "Price List": profileLogo,
  Profile: profileLogo,
};

const getRowLogo = (label = "") =>
  ROW_LOGOS[String(label).replace(/\s+\d+$/, "")] || null;

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

const suffix = (index) => (index === 0 ? "" : `0${index + 1}`);

const numberedFields = (base) => [
  `${base}01`,
  `${base}02`,
  `${base}03`,
];

const linkSlots = (linkBase, nameBase, count = 3) =>
  Array.from({ length: count }, (_, index) => ({
    valueField: `${linkBase}${suffix(index)}`,
    nameField: nameBase ? `${nameBase}${suffix(index)}` : null,
  }));

const FIELD_GROUPS = [
  {
    id: "phone",
    group: "Contact",
    label: "Phone",
    valueLabel: "Phone Number",
    icon: <FaPhoneAlt size={18} />,
    slots: numberedFields("phone").map((valueField) => ({ valueField })),
    href: (value) => `tel:${value}`,
  },
  {
    id: "telephone",
    group: "Contact",
    label: "Telephone",
    valueLabel: "Telephone Number",
    icon: <FaPhoneAlt size={18} />,
    slots: numberedFields("telephone").map((valueField) => ({ valueField })),
    href: (value) => `tel:${value}`,
  },
  {
    id: "whatsapp",
    group: "Contact",
    label: "WhatsApp",
    valueLabel: "WhatsApp Number",
    icon: <FaWhatsapp size={20} />,
    slots: numberedFields("whatsapp").map((valueField) => ({ valueField })),
    href: (value) => {
      const number = normalizeWhatsApp(value);
      return number ? `https://wa.me/${number}` : "";
    },
  },
  {
    id: "email",
    group: "Contact",
    label: "Email",
    valueLabel: "Email Address",
    icon: <FaEnvelope size={18} />,
    slots: ["email", "email02", "email03"].map((valueField) => ({ valueField })),
    href: (value) => `mailto:${value}`,
  },
  {
    id: "address",
    group: "Contact",
    label: "Address",
    valueLabel: "Address",
    icon: <FaMapMarkerAlt size={20} />,
    slots: [{ valueField: "address" }],
    href: () => "",
  },
  {
    id: "instagram",
    group: "Social & Online",
    label: "Instagram",
    valueLabel: "Instagram Link",
    nameLabel: "Instagram Account Name",
    icon: <FaInstagram size={21} />,
    slots: linkSlots("instagramLink", "instagramName"),
  },
  {
    id: "snapchat",
    group: "Social & Online",
    label: "Snapchat",
    valueLabel: "Snapchat Link",
    nameLabel: "Snapchat Account Name",
    icon: <FaSnapchatGhost size={21} />,
    slots: linkSlots("snapchatLink", "snapchatName"),
  },
  {
    id: "youtube",
    group: "Social & Online",
    label: "YouTube",
    valueLabel: "YouTube Link",
    nameLabel: "YouTube Account Name",
    icon: <FaYoutube size={21} />,
    slots: linkSlots("youtubeLink", "youtubeName"),
  },
  {
    id: "linkedin",
    group: "Social & Online",
    label: "LinkedIn",
    valueLabel: "LinkedIn Link",
    nameLabel: "LinkedIn Account Name",
    icon: <FaLinkedinIn size={20} />,
    // Existing backend schema stores LinkedIn in youtubeShorts* fields.
    slots: linkSlots("youtubeShortsLink", "youtubeShortsName"),
  },
  {
    id: "tiktok",
    group: "Social & Online",
    label: "TikTok",
    valueLabel: "TikTok Link",
    nameLabel: "TikTok Account Name",
    icon: <FaTiktok size={20} />,
    slots: linkSlots("tiktokLink", "tiktokName"),
  },
  {
    id: "twitter",
    group: "Social & Online",
    label: "X / Twitter",
    valueLabel: "X / Twitter Link",
    nameLabel: "X / Twitter Account Name",
    icon: <FaXTwitter size={19} />,
    slots: linkSlots("twitterLink", "twitterName"),
  },
  {
    id: "facebook",
    group: "Social & Online",
    label: "Facebook",
    valueLabel: "Facebook Link",
    nameLabel: "Facebook Account Name",
    icon: <FaFacebookF size={19} />,
    slots: linkSlots("facebookLink", "facebookName"),
  },
  {
    id: "googleReview",
    group: "Social & Online",
    label: "Google Review",
    valueLabel: "Google Review Link",
    nameLabel: "Google Review Name",
    icon: <FaStar size={19} />,
    slots: linkSlots("googleReviewLink", "googleReviewName"),
  },
  {
    id: "website",
    group: "Social & Online",
    label: "Website",
    valueLabel: "Website Link",
    nameLabel: "Website Name",
    icon: <FaGlobe size={20} />,
    slots: [
      { valueField: "website", nameField: "websiteName" },
      { valueField: "website02", nameField: "websiteName02" },
      { valueField: "website03", nameField: "websiteName03" },
    ],
  },
  {
    id: "googleMap",
    group: "Locations",
    label: "Google Map",
    valueLabel: "Google Map Link",
    nameLabel: "Google Map Name",
    icon: <FaMapMarkerAlt size={20} />,
    slots: linkSlots("googleMapLink", "googleMapName"),
  },
  {
    id: "menu",
    group: "Documents & Links",
    label: "Menu",
    valueLabel: "Menu Link",
    nameLabel: "Menu Name",
    icon: <MdMenuBook size={21} />,
    slots: [{ valueField: "menuLink", nameField: "menuName" }],
  },
  {
    id: "catalogue",
    group: "Documents & Links",
    label: "Catalogue",
    valueLabel: "Catalogue Link",
    nameLabel: "Catalogue Name",
    icon: <LuFileText size={20} />,
    slots: [{ valueField: "catalogueLink", nameField: "catalogueName" }],
  },
  {
    id: "priceList",
    group: "Documents & Links",
    label: "Price List",
    valueLabel: "Price List Link",
    nameLabel: "Price List Name",
    icon: <LuFileText size={20} />,
    slots: [{ valueField: "profileLink01", nameField: "profileName01" }],
  },
  {
    id: "profile",
    group: "Documents & Links",
    label: "Profile",
    valueLabel: "Profile Link",
    nameLabel: "Profile Name",
    icon: <HiOutlineBuildingOffice2 size={21} />,
    slots: [{ valueField: "profileLink02", nameField: "profileName02" }],
  },
];

const DividerTitle = ({ children, action }) => (
  <div className="mb-3 mt-6 flex items-center gap-3">
    <span className="h-px flex-1 bg-[#b58a12] opacity-60" />
    <FaRegStar className="text-[#b58a12]" size={11} />
    <span className="font-serif text-[12px] font-bold uppercase tracking-[0.18em] text-[#5a3140]">
      {children}
    </span>
    <FaRegStar className="text-[#b58a12]" size={11} />
    <span className="h-px flex-1 bg-[#b58a12] opacity-60" />
    {action || null}
  </div>
);

const IconButton = ({ label, children, ...props }) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-2 border-[#b58a12]/80 bg-white/70 text-[#704753] shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
    {...props}
  >
    {children}
  </button>
);

const SmallActionButton = ({ children, ...props }) => (
  <button
    type="button"
    className="rounded-xl border-2 border-[#b58a12]/80 bg-white/72 px-3 py-2 text-xs font-bold text-[#5a3140] shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
    {...props}
  >
    {children}
  </button>
);

const ModalShell = ({ title, onClose, children }) => (
  <div
    className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto px-4 py-8"
    style={{ background: "rgba(58, 42, 47, 0.45)" }}
    role="dialog"
    aria-modal="true"
    aria-label={title}
  >
    <div className="relative w-full max-w-sm rounded-3xl border-2 border-[#b58a12]/80 bg-[#fff9f6] px-5 pb-6 pt-14 shadow-2xl">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 text-[#704753]"
        aria-label="Close"
      >
        <ImCross size={18} />
      </button>
      <h2 className="mb-5 text-center font-serif text-lg font-bold text-[#5a3140]">
        {title}
      </h2>
      {children}
    </div>
  </div>
);

const FormInput = ({ label, multiline = false, ...props }) => {
  const className =
    "w-full rounded-xl border-2 border-[#b58a12]/70 bg-white/85 px-3 py-2.5 text-sm font-medium text-[#4a343a] outline-none transition placeholder:text-[#9d7f88] focus:border-[#5a3140]";

  return (
    <label className="block text-left">
      <span className="mb-1.5 block text-xs font-bold text-[#5a3140]">{label}</span>
      {multiline ? (
        <textarea className={`${className} min-h-28 resize-y`} {...props} />
      ) : (
        <input className={className} {...props} />
      )}
    </label>
  );
};

const EditPortal38 = () => {
  const { id: clientId } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visitCount, setVisitCount] = useState(0);
  const [showQr, setShowQr] = useState(false);
  const [message, setMessage] = useState(null);
  const [busyKey, setBusyKey] = useState("");
  const [fieldEditor, setFieldEditor] = useState(null);
  const [linkEditor, setLinkEditor] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addCategoryId, setAddCategoryId] = useState("");
  const [addValue, setAddValue] = useState("");
  const [addName, setAddName] = useState("");
  const [deletePrompt, setDeletePrompt] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    window.setTimeout(() => setMessage(null), 3500);
  };

  useEffect(() => {
    let active = true;

    const fetchClient = async () => {
      if (!clientId) {
        if (active) setLoading(false);
        return;
      }

      try {
        let response;
        try {
          // Preserve EditPortal04's edit-client route first.
          response = await axios.get(`${API_BASE}/api/data/clients/${clientId}`);
        } catch (primaryError) {
          // Profile38 uses the singular public route; use it as a safe fallback.
          response = await axios.get(`${API_BASE}/api/data/client/${clientId}`);
        }
        if (active) setClient(response.data);
      } catch (error) {
        console.error("Unable to load EditPortal38 client:", error);
        if (active) setClient(null);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchClient();
    return () => {
      active = false;
    };
  }, [clientId]);

  useEffect(() => {
    if (!client?._id) return;

    axios
      .post(`${API_BASE}/api/visit/${client._id}`)
      .then((response) => setVisitCount(response.data?.count || 0))
      .catch((error) =>
        console.error("Unable to increment EditPortal38 visit count:", error),
      );
  }, [client?._id]);

  const currentPageUrl =
    typeof window !== "undefined" ? window.location.href : "";

  const updateClient = async (
    payload,
    { mode = "update", success = "Saved successfully.", key = "save" } = {},
  ) => {
    if (!client?._id || !payload || !Object.keys(payload).length) return false;

    setBusyKey(key);
    try {
      await axios.put(`${API_BASE}/api/data/${mode}/${client._id}`, payload);
      setClient((previous) => ({ ...previous, ...payload }));
      showMessage("success", success);
      return true;
    } catch (error) {
      console.error("EditPortal38 update failed:", error);
      const serverMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Unable to save changes. Please try again.";
      showMessage("error", String(serverMessage));
      return false;
    } finally {
      setBusyKey("");
    }
  };

  const uploadToCloudinary = async (file) => {
    if (!file) throw new Error("No image selected.");
    if (!file.type?.startsWith("image/")) {
      throw new Error("Please select a valid image file.");
    }
    if (file.size > 10 * 1024 * 1024) {
      throw new Error("Image must be 10 MB or smaller.");
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", "dxokfhkhu");

    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      throw new Error("Image upload failed.");
    }

    const result = await response.json();
    const url = result.secure_url || result.url;
    if (!url) throw new Error("Image upload did not return a URL.");
    return url;
  };

  const saveImage = async (field, file) => {
    if (!client?._id || !field || !file) return;

    const key = `image-${field}`;
    setBusyKey(key);
    try {
      const url = await uploadToCloudinary(file);
      let endpoint = "update";
      if (field === "images") endpoint = "updateCover";
      else if (field === "logo") endpoint = "updateLogo";
      else if (/^img\d{2}$/.test(field)) {
        endpoint = `updateImg${field.slice(3)}`;
      }

      if (endpoint === "update") {
        await axios.put(`${API_BASE}/api/data/update/${client._id}`, {
          [field]: url,
        });
      } else {
        await axios.put(`${API_BASE}/api/data/${endpoint}/${client._id}`, {
          [field]: url,
        });
      }

      setClient((previous) => ({ ...previous, [field]: url }));
      showMessage("success", "Image updated successfully.");
      setImageUpload(null);
    } catch (error) {
      console.error("EditPortal38 image update failed:", error);
      showMessage("error", error?.message || "Unable to update image.");
    } finally {
      setBusyKey("");
    }
  };

  const requestDelete = (label, payload, success = `${label} deleted.`) => {
    setDeletePrompt({ label, payload, success });
  };

  const confirmDelete = async () => {
    if (!deletePrompt) return;
    const payload = Object.fromEntries(
      Object.keys(deletePrompt.payload).map((field) => [field, ""]),
    );
    const ok = await updateClient(payload, {
      mode: "update",
      success: deletePrompt.success,
      key: `delete-${deletePrompt.label}`,
    });
    if (ok) setDeletePrompt(null);
  };

  const downloadContactCard = () => {
    if (!client) return;

    const phones = [client.phone01, client.phone02, client.phone03]
      .filter(Boolean)
      .map((number) => `TEL;TYPE=CELL:${number}`)
      .join("\n");
    const telephones = [
      client.telephone01,
      client.telephone02,
      client.telephone03,
    ]
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

    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const downloadQr = async () => {
    const input = document.getElementById("editportal38-qr");
    if (!input) return;

    try {
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
    } catch (error) {
      console.error("Unable to download QR:", error);
      showMessage("error", "Unable to generate QR PDF.");
    }
  };

  const renderedGroups = useMemo(() => {
    if (!client) return [];
    const groups = [];

    FIELD_GROUPS.forEach((config) => {
      config.slots.forEach((slot, index) => {
        const value = client[slot.valueField];
        if (!value) return;

        const name = slot.nameField ? client[slot.nameField] : "";
        let group = groups.find((entry) => entry.title === config.group);
        if (!group) {
          group = { title: config.group, items: [] };
          groups.push(group);
        }

        group.items.push({
          ...config,
          slot,
          index,
          value,
          name,
          displayValue: cleanText(name) || cleanText(value),
          href: config.href ? config.href(value) : externalHref(value),
        });
      });
    });

    return groups;
  }, [client]);

  const availableAddCategories = useMemo(() => {
    if (!client) return [];
    return FIELD_GROUPS.filter((config) =>
      config.slots.some((slot) => !client[slot.valueField]),
    );
  }, [client]);

  const editorGroups = useMemo(() => {
    const titles = ["Contact", "Social & Online", "Locations", "Documents & Links"];
    return titles
      .map((title) => ({
        title,
        items: renderedGroups.find((group) => group.title === title)?.items || [],
        canAdd: availableAddCategories.some((config) => config.group === title),
      }))
      .filter((group) => group.items.length || group.canAdd);
  }, [renderedGroups, availableAddCategories]);

  const selectedAddCategory = FIELD_GROUPS.find(
    (config) => config.id === addCategoryId,
  );

  const submitAdd = async () => {
    if (!selectedAddCategory || !client) return;
    const emptySlot = selectedAddCategory.slots.find(
      (slot) => !client[slot.valueField],
    );
    if (!emptySlot) {
      showMessage("error", `All ${selectedAddCategory.label} slots are already in use.`);
      return;
    }

    const value = addValue.trim();
    const name = addName.trim();
    if (!value) {
      showMessage("error", `${selectedAddCategory.valueLabel} is required.`);
      return;
    }

    const payload = { [emptySlot.valueField]: value };
    if (emptySlot.nameField) payload[emptySlot.nameField] = name;

    const ok = await updateClient(payload, {
      mode: "add",
      success: `${selectedAddCategory.label} added successfully.`,
      key: `add-${selectedAddCategory.id}`,
    });

    if (ok) {
      setAddValue("");
      setAddName("");
      setAddCategoryId("");
      setAddModalOpen(false);
    }
  };

  const openFieldEditor = (field, label, multiline = false) => {
    setFieldEditor({
      field,
      label,
      multiline,
      value: cleanText(client?.[field] || ""),
    });
  };

  const submitFieldEditor = async () => {
    if (!fieldEditor) return;
    const value = fieldEditor.value.trim();
    const wasEmpty = !client?.[fieldEditor.field];
    const ok = await updateClient(
      { [fieldEditor.field]: value },
      {
        mode: wasEmpty ? "add" : "update",
        success: `${fieldEditor.label} ${wasEmpty ? "added" : "updated"} successfully.`,
        key: `field-${fieldEditor.field}`,
      },
    );
    if (ok) setFieldEditor(null);
  };

  const openLinkEditor = (item) => {
    setLinkEditor({
      label: item.label,
      valueField: item.slot.valueField,
      nameField: item.slot.nameField || null,
      valueLabel: item.valueLabel || item.label,
      nameLabel: item.nameLabel || `${item.label} Name`,
      value: item.value || "",
      name: item.name || "",
    });
  };

  const submitLinkEditor = async () => {
    if (!linkEditor) return;
    const value = linkEditor.value.trim();
    if (!value) {
      showMessage("error", `${linkEditor.valueLabel} is required.`);
      return;
    }
    const payload = { [linkEditor.valueField]: value };
    if (linkEditor.nameField) payload[linkEditor.nameField] = linkEditor.name.trim();

    const ok = await updateClient(payload, {
      mode: "update",
      success: `${linkEditor.label} updated successfully.`,
      key: `link-${linkEditor.valueField}`,
    });
    if (ok) setLinkEditor(null);
  };

  const imageSlots = useMemo(
    () =>
      Array.from({ length: 10 }, (_, index) => {
        const field = `img${String(index + 1).padStart(2, "0")}`;
        return { field, value: client?.[field] || "", index };
      }),
    [client],
  );

  const galleryImages = imageSlots.filter((slot) => slot.value);
  const firstEmptyImage = imageSlots.find((slot) => !slot.value);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f1ef]">
        <ScaleLoader color={THEME.deepRose} aria-label="Loading Edit Portal 38" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f1ef] px-5 text-center">
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
    romanName,
    logo,
    images,
    services,
    location,
  } = client;

  const firstWhatsapp = normalizeWhatsApp(client.whatsapp01);
  const firstInstagram = externalHref(
    client.instagramLink || client.instagramLink02 || client.instagramLink03,
  );
  const firstSnapchat = externalHref(
    client.snapchatLink || client.snapchatLink02 || client.snapchatLink03,
  );
  const firstFacebook = externalHref(
    client.facebookLink || client.facebookLink02 || client.facebookLink03,
  );
  const firstTiktok = externalHref(
    client.tiktokLink || client.tiktokLink02 || client.tiktokLink03,
  );
  const canonicalUrl = `${API_BASE}/${companyName || clientId}`;

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
        <meta property="og:image" content={images || logo || PROFILE38_COVER} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={clientName || name} />
        <meta name="twitter:description" content={designation || name || "Profile"} />
        <meta name="twitter:image" content={images || logo || PROFILE38_COVER} />
      </Helmet>

      {message ? (
        <div className="fixed left-1/2 top-4 z-[100] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2">
          <div
            className={`rounded-2xl border-2 px-4 py-3 text-center text-sm font-bold shadow-2xl ${
              message.type === "success"
                ? "border-[#b58a12]/80 bg-[#fff9f6] text-[#5a3140]"
                : "border-red-300 bg-red-50 text-red-700"
            }`}
          >
            {message.text}
          </div>
        </div>
      ) : null}

      {showQr ? (
        <ModalShell title="Profile QR" onClose={() => setShowQr(false)}>
          <div className="flex flex-col items-center gap-6">
            <div
              id="editportal38-qr"
              className="rounded-2xl border-2 border-[#b58a12]/80 bg-white p-5 shadow"
            >
              <QRCodeCanvas value={currentPageUrl} size={190} />
            </div>
            <SmallActionButton onClick={downloadQr}>
              <span className="flex items-center gap-2">
                <FaDownload /> Download QR
              </span>
            </SmallActionButton>
          </div>
        </ModalShell>
      ) : null}

      {fieldEditor ? (
        <ModalShell
          title={`${client[fieldEditor.field] ? "Edit" : "Add"} ${fieldEditor.label}`}
          onClose={() => setFieldEditor(null)}
        >
          <FormInput
            label={fieldEditor.label}
            multiline={fieldEditor.multiline}
            value={fieldEditor.value}
            onChange={(event) =>
              setFieldEditor((previous) => ({
                ...previous,
                value: event.target.value,
              }))
            }
          />
          <div className="mt-5 flex justify-end gap-2">
            <SmallActionButton onClick={() => setFieldEditor(null)}>
              Cancel
            </SmallActionButton>
            <SmallActionButton
              onClick={submitFieldEditor}
              disabled={busyKey === `field-${fieldEditor.field}`}
            >
              {busyKey === `field-${fieldEditor.field}` ? "Saving..." : "Save"}
            </SmallActionButton>
          </div>
        </ModalShell>
      ) : null}

      {linkEditor ? (
        <ModalShell title={`Edit ${linkEditor.label}`} onClose={() => setLinkEditor(null)}>
          {linkEditor.nameField ? (
            <FormInput
              label={linkEditor.nameLabel}
              value={linkEditor.name}
              onChange={(event) =>
                setLinkEditor((previous) => ({
                  ...previous,
                  name: event.target.value,
                }))
              }
            />
          ) : null}
          <div className={linkEditor.nameField ? "mt-4" : ""}>
            <FormInput
              label={linkEditor.valueLabel}
              value={linkEditor.value}
              onChange={(event) =>
                setLinkEditor((previous) => ({
                  ...previous,
                  value: event.target.value,
                }))
              }
            />
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <SmallActionButton onClick={() => setLinkEditor(null)}>
              Cancel
            </SmallActionButton>
            <SmallActionButton
              onClick={submitLinkEditor}
              disabled={busyKey === `link-${linkEditor.valueField}`}
            >
              {busyKey === `link-${linkEditor.valueField}` ? "Saving..." : "Save"}
            </SmallActionButton>
          </div>
        </ModalShell>
      ) : null}

      {addModalOpen ? (
        <ModalShell
          title="Add Profile Item"
          onClose={() => {
            setAddModalOpen(false);
            setAddCategoryId("");
            setAddValue("");
            setAddName("");
          }}
        >
          <label className="block text-left">
            <span className="mb-1.5 block text-xs font-bold text-[#5a3140]">
              Item type
            </span>
            <select
              value={addCategoryId}
              onChange={(event) => {
                setAddCategoryId(event.target.value);
                setAddValue("");
                setAddName("");
              }}
              className="w-full rounded-xl border-2 border-[#b58a12]/70 bg-white/85 px-3 py-2.5 text-sm font-medium text-[#4a343a] outline-none focus:border-[#5a3140]"
            >
              <option value="">Select an item</option>
              {availableAddCategories.map((config) => (
                <option value={config.id} key={config.id}>
                  {config.label}
                </option>
              ))}
            </select>
          </label>

          {selectedAddCategory ? (
            <div className="mt-4 space-y-4">
              {selectedAddCategory.slots[0]?.nameField ? (
                <FormInput
                  label={selectedAddCategory.nameLabel}
                  value={addName}
                  onChange={(event) => setAddName(event.target.value)}
                />
              ) : null}
              <FormInput
                label={selectedAddCategory.valueLabel}
                value={addValue}
                onChange={(event) => setAddValue(event.target.value)}
              />
              <div className="flex justify-end">
                <SmallActionButton
                  onClick={submitAdd}
                  disabled={busyKey === `add-${selectedAddCategory.id}`}
                >
                  {busyKey === `add-${selectedAddCategory.id}` ? "Adding..." : "Add"}
                </SmallActionButton>
              </div>
            </div>
          ) : null}
        </ModalShell>
      ) : null}

      {deletePrompt ? (
        <ModalShell title={`Delete ${deletePrompt.label}?`} onClose={() => setDeletePrompt(null)}>
          <p className="text-center text-sm font-medium leading-6 text-[#704753]">
            This will remove the selected value from the profile.
          </p>
          <div className="mt-5 flex justify-center gap-2">
            <SmallActionButton onClick={() => setDeletePrompt(null)}>
              Cancel
            </SmallActionButton>
            <SmallActionButton
              onClick={confirmDelete}
              disabled={busyKey === `delete-${deletePrompt.label}`}
            >
              {busyKey === `delete-${deletePrompt.label}` ? "Deleting..." : "Delete"}
            </SmallActionButton>
          </div>
        </ModalShell>
      ) : null}

      {imageUpload ? (
        <ModalShell
          title={`${imageUpload.current ? "Replace" : "Add"} ${imageUpload.label}`}
          onClose={() => setImageUpload(null)}
        >
          {imageUpload.current ? (
            <img
              src={imageUpload.current}
              alt={imageUpload.label}
              className="mb-4 max-h-52 w-full rounded-2xl border-2 border-[#b58a12]/70 object-contain"
            />
          ) : null}
          <FormInput
            label="Select image"
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) saveImage(imageUpload.field, file);
            }}
            disabled={busyKey === `image-${imageUpload.field}`}
          />
          {busyKey === `image-${imageUpload.field}` ? (
            <p className="mt-3 text-center text-sm font-bold text-[#5a3140]">
              Uploading and saving...
            </p>
          ) : null}
        </ModalShell>
      ) : null}

      <div
        className="mx-auto min-h-screen w-full max-w-[430px] overflow-hidden shadow-[0_14px_38px_rgba(90,49,64,0.14)] sm:rounded-[26px] sm:border sm:border-white/80"
        style={{
          backgroundColor: THEME.petalPink,
          backgroundImage: PROFILE_GRADIENT,
          backgroundAttachment: "fixed",
        }}
      >
        <article className="relative min-h-screen overflow-hidden bg-transparent pb-8">
          <div className="relative z-10">
            <div className="relative bg-transparent">
              <a
                href={images || PROFILE38_COVER}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
                aria-label="Open cover image"
              >
                <img
                  src={images || PROFILE38_COVER}
                  alt="Profile cover"
                  className="block h-auto max-h-[240px] w-full object-contain"
                />
              </a>
              <div className="absolute bottom-3 right-3 flex gap-2">
                <IconButton
                  label="Edit cover"
                  onClick={() =>
                    setImageUpload({
                      field: "images",
                      label: "Cover Image",
                      current: images || "",
                    })
                  }
                >
                  <FaEdit size={15} />
                </IconButton>
                {images ? (
                  <IconButton
                    label="Delete cover"
                    onClick={() => requestDelete("Cover Image", { images })}
                  >
                    <MdDelete size={18} />
                  </IconButton>
                ) : null}
              </div>
            </div>

            <div className="relative z-20 mb-3 mt-3 px-5">
              <div className="flex items-center justify-between gap-4">
                <div className="relative shrink-0">
                  {logo ? (
                    <a
                      href={logo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                      aria-label="Open profile logo"
                    >
                      <img
                        src={logo}
                        alt="logo"
                        className="h-24 w-24 rounded-2xl border-2 border-[#b58a12]/80 bg-white/90 object-cover shadow-[0_8px_24px_rgba(90,49,64,0.12)]"
                      />
                    </a>
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-dashed border-[#b58a12]/80 bg-white/50 text-center text-xs font-bold text-[#704753]">
                      Add Logo
                    </div>
                  )}
                  <div className="absolute -bottom-2 -right-2 flex gap-1">
                    <IconButton
                      label={logo ? "Edit logo" : "Add logo"}
                      onClick={() =>
                        setImageUpload({
                          field: "logo",
                          label: "Logo",
                          current: logo || "",
                        })
                      }
                    >
                      {logo ? <FaEdit size={14} /> : <FaPlus size={14} />}
                    </IconButton>
                    {logo ? (
                      <IconButton
                        label="Delete logo"
                        onClick={() => requestDelete("Logo", { logo })}
                      >
                        <MdDelete size={17} />
                      </IconButton>
                    ) : null}
                  </div>
                </div>

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
                <div className="space-y-1.5">
                  {name ? (
                    <div className="flex min-w-0 items-start gap-2">
                      <p className="min-w-0 flex-1 break-words font-serif text-[15px] font-bold text-[#5a3140]">
                        {name}
                      </p>
                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          type="button"
                          onClick={() => openFieldEditor("name", "Company / Brand Name")}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-[#704753] transition hover:bg-white/55 hover:text-[#5a3140]"
                          aria-label="Edit company name"
                          title="Edit company name"
                        >
                          <FaEdit size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => requestDelete("Company / Brand Name", { name })}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-[#704753] transition hover:bg-white/55 hover:text-[#5a3140]"
                          aria-label="Delete company name"
                          title="Delete company name"
                        >
                          <MdDelete size={15} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openFieldEditor("name", "Company / Brand Name")}
                      className="inline-flex items-center gap-2 rounded-xl border-2 border-[#b58a12]/80 bg-white/55 px-3 py-2 text-sm font-semibold text-[#5a3140] shadow-sm transition hover:bg-white/80"
                    >
                      <FaPlus size={12} /> Add Company Name
                    </button>
                  )}

                  {clientName ? (
                    <div className="flex min-w-0 items-start gap-2">
                      <h1 className="min-w-0 flex-1 break-words font-serif text-[20px] font-bold leading-tight text-[#704753]">
                        {clientName}
                      </h1>
                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          type="button"
                          onClick={() => openFieldEditor("clientName", "Client Name")}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-[#704753] transition hover:bg-white/55 hover:text-[#5a3140]"
                          aria-label="Edit client name"
                          title="Edit client name"
                        >
                          <FaEdit size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => requestDelete("Client Name", { clientName })}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-[#704753] transition hover:bg-white/55 hover:text-[#5a3140]"
                          aria-label="Delete client name"
                          title="Delete client name"
                        >
                          <MdDelete size={15} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openFieldEditor("clientName", "Client Name")}
                      className="inline-flex items-center gap-2 rounded-xl border-2 border-[#b58a12]/80 bg-white/55 px-3 py-2 text-sm font-semibold text-[#5a3140] shadow-sm transition hover:bg-white/80"
                    >
                      <FaPlus size={12} /> Add Client Name
                    </button>
                  )}

                  {designation ? (
                    <div className="flex min-w-0 items-start gap-2">
                      <p className="min-w-0 flex-1 break-words text-[15px] font-semibold text-[#704753]">
                        {designation}
                      </p>
                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          type="button"
                          onClick={() => openFieldEditor("designation", "Designation")}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-[#704753] transition hover:bg-white/55 hover:text-[#5a3140]"
                          aria-label="Edit designation"
                          title="Edit designation"
                        >
                          <FaEdit size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => requestDelete("Designation", { designation })}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-[#704753] transition hover:bg-white/55 hover:text-[#5a3140]"
                          aria-label="Delete designation"
                          title="Delete designation"
                        >
                          <MdDelete size={15} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openFieldEditor("designation", "Designation")}
                      className="inline-flex items-center gap-2 rounded-xl border-2 border-[#b58a12]/80 bg-white/55 px-3 py-2 text-sm font-semibold text-[#5a3140] shadow-sm transition hover:bg-white/80"
                    >
                      <FaPlus size={12} /> Add Designation
                    </button>
                  )}

                  {romanName ? (
                    <div className="flex min-w-0 items-start gap-2">
                      <p className="min-w-0 flex-1 break-words text-[12px] font-medium italic text-[#704753]">
                        {romanName}
                      </p>
                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          type="button"
                          onClick={() => openFieldEditor("romanName", "Roman Name")}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-[#704753] transition hover:bg-white/55 hover:text-[#5a3140]"
                          aria-label="Edit Roman name"
                          title="Edit Roman name"
                        >
                          <FaEdit size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => requestDelete("Roman Name", { romanName })}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-[#704753] transition hover:bg-white/55 hover:text-[#5a3140]"
                          aria-label="Delete Roman name"
                          title="Delete Roman name"
                        >
                          <MdDelete size={15} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openFieldEditor("romanName", "Roman Name")}
                      className="inline-flex items-center gap-2 rounded-xl border-2 border-[#b58a12]/80 bg-white/55 px-3 py-2 text-sm font-semibold text-[#5a3140] shadow-sm transition hover:bg-white/80"
                    >
                      <FaPlus size={12} /> Add Roman Name
                    </button>
                  )}
                </div>
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

              <div className="mt-4 rounded-2xl border-2 border-[#b58a12]/80 bg-white/44 px-4 py-4 shadow-[0_5px_16px_rgba(90,49,64,0.07)] backdrop-blur-sm">
                <div className="flex items-start justify-between gap-3">
                  <p className="whitespace-pre-line text-left text-sm font-medium leading-6 text-[#4a343a]">
                    {description ? cleanText(description) : "No description added yet."}
                  </p>
                  <div className="flex gap-1">
                    <IconButton
                      label={description ? "Edit description" : "Add description"}
                      onClick={() => openFieldEditor("description", "Description", true)}
                    >
                      {description ? <FaEdit size={14} /> : <FaPlus size={14} />}
                    </IconButton>
                    {description ? (
                      <IconButton
                        label="Delete description"
                        onClick={() => requestDelete("Description", { description })}
                      >
                        <MdDelete size={17} />
                      </IconButton>
                    ) : null}
                  </div>
                </div>
              </div>

              {editorGroups.map((group) => (
                <React.Fragment key={group.title}>
                  <DividerTitle
                    action={
                      group.canAdd ? (
                        <IconButton
                          label={`Add ${group.title} item`}
                          onClick={() => setAddModalOpen(true)}
                        >
                          <FaPlus size={14} />
                        </IconButton>
                      ) : null
                    }
                  >
                    {group.title}
                  </DividerTitle>

                  <div className="overflow-hidden rounded-2xl border-2 border-[#b58a12]/80 bg-white/42 shadow-[0_6px_18px_rgba(90,49,64,0.07)] backdrop-blur-sm">
                    {group.items.length ? (
                      group.items.map((item) => (
                        <div
                          key={`${item.id}-${item.slot.valueField}`}
                          className="flex items-stretch border-b border-[#efb8c4] last:border-b-0"
                        >
                          <a
                            href={item.href || undefined}
                            target={
                              item.href && !item.href.startsWith("tel:") && !item.href.startsWith("mailto:")
                                ? "_blank"
                                : undefined
                            }
                            rel={item.href ? "noopener noreferrer" : undefined}
                            className={`flex min-w-0 flex-1 items-center gap-3 px-4 py-3.5 transition ${
                              item.href ? "hover:bg-[#fff0f3]" : ""
                            }`}
                            onClick={(event) => {
                              if (!item.href) event.preventDefault();
                            }}
                          >
                            {getRowLogo(item.label) ? (
                              <img
                                src={getRowLogo(item.label)}
                                alt={`${item.label} logo`}
                                className="h-10 w-10 shrink-0 rounded-xl object-cover shadow-[0_4px_12px_rgba(90,49,64,0.10)]"
                              />
                            ) : (
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-[#b58a12]/80 bg-white/62 text-[#704753] shadow-[0_4px_12px_rgba(90,49,64,0.10)]">
                                {item.icon}
                              </div>
                            )}
                            <div className="min-w-0 text-left">
                              <div className="font-serif text-[13px] font-bold text-[#4a2933]">
                                {item.label}
                                {item.index ? ` ${item.index + 1}` : ""}
                              </div>
                              <div className="mt-0.5 break-all text-[12px] font-medium text-[#704753]">
                                {item.displayValue}
                              </div>
                            </div>
                          </a>
                          <div className="flex shrink-0 items-center gap-1 pr-3">
                            <IconButton
                              label={`Edit ${item.label}`}
                              onClick={() => {
                                if (item.id === "address") {
                                  openFieldEditor("address", "Address", true);
                                } else {
                                  openLinkEditor(item);
                                }
                              }}
                            >
                              <FaEdit size={14} />
                            </IconButton>
                            <IconButton
                              label={`Delete ${item.label}`}
                              onClick={() => {
                                const payload = { [item.slot.valueField]: item.value };
                                if (item.slot.nameField) {
                                  payload[item.slot.nameField] = item.name || "";
                                }
                                requestDelete(item.label, payload);
                              }}
                            >
                              <MdDelete size={17} />
                            </IconButton>
                          </div>
                        </div>
                      ))
                    ) : (
                      <button
                        type="button"
                        onClick={() => setAddModalOpen(true)}
                        className="flex w-full items-center justify-center gap-2 px-4 py-4 text-sm font-semibold text-[#5a3140] transition hover:bg-[#fff0f3]"
                      >
                        <FaPlus size={13} /> Add {group.title} item
                      </button>
                    )}
                  </div>
                </React.Fragment>
              ))}

              {!editorGroups.length ? (
                <div className="mt-5 rounded-2xl border-2 border-dashed border-[#b58a12]/70 bg-white/30 px-4 py-5 text-center text-sm font-semibold text-[#704753]">
                  All available profile item slots are already configured.
                </div>
              ) : null}

              <div className="mt-4 flex justify-center">
                <SmallActionButton
                  onClick={() => setAddModalOpen(true)}
                  disabled={!availableAddCategories.length}
                >
                  <span className="flex items-center gap-2">
                    <FaPlus /> Add More
                  </span>
                </SmallActionButton>
              </div>

              <DividerTitle>Services</DividerTitle>
              <div className="rounded-2xl border-2 border-[#b58a12]/80 bg-white/42 px-4 py-4 text-left shadow-[0_6px_18px_rgba(90,49,64,0.07)] backdrop-blur-sm">
                <div className="mb-2 flex justify-end gap-1">
                  <IconButton
                    label={services ? "Edit services" : "Add services"}
                    onClick={() => openFieldEditor("services", "Services", true)}
                  >
                    {services ? <FaEdit size={14} /> : <FaPlus size={14} />}
                  </IconButton>
                  {services ? (
                    <IconButton
                      label="Delete services"
                      onClick={() => requestDelete("Services", { services })}
                    >
                      <MdDelete size={17} />
                    </IconButton>
                  ) : null}
                </div>
                {services ? (
                  cleanText(services)
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
                    ))
                ) : (
                  <p className="text-center text-sm font-medium text-[#704753]">
                    No services added yet.
                  </p>
                )}
              </div>

              <DividerTitle>Image Gallery</DividerTitle>
              <div className="grid grid-cols-2 gap-2 rounded-2xl border-2 border-[#b58a12]/80 bg-white/42 p-2 shadow-[0_6px_18px_rgba(90,49,64,0.07)] backdrop-blur-sm">
                {galleryImages.map((slot) => (
                  <div className="relative" key={slot.field}>
                    <a href={slot.value} target="_blank" rel="noopener noreferrer">
                      <img
                        src={slot.value}
                        alt={`Gallery ${slot.index + 1}`}
                        loading="lazy"
                        className="aspect-square w-full rounded-xl object-cover"
                      />
                    </a>
                    <div className="absolute bottom-2 right-2 flex gap-1">
                      <IconButton
                        label={`Replace gallery image ${slot.index + 1}`}
                        onClick={() =>
                          setImageUpload({
                            field: slot.field,
                            label: `Gallery Image ${slot.index + 1}`,
                            current: slot.value,
                          })
                        }
                      >
                        <FaEdit size={13} />
                      </IconButton>
                      <IconButton
                        label={`Delete gallery image ${slot.index + 1}`}
                        onClick={() =>
                          requestDelete(`Gallery Image ${slot.index + 1}`, {
                            [slot.field]: slot.value,
                          })
                        }
                      >
                        <MdDelete size={16} />
                      </IconButton>
                    </div>
                  </div>
                ))}

                {firstEmptyImage ? (
                  <button
                    type="button"
                    onClick={() =>
                      setImageUpload({
                        field: firstEmptyImage.field,
                        label: `Gallery Image ${firstEmptyImage.index + 1}`,
                        current: "",
                      })
                    }
                    className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#b58a12]/80 bg-white/35 text-[#704753] transition hover:bg-white/55"
                  >
                    <FaPlus size={24} />
                    <span className="text-xs font-bold">Add Image</span>
                  </button>
                ) : null}

                {!galleryImages.length && !firstEmptyImage ? (
                  <p className="col-span-2 py-6 text-center text-sm font-medium text-[#704753]">
                    No gallery slots available.
                  </p>
                ) : null}
              </div>

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

export default EditPortal38;

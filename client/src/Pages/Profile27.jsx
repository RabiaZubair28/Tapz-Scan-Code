/* eslint-disable no-unused-vars */
import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import phone from "../assets/phone.png";
import addressImg from "../assets/adress.png";
import { useNavigate } from "react-router-dom";
import yt from "../assets/yt.png";
import greview from "../assets/greview.png";
import emailImg from "../assets/gmail.png";
import ytshorts from "../assets/yt-shorts.png";
import locations from "../assets/location.png";
import twitter02 from "../assets/twitter02.png";
import menu from "../assets/menu.png";
import telephone from "../assets/telephone01.jpg";
import eye from "../assets/eye.jpg";
import { IoIosAddCircle } from "react-icons/io";
// import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import { Helmet } from "react-helmet";
import { IoQrCodeSharp } from "react-icons/io5";
import {
  FaDownload,
  FaFacebookF,
  FaGift,
  FaGlobe,
  FaInstagram,
  FaLinkedinIn,
  FaShoppingBag,
  FaSnapchatGhost,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { FaTiktok, FaXTwitter } from "react-icons/fa6";
import { SlArrowRight } from "react-icons/sl";
import vCardsJS from "vcards-js";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  LinkedinIcon,
} from "react-share";
import { ImCross } from "react-icons/im";
import axios from "axios";
// import ScaleLoader from "react-spinners/ScaleLoader";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { RiMessage2Line } from "react-icons/ri";
import { ImWhatsapp } from "react-icons/im";
import linkedin02 from "../assets/download.png";
import { MdRemoveRedEye } from "react-icons/md";

const Profile27 = () => {
  // SAME LOGIC AS Profile04 (only UI below changed)
  const [show, setShow] = useState(false);
  const [show02, setShow02] = useState(false);
  const [show03, setShow03] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose02 = () => setShow02(false);
  const handleShow02 = () => setShow02(true);
  const handleClose03 = () => setShow03(false);
  const handleShow03 = () => setShow03(true);
  const navigate = useNavigate();
  const params = useParams();
  const clientId = params.id;
  console.log(clientId);
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState("");
  console.log(params);

  const toDataURL = async (url) => {
    const response = await axios.get(url, { responseType: "blob" });
    const imageDataUrl = URL.createObjectURL(response.data);

    return imageDataUrl;
  };

  console.log(params);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(
          `https://www.scan-taps.com/api/data/client/${clientId}`
        );
        setClient(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    if (clientId) {
      fetchClient();
    } else {
      setLoading(false);
    }
  }, [clientId]);

  console.log(client);

  var {
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
    qr,
    address,
    whatsapp01,
    location,
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
    color01,
    color02,
    color03,
    password,
    flag,
  } = client;

  var [visitCount, setVisitCount] = useState(0);
  var clientId01 = _id;
  // Used it for a Client make it dynamic by fetching the current client id

  useEffect(() => {
    const fetchAndIncrementVisitCount = async () => {
      try {
        // console.log("Fetching visit count...");
        const incrementResponse = await axios.post(
          `https://www.scan-taps.com/api/visit/${clientId01}`
        );
        // console.log("Current visit count fetched.");
        setVisitCount(incrementResponse.data.count);
        // console.log(`Visit count for client ${clientId} incremented. New count:`, incrementResponse.data.count);
      } catch (error) {
        console.error("Error fetching or incrementing visit count:", error);
      }
    };

    fetchAndIncrementVisitCount();
  }, [clientId01]);

  const downloadContactCard = async () => {
    const blobToJpegBase64 = async (
      blob,
      { maxSize = 512, maxBytes = 256 * 1024 } = {}
    ) => {
      const blobUrl = URL.createObjectURL(blob);
      try {
        const base64 = await new Promise((resolve) => {
          const img = new Image();
          img.onload = async () => {
            const w = img.naturalWidth || img.width;
            const h = img.naturalHeight || img.height;
            if (!w || !h) return resolve(null);

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return resolve(null);

            const makeJpegBlob = (targetW, targetH, quality) =>
              new Promise((r) => {
                canvas.width = targetW;
                canvas.height = targetH;
                ctx.clearRect(0, 0, targetW, targetH);
                ctx.drawImage(img, 0, 0, targetW, targetH);
                canvas.toBlob(
                  (b) => r(b || null),
                  "image/jpeg",
                  Math.max(0.1, Math.min(1, quality))
                );
              });

            const blobToBase64 = (b) =>
              new Promise((r) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  const result = String(reader.result || "");
                  const parts = result.split(",");
                  r(parts[1] || null);
                };
                reader.onerror = () => r(null);
                reader.readAsDataURL(b);
              });

            const scales = [1, 0.85, 0.7, 0.55, 0.45, 0.35, 0.25];
            const qualities = [0.9, 0.82, 0.74, 0.66, 0.58, 0.5, 0.42];

            for (const s of scales) {
              const scale = Math.min(1, (maxSize / Math.max(w, h)) * s);
              const targetW = Math.max(1, Math.round(w * scale));
              const targetH = Math.max(1, Math.round(h * scale));
              for (const q of qualities) {
                // eslint-disable-next-line no-await-in-loop
                const jpegBlob = await makeJpegBlob(targetW, targetH, q);
                if (!jpegBlob) continue;
                if (jpegBlob.size <= maxBytes) {
                  // eslint-disable-next-line no-await-in-loop
                  const b64 = await blobToBase64(jpegBlob);
                  if (b64) return resolve(b64);
                }
              }
            }

            const fallbackScale = Math.min(1, maxSize / Math.max(w, h));
            const fallbackW = Math.max(1, Math.round(w * fallbackScale));
            const fallbackH = Math.max(1, Math.round(h * fallbackScale));
            const fallbackBlob = await makeJpegBlob(fallbackW, fallbackH, 0.6);
            if (!fallbackBlob) return resolve(null);
            const b64 = await blobToBase64(fallbackBlob);
            return resolve(b64);
          };
          img.onerror = () => resolve(null);
          img.src = blobUrl;
        });
        return base64;
      } finally {
        URL.revokeObjectURL(blobUrl);
      }
    };

    const base64ToBlob = (b64, mime) => {
      const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
      return new Blob([bytes], { type: mime || "application/octet-stream" });
    };

    const foldVcardLines = (vcardText) =>
      String(vcardText || "")
        .split(/\r?\n/)
        .map((line) => {
          const maxLen = 75;
          if (line.length <= maxLen) return line;
          let out = "";
          for (let i = 0; i < line.length; i += maxLen) {
            const chunk = line.slice(i, i + maxLen);
            out += (i === 0 ? chunk : `\r\n ${chunk}`);
          }
          return out;
        })
        .join("\r\n");

    const getLogoJpegData = async () => {
      if (!logo) return null;
      try {
        const response = await axios.get(
          `https://www.scan-taps.com/api/vcard/image?url=${encodeURIComponent(
            logo
          )}`
        );
        const mimeRaw = String(response.data?.mime || "");
        const b64 = String(response.data?.base64 || "");
        if (!mimeRaw.startsWith("image/") || !b64) return null;
        const normalizedMime =
          mimeRaw.toLowerCase() === "image/jpg" ? "image/jpeg" : mimeRaw;
        const blob = base64ToBlob(b64, normalizedMime);
        const jpegBase64 = await blobToJpegBase64(blob);
        if (jpegBase64) return { type: "JPEG", base64: jpegBase64 };
        return null;
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
      // TYPE must be JPEG/PNG/etc (NOT image/jpeg) for vCard 3.0 compatibility.
      card.logo.embedFromString(logoData.base64, logoData.type);
      card.photo.embedFromString(logoData.base64, logoData.type);
    }

    let vCardString = foldVcardLines(card.getFormattedString());

    const whatsappNumbers = [whatsapp01, whatsapp02, whatsapp03]
      .filter(Boolean)
      .map((n) => String(n).trim())
      .filter(Boolean);

    if (whatsappNumbers.length) {
      const whatsappLines = whatsappNumbers.map(
        (n) => `TEL;TYPE=CELL;TYPE=WHATSAPP:${n}`
      );
      const endIndex = vCardString.lastIndexOf("END:VCARD");
      if (endIndex !== -1) {
        const beforeEnd = vCardString.slice(0, endIndex).replace(/\r?\n$/, "");
        vCardString = `${beforeEnd}\r\n${whatsappLines.join(
          "\r\n"
        )}\r\nEND:VCARD\r\n`;
      }
    }

    const blob = new Blob([vCardString], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    // Check if it's an iPhone/iPad device
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      // Open vCard in a new tab instead of forcing download
      window.location.href = url;
    } else {
      // Regular download for other devices
      const newLink = document.createElement("a");
      newLink.download = `${clientName}.vcf`;
      newLink.href = url;
      newLink.click();
    }

    // Revoke the object URL to free memory
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const downloadQr = (rootEle) => {
    const input = document.getElementById(rootEle);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();

      // Get PDF page dimensions
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Define margins
      const horizontalMargin = 20; // Adjust this value for more/less gap on left/right sides

      // Get image dimensions
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Scale the image to fit within the PDF, considering margins
      const availableWidth = pageWidth - horizontalMargin * 2; // Subtract left and right margins
      const scaleFactor = Math.min(
        availableWidth / imgWidth,
        pageHeight / imgHeight
      );
      const imgScaledWidth = imgWidth * scaleFactor;
      const imgScaledHeight = imgHeight * scaleFactor;

      // Calculate centered position (with margins)
      const x = (pageWidth - imgScaledWidth) / 2; // Center horizontally
      const y = (pageHeight - imgScaledHeight) / 2; // Center vertically

      // Add image to PDF at the calculated position
      pdf.addImage(imgData, "PNG", x, y, imgScaledWidth, imgScaledHeight);

      // Save the PDF
      pdf.save("QR.pdf");
    });
  };

  const currentPageUrl = window.location.href;

  const [selected, setSelected] = useState("");

  if (client) {
    return (
      <section>
        <Helmet>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <title>{clientName}</title>

          <link rel="icon" type="image/x-icon" href={`${logo}`} />

          <meta name="description" content={name} />
          <meta property="article:section" content={name} />
          <meta property="og:title" content={client.clientName} />
          <meta property="og:description" content={name} />
          <meta
            property="og:url"
            content={`https://www.scan-taps.com/${companyName}`}
          />
          <meta property="og:image" content={`${logo}`} />
          <meta name="twitter:title" content={client.clientName} />
          <meta name="twitter:description" content={name} />
        </Helmet>

        <div>
          {show && (
            <div
              className="qr-modal min-h-screen bg-gradient-to-tr from-gray-950 via-gray-900 to-gray-800 w-full max-w-md mx-auto shadow-lg flex flex-col items-center justify-center relative"
              style={{ backgroundAttachment: "fixed" }}
            >
              <div className="bg-white border-gray-500 rounded-lg pb-8 pt-16 px-10 relative">
                <ImCross
                  className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-black"
                  onClick={handleClose}
                />

                <div className="flex flex-col items-center justify-center space-y-8">
                  <div className="qr flex items-center justify-center" id="qr">
                    <QRCodeCanvas value={window.location.href} />
                  </div>
                  <div className="flex justify-center space-x-2">
                    <div
                      className="w-12 h-12 bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 flex items-center justify-center"
                      onClick={() => {
                        downloadQr("qr");
                        handleClose();
                      }}
                    >
                      <FaDownload size={20} />
                    </div>

                    <div className="social-btn">
                      <FacebookShareButton
                        url={currentPageUrl}
                        quote="please share this"
                        hashtag={`Welcome to ${companyName}. Get to know us at ${currentPageUrl}`}
                      >
                        <div className="w-12 h-12 rounded-full border-2 border-white bg-[#1877F2] flex items-center justify-center">
                          <FaFacebookF size={26} color="white" />
                        </div>
                      </FacebookShareButton>
                    </div>

                    <div className="social-btn">
                      <LinkedinShareButton
                        url={currentPageUrl}
                        quote="please share this"
                        hashtag={`Welcome to ${companyName}. Get to know us at ${currentPageUrl}`}
                      >
                        <div className="w-12 h-12 rounded-full border-2 border-white bg-[#0A66C2] flex items-center justify-center">
                          <FaLinkedinIn size={26} color="white" />
                        </div>
                      </LinkedinShareButton>
                    </div>

                    <div className="social-btn">
                      <TelegramShareButton
                        url={currentPageUrl}
                        quote="please share this"
                        hashtag={`Welcome to ${companyName}. Get to know us at ${currentPageUrl}`}
                      >
                        <div className="w-12 h-12 rounded-full border-2 border-white bg-[#229ED9] flex items-center justify-center">
                          <FaTelegramPlane size={22} color="white" />
                        </div>
                      </TelegramShareButton>
                    </div>

                    <div className="social-btn">
                      <WhatsappShareButton
                        url={currentPageUrl}
                        quote="please share this"
                        hashtag={`Welcome to ${companyName}. Get to know us at ${currentPageUrl}`}
                      >
                        <div className="w-12 h-12 rounded-full border-2 border-white bg-[#25D366] flex items-center justify-center">
                          <FaWhatsapp size={26} color="white" />
                        </div>
                      </WhatsappShareButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!show && !show02 && (
            <div
              className="min-h-screen pt-2 w-full max-w-md mx-auto shadow-lg pb-10 text-center bg-gradient-to-tr from-[#0f1b12] via-[#1f2a20] to-[#0f1b12]"
              style={{ backgroundAttachment: "fixed" }}
            >
              <div className="px-5">
                <div className="pt-6 pb-4">
                  <h1 className="text-white text-3xl font-semibold" dir="rtl">
                    {name || companyName}
                  </h1>
                </div>

                <div className="flex items-center justify-center gap-5 pb-6">
                  {instagramLink && (
                    <a
                      href={instagramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram size={26} color="white" />
                    </a>
                  )}
                  {twitterLink && (
                    <a
                      href={twitterLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaXTwitter size={24} color="white" />
                    </a>
                  )}
                  {whatsapp01 && (
                    <a
                      href={`https://wa.me/${whatsapp01}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaWhatsapp size={26} color="white" />
                    </a>
                  )}
                  {tiktokLink && (
                    <a
                      href={tiktokLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTiktok size={26} color="white" />
                    </a>
                  )}
                  {snapchatLink && (
                    <a
                      href={snapchatLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaSnapchatGhost size={26} color="white" />
                    </a>
                  )}
                </div>

                <div className="flex items-center justify-center gap-x-2 pb-3">
                  <MdRemoveRedEye size={20} color="white" />
                  <p className="text-white">{visitCount}</p>
                </div>

                <div className="flex flex-col gap-4">
                  {website && (
                    <a
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between gap-3 px-4 py-4 border-2 border-[#b89a64] bg-[#1f2a20]/80 hover:bg-[#243325] transition-colors"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-12 h-12 flex items-center justify-center text-white">
                          <FaGlobe size={30} color="white" />
                        </div>
                        <div className="min-w-0 text-left">
                          <p className="text-white font-semibold truncate">
                            Order through our website
                          </p>
                          <p
                            className="text-white/80 text-sm truncate"
                            dir="rtl"
                          >
                            الطلب من خلال الموقع الإلكتروني
                          </p>
                        </div>
                      </div>
                      <span className="text-white/80 text-2xl leading-none">
                        ⋮
                      </span>
                    </a>
                  )}

                  {whatsapp01 && (
                    <a
                      href={`https://wa.me/${whatsapp01}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between gap-3 px-4 py-4 border-2 border-[#b89a64] bg-[#1f2a20]/80 hover:bg-[#243325] transition-colors"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-12 h-12 flex items-center justify-center text-white">
                          <FaWhatsapp size={28} color="white" />
                        </div>
                        <div className="min-w-0 text-left">
                          <p className="text-white font-semibold truncate">
                            Order through Whatsapp
                          </p>
                          <p
                            className="text-white/80 text-sm truncate"
                            dir="rtl"
                          >
                            الطلب من خلال الواتساب
                          </p>
                        </div>
                      </div>
                      <span className="text-white/80 text-2xl leading-none">
                        ⋮
                      </span>
                    </a>
                  )}

                  {profileLink01 && (
                    <a
                      href={profileLink01}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between gap-3 px-4 py-4 border-2 border-[#b89a64] bg-[#1f2a20]/80 hover:bg-[#243325] transition-colors"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-12 h-12 flex items-center justify-center text-white">
                          <FaGift size={28} color="white" />
                        </div>
                        <div className="min-w-0 text-left">
                          <p className="text-white font-semibold truncate">
                            Giveaways & Occasions Services
                          </p>
                          <p
                            className="text-white/80 text-sm truncate"
                            dir="rtl"
                          >
                            التوزيعات وخدمة التبخير للمناسبات
                          </p>
                        </div>
                      </div>
                      <span className="text-white/80 text-2xl leading-none">
                        ⋮
                      </span>
                    </a>
                  )}

                  {(whatsapp02 || profileLink02) && (
                    <a
                      href={
                        whatsapp02
                          ? `https://wa.me/${whatsapp02}`
                          : profileLink02
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between gap-3 px-4 py-4 border-2 border-[#b89a64] bg-[#1f2a20]/80 hover:bg-[#243325] transition-colors"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-12 h-12 flex items-center justify-center text-white">
                          <FaWhatsapp size={28} color="white" />
                        </div>
                        <div className="min-w-0 text-left">
                          <p className="text-white font-semibold truncate">
                            VIP Room Whatsapp | VIP
                          </p>
                          <p
                            className="text-white/80 text-sm truncate"
                            dir="rtl"
                          >
                            واتساب غرفة الـ VIP
                          </p>
                        </div>
                      </div>
                      <span className="text-white/80 text-2xl leading-none">
                        ⋮
                      </span>
                    </a>
                  )}

                  {catalogueLink && (
                    <a
                      href={catalogueLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between gap-3 px-4 py-4 border-2 border-[#b89a64] bg-[#1f2a20]/80 hover:bg-[#243325] transition-colors"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-12 h-12 flex items-center justify-center text-white">
                          <FaShoppingBag size={28} color="white" />
                        </div>
                        <div className="min-w-0 text-left">
                          <p className="text-white font-semibold truncate">
                            Order through Boutiqaat
                          </p>
                          <p
                            className="text-white/80 text-sm truncate"
                            dir="rtl"
                          >
                            الطلب من خلال بوتيكات
                          </p>
                        </div>
                      </div>
                      <span className="text-white/80 text-2xl leading-none">
                        ⋮
                      </span>
                    </a>
                  )}

                  {tiktokLink && (
                    <a
                      href={tiktokLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between gap-3 px-4 py-4 border-2 border-[#b89a64] bg-[#1f2a20]/80 hover:bg-[#243325] transition-colors"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-12 h-12 flex items-center justify-center text-white">
                          <FaTiktok size={26} color="white" />
                        </div>
                        <div className="min-w-0 text-left">
                          <p className="text-white font-semibold truncate">
                            Tik Tok
                          </p>
                          <p
                            className="text-white/80 text-sm truncate"
                            dir="rtl"
                          >
                            تيك توك
                          </p>
                        </div>
                      </div>
                      <span className="text-white/80 text-2xl leading-none">
                        ⋮
                      </span>
                    </a>
                  )}

                  {instagramLink && (
                    <a
                      href={instagramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between gap-3 px-4 py-4 border-2 border-[#b89a64] bg-[#1f2a20]/80 hover:bg-[#243325] transition-colors"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-12 h-12 flex items-center justify-center text-white">
                          <FaInstagram size={28} color="white" />
                        </div>
                        <div className="min-w-0 text-left">
                          <p className="text-white font-semibold truncate">
                            Instagram
                          </p>
                          <p
                            className="text-white/80 text-sm truncate"
                            dir="rtl"
                          >
                            انستغرام
                          </p>
                        </div>
                      </div>
                      <span className="text-white/80 text-2xl leading-none">
                        ⋮
                      </span>
                    </a>
                  )}

                  {twitterLink && (
                    <a
                      href={twitterLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between gap-3 px-4 py-4 border-2 border-[#b89a64] bg-[#1f2a20]/80 hover:bg-[#243325] transition-colors"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-12 h-12 flex items-center justify-center text-white">
                          <FaXTwitter size={26} color="white" />
                        </div>
                        <div className="min-w-0 text-left">
                          <p className="text-white font-semibold truncate">X</p>
                          <p
                            className="text-white/80 text-sm truncate"
                            dir="rtl"
                          >
                            منصة إكس
                          </p>
                        </div>
                      </div>
                      <span className="text-white/80 text-2xl leading-none">
                        ⋮
                      </span>
                    </a>
                  )}
                </div>

                <p className="pt-8 text-white/70 text-sm">
                  Copyright © <span className="company">{companyName}</span>.
                  All Rights Reserved.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  } else {
    return (
      <div
        className="min-h-screen w-full max-w-md mx-auto shadow-lg pb-5 text-center flex justify-center align-center bg-[#1f2a20] pt-[25%]"
        style={{ backgroundAttachment: "fixed" }}
      >
        <ScaleLoader
          color={"white"}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
};

export default Profile27;

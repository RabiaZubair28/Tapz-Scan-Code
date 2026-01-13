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
import whatsapp from "../assets/whatsapp.png";
import insta from "../assets/insta.png";
import { useNavigate } from "react-router-dom";
import snap from "../assets/snap.png";
import yt from "../assets/yt.png";
import tiktok from "../assets/tiktok.png";
import threads from "../assets/threads.png";
import fb from "../assets/fb.png";
import greview from "../assets/greview.png";
import websiteImg from "../assets/web.png";
import emailImg from "../assets/gmail.png";
import linkedin from "../assets/linkedin.webp";
import ytshorts from "../assets/yt-shorts.png";
import locations from "../assets/location.png";
import twitter02 from "../assets/twitter02.png";
import telegram from "../assets/telegram.webp";
import menu from "../assets/menu.png";
import catalog from "../assets/catalog.jpg";
import profile from "../assets/profile.png";
import telephone from "../assets/telephone01.jpg";
import eye from "../assets/eye.jpg";
import { IoIosAddCircle } from "react-icons/io";
// import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import { Helmet } from "react-helmet";
import { IoQrCodeSharp } from "react-icons/io5";
import { FaDownload } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialTwitter } from "react-icons/ti";
import { TiSocialLinkedin } from "react-icons/ti";
import { FaTelegramPlane } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { SlArrowRight } from "react-icons/sl";
import vCard from "vcards-js";
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
    const vcard = `BEGIN:VCARD
VERSION:3.0
N:${clientName};;;;
FN:${clientName}
ORG:${name}
TITLE:${designation}
TEL;CELL:${phone01}
TEL;CELL:${phone02}
EMAIL;HOME:${email}
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard" });
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
                        <img
                          src={fb}
                          alt="Facebook"
                          className="w-12 h-12 rounded-full border-2 border-white"
                        />
                      </FacebookShareButton>
                    </div>

                    <div className="social-btn">
                      <LinkedinShareButton
                        url={currentPageUrl}
                        quote="please share this"
                        hashtag={`Welcome to ${companyName}. Get to know us at ${currentPageUrl}`}
                      >
                        <img
                          src={linkedin}
                          alt="LinkedIn"
                          className="w-12 h-12 rounded-full border-2 border-white"
                        />
                      </LinkedinShareButton>
                    </div>

                    <div className="social-btn">
                      <TelegramShareButton
                        url={currentPageUrl}
                        quote="please share this"
                        hashtag={`Welcome to ${companyName}. Get to know us at ${currentPageUrl}`}
                      >
                        <img
                          src={telegram}
                          alt="Telegram"
                          className="w-12 h-12 rounded-full border-2 border-white"
                        />
                      </TelegramShareButton>
                    </div>

                    <div className="social-btn">
                      <WhatsappShareButton
                        url={currentPageUrl}
                        quote="please share this"
                        hashtag={`Welcome to ${companyName}. Get to know us at ${currentPageUrl}`}
                      >
                        <img
                          src={whatsapp}
                          alt="WhatsApp"
                          className="w-12 h-12 rounded-full border-2 border-white"
                        />
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
                      <img src={insta} alt="Instagram" className="w-8 h-8" />
                    </a>
                  )}
                  {twitterLink && (
                    <a
                      href={twitterLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={threads} alt="X" className="w-8 h-8" />
                    </a>
                  )}
                  {whatsapp01 && (
                    <a
                      href={`https://wa.me/${whatsapp01}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={whatsapp} alt="WhatsApp" className="w-8 h-8" />
                    </a>
                  )}
                  {tiktokLink && (
                    <a
                      href={tiktokLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={tiktok} alt="TikTok" className="w-8 h-8" />
                    </a>
                  )}
                  {snapchatLink && (
                    <a
                      href={snapchatLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={snap} alt="Snapchat" className="w-8 h-8" />
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
                          <img
                            src={websiteImg}
                            alt="Website"
                            className="w-10 h-10"
                          />
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
                          <img
                            src={whatsapp}
                            alt="WhatsApp"
                            className="w-10 h-10"
                          />
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
                          <img
                            src={profile}
                            alt="Services"
                            className="w-10 h-10"
                          />
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
                          <img src={whatsapp} alt="VIP" className="w-10 h-10" />
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
                          <img
                            src={catalog}
                            alt="Boutiqaat"
                            className="w-10 h-10"
                          />
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
                          <img
                            src={tiktok}
                            alt="TikTok"
                            className="w-10 h-10"
                          />
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
                          <img
                            src={insta}
                            alt="Instagram"
                            className="w-10 h-10"
                          />
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
                          <img src={threads} alt="X" className="w-10 h-10" />
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

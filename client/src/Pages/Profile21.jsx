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
import catalog from "../assets/menu.png";
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
const Profile21 = () => {
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

  // Used it for a Client make it dynamic by fetching the current client id

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

          <meta name="description" content={designation || name} />
          <meta property="article:section" content={designation || name} />
          <meta property="og:title" content={clientName || name} />
          <meta property="og:description" content={designation || name} />
          <meta
            property="og:url"
            content={`https://www.scan-taps.com/${companyName}`}
          />
          <meta property="og:image" content={`${logo}`} />
          <meta name="twitter:title" content={clientName || name} />
          <meta name="twitter:description" content={designation || name} />
        </Helmet>

        <div
          className={`min-h-screen pt-2 w-full max-w-md mx-auto shadow-lg pb-5 text-center bg-gradient-to-tr from-[#b10000] via-[#c12c2c] to-[#fab23f]`}
          style={{ backgroundAttachment: "fixed" }}
        >
          {logo && (
            <div className="flex  flex-row items-center  justify-center mx-auto rounded-full ps-0 pe-0 space-y-2 mt-4">
              <a href={logo}>
                <div className="relative mb-2 ">
                  <img
                    src={logo}
                    alt="profile"
                    className="w-[10rem] h-[10rem] mx-auto rounded-2xl border-[2px] border-white shadow-md"
                  />
                </div>
              </a>
            </div>
          )}
          <div className="px-6">
            <div className="flex flex-col justify-center items-center pt-0.5">
              <div className="flex justify-center gap-x-2 pt-1 pb-0 items-center">
                <MdRemoveRedEye size={20} color="white" />
                <p className="text-white">{visitCount}</p>
              </div>

              <h2 className="text-2xl font-semibold text-white text-center pt-1 ">
                {name}
              </h2>
              <h2 className="text-md font-semibold text-gray-50 text-center pt-1 ">
                {address}
              </h2>
            </div>

            <div className="px-4 mt-4 flex flex-row gap-x-2">
              <a
                href={`tel:${phone01}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center bg-white  shadow-sm hover:shadow-md hover:bg-gray-100 text-[#1f153d] py-3 rounded-lg"
              >
                <MdOutlinePhoneAndroid size={20} color="#1f153d" />
                &nbsp;CALL
              </a>

              <a
                href={`https://wa.me/${phone01}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center bg-white  shadow-sm hover:shadow-md hover:bg-gray-100 text-[#1f153d] py-3 rounded-lg"
              >
                <ImWhatsapp size={20} color="#1f153d" />
                &nbsp;REACH OUT
              </a>
            </div>

            <div className="flex items-center justify-center mt-0 mb-0 px-4">
              <button className="flex w-full justify-center gap-x-2 items-center  text-black bg-white border-[0.5px] border-white shadow-sm hover:shadow-md hover:bg-white  py-3 mt-2 mb-3 rounded-lg hover:text-black ">
                <FaDownload
                  size={20}
                  onClick={downloadContactCard}
                  color="black"
                  className="text-black hover:text-black"
                />
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={downloadContactCard}
                >
                  &nbsp;SAVE CONTACT
                </span>
              </button>
            </div>
            <h2 className="text-lg font-semibold text-white text-center  pt-3 ">
              Please select the Menu
            </h2>

            {phone02 && (
              <div className="flex justify-center mt-3">
                <a
                  href={`tel:${phone02}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md "
                >
                  <div className="flex items-center space-x-6">
                    <img src={phone} alt="Phone02" className="h-10 w-10" />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Phone</span>
                      <span className="text-sm">{phone02}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </a>
              </div>
            )}
            {phone03 && (
              <div className="flex justify-center mt-3">
                <a
                  href={`tel:${phone03}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                >
                  <div className="flex items-center space-x-6">
                    <img src={phone} alt="Phone03" className="h-10 w-10" />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Phone</span>
                      <span className="text-sm">{phone03}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </a>
              </div>
            )}
            {telephone02 && (
              <div className="flex justify-center mt-3">
                <a
                  href={`tel:${telephone02}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src={telephone}
                      alt="Telephone"
                      className="h-10 w-10 rounded-md"
                    />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Telephone</span>
                      <span className="text-sm">{telephone02}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </a>
              </div>
            )}

            {telephone01 && (
              <div className="flex justify-center mt-3">
                <a
                  href={`tel:${telephone01}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src={telephone}
                      alt="Telephone"
                      className="h-10 w-10 rounded-md"
                    />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Telephone</span>
                      <span className=" text-sm">{telephone01}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </a>
              </div>
            )}

            {telephone03 && (
              <div className="flex justify-center mt-3">
                <a
                  href={`tel:${telephone03}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src={telephone}
                      alt="Telephone"
                      className="h-10 w-10 rounded-md"
                    />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Telephone</span>
                      <span className="text-sm">{telephone03}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </a>
              </div>
            )}

            {whatsapp02 && (
              <div className="flex justify-center mt-3">
                <a
                  href={`https://wa.me/${whatsapp02}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src={whatsapp}
                      alt="Whatsapp02"
                      className="h-10 w-10"
                    />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Whatsapp</span>
                      <span className="text-sm">{whatsapp02}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </a>
              </div>
            )}
            {whatsapp03 && (
              <div className="flex justify-center mt-3">
                <a
                  href={`https://wa.me/${whatsapp03}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src={whatsapp}
                      alt="Whatsapp03"
                      className="h-10 w-10"
                    />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Whatsapp</span>
                      <span className=" text-sm">{whatsapp03}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </a>
              </div>
            )}

            {email02 && (
              <div className="flex justify-center mt-3">
                <a
                  href={`mailto:${email02}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                >
                  <div className="flex items-center space-x-6">
                    <img src={emailImg} alt="Email" className="h-10 w-10" />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Email</span>
                      <span className=" text-sm">{email02}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </a>
              </div>
            )}
            {email03 && (
              <div className="flex justify-center mt-3">
                <a
                  href={`mailto:${email03}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                >
                  <div className="flex items-center space-x-6">
                    <img src={emailImg} alt="Email" className="h-10 w-10" />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Email</span>
                      <span className="text-sm">{email03}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </a>
              </div>
            )}
            {facebookLink && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(facebookLink, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                      alt="Facebook"
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Facebook</span>
                      <span className="text-sm">{facebookName}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}
            {facebookLink02 && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(facebookLink02, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                      alt="Facebook"
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Facebook</span>
                      <span className=" text-sm">{facebookName02}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}
            {facebookLink03 && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(facebookLink03, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                      alt="Facebook"
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Facebook</span>
                      <span className=" text-sm">{facebookName03}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}
            {instagramLink && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(instagramLink, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                      alt="Instagram"
                      className="h-10 w-10"
                    />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Instagram</span>
                      <span className=" text-sm">{instagramName}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}
            {instagramLink02 && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(instagramLink02, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                      alt="Instagram"
                      className="h-10 w-10"
                    />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Instagram</span>
                      <span className="text-sm">{instagramName02}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}
            {instagramLink03 && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(instagramLink03, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                      alt="Instagram"
                      className="h-10 w-10"
                    />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Instagram</span>
                      <span className="text-sm">{instagramName03}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}
            {snapchatLink && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(snapchatLink, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img src={snap} alt="Snapchat" className="h-10 w-10" />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Snapchat</span>
                      <span className="text-sm">{snapchatName}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}
            {snapchatLink02 && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(snapchatLink02, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img src={snap} alt="Snapchat" className="h-10 w-10" />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Snapchat</span>
                      <span className="text-sm">{snapchatName02}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}
            {snapchatLink03 && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(snapchatLink03, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img src={snap} alt="Snapchat" className="h-10 w-10" />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Snapchat</span>
                      <span className="text-sm">{snapchatName03}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}
            {youtubeLink && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(youtubeLink, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img src={yt} alt="Youtube" className="h-10 w-10" />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Youtube</span>
                      <span className="text-sm">{youtubeName}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}
            {youtubeLink02 && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(youtubeLink02, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img src={yt} alt="Youtube" className="h-10 w-10" />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Youtube</span>
                      <span className="text-sm">{youtubeName02}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}
            {youtubeLink03 && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(youtubeLink03, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img src={yt} alt="Youtube" className="h-10 w-10" />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Youtube</span>
                      <span className="text-sm">{youtubeName03}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}
            {tiktokLink && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(tiktokLink, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img src={tiktok} alt="Youtube" className="h-10 w-10" />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Tiktok</span>
                      <span className="text-sm">{tiktokName}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}
            {tiktokLink02 && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(tiktokLink02, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img src={tiktok} alt="Youtube" className="h-10 w-10" />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Tiktok</span>
                      <span className="text-sm">{tiktokName02}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}
            {tiktokLink03 && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(tiktokLink03, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img src={tiktok} alt="Youtube" className="h-10 w-10" />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Tiktok</span>
                      <span className="text-sm">{tiktokName03}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}
            {youtubeShortsLink && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(youtubeShortsLink, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src={linkedin02}
                      alt="Youtube"
                      className="h-10 w-10 rounded-md"
                    />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Linkedin</span>
                      <span className="text-sm">{youtubeShortsName}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}
            {youtubeShortsLink02 && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(youtubeShortsLink02, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src={linkedin02}
                      alt="Youtube"
                      className="h-10 w-10 rounded-md"
                    />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Linkedin</span>
                      <span className="text-sm">{youtubeShortsName02}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}
            {youtubeShortsLink03 && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(youtubeShortsLink03, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src={linkedin02}
                      alt="Youtube"
                      className="h-10 w-10 rounded-md"
                    />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Linkedin</span>
                      <span className="text-sm">{youtubeShortsName03}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}
            {twitterLink && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(twitterLink, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src={threads}
                      alt="Twitter"
                      className="h-10 w-10 rounded-md"
                    />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Twitter</span>
                      <span className="text-sm">{twitterName}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}
            {twitterLink02 && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(twitterLink02, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src={threads}
                      alt="Twitter"
                      className="h-10 w-10 rounded-md"
                    />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Twitter</span>
                      <span className="text-sm">{twitterName02}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}
            {twitterLink03 && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(twitterLink03, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src={threads}
                      alt="Twitter"
                      className="h-10 w-10 rounded-md"
                    />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Twitter</span>
                      <span className=" text-sm">{twitterName03}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}

            {website && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(website, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src={websiteImg}
                      alt="Website"
                      className="h-10 w-10 rounded-md"
                    />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Website</span>
                      <span className="text-sm">{websiteName}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}
            {website02 && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(website02, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src={websiteImg}
                      alt="Website"
                      className="h-10 w-10 rounded-md"
                    />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Website</span>
                      <span className=" text-sm">{websiteName02}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}
            {website03 && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(website03, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src={websiteImg}
                      alt="Website"
                      className="h-10 w-10 rounded-md"
                    />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Website</span>
                      <span className=" text-sm">{websiteName03}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}
            {googleReviewLink && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(googleReviewLink, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src={greview}
                      alt="Google Review"
                      className="h-10 w-10 rounded-md"
                    />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Google Review</span>
                      <span className="text-sm">{googleReviewName}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}
            {googleReviewLink02 && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(googleReviewLink02, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src={greview}
                      alt="Google Review"
                      className="h-10 w-10 rounded-md"
                    />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Google Review</span>
                      <span className="text-sm">{googleReviewName02}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}
            {googleReviewLink03 && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(googleReviewLink03, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src={greview}
                      alt="Google Review"
                      className="h-10 w-10 rounded-md"
                    />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Google Review</span>
                      <span className=" text-sm">{googleReviewName03}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}
            {googleMapLink && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(googleMapLink, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src={locations}
                      alt="Google Map"
                      className="h-10 w-10 rounded-md"
                    />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Google Map</span>
                      <span className="text-sm">{googleMapName}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}
            {googleMapLink02 && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(googleMapLink02, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src={locations}
                      alt="Google Map"
                      className="h-10 w-10 rounded-md"
                    />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Google Map</span>
                      <span className="text-sm">{googleMapName02}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}
            {googleMapLink03 && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(googleMapLink03, "_blank")}
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src={locations}
                      alt="Google Map"
                      className="h-10 w-10 rounded-md"
                    />
                    <div className="flex flex-col text-start gap-y-1">
                      <span className="font-medium">Google Map</span>
                      <span className="text-sm">{googleMapName03}</span>
                    </div>
                  </div>
                  <SlArrowRight /> {/* Chevron/Arrow */}
                </button>
              </div>
            )}

            {catalogueLink && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-5 py-3  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md"
                  onClick={() => window.open(catalogueLink, "_blank")}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={menu}
                      alt="Profile"
                      className="h-10 w-10 rounded-md"
                    />
                    <div className="flex flex-col text-start">
                      <span className="text-lg font-semibold">
                        {catalogueName}
                      </span>
                    </div>
                  </div>{" "}
                  {/* Chevron/Arrow */}
                </button>
              </div>
            )}

            {profileLink01 && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-4 py-4  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md gap-x-2"
                  onClick={() => window.open(profileLink01, "_blank")}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={menu}
                      alt="Profile"
                      className="h-10 w-10 rounded-md"
                    />
                    <div className="flex flex-col text-start">
                      <span className="text-lg font-semibold">
                        {profileName01}
                      </span>
                    </div>
                  </div>
                  {/* <SlArrowRight  /> Chevron/Arrow */}
                </button>
              </div>
            )}
            {profileLink02 && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-4 py-4  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md gap-x-2"
                  onClick={() => window.open(profileLink02, "_blank")}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={menu}
                      alt="Profile"
                      className="h-10 w-10 rounded-md"
                    />
                    <div className="flex flex-col text-start">
                      <span className="text-lg font-semibold">
                        {profileName02}
                      </span>
                    </div>
                  </div>
                  {/* <SlArrowRight  /> Chevron/Arrow */}
                </button>
              </div>
            )}
            {menuLink && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-4 py-4  bg-white hover:bg-gray-50 text-[#231f20] border-[0.25px] border-[#38572e] shadow rounded-lg max-w-md gap-x-2"
                  onClick={() => window.open(menuLink, "_blank")}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={menu}
                      alt="Profile"
                      className="h-10 w-10 rounded-md"
                    />
                    <div className="flex flex-col text-start">
                      <span className="text-lg font-semibold">{menuName}</span>
                    </div>
                  </div>
                  {/* <SlArrowRight  /> Chevron/Arrow */}
                </button>
              </div>
            )}
          </div>

          <div className="px-6">
            {(img01 != "" ||
              img02 != "" ||
              img03 != "" ||
              img04 != "" ||
              img05 != "" ||
              img05 != "" ||
              img06 != "" ||
              img07 != "" ||
              img08 != "" ||
              img09 != "" ||
              img10 != "") && (
              <div className="px-4">
                <h2 className="text-xl font-semibold text-white mb-3 mt-5">
                  Image Gallery
                </h2>
                <hr className="border-gray-300" />
                {img01 && (
                  <div className="flex flex-col items-center bg-[#38572e] mx-auto rounded-xl border-[0.25px] border-white shadow-md space-y-2 mt-3">
                    <a href={img01}>
                      <img
                        src={img01}
                        alt="Image"
                        className="w-100 h-auto rounded-xl shadow-md hover:shadow-lg"
                      />
                    </a>
                  </div>
                )}

                {img02 && (
                  <div className="flex flex-col items-center bg-[#38572e]  mx-auto rounded-xl border-[0.25px] border-white shadow-md space-y-2 mt-3">
                    <a href={img02}>
                      <img
                        src={img02}
                        alt="Image"
                        className="w-100 h-auto rounded-xl shadow-md hover:shadow-lg"
                      />
                    </a>
                  </div>
                )}

                {img03 && (
                  <div className="flex flex-col items-center bg-[#38572e]  mx-auto rounded-xl border-[0.25px] border-white shadow-md space-y-2 mt-3">
                    <a href={img03}>
                      <img
                        src={img03}
                        alt="Image"
                        className="w-100 h-auto rounded-xl shadow-md hover:shadow-lg"
                      />
                    </a>
                  </div>
                )}

                {img04 && (
                  <div className="flex flex-col items-center bg-[#38572e]  mx-auto rounded-xl border-[0.25px] border-white shadow-md space-y-2 mt-3">
                    <a href={img04}>
                      <img
                        src={img04}
                        alt="Image"
                        className="w-100 h-auto rounded-xl shadow-md hover:shadow-lg"
                      />
                    </a>
                  </div>
                )}

                {img05 && (
                  <div className="flex flex-col items-center bg-[#38572e]  mx-auto rounded-xl border-[0.25px] border-white shadow-md space-y-2 mt-3">
                    <a href={img05}>
                      <img
                        src={img05}
                        alt="Image"
                        className="w-100 h-auto rounded-xl shadow-md hover:shadow-lg"
                      />
                    </a>
                  </div>
                )}

                {img06 && (
                  <div className="flex flex-col items-center bg-[#38572e]  mx-auto rounded-xl border-[0.25px] border-white shadow-md space-y-2 mt-3">
                    <a href={img06}>
                      <img
                        src={img06}
                        alt="Image"
                        className="w-100 h-auto rounded-xl shadow-md hover:shadow-lg"
                      />
                    </a>
                  </div>
                )}

                {img07 && (
                  <div className="flex flex-col items-center bg-[#38572e]  mx-auto rounded-xl border-[0.25px] border-white shadow-md space-y-2 mt-3">
                    <a href={img07}>
                      <img
                        src={img07}
                        alt="Image"
                        className="w-100 h-auto rounded-xl shadow-md hover:shadow-lg"
                      />
                    </a>
                  </div>
                )}
                {img08 && (
                  <div className="flex flex-col items-center bg-[#38572e]  mx-auto rounded-xl border-[0.25px] border-white shadow-md space-y-2 mt-3">
                    <a href={img08}>
                      <img
                        src={img08}
                        alt="Image"
                        className="w-100 h-auto rounded-xl shadow-md hover:shadow-lg"
                      />
                    </a>
                  </div>
                )}

                {img09 && (
                  <div className="flex flex-col items-center bg-[#38572e]  mx-auto rounded-xl border-[0.25px] border-white shadow-md space-y-2 mt-3">
                    <a href={img09}>
                      <img
                        src={img09}
                        alt="Image"
                        className="w-100 h-auto rounded-xl shadow-md hover:shadow-lg"
                      />
                    </a>
                  </div>
                )}
                {img10 && (
                  <div className="flex flex-col items-center bg-[#38572e]  mx-auto rounded-xl border-[0.25px] border-white shadow-md space-y-2 mt-3">
                    <a href={img10}>
                      <img
                        src={img10}
                        alt="Image"
                        className="w-100 h-auto rounded-xl shadow-md hover:shadow-lg"
                      />
                    </a>
                  </div>
                )}
              </div>
            )}
            {location != "" && (
              <div className="px-0">
                <h2 className="text-xl font-semibold text-white mb-3 mt-5">
                  Location
                </h2>
                <hr className="border-gray-300" />
                <div className="flex flex-col items-center bg-white mx-auto rounded-xl border-[1px] border-white shadow-md  space-y-4 mt-3">
                  {location && (
                    <iframe
                      src={location}
                      width="100%"
                      height="300"
                      allowfullscreen=""
                      loading="lazy"
                      className="rounded-xl"
                    ></iframe>
                  )}
                </div>
              </div>
            )}

            <p className="pt-4 text-white">
              Copyright © <span className="company">{companyName}</span>. All
              Rights Reserved.
            </p>
          </div>
        </div>

        {/* <iframe src={details[i].location} width="600" height="450" allowfullscreen="" loading="lazy"></iframe> */}
      </section>
    );
  } else {
    return (
      <div
        className={`min-h-screen w-full max-w-md mx-auto shadow-lg pb-5 text-center flex justify-center align-center bg-gradient-to-tr from-[#b10000] via-[#c12c2c] to-[#fab23f] pt-[25%]`}
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

export default Profile21;

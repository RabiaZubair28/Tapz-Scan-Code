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
const Profile06 = () => {
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

        <div
          className={`min-h-screen pt-8 w-full max-w-md mx-auto shadow-lg pb-5 text-center bg-gradient-to-tr from-gray-950 via-gray-900 to-gray-800`}
          style={{ backgroundAttachment: "fixed" }}
        >
          {logo && (
            <div className="flex  flex-row items-center  justify-center mx-auto rounded-full ps-0 pe-0 space-y-2 mt-4">
              <a href={logo}>
                <div className="relative mb-2 ">
                  <img
                    src={logo}
                    alt="profile"
                    className="w-36 h-36 mx-auto rounded-2xl border-[0.25px] border-white shadow-md"
                  />
                </div>
              </a>
            </div>
          )}
          <div className="px-6">
            <div className="flex flex-col justify-center items-center pt-0.5">
              <h2 className="text-2xl font-semibold text-white text-center pt-1 ">
                {name}
              </h2>
              <h2 className="text-md font-semibold text-gray-50 text-center pt-1 ">
                {address}
              </h2>
              <h2 className="text-lg font-semibold text-white text-center  pt-12 ">
                Please select the Branch
              </h2>
            </div>

            {profileLink01 && (
              <div className="flex justify-center mt-3">
                <button
                  className="flex items-center justify-between w-full px-4 py-4  bg-white hover:bg-gray-50 text-black border-[0.25px] border-black shadow rounded-lg max-w-md gap-x-2"
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
                  className="flex items-center justify-between w-full px-4 py-4  bg-white hover:bg-gray-50 text-black border-[0.25px] border-black shadow rounded-lg max-w-md gap-x-2"
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
          </div>

          <div className="px-4">
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
        className={`min-h-screen w-full max-w-md mx-auto shadow-lg pb-5 text-center flex justify-center align-center bg-gradient-to-tr from-gray-950 via-gray-900 to-gray-800 pt-[25%]`}
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

export default Profile06;

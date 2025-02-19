import React from 'react'
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { QRCodeCanvas} from 'qrcode.react';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import phone from "../assets/phone.png"
import addressImg from "../assets/adress.png"
import { TfiEmail } from "react-icons/tfi";
import whatsapp from "../assets/whatsapp.png"
import { FaPhoneVolume } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaSnapchatGhost } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import insta from "../assets/insta.png"
import { useNavigate} from "react-router-dom";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import snap from "../assets/snap.png"
import yt from "../assets/yt.png"
import tiktok from "../assets/tiktok.png"
import threads from "../assets/threads.png"
import fb from "../assets/fb.png"
import { FaFacebookF } from "react-icons/fa";
import greview from "../assets/greview.png"
import websiteImg from "../assets/web.png"
import emailImg from "../assets/gmail.png"
import linkedin from "../assets/linkedin.webp"
import ytshorts from "../assets/yt-shorts.png"
import locations from "../assets/location.png"
import twitter02 from "../assets/twitter02.png"
import telegram from "../assets/telegram.webp"
import menu from "../assets/menu.png"
import catalog from "../assets/catalog.jpg"
import profile from "../assets/profile.png"
import telephone from "../assets/telephone01.jpg"
import { FaBuilding } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaGlobe } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa";
import { MdOutlineRestaurant } from "react-icons/md";
import { MdOutlineMenuBook } from "react-icons/md";
import { RiProfileLine } from "react-icons/ri";
import eye from "../assets/eye.jpg"
import { IoIosAddCircle } from "react-icons/io";
// import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { IoQrCodeSharp } from "react-icons/io5";
import { FaDownload } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialTwitter } from "react-icons/ti";
import { TiSocialLinkedin } from "react-icons/ti";
import { FaTelegramPlane } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { SlArrowRight } from "react-icons/sl";
import vCard from "vcards-js"
import {FacebookShareButton, TelegramShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, LinkedinIcon} from 'react-share'
import { ImCross } from "react-icons/im";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { RiMessage2Line } from "react-icons/ri";
import { ImWhatsapp } from "react-icons/im";
import linkedin02 from "../assets/download.png"
import { GiRotaryPhone } from "react-icons/gi";
import { MdRemoveRedEye } from "react-icons/md";
const Profile07 = () => {

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
  console.log(clientId)
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState("");
  console.log(params)

const toDataURL = async (url) => {

  const response = await axios.get(url, { responseType: "blob" });
  const imageDataUrl = URL.createObjectURL(response.data);

  return imageDataUrl;
};

useEffect(() => {
  const fetchClient = async () => {
    try {
      const response = await axios.get(`https://www.scan-taps.com/api/data/client/${clientId}`);
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




var { _id,
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
  flag
} = client;

var [visitCount, setVisitCount] = useState(0);
var clientId01 = _id; 
// Used it for a Client make it dynamic by fetching the current client id

  useEffect(() => {
    const fetchAndIncrementVisitCount = async () => {
      try {
        // console.log("Fetching visit count...");
        const incrementResponse = await axios.post(`https://www.scan-taps.com/api/visit/${clientId01}`);
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
FN:${designation}
ORG:${name}
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
        const newLink = document.createElement('a');
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
        const imgData = canvas.toDataURL('image/png');
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
        const scaleFactor = Math.min(availableWidth / imgWidth, pageHeight / imgHeight);
        const imgScaledWidth = imgWidth * scaleFactor;
        const imgScaledHeight = imgHeight * scaleFactor;
    
        // Calculate centered position (with margins)
        const x = (pageWidth - imgScaledWidth) / 2; // Center horizontally
        const y = (pageHeight - imgScaledHeight) / 2; // Center vertically
    
        // Add image to PDF at the calculated position
        pdf.addImage(imgData, 'PNG', x, y, imgScaledWidth, imgScaledHeight);
    
        // Save the PDF
        pdf.save('QR.pdf');
      });
    };
    

const currentPageUrl = window.location.href;

const [selected, setSelected] = useState("");


  if(client)
  {      return(
  
  <div>
{show && (
  <div
  className="qr-modal min-h-screen bg-white w-full max-w-md mx-auto shadow-lg flex flex-col items-center justify-center relative"
  style={{ backgroundAttachment: "fixed" }}
>
  <div className="bg-gray-50 border-gray-200 space-x-5 border-2 rounded-lg pb-8 pt-16 px-10 relative">
    {/* Close Icon */}
    <ImCross
      className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-black"
      onClick={handleClose}
    />

    <div className="flex flex-col items-center justify-center space-y-8">
      {/* QR Code */}
      <div className="qr flex items-center justify-center" id="qr">
      <QRCodeCanvas  value={window.location.href} />
      </div>
      {/* Buttons and Social Icons */}
      <div className="flex justify-center space-x-2">
      
          <FaDownload className="w-6 h-6" onClick={() => {
            downloadQr("qr");
            handleClose();
          }} />
  
       
          <FacebookShareButton
            url={currentPageUrl}
            quote="please share this"
            hashtag={`Welcome to ${companyName}. Get to know us at ${currentPageUrl}`}
          >
            <FaFacebookF
              className="w-6 h-6"
            />
          </FacebookShareButton>
     

    
          <LinkedinShareButton
            url={currentPageUrl}
            quote="please share this"
            hashtag={`Welcome to ${companyName}. Get to know us at ${currentPageUrl}`}
          >
            <FaLinkedinIn
              className="w-6 h-6"
            />
          </LinkedinShareButton>
       
          <TelegramShareButton
            url={currentPageUrl}
            quote="please share this"
            hashtag={`Welcome to ${companyName}. Get to know us at ${currentPageUrl}`}
          >
            <FaTelegramPlane
              className="w-6 h-6"
            />
          </TelegramShareButton>
       
          <WhatsappShareButton
            url={currentPageUrl}
            quote="please share this"
            hashtag={`Welcome to ${companyName}. Get to know us at ${currentPageUrl}`}
          >
            <FaWhatsapp
              className="w-6 h-6"
            />
          </WhatsappShareButton>
    
      </div>
    </div>
  </div>
</div>

)}


  { !show && !show02 &&
    <section className="main">
  
          {/* <button style={{color:"white", fontSize:"17px", paddingBlock:"8px", paddingInline:"30px", backgroundColor:"rgb(22, 33, 92)", border:"1px solid white", borderRadius:"5px"}} onClick={
            ()=>{
              navigate(`/`)
            }
          }>Logout</button> */}
       
    <Helmet>
    <title>{name}</title>
    </Helmet>

    <div className={`min-h-screen w-full px-3 max-w-md mx-auto shadow-lg pt-5  text-center bg-white`} style={{ backgroundAttachment: "fixed" }}>
      <div className='bg-white border border-white rounded-2xl pb-4'>
      {/* {images && (
      <div className="flex flex-col items-center mx-auto rounded-x space-y-2 ">

        <a href={images} className='w-full'>
        <div className="relative mb-2 ">
        <img
          src={images}
          alt="profile"
          className="mx-auto rounded-t-2xl h-[220px] w-full bg-cover border-b-[0.5px] border-gray-500"
        />
      </div>
        </a>
      </div>
      )} */}
        <div className="flex items-center justify-center mt-0 mb-0">
            {/* <img src={eye} height={25}></img>
                  <span style={{display:"flex",alignItems:"center",justifyContent:"center",
                  }}>&nbsp;{visitCount} &nbsp;&nbsp;&nbsp;&nbsp;</span> */}
                  <button className="flex items-center justify-center gap-x-2 rounded-lg py-2 px-10 bg-white border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-100">
                  <FaDownload size={20} onClick={downloadContactCard} color="black" />
                  <span style={{display:"flex",alignItems:"center",color:"black",justifyContent:"center"
                  }} onClick={downloadContactCard} >&nbsp;&nbsp;Save Contact</span>
                </button>
        
        </div>
      <div className="px-6">
      {logo && (
      <div className="flex flex-col items-center mx-auto rounded-x p-1 space-y-2 mt-28">

        <a href={logo}>
        <div className="relative mb-2 ">
        <img
          src={logo}
          alt="profile"
          className="w-36 h-36 -mt-24 mx-auto rounded-full border-4 border-white shadow-md"
        />
      </div>
        </a>
      </div>
      )}
      {/* <div className="flex justify-center gap-x-2 pt-2 pb-1 items-center">
          <MdRemoveRedEye size={20} />
          <p>{visitCount}</p>
        </div> */}

        {/* <div className="px-4">
          <div className="flex justify-center space-x-2 mt-2 mb-2.5">
          <a href={`tel:${phone01}`}
        target="_blank"
        rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-100">
            <MdOutlinePhoneAndroid size={20} />
            </a>
            <a href={`mailto:${email}`}
        target="_blank"
        rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-100">
            <AiOutlineMail size={20} />
            </a>
            <a href={`sms:${phone01}`} className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-100">
            <RiMessage2Line size={20} />
            </a>
            <a href={`https://wa.me/${whatsapp01}`}
        target="_blank"
        rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-100">
            <ImWhatsapp size={20} />
            </a>
          </div>

      </div> */}
      <div className='flex flex-col justify-center items-center'>
      <h2 className="text-lg font-semibold text-gray-800 pt-1 ">{name}</h2>
      <h2 className="text-2xl font-semibold text-gray-800 pt-1">{clientName}</h2>
      <p className="text-md font-semibold text-gray-900 pt-1 pb-1">{designation}</p>
      <p className="text-sm text-gray-900 pt-1 pb-1 max-w-[280px] break-words">{description}</p></div>
      {/* <p className="text-xs text-gray-500">{description}</p> */}
      {/* <p className="text-md text-gray-600">{romanName}</p> */}
    
    
      <div className="px-10">
    { phone01 && <div className="flex justify-center mt-3">
      <a
        href={`tel:${phone01}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-start w-full px-5 bg-white text-gray-700  max-w-md"
      >
        <div className="flex items-center space-x-4">
          <FaPhoneVolume
            alt="Phone01"
            className="h-6 w-6"
          />
          <div className="flex flex-col text-start gap-y-1">
            <span className="text-gray-500 text-sm">{phone01}</span>
          </div>
        </div>
      </a>
    </div>}
    { phone02 && <div className="flex justify-center mt-3">
      <a
        href={`tel:${phone02}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
      >
        <div className="flex items-center space-x-4">
          <img
            src={phone}
            alt="Phone02"
            className="h-6 w-6"
          />
          <div className="flex flex-col text-start gap-y-1">
            
            <span className="text-gray-500 text-sm">{phone02}</span>
          </div>
        </div>
       
      </a>
    </div>}
    { phone03 && <div className="flex justify-center mt-3">
      <a
        href={`tel:${phone03}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-start w-full px-5 bg-white text-gray-700  max-w-md"
      >
        <div className="flex items-center space-x-4">
          <img
            src={phone}
            alt="Phone03"
            className="h-6 w-6"
          />
          <div className="flex flex-col text-start gap-y-1">
          
            <span className="text-gray-500 text-sm">{phone03}</span>
          </div>
        </div>
    
      </a>
    </div>}
    { telephone02 && <div className="flex justify-center mt-3">
  <a
    href={`tel:${telephone02}`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
  >
    <div className="flex items-center space-x-2.5">
      <GiRotaryPhone
        alt="Telephone"
        className="h-8 w-8 rounded-sm"
      />
      <div className="flex flex-col text-start gap-y-1">
     
        <span className="text-gray-500 text-sm">{telephone02}</span>
      </div>
    </div>
  
  </a>
</div>}

{ telephone01 && <div className="flex justify-center mt-3">
  <a
    href={`tel:${telephone01}`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
  >
    <div className="flex items-center space-x-2.5">
      <GiRotaryPhone
        alt="Telephone"
        className="h-7 w-7 rounded-sm"
      />
      <div className="flex flex-col text-start gap-y-1">
       
        <span className="text-gray-500 text-sm">{telephone01}</span>
      </div>
    </div>
 {/* Chevron/Arrow */}
  </a>
</div>}

    { telephone03 && <div className="flex justify-center mt-3">
      <a
        href={`tel:${telephone03}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700 shadow rounded-lg max-w-md"
      >
        <div className="flex items-center space-x-2.5">
          <GiRotaryPhone
            alt="Telephone"
            className="h-7 w-7 rounded-sm"
          />
          <div className="flex flex-col text-start gap-y-1">
            <span className="font-medium">Telephone</span>
            <span className="text-gray-500 text-sm">{telephone03}</span>
          </div>
        </div>
        <SlArrowRight color="gray" /> {/* Chevron/Arrow */}
      </a>
    </div>}
    { whatsapp01 &&<div className="flex justify-center mt-3">
      <a
        href={`https://wa.me/${whatsapp01}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
      >
        <div className="flex items-center space-x-3">
          <FaWhatsapp
            alt="Whatsapp01"
            className="h-7 w-7"
          />
          <div className="flex flex-col text-start gap-y-1">
            
            <span className="text-gray-500 text-sm">{whatsapp01}</span>
          </div>
        </div>
         {/* Chevron/Arrow */}
      </a>
    </div>}
    { whatsapp02 && <div className="flex justify-center mt-3">
      <a
        href={`https://wa.me/${whatsapp02}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
      >
        <div className="flex items-center space-x-3">
          <FaWhatsapp
            alt="Whatsapp02"
            className="h-7 w-7"
          />
          <div className="flex flex-col text-start gap-y-1">
         
            <span className="text-gray-500 text-sm">{whatsapp02}</span>
          </div>
        </div>
        {/* Chevron/Arrow */}
      </a>
    </div> }
    { whatsapp03 &&<div className="flex justify-center mt-3">
      <a
        href={`https://wa.me/${whatsapp03}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700 max-w-md"
      >
        <div className="flex items-center space-x-3">
          <FaWhatsapp
            alt="Whatsapp03"
            className="h-7 w-7"
          />
          <div className="flex flex-col text-start gap-y-1">
          
            <span className="text-gray-500 text-sm">{whatsapp03}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </a>
    </div>}
   { email && <div className="flex justify-center mt-3">
      <a
        href={`mailto:${email}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
      >
        <div className="flex items-center space-x-4">
          <TfiEmail
            alt="Email"
            className="h-6 w-6"
          />
          <div className="flex flex-col text-start gap-y-1">
          
            <span className="text-gray-500 text-sm">{email}</span>
          </div>
        </div>
      {/* Chevron/Arrow */}
      </a>
    </div>}
    { email02 && <div className="flex justify-center mt-3">
      <a
        href={`mailto:${email02}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
      >
        <div className="flex items-center space-x-4">
          <TfiEmail
            alt="Email"
            className="h-6 w-6"
          />
          <div className="flex flex-col text-start gap-y-1">
            
            <span className="text-gray-500 text-sm">{email02}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </a>
    </div>}
    { email03 && <div className="flex justify-center mt-3">
      <a
        href={`mailto:${email03}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
      >
        <div className="flex items-center space-x-4">
          <TfiEmail
            alt="Email"
            className="h-6 w-6"
          />
          <div className="flex flex-col text-start gap-y-1">
         
            <span className="text-gray-500 text-sm">{email03}</span>
          </div>
        </div>
        {/* Chevron/Arrow */}
      </a>
    </div>}
    {facebookLink && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(facebookLink, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaFacebookF
            alt="Facebook"
            className="h-6 w-6 "
          />
          <div className="flex flex-col text-start gap-y-1">
            
            <span className="text-gray-500 text-sm">{facebookName}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    {facebookLink02 && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(facebookLink02, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaFacebookF
            alt="Facebook"
            className="h-6 w-6 "
          />
          <div className="flex flex-col text-start gap-y-1">
          
            <span className="text-gray-500 text-sm">{facebookName02}</span>
          </div>
        </div>
      
      </button>
    </div>}
    {facebookLink03 && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(facebookLink03, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaFacebookF
            alt="Facebook"
            className="h-6 w-6 "
          />
          <div className="flex flex-col text-start gap-y-1">
        
            <span className="text-gray-500 text-sm">{facebookName03}</span>
          </div>
        </div>
        {/* Chevron/Arrow */}
      </button>
    </div>}
    { instagramLink && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(instagramLink, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaInstagram
            alt="Instagram"
            className="h-6 w-6"
          />
          <div className="flex flex-col text-start gap-y-1">
           
            <span className="text-gray-500 text-sm">{instagramName}</span>
          </div>
        </div>
      </button>
    </div>}
    { instagramLink02 && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(instagramLink02, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaInstagram
            alt="Instagram"
            className="h-6 w-6"
          />
          <div className="flex flex-col text-start gap-y-1">
           
            <span className="text-gray-500 text-sm">{instagramName02}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { instagramLink03 && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(instagramLink03, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaInstagram
            alt="Instagram"
            className="h-6 w-6"
          />
          <div className="flex flex-col text-start gap-y-1">
            <span className="font-medium">Instagram</span>
            <span className="text-gray-500 text-sm">{instagramName03}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { snapchatLink && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(snapchatLink, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaSnapchatGhost
            alt="Snapchat"
            className="h-6 w-6"
          />
          <div className="flex flex-col text-start gap-y-1">
            
            <span className="text-gray-500 text-sm">{snapchatName}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { snapchatLink02 && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(snapchatLink02, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaSnapchatGhost
            className="h-6 w-6"
          />
          <div className="flex flex-col text-start gap-y-1">
        
            <span className="text-gray-500 text-sm">{snapchatName02}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { snapchatLink03 && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(snapchatLink03, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaSnapchatGhost
            className="h-6 w-6"
          />
          <div className="flex flex-col text-start gap-y-1">
          
            <span className="text-gray-500 text-sm">{snapchatName03}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { youtubeLink && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(youtubeLink, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaYoutube
            className="h-6 w-6"
          />
          <div className="flex flex-col text-start gap-y-1">
            
            <span className="text-gray-500 text-sm">{youtubeName}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { youtubeLink02 && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(youtubeLink02, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaYoutube
            alt="Youtube"
            className="h-6 w-6"
          />
          <div className="flex flex-col text-start gap-y-1">
            
            <span className="text-gray-500 text-sm">{youtubeName02}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { youtubeLink03 && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(youtubeLink03, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaYoutube
            alt="Youtube"
            className="h-6 w-6"
          />
          <div className="flex flex-col text-start gap-y-1">
            
            <span className="text-gray-500 text-sm">{youtubeName03}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { tiktokLink && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(tiktokLink, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaTiktok
            alt="Youtube"
            className="h-6 w-6"
          />
          <div className="flex flex-col text-start gap-y-1">
         
            <span className="text-gray-500 text-sm">{tiktokName}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { tiktokLink02 && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(tiktokLink02, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaTiktok
            alt="Youtube"
            className="h-6 w-6"
          />
          <div className="flex flex-col text-start gap-y-1">
         
            <span className="text-gray-500 text-sm">{tiktokName02}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { tiktokLink03 && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(tiktokLink03, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaTiktok
            alt="Youtube"
            className="h-6 w-6"
          />
          <div className="flex flex-col text-start gap-y-1">
         
            <span className="text-gray-500 text-sm">{tiktokName03}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { youtubeShortsLink && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(youtubeShortsLink, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaLinkedinIn
            alt="Youtube"
            className="h-6 w-6 rounded-md"
          />
          <div className="flex flex-col text-start gap-y-1">
           
            <span className="text-gray-500 text-sm">{youtubeShortsName}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { youtubeShortsLink02 && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(youtubeShortsLink02, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaLinkedinIn
            alt="Youtube"
            className="h-6 w-6 rounded-md"
          />
          <div className="flex flex-col text-start gap-y-1">
           
            <span className="text-gray-500 text-sm">{youtubeShortsName02}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { youtubeShortsLink03 && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(youtubeShortsLink03, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaLinkedinIn
            alt="Youtube"
            className="h-6 w-6 rounded-md"
          />
          <div className="flex flex-col text-start gap-y-1">
           
            <span className="text-gray-500 text-sm">{youtubeShortsName03}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { twitterLink && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(twitterLink, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaTwitter
            className="h-6 w-6 rounded-md"
          />
          <div className="flex flex-col text-start gap-y-1">
            
            <span className="text-gray-500 text-sm">{twitterName}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { twitterLink02 && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(twitterLink02, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaTwitter
            alt="Twitter"
            className="h-6 w-6 rounded-md"
          />
          <div className="flex flex-col text-start gap-y-1">
            
            <span className="text-gray-500 text-sm">{twitterName02}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { twitterLink03 && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(twitterLink03, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaTwitter
            alt="Twitter"
            className="h-6 w-6 rounded-md"
          />
          <div className="flex flex-col text-start gap-y-1">
            
            <span className="text-gray-500 text-sm">{twitterName03}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { address && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
      >
        <div className="flex items-center space-x-4">
          <FaBuilding
            alt="Address"
            className="h-6 w-6 rounded-md"
          />
          <div className="flex flex-col text-start gap-y-1">
            
            <span className="text-gray-500 text-sm">{address}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { website && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(website, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaGlobe
            alt="Website"
            className="h-6 w-6 rounded-md"
          />
          <div className="flex flex-col text-start gap-y-1">
           
            <span className="text-gray-500 text-sm">{websiteName}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { website02 && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(website02, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaGlobe
            alt="Website"
            className="h-6 w-6 rounded-md"
          />
          <div className="flex flex-col text-start gap-y-1">
           
            <span className="text-gray-500 text-sm">{websiteName02}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { website03 && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(website03, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaGlobe
            alt="Website"
            className="h-6 w-6 rounded-md"
          />
          <div className="flex flex-col text-start gap-y-1">
           
            <span className="text-gray-500 text-sm">{websiteName03}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { googleReviewLink && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(googleReviewLink, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaGooglePlusG
            alt="Google Review"
            className="h-6 w-6 rounded-md"
          />
          <div className="flex flex-col text-start gap-y-1">
            
            <span className="text-gray-500 text-sm">{googleReviewName}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { googleReviewLink02 && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(googleReviewLink02, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaGooglePlusG
            alt="Google Review"
            className="h-6 w-6 rounded-md"
          />
          <div className="flex flex-col text-start gap-y-1">
            
            <span className="text-gray-500 text-sm">{googleReviewName02}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { googleReviewLink03 && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(googleReviewLink03, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaGooglePlusG
            alt="Google Review"
            className="h-6 w-6 rounded-md"
          />
          <div className="flex flex-col text-start gap-y-1">
            
            <span className="text-gray-500 text-sm">{googleReviewName03}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { googleMapLink && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(googleMapLink, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaLocationDot
            alt="Google Map"
            className="h-6 w-6 rounded-md"
          />
          <div className="flex flex-col text-start gap-y-1">
           
            <span className="text-gray-500 text-sm">{googleMapName}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { googleMapLink02 && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(googleMapLink02, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaLocationDot
            alt="Google Map"
            className="h-6 w-6 rounded-md"
          />
          <div className="flex flex-col text-start gap-y-1">
           
            <span className="text-gray-500 text-sm">{googleMapName02}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { googleMapLink03 && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(googleMapLink03, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <FaLocationDot
            alt="Google Map"
            className="h-6 w-6 rounded-md"
          />
          <div className="flex flex-col text-start gap-y-1">
           
            <span className="text-gray-500 text-sm">{googleMapName03}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { menuLink && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(menuLink, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <MdOutlineRestaurant
            className="h-6 w-6 rounded-md"
          />
          <div className="flex flex-col text-start gap-y-1">
           
            <span className="text-gray-500 text-sm">{menuName}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { catalogueLink && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(catalogueLink, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <MdOutlineMenuBook
            className="h-6 w-6 rounded-md"
          />
          <div className="flex flex-col text-start gap-y-1">
            
            <span className="text-gray-500 text-sm">{catalogueName}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { profileLink01 && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(profileLink01, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <RiProfileLine
            alt="Profile"
            className="h-6 w-6 rounded-md"
          />
          <div className="flex flex-col text-start gap-y-1">
          
            <span className="text-gray-500 text-sm">{profileName01}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    { profileLink02 && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-start w-full px-5  bg-white text-gray-700  max-w-md"
        onClick={() => window.open(profileLink02, "_blank")}
      >
        <div className="flex items-center space-x-4">
          <RiProfileLine
            alt="Profile"
            className="h-6 w-6 rounded-md"
          />
          <div className="flex flex-col text-start gap-y-1">
          
            <span className="text-gray-500 text-sm">{profileName02}</span>
          </div>
        </div>
       {/* Chevron/Arrow */}
      </button>
    </div>}
    </div>
    </div>

    
      {/* { (img01 != "" || img02 != "" || img03 != "" || img04 != "" || img05 != "" || img05 != "" || img06 != "" || img07 != "" || img08 != "" || img09 != "" || img10 != "" ) &&  <div className="px-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-5">Image Gallery</h2>
      <hr className="border-gray-300" />
      {img01 && (
      <div className="flex flex-col items-center bg-white mx-auto rounded-xl border-4 border-white shadow-md p-1 space-y-2 mt-3">

        <a href={img01}>
          <img
            src={img01}
            alt="Image"
            className="w-100 h-auto rounded-xl shadow-md hover:shadow-lg"
          />
        </a>
      </div>
      )}

{img02 && (<div className="flex flex-col items-center bg-white mx-auto rounded-xl border-4 border-white shadow-md p-1 space-y-2 mt-3">
      <a href={img02}>
        <img
          src={img02}
          alt="Image"
          className="w-100 h-auto rounded-xl shadow-md hover:shadow-lg"
        />
      </a>
    </div>
  )}

{img03 && (<div className="flex flex-col items-center bg-white mx-auto rounded-xl border-4 border-white shadow-md p-1 space-y-2 mt-3">
      <a href={img03}>
        <img
          src={img03}
          alt="Image"
          className="w-100 h-auto rounded-xl shadow-md hover:shadow-lg"
        />
      </a>

    </div>
    )}

{img04 && ( <div className="flex flex-col items-center bg-white mx-auto rounded-xl border-4 border-white shadow-md p-1 space-y-2 mt-3">
      <a href={img04}>
        <img
          src={img04}
          alt="Image"
          className="w-100 h-auto rounded-xl shadow-md hover:shadow-lg"
        />
      </a>
    </div>)}

    {img05 && ( <div className="flex flex-col items-center bg-white mx-auto rounded-xl border-4 border-white shadow-md p-1 space-y-2 mt-3">
      <a href={img05}>
        <img
          src={img05}
          alt="Image"
          className="w-100 h-auto rounded-xl shadow-md hover:shadow-lg"
        />
      </a>
    </div>)}

    {img06 && ( <div className="flex flex-col items-center bg-white mx-auto rounded-xl border-4 border-white shadow-md p-1 space-y-2 mt-3">
      <a href={img06}>
        <img
          src={img06}
          alt="Image"
          className="w-100 h-auto rounded-xl shadow-md hover:shadow-lg"
        />
      </a>

</div>)}

{img07 && (
  <div className="flex flex-col items-center bg-white mx-auto rounded-xl border-4 border-white shadow-md p-1 space-y-2 mt-3">
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
  <div className="flex flex-col items-center bg-white mx-auto rounded-xl border-4 border-white shadow-md p-1 space-y-2 mt-3">
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
  <div className="flex flex-col items-center bg-white mx-auto rounded-xl border-4 border-white shadow-md p-1 space-y-2 mt-3">
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
  <div className="flex flex-col items-center bg-white mx-auto rounded-xl border-4 border-white shadow-md p-1 space-y-2 mt-3">
    <a href={img10}>
      <img
        src={img10}
        alt="Image"
        className="w-100 h-auto rounded-xl shadow-md hover:shadow-lg"
      />
    </a>

  </div>
)}
 </div>} */}
 {(location != "") && <div className="px-1">
      <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-8">Location</h2>
   
      <div className="flex flex-col items-center bg-white mx-auto rounded-xl border-4 border-white shadow-md  space-y-4 mt-3">
        {location && (
         <iframe src={location} width="100%" height="300" allowfullscreen="" loading="lazy" className="rounded-xl"></iframe> 
        )}
      </div>
      </div>}
      { services != "" && <div className="px-4 ">
      <h2 className="text-xl font-semibold text-gray-800 mb-2.5 mt-8">Services</h2>
    
      {services && (
  <div className="flex justify-center  mt-0 w-full px-5  bg-white text-gray-700  max-w-md">
    <a className="flex w-full  text-gray-700  max-w-md">
      <div className="flex items-center space-x-8 w-full">
      <div className="flex flex-row w-full  items-center justify-center gap-x-3">
    <div className="flex flex-col  items-center justify-center max-w-[300px] text-gray-600 pt-1 text-center gap-y-1">
      {services.split("\n").map((line, index) => (
        <div key={index} className="flex items-center space-x-2">
     
          <span>{line}</span>
        </div>
      ))}
    </div>
</div>
</div>
    </a>
  </div>
)}

      </div>}
      <div className="px-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-8">Share Profile</h2>
          <div className="flex justify-center space-x-5 mt-6">
          <div className="social-btn ">
            <FacebookShareButton
              url={currentPageUrl}
              quote="please share this"
              hashtag={`Welcome to ${companyName}. Get to know us at ${currentPageUrl}`}
            >
              <FaFacebookF // Replace with the actual path to the Facebook icon
                alt="Facebook"
                className="w-8 h-8"
              />
            </FacebookShareButton>
          </div>

          <div className="social-btn">
            <TwitterShareButton
              url={currentPageUrl}
              quote="please share this"
              hashtag={`Welcome to ${companyName}. Get to know us at ${currentPageUrl}`}
            >
              <FaTwitter // Replace with the actual path to the Twitter icon
                alt="Twitter"
                className="w-8 h-8"
              />
            </TwitterShareButton>
          </div>

          <div className="social-btn">
            <LinkedinShareButton
              url={currentPageUrl}
              quote="please share this"
              hashtag={`Welcome to ${companyName}. Get to know us at ${currentPageUrl}`}
            >
              <FaLinkedinIn // Replace with the actual path to the LinkedIn icon
                alt="LinkedIn"
                className="w-8 h-8 "
              />
            </LinkedinShareButton>
          </div>

          <div className="social-btn">
            <TelegramShareButton
              url={currentPageUrl}
              quote="please share this"
              hashtag={`Welcome to ${companyName}. Get to know us at ${currentPageUrl}`}
            >
              <FaTelegramPlane // Replace with the actual path to the Telegram icon
                alt="Telegram"
                className="w-8 h-8 "
              />
            </TelegramShareButton>
          </div>

          <div className="social-btn">
            <WhatsappShareButton
              url={currentPageUrl}
              quote="please share this"
              hashtag={`Welcome to ${companyName}. Get to know us at ${currentPageUrl}`}
            >
              <FaWhatsapp // Replace with the actual path to the WhatsApp icon
                alt="WhatsApp"
                className="w-8 h-8"
              />
            </WhatsappShareButton>
          </div>
          </div>

      </div>
      <div className='px-4'>
      <h2 className="text-xl font-semibold text-gray-800 mt-7 px-4">Share Contact & QR</h2>
      <div className="flex justify-center gap-x-6 mt-6 px-4 text-gray-800">
              
              <IoQrCodeSharp size={35} onClick={handleShow} />
           
       
           
              <FaDownload size={30} onClick={downloadContactCard} value="download" />
           
      </div>
        
      <p className="pt-8">Copyright © <span className="company">{companyName}</span>. All Rights Reserved.</p>
      </div>
    </div>
    </div>
    {/* <iframe src={details[i].location} width="600" height="450" allowfullscreen="" loading="lazy"></iframe> */}
          </section>
          }
          </div>
        );
      }
      else{
        return(
    
            <div className={`min-h-screen w-full max-w-md mx-auto shadow-lg pb-5 text-center flex justify-center align-center bg-white pt-[25%]`} style={{ backgroundAttachment: "fixed" }}>
            {/* <ScaleLoader
            color={"white"}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          /> */}
          </div>);
      }
      }

export default Profile07
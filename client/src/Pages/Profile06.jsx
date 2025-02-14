import React from 'react'
import ScaleLoader from "react-spinners/ScaleLoader";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { QRCodeCanvas} from 'qrcode.react';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import phone from "../assets/phone.png"
import addressImg from "../assets/adress.png"
import whatsapp from "../assets/whatsapp.png"
import insta from "../assets/insta.png"
import { useNavigate} from "react-router-dom";
import snap from "../assets/snap.png"
import yt from "../assets/yt.png"
import tiktok from "../assets/tiktok.png"
import threads from "../assets/threads.png"
import fb from "../assets/fb.png"
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
// import ScaleLoader from "react-spinners/ScaleLoader";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { RiMessage2Line } from "react-icons/ri";
import { ImWhatsapp } from "react-icons/im";
import linkedin02 from "../assets/download.png"
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

 
// Used it for a Client make it dynamic by fetching the current client id



  if(client)
  {      return(
  
  <div>

    <section className="main">
  
          {/* <button style={{color:"white", fontSize:"17px", paddingBlock:"8px", paddingInline:"30px", backgroundColor:"rgb(22, 33, 92)", border:"1px solid white", borderRadius:"5px"}} onClick={
            ()=>{
              navigate(`/`)
            }
          }>Logout</button> */}
       
    <Helmet>
    <title>{name}</title>
    </Helmet>

    <div className={`min-h-screen w-full max-w-md mx-auto shadow-lg pb-5 text-center bg-gradient-to-tr from-gray-950 via-gray-900 to-gray-800`} style={{ backgroundAttachment: "fixed" }}>
  
       {logo && (
      <div className="flex  flex-row items-start  justify-between mx-auto rounded-x ps-6 pe-4 space-y-2 mt-4">

        <a href={logo}>
        <div className="relative mb-2 ">
        <img
          src={logo}
          alt="profile"
          className="w-36 h-36 -mt-24 mx-auto rounded-2xl border-[0.25px] border-white shadow-md"
        />
      </div>
        </a>
        <div className="flex items-center justify-center -mt-24 mb-5 gap-x-2">
        <div className="flex justify-start gap-x-1 -mt-5 pb-1 items-center">
          <MdRemoveRedEye size={20} color='white' />
          <p className='text-white'>{visitCount}</p>
        </div>
                  <button className="flex items-start justify-start -mt-5 gap-x-2 rounded-lg py-2.5  px-3 text-sm bg-gray-600 border border-white shadow-sm hover:shadow-md hover:bg-gray-500">
                  {/* <FaDownload size={20} onClick={downloadContactCard} color="black" /> */}
                  <span style={{display:"flex",alignItems:"center",color:"white",justifyContent:"center"
                  }} onClick={downloadContactCard} >Save Contact</span>
                </button>
        
                </div>
      </div>
      )}
      <div className="px-6">
     
       <div className='flex flex-col justify-center items-start pt-0.5'>
      <h2 className="text-lg font-semibold text-white pt-1 ">{name}</h2>
      </div>
    
    { profileLink01 && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-between w-full px-5 py-3  bg-gray-600 hover:bg-gray-500 text-white border-[0.25px] border-white shadow rounded-lg max-w-md"
        onClick={() => window.open(profileLink01, "_blank")}
      >
        <div className="flex items-center space-x-6">
          <img
           src={menu}
            alt="Profile"
            className="h-10 w-10 rounded-md"
          />
          <div className="flex flex-col text-start gap-y-1">
            <span className="font-medium">Profile</span>
            <span className=" text-sm">{profileName01}</span>
          </div>
        </div>
        <SlArrowRight  /> {/* Chevron/Arrow */}
      </button>
    </div>}
    { profileLink02 && <div className="flex justify-center mt-3">
      <button
        className="flex items-center justify-between w-full px-5 py-3  bg-gray-600 hover:bg-gray-500 text-white border-[0.25px] border-white shadow rounded-lg max-w-md"
        onClick={() => window.open(profileLink02, "_blank")}
      >
        <div className="flex items-center space-x-6">
          <img
           src={menu}
            alt="Profile"
            className="h-10 w-10 rounded-md"
          />
          <div className="flex flex-col text-start gap-y-1">
            <span className="font-medium">Profile</span>
            <span className="text-sm">{profileName02}</span>
          </div>
        </div>
        <SlArrowRight  /> {/* Chevron/Arrow */}
      </button>
    </div>}
    </div>

    { services != "" && <div className="px-4 ">
      <h2 className="text-xl font-semibold text-white mb-3 mt-5">Services</h2>
      <hr className="border-gray-300" />
      {services && (
  <div className="flex justify-center mt-2 w-full px-5 py-3 bg  bg-gray-600 hover:bg-gray-500 text-white border-[0.25px] border-white shadow rounded-lg max-w-md">
    <a className="flex w-full py-1  text-gray-700  max-w-md">
      <div className="flex items-center space-x-6 w-full">
      <div className="flex flex-row w-full  items-start justify-between gap-x-3">
    <div className="flex flex-col text-md max-w-[250px] font-medium text-white pt-1 text-start gap-y-1">
      {services.split("\n").map((line, index) => (
        <div key={index} className="flex items-start space-x-2">
          <span className="text-white">•</span>
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
      { (img01 != "" || img02 != "" || img03 != "" || img04 != "" || img05 != "" || img05 != "" || img06 != "" || img07 != "" || img08 != "" || img09 != "" || img10 != "" ) && <div className="px-4">
      <h2 className="text-xl font-semibold text-white mb-3 mt-5">Image Gallery</h2>
      <hr className="border-gray-300" />
      {img01 && (
      <div className="flex flex-col items-center bg-gray-600 mx-auto rounded-xl border-[0.25px] border-white shadow-md space-y-2 mt-3">

        <a href={img01}>
          <img
            src={img01}
            alt="Image"
            className="w-100 h-auto rounded-xl shadow-md hover:shadow-lg"
          />
        </a>
      </div>
      )}

{img02 && (<div className="flex flex-col items-center bg-gray-600 mx-auto rounded-xl border-[0.25px] border-white shadow-md space-y-2 mt-3">
      <a href={img02}>
        <img
          src={img02}
          alt="Image"
          className="w-100 h-auto rounded-xl shadow-md hover:shadow-lg"
        />
      </a>
    </div>
  )}

{img03 && (<div className="flex flex-col items-center bg-gray-600 mx-auto rounded-xl border-[0.25px] border-white shadow-md space-y-2 mt-3">
      <a href={img03}>
        <img
          src={img03}
          alt="Image"
          className="w-100 h-auto rounded-xl shadow-md hover:shadow-lg"
        />
      </a>

    </div>
    )}

{img04 && ( <div className="flex flex-col items-center bg-gray-600 mx-auto rounded-xl border-[0.25px] border-white shadow-md space-y-2 mt-3">
      <a href={img04}>
        <img
          src={img04}
          alt="Image"
          className="w-100 h-auto rounded-xl shadow-md hover:shadow-lg"
        />
      </a>
    </div>)}

    {img05 && ( <div className="flex flex-col items-center bg-gray-600 mx-auto rounded-xl border-[0.25px] border-white shadow-md space-y-2 mt-3">
      <a href={img05}>
        <img
          src={img05}
          alt="Image"
          className="w-100 h-auto rounded-xl shadow-md hover:shadow-lg"
        />
      </a>
    </div>)}

    {img06 && ( <div className="flex flex-col items-center bg-gray-600 mx-auto rounded-xl border-[0.25px] border-white shadow-md space-y-2 mt-3">
      <a href={img06}>
        <img
          src={img06}
          alt="Image"
          className="w-100 h-auto rounded-xl shadow-md hover:shadow-lg"
        />
      </a>

</div>)}

{img07 && (
  <div className="flex flex-col items-center bg-gray-600 mx-auto rounded-xl border-[0.25px] border-white shadow-md space-y-2 mt-3">
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
  <div className="flex flex-col items-center bg-gray-600 mx-auto rounded-xl border-[0.25px] border-white shadow-md space-y-2 mt-3">
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
  <div className="flex flex-col items-center bg-gray-600 mx-auto rounded-xl border-[0.25px] border-white shadow-md space-y-2 mt-3">
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
  <div className="flex flex-col items-center bg-gray-600 mx-auto rounded-xl border-[0.25px] border-white shadow-md space-y-2 mt-3">
    <a href={img10}>
      <img
        src={img10}
        alt="Image"
        className="w-100 h-auto rounded-xl shadow-md hover:shadow-lg"
      />
    </a>

  </div>
)}
 </div>}
      { (location != "") && <div className="px-4">
      <h2 className="text-xl font-semibold text-white mb-3 mt-5">Location</h2>
      <hr className="border-gray-300" />
      <div className="flex flex-col items-center bg-white mx-auto rounded-xl border-[1px] border-white shadow-md  space-y-4 mt-3">
        {location && (
         <iframe src={location} width="100%" height="300" allowfullscreen="" loading="lazy" className="rounded-xl"></iframe> 
        )}
      </div>
      </div>}
      <div className="px-4">
          <h2 className="text-xl font-semibold text-white mb-3 mt-5">Share Profile</h2>
          <hr className="border-gray-300" />
          <div className="flex justify-center space-x-3 mt-3">
          <div className="social-btn ">
            <FacebookShareButton
              url={currentPageUrl}
              quote="please share this"
              hashtag={`Welcome to ${companyName}. Get to know us at ${currentPageUrl}`}
            >
              <img
                src={fb} // Replace with the actual path to the Facebook icon
                alt="Facebook"
                className="w-12 h-12 rounded-full border-2 border-white"
              />
            </FacebookShareButton>
          </div>

          <div className="social-btn">
            <TwitterShareButton
              url={currentPageUrl}
              quote="please share this"
              hashtag={`Welcome to ${companyName}. Get to know us at ${currentPageUrl}`}
            >
              <img
                src={twitter02} // Replace with the actual path to the Twitter icon
                alt="Twitter"
                className="w-12 h-12 rounded-full border-2 border-white"
              />
            </TwitterShareButton>
          </div>

          <div className="social-btn">
            <LinkedinShareButton
              url={currentPageUrl}
              quote="please share this"
              hashtag={`Welcome to ${companyName}. Get to know us at ${currentPageUrl}`}
            >
              <img
                src={linkedin} // Replace with the actual path to the LinkedIn icon
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
                src={telegram} // Replace with the actual path to the Telegram icon
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
                src={whatsapp} // Replace with the actual path to the WhatsApp icon
                alt="WhatsApp"
                className="w-12 h-12 rounded-full border-2 border-white"
              />
            </WhatsappShareButton>
          </div>
          </div>

      </div>
      <div className='px-4'>
      <h2 className="text-xl font-semibold text-white mb-3 mt-5 px-4">Share Contact & QR</h2>
      <hr className="border-gray-300" />
      <div className="flex justify-center space-x-3 mt-3 px-4">
              <div className=" flex justify-center items-center w-16 h-16 rounded-full border-[0.25px] border-white bg-gray-600 hover:bg-gray-500 hover:border-white"  onClick={handleShow} >
              <IoQrCodeSharp size={35} color="white" />
              </div>
       
              <div  className=" flex justify-center items-center w-16 h-16 rounded-full border-[0.25px] border-white  bg-gray-600 hover:bg-gray-500 hover:border-white" onClick={downloadContactCard} value="download">
              <FaDownload size={30} color="white" />
              </div>
      </div>
        
      <p className="pt-4 text-white">Copyright © <span className="company">{companyName}</span>. All Rights Reserved.</p>
      </div>
    </div>

    {/* <iframe src={details[i].location} width="600" height="450" allowfullscreen="" loading="lazy"></iframe> */}
          </section>

          </div>
        );
      }
      else{
        return(
    
            <div className={`min-h-screen w-full max-w-md mx-auto shadow-lg pb-5 text-center flex justify-center align-center bg-gradient-to-tr from-gray-950 via-gray-900 to-gray-800 pt-[25%]`} style={{ backgroundAttachment: "fixed" }}>
            <ScaleLoader
            color={"white"}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          </div>);
      }
      }

export default Profile06
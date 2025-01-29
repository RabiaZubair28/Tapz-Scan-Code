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
import eye from "../assets/eye.jpg"
import telephone from "../assets/telephone01.jpg"
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { RiMessage2Line } from "react-icons/ri";
import { ImWhatsapp } from "react-icons/im";
import linkedin02 from "../assets/download.png"
import { MdRemoveRedEye } from "react-icons/md";
// import { link } from "../../../server/router/auth-router";
const EditPortal01 = () => {

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
      const response = await axios.get(`http://localhost:3500/api/data/client/${clientId}`);
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

var [visitCount, setVisitCount] = useState(0);
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
  visitCount,
  flag
} = client;

var clientId01 = _id; 
// Used it for a Client make it dynamic by fetching the current client id

  useEffect(() => {
    const fetchAndIncrementVisitCount = async () => {
      try {
        // console.log("Fetching visit count...");
        const incrementResponse = await axios.post(`http://localhost:3500/api/visit/${clientId}`);
        // console.log("Current visit count fetched.");
        setVisitCount(incrementResponse.data.count);
        // console.log(`Visit count for client ${clientId} incremented. New count:`, incrementResponse.data.count);
      } catch (error) {
        console.error("Error fetching or incrementing visit count:", error);
      }
    };

    fetchAndIncrementVisitCount();
  }, [clientId]);



  const downloadContactCard = async () => {
   
    // Create a vCard file
    const vcard = `BEGIN:VCARD
    VERSION:3.0
    N:${name};;;;
    FN:${companyName}
    TEL;CELL:${phone01}
    TEL;CELL:${phone02}
    EMAIL;HOME:${email}
    END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);

  
        const newLink = document.createElement('a');
        newLink.download = `${companyName}.vcf`;
        newLink.href = url;
        newLink.click();
    }

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
const [editName, setEditName ]= useState(false)
const [editRomanName, setEditRomanName ]= useState(false)
const [editClientName, setEditClientName ]= useState(false)
const [editPhone01, setEditPhone01]= useState(false)
const [editPhone02, setEditPhone02]= useState(false)
const [editPhone03, setEditPhone03]= useState(false)
const [editTelephone01, setEditTelephone01]= useState(false)
const [editTelephone02, setEditTelephone02]= useState(false)
const [editTelephone03, setEditTelephone03]= useState(false)
const [editDesignation, setEditDesignation]= useState(false)
const [editEmail, setEditEmail]= useState(false)
const [editEmail02, setEditEmail02]= useState(false)
const [editEmail03, setEditEmail03]= useState(false)
const [editDescription, setEditDescription]= useState(false)
const [editWhatsapp01, setEditWhatsapp01 ]= useState(false)
const [editWhatsapp02, setEditWhatsapp02 ]= useState(false)
const [editWhatsapp03, setEditWhatsapp03 ]= useState(false)
const [editInstagram, setEditInstagram ]= useState(false)
const [editInstagram02, setEditInstagram02 ]= useState(false)
const [editInstagram03, setEditInstagram03 ]= useState(false)
const [editSnapchat, setEditSnapchat]= useState(false)
const [editSnapchat02, setEditSnapchat02]= useState(false)
const [editSnapchat03, setEditSnapchat03]= useState(false)
const [editYoutube, setEditYoutube]= useState(false)
const [editYoutube02, setEditYoutube02]= useState(false)
const [editYoutube03, setEditYoutube03]= useState(false)
const [editYoutubeShorts, setEditYoutubeShorts]= useState(false)
const [editYoutubeShorts02, setEditYoutubeShorts02]= useState(false)
const [editYoutubeShorts03, setEditYoutubeShorts03]= useState(false)
const [editTiktok, setEditTiktok]= useState(false)
const [editTiktok02, setEditTiktok02]= useState(false)
const [editTiktok03, setEditTiktok03]= useState(false)
const [editTwitter, setEditTwitter]= useState(false)
const [editTwitter02, setEditTwitter02]= useState(false)
const [editTwitter03, setEditTwitter03]= useState(false)
const [editFacebook, setEditFacebook]= useState(false)
const [editFacebook02, setEditFacebook02]= useState(false)
const [editFacebook03, setEditFacebook03]= useState(false)
const [editGoogleReview, setEditGoogleReview]= useState(false)
const [editGoogleReview02, setEditGoogleReview02]= useState(false)
const [editGoogleReview03, setEditGoogleReview03]= useState(false)
const [editGoogleMap, setEditGoogleMap]= useState(false)
const [editGoogleMap02, setEditGoogleMap02]= useState(false)
const [editGoogleMap03, setEditGoogleMap03]= useState(false)
const [editWebsite, setEditWebsite]= useState(false)
const [editWebsite02, setEditWebsite02]= useState(false)
const [editWebsite03, setEditWebsite03]= useState(false)
const [editAddress, setEditAddress]= useState(false)
const [editMenu, setEditMenu]= useState(false)
const [editCatalogue, setEditCatalogue]= useState(false)
const [editProfile01, setEditProfile01]= useState(false)
const [editProfile02, setEditProfile02]= useState(false)
const [editServices, setEditServices]= useState(false)

const [editImg01, setEditImg01] = useState(false)
const [editImg02, setEditImg02] = useState(false);
const [editImg03, setEditImg03] = useState(false);
const [editImg04, setEditImg04] = useState(false);
const [editImg05, setEditImg05] = useState(false);
const [editImg06, setEditImg06] = useState(false);
const [editImg07, setEditImg07] = useState(false);
const [editImg08, setEditImg08] = useState(false);
const [editImg09, setEditImg09] = useState(false);
const [editImg10, setEditImg10] = useState(false);
const [editLogo, setEditLogo] = useState(false);

const [deleteModal01, setDeleteModal01] = useState(false);
const [deleteModal02, setDeleteModal02] = useState(false);
const [deleteModal03, setDeleteModal03] = useState(false);
const [deleteModal04, setDeleteModal04] = useState(false);
const [deleteModal05, setDeleteModal05] = useState(false);
const [deleteModal06, setDeleteModal06] = useState(false);
const [deleteModal07, setDeleteModal07] = useState(false);
const [deleteModal08, setDeleteModal08] = useState(false);
const [deleteModal09, setDeleteModal09] = useState(false);
const [deleteModal10, setDeleteModal10] = useState(false);
const [deleteModal11, setDeleteModal11] = useState(false);

const [modal, setModal] = useState(false);
const [modal01, setModal01] = useState(false);
const [modal02, setModal02] = useState(false);
const [modal03, setModal03] = useState(false);
const [modal04, setModal04] = useState(false);
const [modal05, setModal05] = useState(false);
const [modal06, setModal06] = useState(false);
const [modal07, setModal07] = useState(false);
const [modal08, setModal08] = useState(false);
const [modal09, setModal09] = useState(false);
const [modal10, setModal10] = useState(false);
const [modal11, setModal11] = useState(false);
const [modal12, setModal12] = useState(false);
const [modal13, setModal13] = useState(false);
const [modal14, setModal14] = useState(false);
const [modal15, setModal15] = useState(false);
const [modal16, setModal16] = useState(false);
const [modal17, setModal17] = useState(false);
const [modal18, setModal18] = useState(false);
const [modal19, setModal19] = useState(false);
const [modal20, setModal20] = useState(false);
const [modal21, setModal21] = useState(false);
const [modal22, setModal22] = useState(false);
const [modal23, setModal23] = useState(false);
const [modal24, setModal24] = useState(false);
const [modal25, setModal25] = useState(false);
const [modal26, setModal26] = useState(false);
const [modal27, setModal27] = useState(false);
const [modal28, setModal28] = useState(false);
const [modal29, setModal29] = useState(false);
const [modal30, setModal30] = useState(false);
const [modal31, setModal31] = useState(false);
const [modal32, setModal32] = useState(false);
const [modal33, setModal33] = useState(false);
const [modal34, setModal34] = useState(false);
const [modal35, setModal35] = useState(false);
const [modal36, setModal36] = useState(false);
const [modal37, setModal37] = useState(false);
const [modal38, setModal38] = useState(false);
const [modal39, setModal39] = useState(false);
const [modal40, setModal40] = useState(false);
const [modal41, setModal41] = useState(false);
const [modal42, setModal42] = useState(false);
const [modal43, setModal43] = useState(false);
const [modal44, setModal44] = useState(false);
const [modal45, setModal45] = useState(false);
const [modal46, setModal46] = useState(false);
const [modal47, setModal47] = useState(false);
const [modal48, setModal48] = useState(false);
const [modal49, setModal49] = useState(false);
const [modal50, setModal50] = useState(false);
const [modal51, setModal51] = useState(false);
const [selected, setSelected] = useState("");
const [selected02, setSelected02] = useState("");
const handleFileUpload = async(event) => {
  const file = event.target.files[0];
  if(!file) return;

  const data = new FormData();
  data.append("file", file)
  data.append("upload_preset", "first_time_using_cloudinary")
  data.append("cloud_name","dxokfhkhu")

  const res = await fetch("https://api.cloudinary.com/v1_1/dxokfhkhu/image/upload",{
    method:"POST",
    body: data
  })

  const uploadedImgURL = await res.json()
  // console.log(uploadedImgURL.url)
  // console.log(file)
  return uploadedImgURL.url;
}

const handleDeleteImg01 = async(id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      img01: ""
    });

    if (response.status === 200) {
      console.log('Image 01 updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }

}
const handleEditImg01 = async (event) => {

  const file = event.target.files[0];
  if(!file) return;

  const data = new FormData();
  data.append("file", file)
  data.append("upload_preset", "first_time_using_cloudinary")
  data.append("cloud_name","dxokfhkhu")

  const res = await fetch("https://api.cloudinary.com/v1_1/dxokfhkhu/image/upload",{
    method:"POST",
    body: data
  })

  const uploadedImgURL = await res.json();
  console.log(uploadedImgURL.url);

  var newImg = uploadedImgURL.url;
  console.log(newImg)
  if(newImg == "")
    {
      return
    } // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/updateImg01/${_id}`, {
      img01: newImg
    });

    if (response.status === 200) {
      console.log('Img 01 updated successfully:', response.data);
      window.location.reload()
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
// const handleDeleteLogo = async(id) => {
//   try {
//     const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
//       logo: ""
//     });

//     if (response.status === 200) {
//       console.log('Logo updated successfully:', response.data);
//       // Update the state or trigger a re-render here as needed
//     }
//   } catch (error) {
//     console.error('Error updating name:', error);
//   }

// }
const handleEditLogo = async (event) => {

  const file = event.target.files[0];
  if(!file) return;

  const data = new FormData();
  data.append("file", file)
  data.append("upload_preset", "first_time_using_cloudinary")
  data.append("cloud_name","dxokfhkhu")

  const res = await fetch("https://api.cloudinary.com/v1_1/dxokfhkhu/image/upload",{
    method:"POST",
    body: data
  })

  const uploadedImgURL = await res.json();
  console.log(uploadedImgURL.url);

  var newImg = uploadedImgURL.url;
  console.log(newImg)
  if(newImg == "")
    {
      return
    } // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/updateLogo/${_id}`, {
      logo: newImg
    });

    if (response.status === 200) {
      console.log('Logo updated successfully:', response.data);
      window.location.reload()
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleDeleteImg02 = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      img02: ""
    });

    if (response.status === 200) {
      console.log('Image 02 updated successfully:', response.data);
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleEditImg02 = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "first_time_using_cloudinary");
  data.append("cloud_name", "dxokfhkhu");

  const res = await fetch("https://api.cloudinary.com/v1_1/dxokfhkhu/image/upload", {
    method: "POST",
    body: data
  });

  const uploadedImgURL = await res.json();
  console.log(uploadedImgURL.url);

  const newImg = uploadedImgURL.url;
  if (newImg === "") {
    return;
  }

  try {
    const response = await axios.put(`http://localhost:3500/api/data/updateImg02/${_id}`, {
      img02: newImg
    });

    if (response.status === 200) {
      console.log('Img 02 updated successfully:', response.data);
      window.location.reload()
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleDeleteImg03 = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      img03: ""
    });

    if (response.status === 200) {
      console.log('Image 03 updated successfully:', response.data);
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleEditImg03 = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "first_time_using_cloudinary");
  data.append("cloud_name", "dxokfhkhu");

  const res = await fetch("https://api.cloudinary.com/v1_1/dxokfhkhu/image/upload", {
    method: "POST",
    body: data
  });

  const uploadedImgURL = await res.json();
  console.log(uploadedImgURL.url);

  const newImg = uploadedImgURL.url;
  if (newImg === "") {
    return;
  }

  try {
    const response = await axios.put(`http://localhost:3500/api/data/updateImg03/${_id}`, {
      img03: newImg
    });

    if (response.status === 200) {
      console.log('Img 03 updated successfully:', response.data);
      window.location.reload()
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleDeleteImg04 = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      img04: ""
    });

    if (response.status === 200) {
      console.log('Image 04 updated successfully:', response.data);
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleEditImg04 = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "first_time_using_cloudinary");
  data.append("cloud_name", "dxokfhkhu");

  const res = await fetch("https://api.cloudinary.com/v1_1/dxokfhkhu/image/upload", {
    method: "POST",
    body: data
  });

  const uploadedImgURL = await res.json();
  console.log(uploadedImgURL.url);

  const newImg = uploadedImgURL.url;
  if (newImg === "") {
    return;
  }

  try {
    const response = await axios.put(`http://localhost:3500/api/data/updateImg04/${_id}`, {
      img04: newImg
    });

    if (response.status === 200) {
      console.log('Img 04 updated successfully:', response.data);
      window.location.reload()
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleDeleteImg05 = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      img05: ""
    });

    if (response.status === 200) {
      console.log('Image 05 updated successfully:', response.data);
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleEditImg05 = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "first_time_using_cloudinary");
  data.append("cloud_name", "dxokfhkhu");

  const res = await fetch("https://api.cloudinary.com/v1_1/dxokfhkhu/image/upload", {
    method: "POST",
    body: data
  });

  const uploadedImgURL = await res.json();
  console.log(uploadedImgURL.url);

  const newImg = uploadedImgURL.url;
  if (newImg === "") {
    return;
  }

  try {
    const response = await axios.put(`http://localhost:3500/api/data/updateImg05/${_id}`, {
      img05: newImg
    });

    if (response.status === 200) {
      console.log('Img 05 updated successfully:', response.data);
      window.location.reload()
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleDeleteImg06 = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      img06: ""
    });

    if (response.status === 200) {
      console.log('Image 06 updated successfully:', response.data);
      
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleEditImg06 = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "first_time_using_cloudinary");
  data.append("cloud_name", "dxokfhkhu");

  const res = await fetch("https://api.cloudinary.com/v1_1/dxokfhkhu/image/upload", {
    method: "POST",
    body: data
  });

  const uploadedImgURL = await res.json();
  console.log(uploadedImgURL.url);

  const newImg = uploadedImgURL.url;
  if (newImg === "") {
    return;
  }

  try {
    const response = await axios.put(`http://localhost:3500/api/data/updateImg06/${_id}`, {
      img06: newImg
    });

    if (response.status === 200) {
      console.log('Img 06 updated successfully:', response.data);
      window.location.reload()
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleDeleteImg07 = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      img07: ""
    });

    if (response.status === 200) {
      console.log('Image 07 updated successfully:', response.data);
 
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleEditImg07 = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "first_time_using_cloudinary");
  data.append("cloud_name", "dxokfhkhu");

  const res = await fetch("https://api.cloudinary.com/v1_1/dxokfhkhu/image/upload", {
    method: "POST",
    body: data
  });

  const uploadedImgURL = await res.json();
  console.log(uploadedImgURL.url);

  const newImg = uploadedImgURL.url;
  if (newImg === "") {
    return;
  }

  try {
    const response = await axios.put(`http://localhost:3500/api/data/updateImg07/${_id}`, {
      img07: newImg
    });

    if (response.status === 200) {
      console.log('Img 07 updated successfully:', response.data);
      window.location.reload()
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleDeleteImg08 = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      img08: ""
    });

    if (response.status === 200) {
      console.log('Image 08 updated successfully:', response.data);
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleEditImg08 = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "first_time_using_cloudinary");
  data.append("cloud_name", "dxokfhkhu");

  const res = await fetch("https://api.cloudinary.com/v1_1/dxokfhkhu/image/upload", {
    method: "POST",
    body: data
  });

  const uploadedImgURL = await res.json();
  console.log(uploadedImgURL.url);

  const newImg = uploadedImgURL.url;
  if (newImg === "") {
    return;
  }

  try {
    const response = await axios.put(`http://localhost:3500/api/data/updateImg08/${_id}`, {
      img08: newImg
    });

    if (response.status === 200) {
      console.log('Img 08 updated successfully:', response.data);
      window.location.reload()
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleDeleteImg09 = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      img09: ""
    });

    if (response.status === 200) {
      console.log('Image 09 updated successfully:', response.data);
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleEditImg09 = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "first_time_using_cloudinary");
  data.append("cloud_name", "dxokfhkhu");

  const res = await fetch("https://api.cloudinary.com/v1_1/dxokfhkhu/image/upload", {
    method: "POST",
    body: data
  });

  const uploadedImgURL = await res.json();
  console.log(uploadedImgURL.url);

  const newImg = uploadedImgURL.url;
  if (newImg === "") {
    return;
  }

  try {
    const response = await axios.put(`http://localhost:3500/api/data/updateImg09/${_id}`, {
      img09: newImg
    });

    if (response.status === 200) {
      console.log('Img 09 updated successfully:', response.data);
      window.location.reload()
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleDeleteImg10 = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      img10: ""
    });

    if (response.status === 200) {
      console.log('Image 10 updated successfully:', response.data);
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleEditImg10 = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "first_time_using_cloudinary");
  data.append("cloud_name", "dxokfhkhu");

  const res = await fetch("https://api.cloudinary.com/v1_1/dxokfhkhu/image/upload", {
    method: "POST",
    body: data
  });

  const uploadedImgURL = await res.json();
  console.log(uploadedImgURL.url);

  const newImg = uploadedImgURL.url;
  if (newImg === "") {
    return;
  }

  try {
    const response = await axios.put(`http://localhost:3500/api/data/updateImg10/${_id}`, {
      img10: newImg
    });

    if (response.status === 200) {
      console.log('Img 10 updated successfully:', response.data);
      window.location.reload()
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleEditName = async (id) => {
  var newName = document.getElementById('name').value;
  console.log(newName)
  if(newName == "")
    {
      newName = name;
    } // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      name: newName
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleEditTelephone01 = async (id) => {
  var newTelephone01 = document.getElementById('telephone01').value;
  console.log(newTelephone01)
  if(newTelephone01 == "")
    {
      newTelephone01 = telephone01;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      telephone01: newTelephone01
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddTelephone01 = async (id) => {
  var addTelephone01= document.getElementById('add-link').value;
  console.log(addTelephone01) // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      telephone01: addTelephone01
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteTelephone01 = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
     telephone01: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditTelephone02 = async (id) => {
  var newTelephone02 = document.getElementById('telephone02').value;
  console.log(newTelephone02)
  if(newTelephone02 == "")
    {
      newTelephone02 = telephone02;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      telephone02: newTelephone02
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddTelephone02 = async (id) => {
  var addTelephone02= document.getElementById('add-link').value;
  console.log(addTelephone02) // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      telephone02: addTelephone02
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteTelephone02 = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
     telephone02: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditTelephone03 = async (id) => {
  var newTelephone03 = document.getElementById('telephone03').value;
  console.log(newTelephone03)
  if(newTelephone03 == "")
    {
      newTelephone03 = telephone03;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      telephone03: newTelephone03
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddTelephone03 = async (id) => {
  var addTelephone03= document.getElementById('add-link').value;
  console.log(addTelephone03) // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      telephone03: addTelephone03
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteTelephone03 = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
     telephone03: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleAddName = async (id) => {
  var addName = document.getElementById('add-link').value;
  console.log(addName) // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      name: addName
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteName = async (id) => {
   // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      name: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleEditServices = async (id) => {
  var newServices = document.getElementById('services').value;
  console.log(newServices)
  if(newServices == "")
    {
      newServices = services;
    } // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      services: newServices
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddServices = async (id) => {
  var addServices = document.getElementById('add-link').value;
  console.log(addServices) // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      services: addServices
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteServices = async (id) => {
   // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      services: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleEditRomanName = async (id) => {
  var newNameRoman = document.getElementById('roman-name').value;
  console.log(newNameRoman)
  if(newNameRoman == "")
    {
      newNameRoman = romanName;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      romanName: newNameRoman
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddRomanName = async (id) => {
  var addRomanName = document.getElementById('add-link').value;
  console.log(addRomanName) // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      romanName: addRomanName
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteRomanName = async (id) => {
   // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      romanName: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleEditClientName = async (id) => {
  var newClientName = document.getElementById('client-name').value;
  console.log(newClientName )
  if(newClientName  == "")
    {
      newClientName  = clientName;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      clientName: newClientName 
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddClientName = async (id) => {
  var addClientName = document.getElementById('add-link').value;
  console.log(addClientName) // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      clientName: addClientName
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteClientName = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
     clientName: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditDesignation = async (id) => {
  var newDesignation = document.getElementById('designation').value;
  console.log(newDesignation )
  if(newDesignation  == "")
    {
      newDesignation  = designation;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      designation: newDesignation 
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleDeleteDesignation = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
     designation: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditEmail = async (id) => {
  var newEmail = document.getElementById('email').value;
  console.log(newEmail )
  if(newEmail  == "")
    {
      newEmail  = email;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      email: newEmail
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddEmail = async (id) => {
  var addEmail = document.getElementById('add-link').value;
  console.log(addEmail) // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      email: addEmail
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteEmail = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
     email: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleAddEmail02 = async (id) => {
  var addEmail = document.getElementById('add-link').value;
  console.log(addEmail) // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      email02: addEmail
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleEditEmail02 = async (id) => {
  var newEmail02 = document.getElementById('email02').value;
  console.log(newEmail02 )
  if(newEmail02  == "")
    {
      newEmail02  = email;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      email02: newEmail02
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleDeleteEmail02 = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
     email02: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleAddEmail03 = async (id) => {
  var addEmail = document.getElementById('add-link').value;
  console.log(addEmail) // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      email03: addEmail
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleEditEmail03 = async (id) => {
  var newEmail03 = document.getElementById('email03').value;
  console.log(newEmail03 )
  if(newEmail03  == "")
    {
      newEmail03  = email;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      email03: newEmail03
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleDeleteEmail03 = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
     email03: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditDescription = async (id) => {
  var newDescription = document.getElementById('description').value;
  console.log(newDescription )
  if(newDescription  == "")
    {
      newDescription = description;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      description:newDescription
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleDeleteDescription = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
     description: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditPhone01 = async (id) => {
  var newPhone01 = document.getElementById('phone01').value;
  console.log(newPhone01)
  if(newPhone01 == "")
    {
      newPhone01 = phone01;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      phone01: newPhone01
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddPhone01 = async (id) => {
  var addPhone01= document.getElementById('add-link').value;
  console.log(addPhone01) // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      phone01: addPhone01
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeletePhone01 = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
     phone01: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditPhone02 = async (id) => {
  var newPhone02 = document.getElementById('phone02').value;
  console.log(newPhone02)
  if(newPhone02 == "")
    {
      newPhone02 = phone02;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      phone02: newPhone02
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddPhone02 = async (id) => {
  var addPhone02= document.getElementById('add-link').value;
  console.log(addPhone02) // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      phone02: addPhone02
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};

const handleDeletePhone02 = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
     phone02: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditPhone03 = async (id) => {
  var newPhone03 = document.getElementById('phone03').value;
  console.log(newPhone03)
  if(newPhone03 == "")
    {
      newPhone03 = phone03;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      phone03: newPhone03
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddPhone03 = async (id) => {
  var addPhone03= document.getElementById('add-link').value;
  console.log(addPhone03) // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      phone03: addPhone03
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeletePhone03 = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
     phone03: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};

const handleAddWhatsapp01 = async (id) => {
  var addWhatsapp01= document.getElementById('add-link').value;
  console.log(addWhatsapp01) // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      whatsapp01: addWhatsapp01
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleEditWhatsapp01 = async (id) => {
  var newWhatsapp01 = document.getElementById('whatsapp01').value;
  console.log(newWhatsapp01)
  if(newWhatsapp01 == "")
    {
      newWhatsapp01 = whatsapp01;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      whatsapp01: newWhatsapp01
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleDeleteWhatsapp01 = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
     whatsapp01: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditWhatsapp02 = async (id) => {
  var newWhatsapp02 = document.getElementById('whatsapp02').value;
  console.log(newWhatsapp02)
  if(newWhatsapp02 == "")
    {
      newWhatsapp02 = whatsapp02;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      whatsapp02: newWhatsapp02
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddWhatsapp02 = async (id) => {
  var addWhatsapp02= document.getElementById('add-link').value;
  console.log(addWhatsapp02) // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      whatsapp02: addWhatsapp02
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteWhatsapp02 = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
     whatsapp02: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditWhatsapp03 = async (id) => {
  var newWhatsapp03 = document.getElementById('whatsapp03').value;
  console.log(newWhatsapp03)
  if(newWhatsapp03 == "")
    {
      newWhatsapp03 = whatsapp03;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      whatsapp03: newWhatsapp03
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddWhatsapp03 = async (id) => {
  var addWhatsapp03= document.getElementById('add-link').value;
  console.log(addWhatsapp03) // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      whatsapp03: addWhatsapp03
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteWhatsapp03 = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
     whatsapp03: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditInstagram = async (id) => {
  var newInstagram  = document.getElementById('instagram').value;
  var newInstagramText  = document.getElementById('instagramText').value;
  console.log(newInstagram )
  if(newInstagram  == "")
    {
      newInstagram  = instagramLink;
      console.log("here")
    }
  if(newInstagramText == "")
    {
      newInstagramText = instagramName;
    } // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      instagramLink: newInstagram,
      instagramName: newInstagramText
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddInstagram = async (id) => {
  var addInstagram = document.getElementById('add-link').value;
  var addInstagramText = document.getElementById('add-link-text').value;
  console.log(addInstagram) // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      instagramLink: addInstagram,
      instagramName: addInstagramText
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteInstagram = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
    instagramLink: "",
    instagramName:""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditInstagram02 = async (id) => {
  var newInstagram02  = document.getElementById('instagram02').value;
  var newInstagramText02  = document.getElementById('instagramText02').value;
  console.log(newInstagram02 )
  if(newInstagram02  == "")
    {
      newInstagram02  = instagramLink02;
  
      console.log("here")
    } // Get the new name from the input
    if(newInstagramText02 == "")
      {
        newInstagramText02 = instagramName02;
      }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      instagramLink02: newInstagram02,
      instagramName02: newInstagramText02
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddInstagram02 = async (id) => {
  var addInstagram02 = document.getElementById('add-link').value;
  var addInstagramText02 = document.getElementById('add-link-text').value;
  console.log(addInstagram02) // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      instagramLink02: addInstagram02,
      instagramName02: addInstagramText02
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteInstagram02 = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
    instagramLink02: "",
    instagramName02:""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditInstagram03 = async (id) => {
  var newInstagram03  = document.getElementById('instagram03').value;
  var newInstagramText03  = document.getElementById('instagramText03').value;
  console.log(newInstagram03)
  if(newInstagram03  == "") {
      newInstagram03  = instagramLink03;
      console.log("here");
  } // Get the new name from the input
  if(newInstagramText03 == "") {
      newInstagramText03 = instagramName03;
  }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      instagramLink03: newInstagram03,
      instagramName03: newInstagramText03
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddInstagram03 = async (id) => {
  var addInstagram03 = document.getElementById('add-link').value;
  var addInstagramText03 = document.getElementById('add-link-text').value;
  console.log(addInstagram03) // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      instagramLink03: addInstagram03,
      instagramName03: addInstagramText03
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteInstagram03 = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
    instagramLink03: "",
    instagramName03:""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditSnapchat = async (id) => {
  var newSnapchat = document.getElementById('snapchat').value;
  var newSnapchatText = document.getElementById('snapchatText').value;
  console.log(newSnapchat);
  if (newSnapchat == "") {
    newSnapchat = snapchatLink;
    console.log("here");
  }
  if (newSnapchatText == "") {
    newSnapchatText = snapchatName;
  }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      snapchatLink: newSnapchat,
      snapchatName: newSnapchatText
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddSnapchat = async (id) => {
  var addSnapchat = document.getElementById('add-link').value;
  var addSnapchatText = document.getElementById('add-link-text').value;
  console.log(addSnapchat); // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      snapchatLink: addSnapchat,
      snapchatName: addSnapchatText
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};

const handleDeleteSnapchat = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      snapchatLink: "",
      snapchatName: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleEditSnapchat02 = async (id) => {
  var newSnapchat02 = document.getElementById('snapchat02').value;
  var newSnapchatText02 = document.getElementById('snapchatText02').value;
  console.log(newSnapchat02);
  if (newSnapchat02 == "") {
    newSnapchat02 = snapchatLink02;
    console.log("here");
  }
  if (newSnapchatText02 == "") {
    newSnapchatText02 = snapchatName02;
  }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      snapchatLink02: newSnapchat02,
      snapchatName02: newSnapchatText02
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleAddSnapchat02 = async (id) => {
  var addSnapchat02 = document.getElementById('add-link').value;
  var addSnapchatText02 = document.getElementById('add-link-text').value;
  console.log(addSnapchat02); // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      snapchatLink02: addSnapchat02,
      snapchatName02: addSnapchatText02
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};

const handleDeleteSnapchat02 = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      snapchatLink02: "",
      snapchatName02: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleEditSnapchat03 = async (id) => {
  var newSnapchat03 = document.getElementById('snapchat03').value;
  var newSnapchatText03 = document.getElementById('snapchatText03').value;
  console.log(newSnapchat03);
  if (newSnapchat03 == "") {
    newSnapchat03 = snapchatLink03;
    console.log("here");
  }
  if (newSnapchatText03 == "") {
    newSnapchatText03 = snapchatName03;
  }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      snapchatLink03: newSnapchat03,
      snapchatName03: newSnapchatText03
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleAddSnapchat03 = async (id) => {
  var addSnapchat03 = document.getElementById('add-link').value;
  var addSnapchatText03 = document.getElementById('add-link-text').value;
  console.log(addSnapchat03); // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      snapchatLink03: addSnapchat03,
      snapchatName03: addSnapchatText03
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};

const handleDeleteSnapchat03 = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      snapchatLink03: "",
      snapchatName03: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleAddYoutube = async (id) => {
  var addYoutube = document.getElementById('add-link').value;
  var addYoutubeText = document.getElementById('add-link-text').value;
  console.log(addYoutube); // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      youtubeLink: addYoutube,
      youtubeName: addYoutubeText
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleEditYoutube = async (id) => {
  var newYoutube = document.getElementById('youtube').value;
  var newYoutubeText = document.getElementById('youtubeText').value;
  console.log(newYoutube);
  if (newYoutube == "") {
    newYoutube = youtubeLink;
    console.log("here");
  }
  if (newYoutubeText == "") {
    newYoutubeText = youtubeName;
  }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      youtubeLink: newYoutube,
      youtubeName: newYoutubeText
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleDeleteYoutube = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      youtubeLink: "",
      youtubeName: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleEditYoutube02 = async (id) => {
  var newYoutube02 = document.getElementById('youtube02').value;
  var newYoutubeText02 = document.getElementById('youtubeText02').value;
  console.log(newYoutube02);
  if (newYoutube02 == "") {
    newYoutube02 = youtubeLink02;
    console.log("here");
  }
  if (newYoutubeText02 == "") {
    newYoutubeText02 = youtubeName02;
  }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      youtubeLink02: newYoutube02,
      youtubeName02: newYoutubeText02
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleAddYoutube02 = async (id) => {
  var addYoutube02 = document.getElementById('add-link').value;
  var addYoutubeText02 = document.getElementById('add-link-text').value;
  console.log(addYoutube02); // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      youtubeLink02: addYoutube02,
      youtubeName02: addYoutubeText02
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};

const handleDeleteYoutube02 = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      youtubeLink02: "",
      youtubeName02: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleEditYoutube03 = async (id) => {
  var newYoutube03 = document.getElementById('youtube03').value;
  var newYoutubeText03 = document.getElementById('youtubeText03').value;
  console.log(newYoutube03);
  if (newYoutube03 == "") {
    newYoutube03 = youtubeLink03;
    console.log("here");
  }
  if (newYoutubeText03 == "") {
    newYoutubeText03 = youtubeName03;
  }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      youtubeLink03: newYoutube03,
      youtubeName03: newYoutubeText03
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleAddYoutube03 = async (id) => {
  var addYoutube03 = document.getElementById('add-link').value;
  var addYoutubeText03 = document.getElementById('add-link-text').value;
  console.log(addYoutube03); // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      youtubeLink03: addYoutube03,
      youtubeName03: addYoutubeText03
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};

const handleDeleteYoutube03 = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      youtubeLink03: "",
      youtubeName03: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleEditYoutubeShorts = async (id) => {
  var newYoutubeShorts = document.getElementById('youtubeShorts').value;
  var newYoutubeShortsText = document.getElementById('youtubeShortsText').value;
  console.log(newYoutubeShorts);
  if (newYoutubeShorts == "") {
    newYoutubeShorts = youtubeShortsLink;
    console.log("here");
  }
  if (newYoutubeShortsText == "") {
    newYoutubeShortsText = youtubeShortsName;
  }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      youtubeShortsLink: newYoutubeShorts,
      youtubeShortsName: newYoutubeShortsText
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleAddYoutubeShorts = async (id) => {
  var addYoutubeShorts = document.getElementById('add-link').value;
  var addYoutubeShortsText = document.getElementById('add-link-text').value;
  console.log(addYoutubeShorts); // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      youtubeShortsLink: addYoutubeShorts,
      youtubeShortsName: addYoutubeShortsText
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};

const handleDeleteYoutubeShorts = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      youtubeShortsLink: "",
      youtubeShortsName: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleEditYoutubeShorts02 = async (id) => {
  var newYoutubeShorts02 = document.getElementById('youtubeShorts02').value;
  var newYoutubeShortsText02 = document.getElementById('youtubeShortsText02').value;
  console.log(newYoutubeShorts02);
  if (newYoutubeShorts02 == "") {
    newYoutubeShorts02 = youtubeShortsLink02;
    console.log("here");
  }
  if (newYoutubeShortsText02 == "") {
    newYoutubeShortsText02 = youtubeShortsName02;
  }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      youtubeShortsLink02: newYoutubeShorts02,
      youtubeShortsName02: newYoutubeShortsText02
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleAddYoutubeShorts02 = async (id) => {
  var addYoutubeShorts02 = document.getElementById('add-link').value;
  var addYoutubeShortsText02 = document.getElementById('add-link-text').value;
  console.log(addYoutubeShorts02); // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      youtubeShortsLink02: addYoutubeShorts02,
      youtubeShortsName02: addYoutubeShortsText02
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};

const handleDeleteYoutubeShorts02 = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      youtubeShortsLink02: "",
      youtubeShortsName02: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleEditYoutubeShorts03 = async (id) => {
  var newYoutubeShorts03 = document.getElementById('youtubeShorts03').value;
  var newYoutubeShortsText03 = document.getElementById('youtubeShortsText03').value;
  console.log(newYoutubeShorts03);
  if (newYoutubeShorts03 == "") {
    newYoutubeShorts03 = youtubeShortsLink03;
    console.log("here");
  }
  if (newYoutubeShortsText03 == "") {
    newYoutubeShortsText03 = youtubeShortsName03;
  }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      youtubeShortsLink03: newYoutubeShorts03,
      youtubeShortsName03: newYoutubeShortsText03
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleAddYoutubeShorts03 = async (id) => {
  var addYoutubeShorts03 = document.getElementById('add-link').value;
  var addYoutubeShortsText03 = document.getElementById('add-link-text').value;
  console.log(addYoutubeShorts03); // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      youtubeShortsLink03: addYoutubeShorts03,
      youtubeShortsName03: addYoutubeShortsText03
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};

const handleDeleteYoutubeShorts03 = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      youtubeShortsLink03: "",
      youtubeShortsName03: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleEditTiktok = async (id) => {
  var newTiktok = document.getElementById('tiktok').value;
  var newTiktokText = document.getElementById('tiktokText').value;
  console.log(newTiktok);
  if (newTiktok == "") {
    newTiktok = tiktokLink;
    console.log("here");
  }
  if (newTiktokText == "") {
    newTiktokText = tiktokName;
  }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      tiktokLink: newTiktok,
      tiktokName: newTiktokText
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleAddTiktok = async (id) => {
  var addTiktok = document.getElementById('add-link').value;
  var addTiktokText = document.getElementById('add-link-text').value;
  console.log(addTiktok); // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      tiktokLink: addTiktok,
      tiktokName: addTiktokText
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};

const handleDeleteTiktok = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      tiktokLink: "",
      tiktokName: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleEditTiktok02 = async (id) => {
  var newTiktok02 = document.getElementById('tiktok02').value;
  var newTiktokText02 = document.getElementById('tiktokText02').value;
  console.log(newTiktok02);
  if (newTiktok02 == "") {
    newTiktok02 = tiktokLink02;
    console.log("here");
  }
  if (newTiktokText02 == "") {
    newTiktokText02 = tiktokName02;
  }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      tiktokLink02: newTiktok02,
      tiktokName02: newTiktokText02
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleAddTiktok02 = async (id) => {
  var addTiktok02 = document.getElementById('add-link').value;
  var addTiktokText02 = document.getElementById('add-link-text').value;
  console.log(addTiktok02); // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      tiktokLink02: addTiktok02,
      tiktokName02: addTiktokText02
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};

const handleDeleteTiktok02 = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      tiktokLink02: "",
      tiktokName02: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleEditTiktok03 = async (id) => {
  var newTiktok03 = document.getElementById('tiktok03').value;
  var newTiktokText03 = document.getElementById('tiktokText03').value;
  console.log(newTiktok03);
  if (newTiktok03 == "") {
    newTiktok03 = tiktokLink03;
    console.log("here");
  }
  if (newTiktokText03 == "") {
    newTiktokText03 = tiktokName03;
  }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      tiktokLink03: newTiktok03,
      tiktokName03: newTiktokText03
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleAddTiktok03 = async (id) => {
  var addTiktok03 = document.getElementById('add-link').value;
  var addTiktokText03 = document.getElementById('add-link-text').value;
  console.log(addTiktok03); // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      tiktokLink03: addTiktok03,
      tiktokName03: addTiktokText03
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};

const handleDeleteTiktok03 = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      tiktokLink03: "",
      tiktokName03: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleEditTwitter = async (id) => {
  var newTwitter = document.getElementById('twitter').value;
  var newTwitterText = document.getElementById('twitterText').value;
  console.log(newTwitter);
  if (newTwitter == "") {
    newTwitter = twitterLink;
    console.log("here");
  }
  if (newTwitterText == "") {
    newTwitterText = twitterName;
  }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      twitterLink: newTwitter,
      twitterName: newTwitterText
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddTwitter = async (id) => {
  var addTwitter = document.getElementById('add-link').value;
  var addTwitterText = document.getElementById('add-link-text').value;
  console.log(addTwitter); // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      twitterLink: addTwitter,
      twitterName: addTwitterText
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};

const handleDeleteTwitter = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      twitterLink: "",
      twitterName: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleEditTwitter02 = async (id) => {
  var newTwitter02 = document.getElementById('twitter02').value;
  var newTwitterText02 = document.getElementById('twitterText02').value;
  console.log(newTwitter02);
  if (newTwitter02 == "") {
    newTwitter02 = twitterLink02;
    console.log("here");
  }
  if (newTwitterText02 == "") {
    newTwitterText02 = twitterName02;
  }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      twitterLink02: newTwitter02,
      twitterName02: newTwitterText02
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleAddTwitter02 = async (id) => {
  var addTwitter02 = document.getElementById('add-link').value;
  var addTwitterText02 = document.getElementById('add-link-text').value;
  console.log(addTwitter02); // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      twitterLink02: addTwitter02,
      twitterName02: addTwitterText02
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};

const handleDeleteTwitter02 = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      twitterLink02: "",
      twitterName02: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleEditTwitter03 = async (id) => {
  var newTwitter03 = document.getElementById('twitter03').value;
  var newTwitterText03 = document.getElementById('twitterText03').value;
  console.log(newTwitter03);
  if (newTwitter03 == "") {
    newTwitter03 = twitterLink03;
    console.log("here");
  }
  if (newTwitterText03 == "") {
    newTwitterText03 = twitterName03;
  }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      twitterLink03: newTwitter03,
      twitterName03: newTwitterText03
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleAddTwitter03 = async (id) => {
  var addTwitter03 = document.getElementById('add-link').value;
  var addTwitterText03 = document.getElementById('add-link-text').value;
  console.log(addTwitter03); // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      twitterLink03: addTwitter03,
      twitterName03: addTwitterText03
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};

const handleDeleteTwitter03 = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      twitterLink03: "",
      twitterName03: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleEditFacebook = async (id) => {
  var newFacebook  = document.getElementById('facebook').value;
  var newFacebookText  = document.getElementById('facebookText').value;
  console.log(newFacebook )
  if(newFacebook  == "")
    {
      newFacebook  = facebookLink;
      console.log("here")
    }
  if(newFacebookText == "")
    {
      newFacebookText = facebookName;
    } // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      facebookLink: newFacebook,
      facebookName: newFacebookText
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddFacebook = async (id) => {
  var addFacebook = document.getElementById('add-link').value;
  var addFacebookText = document.getElementById('add-link-text').value;
  console.log(addFacebook) // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      facebookLink: addFacebook,
      facebookName: addFacebookText
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteFacebook = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
     facebookLink: "",
     facebookName:""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditFacebook02 = async (id) => {
  var newFacebook02  = document.getElementById('facebook02').value;
  var newFacebookText02  = document.getElementById('facebookText02').value;
  console.log(newFacebook02 )
  if(newFacebook02  == "")
    {
      newFacebook02  = facebookLink02;
  
      console.log("here")
    } // Get the new name from the input
    if(newFacebookText02 == "")
      {
        newFacebookText02 = facebookName02;
      }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      facebookLink02: newFacebook02,
      facebookName02: newFacebookText02
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddFacebook02 = async (id) => {
  var addFacebook02 = document.getElementById('add-link').value;
  var addFacebookText02 = document.getElementById('add-link-text').value;
  console.log(addFacebook02) // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      facebookLink02: addFacebook02,
      facebookName02: addFacebookText02
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteFacebook02 = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
     facebookLink02: "",
     facebookName02:""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
};
const handleEditFacebook03 = async (id) => {
  var newFacebook03 = document.getElementById('facebook03').value;
  var newFacebookText03 = document.getElementById('facebookText03').value;
  console.log(newFacebook03);
  if (newFacebook03 == "") {
    newFacebook03 = facebookLink03;
    console.log("here");
  } // Get the new name from the input
  if(newFacebookText03 == "")
    {
      newFacebookText03 = facebookName03;
    }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      facebookLink03: newFacebook03,
      facebookName03: newFacebookText03
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleAddFacebook03 = async (id) => {
  var addFacebook03 = document.getElementById('add-link').value;
  var addFacebookText03 = document.getElementById('add-link-text').value;
  console.log(addFacebook03); // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      facebookLink03: addFacebook03,
      facebookName03: addFacebookText03
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};

const handleDeleteFacebook03 = async (id) => {
  // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      facebookLink03: "",
      facebookName03: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleEditGoogleReview = async (id) => {
  var newGoogleReview  = document.getElementById('googleReview').value;
  var newGoogleReviewText  = document.getElementById('googleReviewText').value;
  console.log(newGoogleReview)
  if(newGoogleReview  == "") {
    newGoogleReview  = googleReviewLink;
    console.log("here")
  }
  if(newGoogleReviewText == "") {
    newGoogleReviewText = googleReviewName;
  } // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      googleReviewLink: newGoogleReview,
      googleReviewName: newGoogleReviewText
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleAddGoogleReview = async (id) => {
  var addGoogleReview = document.getElementById('add-link').value;
  var addGoogleReviewText = document.getElementById('add-link-text').value;
  console.log(addGoogleReview) // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      googleReviewLink: addGoogleReview,
      googleReviewName: addGoogleReviewText
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};

const handleDeleteGoogleReview = async (id) => {
  // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      googleReviewLink: "",
      googleReviewName: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleEditGoogleReview02 = async (id) => {
  var newGoogleReview02  = document.getElementById('googleReview02').value;
  var newGoogleReviewText02  = document.getElementById('googleReviewText02').value;
  console.log(newGoogleReview02)
  if(newGoogleReview02  == "") {
    newGoogleReview02  = googleReviewLink02;
    console.log("here")
  } // Get the new name from the input
  if(newGoogleReviewText02 == "") {
    newGoogleReviewText02 = googleReviewName02;
  }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      googleReviewLink02: newGoogleReview02,
      googleReviewName02: newGoogleReviewText02
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleAddGoogleReview02 = async (id) => {
  var addGoogleReview02 = document.getElementById('add-link').value;
  var addGoogleReviewText02 = document.getElementById('add-link-text').value;
  console.log(addGoogleReview02) // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      googleReviewLink02: addGoogleReview02,
      googleReviewName02: addGoogleReviewText02
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};

const handleDeleteGoogleReview02 = async (id) => {
  // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      googleReviewLink02: "",
      googleReviewName02: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleEditGoogleReview03 = async (id) => {
  var newGoogleReview03  = document.getElementById('googleReview03').value;
  var newGoogleReviewText03  = document.getElementById('googleReviewText03').value;
  console.log(newGoogleReview03)
  if(newGoogleReview03  == "") {
    newGoogleReview03  = googleReviewLink03;
    console.log("here");
  } // Get the new name from the input
  if(newGoogleReviewText03 == "") {
    newGoogleReviewText03 = googleReviewName03;
  }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      googleReviewLink03: newGoogleReview03,
      googleReviewName03: newGoogleReviewText03
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleAddGoogleReview03 = async (id) => {
  var addGoogleReview03 = document.getElementById('add-link').value;
  var addGoogleReviewText03 = document.getElementById('add-link-text').value;
  console.log(addGoogleReview03) // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      googleReviewLink03: addGoogleReview03,
      googleReviewName03: addGoogleReviewText03
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};

const handleDeleteGoogleReview03 = async (id) => {
  // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      googleReviewLink03: "",
      googleReviewName03: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleAddWebsite = async (id) => {
  var addWebsite = document.getElementById('add-link').value;
  var addWebsiteText = document.getElementById('add-link-text').value;
  console.log(addWebsite); // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      websiteLink: addWebsite,
      websiteName: addWebsiteText
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleEditWebsite = async (id) => {
  var newWebsite = document.getElementById('website').value;
  var newWebsiteText = document.getElementById('websiteText').value;
  console.log(newWebsite);
  if (newWebsite == "") {
    newWebsite = website;
    console.log("here");
  }
  if (newWebsiteText == "") {
    newWebsiteText = websiteName;
  }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      website: newWebsite,
      websiteName: newWebsiteText
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleDeleteWebsite = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      website: "",
      websiteName: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleEditWebsite02 = async (id) => {
  var newWebsite02 = document.getElementById('website02').value;
  var newWebsiteText02 = document.getElementById('websiteText02').value;
  console.log(newWebsite02);
  if (newWebsite02 == "") {
    newWebsite02 = websiteLink02;
    console.log("here");
  }
  if (newWebsiteText02 == "") {
    newWebsiteText02 = websiteName02;
  }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      websiteLink02: newWebsite02,
      websiteName02: newWebsiteText02
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleAddWebsite02 = async (id) => {
  var addWebsite02 = document.getElementById('add-link').value;
  var addWebsiteText02 = document.getElementById('add-link-text').value;
  console.log(addWebsite02); // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      website02: addWebsite02,
      websiteName02: addWebsiteText02
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};

const handleDeleteWebsite02 = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      website02: "",
      websiteName02: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleEditWebsite03 = async (id) => {
  var newWebsite03 = document.getElementById('website03').value;
  var newWebsiteText03 = document.getElementById('websiteText03').value;
  console.log(newWebsite03);
  if (newWebsite03 == "") {
    newWebsite03 = website03;
    console.log("here");
  }
  if (newWebsiteText03 == "") {
    newWebsiteText03 = websiteName03;
  }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      website03: newWebsite03,
      websiteName03: newWebsiteText03
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleAddWebsite03 = async (id) => {
  var addWebsite03 = document.getElementById('add-link').value;
  var addWebsiteText03 = document.getElementById('add-link-text').value;
  console.log(addWebsite03); // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      website03: addWebsite03,
      websiteName03: addWebsiteText03
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};

const handleDeleteWebsite03 = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      website03: "",
      websiteName03: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleEditAddress = async (id) => {
  var newAddress  = document.getElementById('address').value;
  console.log(newAddress)
  if(newAddress  == "")
    {
      newAddress  = address;
      console.log("here")
    } // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      address: newAddress 
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddAddress = async (id) => {
  var addAddress = document.getElementById('add-link').value;
  console.log(addAddress) // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      address: addAddress
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleDeleteAddress = async (id) => {
  // Get the new name from the input
 try {
   const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
     address: ""
   });

   if (response.status === 200) {
     console.log('Name updated successfully:', response.data);
     // Update the state or trigger a re-render here as needed
   }
 } catch (error) {
   console.error('Error updating name:', error);
 }
}
const handleEditGoogleMap = async (id) => {
  var newGoogleMap  = document.getElementById('googleMap').value;
  var newGoogleMapText  = document.getElementById('googleMapText').value;
  console.log(newGoogleMap)
  if(newGoogleMap  == "") {
    newGoogleMap  = googleMapLink;
    console.log("here")
  }
  if(newGoogleMapText == "") {
    newGoogleMapText = googleMapName;
  } // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      googleMapLink: newGoogleMap,
      googleMapName: newGoogleMapText
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleAddGoogleMap = async (id) => {
  var addGoogleMap = document.getElementById('add-link').value;
  var addGoogleMapText = document.getElementById('add-link-text').value;
  console.log(addGoogleMap) // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      googleMapLink: addGoogleMap,
      googleMapName: addGoogleMapText
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};

const handleDeleteGoogleMap = async (id) => {
  // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      googleMapLink: "",
      googleMapName: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleEditGoogleMap02 = async (id) => {
  var newGoogleMap02  = document.getElementById('googleMap02').value;
  var newGoogleMapText02  = document.getElementById('googleMapText02').value;
  console.log(newGoogleMap02)
  if(newGoogleMap02  == "") {
    newGoogleMap02  = googleMapLink02;
    console.log("here")
  } // Get the new name from the input
  if(newGoogleMapText02 == "") {
    newGoogleMapText02 = googleMapName02;
  }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      googleMapLink02: newGoogleMap02,
      googleMapName02: newGoogleMapText02
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleAddGoogleMap02 = async (id) => {
  var addGoogleMap02 = document.getElementById('add-link').value;
  var addGoogleMapText02 = document.getElementById('add-link-text').value;
  console.log(addGoogleMap02) // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      googleMapLink02: addGoogleMap02,
      googleMapName02: addGoogleMapText02
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};

const handleDeleteGoogleMap02 = async (id) => {
  // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      googleMapLink02: "",
      googleMapName02: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleEditGoogleMap03 = async (id) => {
  var newGoogleMap03  = document.getElementById('googleMap03').value;
  var newGoogleMapText03  = document.getElementById('googleMapText03').value;
  console.log(newGoogleMap03)
  if(newGoogleMap03  == "") {
    newGoogleMap03  = googleMapLink03;
    console.log("here");
  } // Get the new name from the input
  if(newGoogleMapText03 == "") {
    newGoogleMapText03 = googleMapName03;
  }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      googleMapLink03: newGoogleMap03,
      googleMapName03: newGoogleMapText03
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleAddGoogleMap03 = async (id) => {
  var addGoogleMap03 = document.getElementById('add-link').value;
  var addGoogleMapText03 = document.getElementById('add-link-text').value;
  console.log(addGoogleMap03) // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      googleMapLink03: addGoogleMap03,
      googleMapName03: addGoogleMapText03
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};

const handleDeleteGoogleMap03 = async (id) => {
  // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      googleMapLink03: "",
      googleMapName03: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddMenu = async (id) => {
  var addMenuLink = document.getElementById('add-link').value;
  var addMenuText = document.getElementById('add-link-text').value;
  console.log(addMenuLink); // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      menuLink: addMenuLink,
      menuName: addMenuText
    });

    if (response.status === 200) {
      console.log('Name Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding name:', error);
  }
};
const handleEditMenu = async (id) => {
  var newMenuLink = document.getElementById('menuLink').value;
  var newMenuText = document.getElementById('menuText').value;
  console.log(newMenuLink);
  if (newMenuLink == "") {
    newMenuLink = menuLink;
    console.log("here");
  }
  if (newMenuText == "") {
    newMenuText = menuName;
  }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      menuLink: newMenuLink,
      menuName: newMenuText
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};

const handleDeleteMenu = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      menuLink: "",
      menuName: ""
    });

    if (response.status === 200) {
      console.log('Name updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating name:', error);
  }
};
const handleAddCatalogue = async (id) => {
  var addCatalogueLink = document.getElementById('add-link').value;
  var addCatalogueText = document.getElementById('add-link-text').value;
  console.log(addCatalogueLink); // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      catalogueLink: addCatalogueLink,
      catalogueName: addCatalogueText
    });

    if (response.status === 200) {
      console.log('Catalogue Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding catalogue:', error);
  }
};

const handleEditCatalogue = async (id) => {
  var newCatalogueLink = document.getElementById('catalogueLink').value;
  var newCatalogueText = document.getElementById('catalogueText').value;
  console.log(newCatalogueLink);
  if (newCatalogueLink == "") {
    newCatalogueLink = catalogueLink;
    console.log("here");
  }
  if (newCatalogueText == "") {
    newCatalogueText = catalogueName;
  }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      catalogueLink: newCatalogueLink,
      catalogueName: newCatalogueText
    });

    if (response.status === 200) {
      console.log('Catalogue updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating catalogue:', error);
  }
};

const handleDeleteCatalogue = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      catalogueLink: "",
      catalogueName: ""
    });

    if (response.status === 200) {
      console.log('Catalogue updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating catalogue:', error);
  }
};

const handleAddProfile01 = async (id) => {
  var addProfileLink01 = document.getElementById('add-link').value;
  var addProfileText01 = document.getElementById('add-link-text').value;
  console.log(addProfileLink01); // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      profileLink01: addProfileLink01,
      profileName01: addProfileText01
    });

    if (response.status === 200) {
      console.log('Profile Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding profile:', error);
  }
};

const handleEditProfile01 = async (id) => {
  var newProfileLink01 = document.getElementById('profile01').value;
  var newProfileText01 = document.getElementById('profileText01').value;
  console.log(newProfileLink01);
  if (newProfileLink01 == "") {
    newProfileLink01 = profileLink01;
    console.log("here");
  }
  if (newProfileText01 == "") {
    newProfileText01 = profileName01;
  }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      profileLink01: newProfileLink01,
      profileName01: newProfileText01
    });

    if (response.status === 200) {
      console.log('Profile updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};

const handleDeleteProfile01 = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      profileLink01: "",
      profileName01: ""
    });

    if (response.status === 200) {
      console.log('Profile updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};
const handleAddProfile02 = async (id) => {
  var addProfileLink02 = document.getElementById('add-link').value;
  var addProfileText02 = document.getElementById('add-link-text').value;
  console.log(addProfileLink02); // Get the new name from the input
  try {
    const response = await axios.put(`http://localhost:3500/api/data/add/${id}`, {
      profileLink02: addProfileLink02,
      profileName02: addProfileText02
    });

    if (response.status === 200) {
      console.log('Profile Added successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error Adding profile:', error);
  }
};

const handleEditProfile02 = async (id) => {
  var newProfileLink02 = document.getElementById('profile02').value;
  var newProfileText02 = document.getElementById('profileText02').value;
  console.log(newProfileLink02);
  if (newProfileLink02 == "") {
    newProfileLink02 = profileLink02;
    console.log("here");
  }
  if (newProfileText02 == "") {
    newProfileText02 = profileName02;
  }
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      profileLink02: newProfileLink02,
      profileName02: newProfileText02
    });

    if (response.status === 200) {
      console.log('Profile updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};

const handleDeleteProfile02 = async (id) => {
  try {
    const response = await axios.put(`http://localhost:3500/api/data/update/${id}`, {
      profileLink02: "",
      profileName02: ""
    });

    if (response.status === 200) {
      console.log('Profile updated successfully:', response.data);
      // Update the state or trigger a re-render here as needed
    }
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};

const inputField = document.getElementById('add-link');
console.log(inputField)

  if(client)
  {      return(
  
  <div>
{show && (
      <div
      className="qr-modal min-h-screen bg-gradient-to-tr from-[#ffb8d6] via-[#f9d6cd] to-[#f6ece9] w-full max-w-md mx-auto shadow-lg flex flex-col items-center justify-center relative"
      style={{ backgroundAttachment: "fixed" }}
    >
      <div className="bg-white border-gray-500 rounded-lg pb-8 pt-16 px-10 relative">
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
                  src={fb} // Replace with the actual path to the Facebook icon
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
      </div>
    </div>

)}


{ !show && !show02 && !show03 &&
    <section className="main">
  
          {/* <button style={{color:"white", fontSize:"17px", paddingBlock:"8px", paddingInline:"30px", backgroundColor:"rgb(22, 33, 92)", border:"1px solid white", borderRadius:"5px"}} onClick={
            ()=>{
              navigate(`/`)
            }
          }>Logout</button> */}
       
    <Helmet>
    <title>{name}</title>
    </Helmet>

    <div className={`min-h-screen w-full max-w-md mx-auto shadow-lg pt-5 pb-5 text-center bg-gradient-to-tr from-[${color01}] via-[${color02}] to-[${color03}]`} style={{ backgroundAttachment: "fixed" }}>
      <div className="px-6">
      {logo && (
      <div className="flex flex-col items-center mx-auto rounded-x p-1 space-y-2 mt-3">

        <a href={logo}>
        <div className="relative mb-2 ">
        <img
          src={logo}
          alt="profile"
          className="w-48 h-48 mx-auto rounded-full border-4 border-white shadow-md"
        />
      </div>
        </a>

        {!editLogo && (
          <div className="space-x-2">
            <button
              className="btn bg-green-500 text-white rounded-md py-1 px-6"
              onClick={() => {setDeleteModal11(false)
                setEditLogo(true)}}
            >
              Edit Logo
            </button>
            {/* <button
              className="btn bg-red-500 text-white rounded-md py-1 px-4"
              onClick={() => {
                setDeleteModal11(true)}}
            >
              Delete
            </button> */}
          </div>
        )}

        {editLogo && (
                <div className="flex items-center justify-center pt-1.5 gap-6 w-fit mx-auto">
                <input
                  type="file"
                  className="file-input w-56 h-8 text-sm"
                  onChange={handleEditLogo}
                />
                <ImCross
                  color="white"
                  size={18}
                  className="cursor-pointer bg-black p-1 rounded-sm"
                  onClick={() => {
                    setEditLogo(false);
                  }}
                />
              </div>
        )}


      </div>
      )}
      <div className="flex justify-center gap-x-2 pt-2 pb-1 items-center">
          <MdRemoveRedEye size={20} />
          <p>{visitCount}</p>
        </div>

        <div className="px-4">
          <div className="flex justify-center space-x-2 mt-2 mb-2.5">
          <a href={`tel:${telephone01}`}
        target="_blank"
        rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-100">
            <MdOutlinePhoneAndroid size={20} />
            </a>
            <a href={`mailto:${email}`}
        target="_blank"
        rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-100">
            <AiOutlineMail size={20} />
            </a>
            <a className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-100">
            <RiMessage2Line size={20} />
            </a>
            <a href={`https://wa.me/${whatsapp01}`}
        target="_blank"
        rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-100">
            <ImWhatsapp size={20} />
            </a>
          </div>

      </div>

      <div className='flex flex-col justify-center items-center'>
      {name && (
  <div className="flex justify-center mt-2">
    <a className="flex w-full px-5 py-1  text-gray-700  max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <div className="flex flex-1 items-center justify-center gap-x-3">
          {(!modal05 && !editName) && (
            <div className="flex flex-col text-lg w-[250px] max-w-[250px] font-semibold text-gray-800 pt-1  text-center gap-y-1">
              <span className="text-gray-800">{name}</span>
            </div>
          )}
          {(!modal05 && !editName) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditName(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal05(true)}
              />
            </div>
          )}
          {modal05 && (
            <div className="text-center w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal05(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteName(_id);
                    window.location.reload();
                    setModal05(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editName && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Name:</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <input
                    id="name"
                    placeholder={name}
                    className="flex-1  px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditName(_id);
                    setEditName(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditName(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}

{clientName && (
  <div className="flex justify-center">
    <a className="flex w-full px-5 py-1  text-gray-700  max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <div className="flex flex-1 items-center justify-center gap-x-3">
          {(!modal04 && !editClientName) && (
            <div className="flex flex-col text-md w-[250px] max-w-[250px] font-semibold text-gray-800 pt-1  text-center gap-y-1">
              <span className="text-gray-800 text-2xl font-semibold">{clientName}</span>
            </div>
          )}
          {(!modal04 && !editClientName) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditClientName(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal04(true)}
              />
            </div>
          )}
          {modal04 && (
            <div className="text-center w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal04(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteClientName(_id);
                    window.location.reload();
                    setModal04(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editClientName && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">ClientName:</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <input
                    id="client-name"
                    placeholder={clientName}
                    className="flex-1 max-w-[180px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditClientName(_id);
                    setEditClientName(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditClientName(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}

{designation && (
  <div className="flex justify-center">
    <a className="flex w-full px-5 py-1  text-gray-700  max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <div className="flex flex-1 items-center justify-center gap-x-3">
          {(!modal03 && !editDesignation) && (
            <div className="flex flex-col text-md w-[250px] max-w-[250px] font-semibold text-gray-800 pt-1  text-center gap-y-1">
              <span className="text-md text-gray-600 pt-1 pb-1">{designation}</span>
            </div>
          )}
          {(!modal03 && !editDesignation) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditDesignation(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal03(true)}
              />
            </div>
          )}
          {modal03 && (
            <div className="text-center w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal03(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteDesignation(_id);
                    window.location.reload();
                    setModal03(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editDesignation && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Designation:</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <input
                    id="designation"
                    placeholder={designation}
                    className="flex-1 max-w-[180px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditDesignation(_id);
                    setEditDesignation(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditDesignation(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}

{description && (
  <div className="flex justify-center">
    <a className="flex w-full px-5 py-1  text-gray-700  max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <div className="flex flex-1 items-center justify-center gap-x-3">
          {(!modal02 && !editDescription) && (
            <div className="flex flex-col text-md w-[250px] max-w-[250px] font-light text-gray-800 pt-1 text-center gap-y-1">
            <span className="text-sm text-gray-600 pt-1 pb-1 px-2 break-words">{description}</span>
          </div>
          
          )}
          {(!modal02 && !editDescription) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditDescription(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal02(true)}
              />
            </div>
          )}
          {modal02 && (
            <div className="text-center w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal02(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteDescription(_id);
                    window.location.reload();
                    setModal02(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editDescription && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Description:</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <input
                    id="description"
                    placeholder={description}
                    className="flex-1 max-w-[180px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditDescription(_id);
                    setEditDescription(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditDescription(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
</div>
     
      <div className="flex items-center justify-center mt-2 mb-5">
            {/* <img src={eye} height={25}></img>
                  <span style={{display:"flex",alignItems:"center",justifyContent:"center",
                  }}>&nbsp;{visitCount} &nbsp;&nbsp;&nbsp;&nbsp;</span> */}
                  <button className="flex items-center justify-center gap-x-2 rounded-lg py-2 px-10 bg-white border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-100">
                  <FaDownload size={20} onClick={downloadContactCard} color="black" />
                  <span style={{display:"flex",alignItems:"center",color:"black",justifyContent:"center"
                  }} onClick={downloadContactCard} >&nbsp;&nbsp;Download Contact</span>
                </button>
        
                </div>
    

{phone01 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      {/* Phone Icon and Info */}
      <div className="flex items-center space-x-6 w-full">
        <img src={phone} alt="Phone01" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {/* Phone Info */}
          {!modal06 && !editPhone01 && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Phone</span>
              <span className="text-gray-500 text-sm">{phone01}</span>
            </div>
          )}

          {/* Edit and Delete Buttons */}
          {!modal06 && !editPhone01 && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditPhone01(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal06(true)}
              />
            </div>
          )}

          {/* Modal for Delete Confirmation */}
          {modal06 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal06(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeletePhone01(_id);
                    window.location.reload();
                    setModal06(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          {/* Edit Phone Input */}
          {editPhone01 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Phone</span>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  id="phone01"
                  placeholder={phone01}
                  className="flex-1 w-[100px] px-3 py-0.5 border rounded-md focus:outline-none"
                />
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditPhone01(_id);
                    setEditPhone01(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditPhone01(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{phone02 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      {/* Phone Icon and Info */}
      <div className="flex items-center space-x-6 w-full">
        <img src={phone} alt="Phone02" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {/* Phone Info */}
          {!modal07 && !editPhone02 && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Phone</span>
              <span className="text-gray-500 text-sm">{phone02}</span>
            </div>
          )}

          {/* Edit and Delete Buttons */}
          {!modal07 && !editPhone02 && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditPhone02(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal07(true)}
              />
            </div>
          )}

          {/* Modal for Delete Confirmation */}
          {modal07 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal07(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeletePhone02(_id);
                    window.location.reload();
                    setModal07(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          {/* Edit Phone Input */}
          {editPhone02 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Phone</span>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  id="phone02"
                  placeholder={phone02}
                  className="flex-1 w-[100px] px-3 py-0.5 border rounded-md focus:outline-none"
                />
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditPhone02(_id);
                    setEditPhone02(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditPhone02(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{phone03 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      {/* Phone Icon and Info */}
      <div className="flex items-center space-x-6 w-full">
        <img src={phone} alt="Phone02" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {/* Phone Info */}
          {!modal08 && !editPhone03 && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Phone</span>
              <span className="text-gray-500 text-sm">{phone03}</span>
            </div>
          )}

          {/* Edit and Delete Buttons */}
          {!modal08 && !editPhone03 && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditPhone03(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal08(true)}
              />
            </div>
          )}

          {/* Modal for Delete Confirmation */}
          {modal08 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal08(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeletePhone03(_id);
                    window.location.reload();
                    setModal08(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          {/* Edit Phone Input */}
          {editPhone03 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Phone</span>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  id="phone03"
                  placeholder={phone03}
                  className="flex-1 w-[100px] px-3 py-0.5 border rounded-md focus:outline-none"
                />
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditPhone03(_id);
                    setEditPhone03(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditPhone03(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{telephone01 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      {/* Telephone Icon and Info */}
      <div className="flex items-center space-x-6 w-full">
        <img src={telephone} alt="Telephone01" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {/* Telephone Info */}
          {!modal49 && !editTelephone01 && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Telephone</span>
              <span className="text-gray-500 text-sm">{telephone01}</span>
            </div>
          )}

          {/* Edit and Delete Buttons */}
          {!modal49 && !editTelephone01 && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditTelephone01(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal49(true)}
              />
            </div>
          )}

          {/* Modal for Delete Confirmation */}
          {modal49 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal49(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteTelephone01(_id);
                    window.location.reload();
                    setModal49(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          {/* Edit Telephone Input */}
          {editTelephone01 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Telephone</span>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  id="telephone01"
                  placeholder={telephone01}
                  className="flex-1 w-[100px] px-3 py-0.5 border rounded-md focus:outline-none"
                />
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditTelephone01(_id);
                    setEditTelephone01(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditTelephone01(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{telephone02 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      {/* Telephone Icon and Info */}
      <div className="flex items-center space-x-6 w-full">
        <img src={telephone} alt="Telephone02" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {/* Telephone Info */}
          {!modal47 && !editTelephone02 && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Telephone</span>
              <span className="text-gray-500 text-sm">{telephone02}</span>
            </div>
          )}

          {/* Edit and Delete Buttons */}
          {!modal47 && !editTelephone02 && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditTelephone02(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal47(true)}
              />
            </div>
          )}

          {/* Modal for Delete Confirmation */}
          {modal47 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal47(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteTelephone02(_id);
                    window.location.reload();
                    setModal47(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          {/* Edit Telephone Input */}
          {editTelephone02 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Telephone</span>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  id="telephone02"
                  placeholder={telephone02}
                  className="flex-1 w-[100px] px-3 py-0.5 border rounded-md focus:outline-none"
                />
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditTelephone02(_id);
                    setEditTelephone02(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditTelephone02(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{telephone03 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      {/* Telephone Icon and Info */}
      <div className="flex items-center space-x-6 w-full">
        <img src={telephone} alt="Telephone02" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {/* Telephone Info */}
          {!modal48 && !editTelephone03 && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Telephone</span>
              <span className="text-gray-500 text-sm">{telephone03}</span>
            </div>
          )}

          {/* Edit and Delete Buttons */}
          {!modal48 && !editTelephone03 && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditTelephone03(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal48(true)}
              />
            </div>
          )}

          {/* Modal for Delete Confirmation */}
          {modal48 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal48(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteTelephone03(_id);
                    window.location.reload();
                    setModal48(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          {/* Edit Telephone Input */}
          {editTelephone03 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Telephone</span>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  id="telephone03"
                  placeholder={telephone03}
                  className="flex-1 w-[100px] px-3 py-0.5 border rounded-md focus:outline-none"
                />
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditTelephone03(_id);
                    setEditTelephone03(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditTelephone03(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{whatsapp01 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      {/* Phone Icon and Info */}
      <div className="flex items-center space-x-6 w-full">
        <img src={whatsapp} alt="Whatsapp01" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {/* Phone Info */}
          {!modal09 && !editWhatsapp01 && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Whatsapp</span>
              <span className="text-gray-500 text-sm">{whatsapp01}</span>
            </div>
          )}

          {/* Edit and Delete Buttons */}
          {!modal09 && !editWhatsapp01 && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditWhatsapp01(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal09(true)}
              />
            </div>
          )}

          {/* Modal for Delete Confirmation */}
          {modal09 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal09(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteWhatsapp01(_id);
                    window.location.reload();
                    setModal09(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          {/* Edit Phone Input */}
          {editWhatsapp01 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Whatsapp</span>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  id="whatsapp01"
                  placeholder={whatsapp01}
                  className="flex-1 w-[100px] px-3 py-0.5 border rounded-md focus:outline-none"
                />
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditWhatsapp01(_id);
                    setEditWhatsapp01(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditWhatsapp01(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{whatsapp02 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      {/* Phone Icon and Info */}
      <div className="flex items-center space-x-6 w-full">
        <img src={whatsapp} alt="Whatsapp02" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {/* Phone Info */}
          {!modal10 && !editWhatsapp02 && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Whatsapp</span>
              <span className="text-gray-500 text-sm">{whatsapp02}</span>
            </div>
          )}

          {/* Edit and Delete Buttons */}
          {!modal10 && !editWhatsapp02 && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditWhatsapp02(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal10(true)}
              />
            </div>
          )}

          {/* Modal for Delete Confirmation */}
          {modal10 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal10(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteWhatsapp02(_id);
                    window.location.reload();
                    setModal10(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          {/* Edit Phone Input */}
          {editWhatsapp02 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Whatsapp</span>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  id="whatsapp02"
                  placeholder={whatsapp02}
                  className="flex-1 w-[100px] px-3 py-0.5 border rounded-md focus:outline-none"
                />
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditWhatsapp02(_id);
                    setEditWhatsapp02(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditWhatsapp02(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{whatsapp03 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      {/* Phone Icon and Info */}
      <div className="flex items-center space-x-6 w-full">
        <img src={whatsapp} alt="Whatsapp02" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {/* Phone Info */}
          {!modal11 && !editWhatsapp03 && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Whatsapp</span>
              <span className="text-gray-500 text-sm">{whatsapp03}</span>
            </div>
          )}

          {/* Edit and Delete Buttons */}
          {!modal11 && !editWhatsapp03 && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditWhatsapp03(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal11(true)}
              />
            </div>
          )}

          {/* Modal for Delete Confirmation */}
          {modal11 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal11(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteWhatsapp03(_id);
                    window.location.reload();
                    setModal11(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          {/* Edit Phone Input */}
          {editWhatsapp03 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Whatsapp</span>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  id="whatsapp03"
                  placeholder={whatsapp03}
                  className="flex-1 w-[100px] px-3 py-0.5 border rounded-md focus:outline-none"
                />
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditWhatsapp03(_id);
                    setEditWhatsapp03(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditWhatsapp03(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{ email && <div className="flex justify-center mt-3">
      <a
        href={`mailto:${email}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md"
      >
        <div className="flex items-center space-x-6">
          <img
            src={emailImg}
            alt="Email"
            className="h-10 w-10"
          />
          <div className="flex flex-col text-start gap-y-1">
            <span className="font-medium">Email</span>
            <span className="text-gray-500 text-sm">{email}</span>
          </div>
        </div>
      </a>
</div>}
{email02 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      {/* Phone Icon and Info */}
      <div className="flex items-center space-x-6 w-full">
        <img src={emailImg} alt="Whatsapp02" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {/* Phone Info */}
          {!modal12 && !editEmail02 && (
            <div className="flex flex-col max-w-[160px] text-start gap-y-1">
            <span className="font-medium">Email</span>
            <span className="text-gray-500 max-w-[160px] text-sm break-words">{email02}</span>
          </div>
          
          )}

          {/* Edit and Delete Buttons */}
          {!modal12 && !editEmail02 && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditEmail02(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal12(true)}
              />
            </div>
          )}

          {/* Modal for Delete Confirmation */}
          {modal12 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal12(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteEmail02(_id);
                    window.location.reload();
                    setModal12(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          {/* Edit Phone Input */}
          {editEmail02 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Email</span>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  id="email02"
                  placeholder={email02}
                  className="flex-1 w-[100px] px-3 py-0.5 border rounded-md focus:outline-none"
                />
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditEmail02(_id);
                    setEditEmail02(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditEmail02(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{email03 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      {/* Phone Icon and Info */}
      <div className="flex items-center space-x-6 w-full">
        <img src={emailImg} alt="Whatsapp02" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {/* Phone Info */}
          {!modal13 && !editEmail03 && (
            <div className="flex flex-col max-w-[160px] text-start gap-y-1">
            <span className="font-medium">Email</span>
            <span className="text-gray-500 max-w-[160px] text-sm break-words">{email03}</span>
          </div>
          
          )}

          {/* Edit and Delete Buttons */}
          {!modal13 && !editEmail03 && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditEmail03(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal13(true)}
              />
            </div>
          )}

          {/* Modal for Delete Confirmation */}
          {modal13 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal13(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteEmail03(_id);
                    window.location.reload();
                    setModal13(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          {/* Edit Phone Input */}
          {editEmail03 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Email</span>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  id="email03"
                  placeholder={email03}
                  className="flex-1 w-[100px] px-3 py-0.5 border rounded-md focus:outline-none"
                />
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditEmail03(_id);
                    setEditEmail03(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditEmail03(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}

{facebookLink && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      {/* Phone Icon and Info */}
      <div className="flex items-center space-x-6 w-full">
        <img src={fb} alt="facebook01" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {/* Phone Info */}
          {!modal14 && !editFacebook && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Facebook</span>
              <span className="text-gray-500 text-sm">{facebookName}</span>
            </div>
          )}

          {/* Edit and Delete Buttons */}
          {!modal14 && !editFacebook && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditFacebook(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal14(true)}
              />
            </div>
          )}

          {/* Modal for Delete Confirmation */}
          {modal14 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal14(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteFacebook(_id);
                    window.location.reload();
                    setModal14(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          {/* Edit Phone Input */}
          {editFacebook && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Facebook</span>
              <div className="flex items-center space-x-2 mt-1">
              <div className="flex flex-col space-y-2 mt-1">
                <label>Account Name:</label>
              <input
                  id="facebookText"
                  placeholder={facebookName}
                  className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                />
                  <label>Account Link:</label>
                <input
                  id="facebook"
                  placeholder={facebookLink}
                  className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                /></div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditFacebook(_id);
                    setEditFacebook(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditFacebook(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{facebookLink02 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      {/* Phone Icon and Info */}
      <div className="flex items-center space-x-6 w-full">
        <img src={fb} alt="facebook01" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {/* Phone Info */}
          {!modal15 && !editFacebook02 && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Facebook</span>
              <span className="text-gray-500 text-sm">{facebookName02}</span>
            </div>
          )}

          {/* Edit and Delete Buttons */}
          {!modal15 && !editFacebook02 && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditFacebook02(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal15(true)}
              />
            </div>
          )}

          {/* Modal for Delete Confirmation */}
          {modal15 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal15(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteFacebook02(_id);
                    window.location.reload();
                    setModal15(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          {/* Edit Phone Input */}
          {editFacebook02 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Facebook</span>
              <div className="flex items-center space-x-2 mt-1">
              <div className="flex flex-col space-y-2 mt-1">
                <label>Account Name:</label>
              <input
                  id="facebookText02"
                  placeholder={facebookName02}
                  className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                />
                  <label>Account Link:</label>
                <input
                  id="facebook02"
                  placeholder={facebookLink02}
                  className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                /></div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditFacebook02(_id);
                    setEditFacebook02(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditFacebook02(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{facebookLink03 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      {/* Phone Icon and Info */}
      <div className="flex items-center space-x-6 w-full">
        <img src={fb} alt="facebook03" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {/* Phone Info */}
          {!modal16 && !editFacebook03 && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Facebook</span>
              <span className="text-gray-500 text-sm">{facebookName03}</span>
            </div>
          )}

          {/* Edit and Delete Buttons */}
          {!modal16 && !editFacebook03 && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditFacebook03(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal16(true)}
              />
            </div>
          )}

          {/* Modal for Delete Confirmation */}
          {modal16 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal16(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteFacebook03(_id);
                    window.location.reload();
                    setModal16(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          {/* Edit Phone Input */}
          {editFacebook03 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Facebook</span>
              <div className="flex items-center space-x-2 mt-1">
              <div className="flex flex-col space-y-2 mt-1">
                <label>Account Name:</label>
              <input
                  id="facebookText03"
                  placeholder={facebookName03}
                  className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                />
                  <label>Account Link:</label>
                <input
                  id="facebook03"
                  placeholder={facebookLink03}
                  className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                /></div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditFacebook03(_id);
                    setEditFacebook03(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditFacebook03(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{instagramLink && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={insta} alt="instagram01" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal17 && !editInstagram) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Instagram</span>
              <span className="text-gray-500 text-sm">{instagramName}</span>
            </div>
          )}
          {(!modal17 && !editInstagram) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditInstagram(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal17(true)}
              />
            </div>
          )}
          {modal17 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal17(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteInstagram(_id);
                    window.location.reload();
                    setModal17(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editInstagram && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Instagram</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="instagramText"
                    placeholder={instagramName}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="instagram"
                    placeholder={instagramLink}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditInstagram(_id);
                    setEditInstagram(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditInstagram(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{instagramLink02 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={insta} alt="instagram02" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal18 && !editInstagram02) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Instagram</span>
              <span className="text-gray-500 text-sm">{instagramName02}</span>
            </div>
          )}
          {(!modal18 && !editInstagram02) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditInstagram02(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal18(true)}
              />
            </div>
          )}
          {modal18 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal18(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteInstagram02(_id);
                    window.location.reload();
                    setModal18(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editInstagram02 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Instagram</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="instagramText02"
                    placeholder={instagramName02}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="instagram02"
                    placeholder={instagramLink02}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditInstagram02(_id);
                    setEditInstagram02(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditInstagram02(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{instagramLink03 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={insta} alt="instagram03" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal19 && !editInstagram03) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Instagram</span>
              <span className="text-gray-500 text-sm">{instagramName03}</span>
            </div>
          )}
          {(!modal19 && !editInstagram03) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditInstagram03(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal19(true)}
              />
            </div>
          )}
          {modal19 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal19(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteInstagram03(_id);
                    window.location.reload();
                    setModal19(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editInstagram03 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Instagram</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="instagramText03"
                    placeholder={instagramName03}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="instagram03"
                    placeholder={instagramLink03}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditInstagram03(_id);
                    setEditInstagram03(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditInstagram03(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{snapchatLink && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={snap} alt="snapchat01" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal20 && !editSnapchat) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Snapchat</span>
              <span className="text-gray-500 text-sm">{snapchatName}</span>
            </div>
          )}
          {(!modal20 && !editSnapchat) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditSnapchat(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal20(true)}
              />
            </div>
          )}
          {modal20 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal20(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteSnapchat(_id);
                    window.location.reload();
                    setModal20(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editSnapchat && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Snapchat</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="snapchatText"
                    placeholder={snapchatName}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="snapchat"
                    placeholder={snapchatLink}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditSnapchat(_id);
                    setEditSnapchat(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditSnapchat(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{snapchatLink02 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={snap} alt="snapchat02" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal21 && !editSnapchat02) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Snapchat</span>
              <span className="text-gray-500 text-sm">{snapchatName02}</span>
            </div>
          )}
          {(!modal21 && !editSnapchat02) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditSnapchat02(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal21(true)}
              />
            </div>
          )}
          {modal21 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal21(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteSnapchat02(_id);
                    window.location.reload();
                    setModal21(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editSnapchat02 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Snapchat</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="snapchatText02"
                    placeholder={snapchatName02}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="snapchat02"
                    placeholder={snapchatLink02}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditSnapchat02(_id);
                    setEditSnapchat02(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditSnapchat02(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{snapchatLink03 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={snap} alt="snapchat03" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal22 && !editSnapchat03) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Snapchat</span>
              <span className="text-gray-500 text-sm">{snapchatName03}</span>
            </div>
          )}
          {(!modal22 && !editSnapchat03) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditSnapchat03(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal22(true)}
              />
            </div>
          )}
          {modal22 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal22(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteSnapchat03(_id);
                    window.location.reload();
                    setModal22(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editSnapchat03 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Snapchat</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="snapchatText03"
                    placeholder={snapchatName03}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="snapchat03"
                    placeholder={snapchatLink03}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditSnapchat03(_id);
                    setEditSnapchat03(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditSnapchat03(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{youtubeLink && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={yt} alt="youtube01" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal23 && !editYoutube) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Youtube</span>
              <span className="text-gray-500 text-sm">{youtubeName}</span>
            </div>
          )}
          {(!modal23 && !editYoutube) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditYoutube(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal23(true)}
              />
            </div>
          )}
          {modal23 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal23(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteYoutube(_id);
                    window.location.reload();
                    setModal23(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editYoutube && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Youtube</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="youtubeText"
                    placeholder={youtubeName}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="youtube"
                    placeholder={youtubeLink}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditYoutube(_id);
                    setEditYoutube(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditYoutube(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{youtubeLink02 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={yt} alt="youtube02" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal24 && !editYoutube02) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Youtube</span>
              <span className="text-gray-500 text-sm">{youtubeName02}</span>
            </div>
          )}
          {(!modal24 && !editYoutube02) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditYoutube02(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal24(true)}
              />
            </div>
          )}
          {modal24 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal24(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteYoutube02(_id);
                    window.location.reload();
                    setModal24(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editYoutube02 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Youtube</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="youtubeText02"
                    placeholder={youtubeName02}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="youtube02"
                    placeholder={youtubeLink02}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditYoutube02(_id);
                    setEditYoutube02(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditYoutube02(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{youtubeLink03 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={yt} alt="youtube03" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal25 && !editYoutube03) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Youtube</span>
              <span className="text-gray-500 text-sm">{youtubeName03}</span>
            </div>
          )}
          {(!modal25 && !editYoutube03) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditYoutube03(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal25(true)}
              />
            </div>
          )}
          {modal25 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal25(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteYoutube03(_id);
                    window.location.reload();
                    setModal25(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editYoutube03 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Youtube</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="youtubeText03"
                    placeholder={youtubeName03}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="youtube03"
                    placeholder={youtubeLink03}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditYoutube03(_id);
                    setEditYoutube03(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditYoutube03(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}

{tiktokLink && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={tiktok} alt="tiktok01" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal26 && !editTiktok) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">TikTok</span>
              <span className="text-gray-500 text-sm">{tiktokName}</span>
            </div>
          )}
          {(!modal26 && !editTiktok) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditTiktok(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal26(true)}
              />
            </div>
          )}
          {modal26 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal26(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteTiktok(_id);
                    window.location.reload();
                    setModal26(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editTiktok && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">TikTok</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="tiktokText"
                    placeholder={tiktokName}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="tiktok"
                    placeholder={tiktokLink}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditTiktok(_id);
                    setEditTiktok(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditTiktok(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{tiktokLink02 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={tiktok} alt="tiktok02" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal27 && !editTiktok02) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">TikTok</span>
              <span className="text-gray-500 text-sm">{tiktokName02}</span>
            </div>
          )}
          {(!modal27 && !editTiktok02) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditTiktok02(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal27(true)}
              />
            </div>
          )}
          {modal27 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal27(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteTiktok02(_id);
                    window.location.reload();
                    setModal27(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editTiktok02 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">TikTok</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="tiktokText02"
                    placeholder={tiktokName02}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="tiktok02"
                    placeholder={tiktokLink02}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditTiktok02(_id);
                    setEditTiktok02(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditTiktok02(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{tiktokLink03 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={tiktok} alt="tiktok03" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal28 && !editTiktok03) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">TikTok</span>
              <span className="text-gray-500 text-sm">{tiktokName03}</span>
            </div>
          )}
          {(!modal28 && !editTiktok03) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditTiktok03(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal28(true)}
              />
            </div>
          )}
          {modal28 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal28(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteTiktok03(_id);
                    window.location.reload();
                    setModal28(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editTiktok03 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">TikTok</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="tiktokText03"
                    placeholder={tiktokName03}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="tiktok03"
                    placeholder={tiktokLink03}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditTiktok03(_id);
                    setEditTiktok03(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditTiktok03(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{youtubeShortsLink && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={linkedin02} alt="youtubeShorts01" className="h-10 w-10 rounded-md" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal29 && !editYoutubeShorts) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Linkedin</span>
              <span className="text-gray-500 text-sm">{youtubeShortsName}</span>
            </div>
          )}
          {(!modal29 && !editYoutubeShorts) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditYoutubeShorts(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal29(true)}
              />
            </div>
          )}
          {modal29 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal29(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteYoutubeShorts(_id);
                    window.location.reload();
                    setModal29(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editYoutubeShorts && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">YoutubeShorts</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="youtubeShortsText"
                    placeholder={youtubeShortsName}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="youtubeShorts"
                    placeholder={youtubeShortsLink}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditYoutubeShorts(_id);
                    setEditYoutubeShorts(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditYoutubeShorts(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{youtubeShortsLink02 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={linkedin02} alt="youtubeShorts02" className="h-10 w-10 rounded-md" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal30 && !editYoutubeShorts02) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Linkedin</span>
              <span className="text-gray-500 text-sm">{youtubeShortsName02}</span>
            </div>
          )}
          {(!modal30 && !editYoutubeShorts02) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditYoutubeShorts02(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal30(true)}
              />
            </div>
          )}
          {modal30 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal30(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteYoutubeShorts02(_id);
                    window.location.reload();
                    setModal30(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editYoutubeShorts02 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">YoutubeShorts</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="youtubeShortsText02"
                    placeholder={youtubeShortsName02}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="youtubeShorts02"
                    placeholder={youtubeShortsLink02}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditYoutubeShorts02(_id);
                    setEditYoutubeShorts02(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditYoutubeShorts02(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{youtubeShortsLink03 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={linkedin02} alt="youtubeShorts03" className="h-10 w-10 rounded-md" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal31 && !editYoutubeShorts03) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">YoutubeShorts</span>
              <span className="text-gray-500 text-sm">{youtubeShortsName03}</span>
            </div>
          )}
          {(!modal31 && !editYoutubeShorts03) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditYoutubeShorts03(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal31(true)}
              />
            </div>
          )}
          {modal31 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal31(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteYoutubeShorts03(_id);
                    window.location.reload();
                    setModal31(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editYoutubeShorts03 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">YoutubeShorts</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="youtubeShortsText03"
                    placeholder={youtubeShortsName03}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="youtubeShorts03"
                    placeholder={youtubeShortsLink03}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditYoutubeShorts03(_id);
                    setEditYoutubeShorts03(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditYoutubeShorts03(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{address && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={addressImg} alt="tiktok01" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal16 && !editAddress) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Address</span>
              <span className="text-gray-500 text-sm">{address}</span>
            </div>
          )}
          {(!modal16 && !editAddress) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditAddress(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal16(true)}
              />
            </div>
          )}
          {modal16 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal16(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteAddress(_id);
                    window.location.reload();
                    setModal16(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editAddress && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Address</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <input
                    id="address"
                    placeholder={address}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditAddress(_id);
                    setEditAddress(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditAddress(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{website && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={websiteImg} alt="website01" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal33 && !editWebsite) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Website</span>
              <span className="text-gray-500 text-sm">{websiteName}</span>
            </div>
          )}
          {(!modal33 && !editWebsite) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditWebsite(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal33(true)}
              />
            </div>
          )}
          {modal33 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal33(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteWebsite(_id);
                    window.location.reload();
                    setModal33(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editWebsite && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Website</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="websiteText"
                    placeholder={websiteName}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="website"
                    placeholder={website}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditWebsite(_id);
                    setEditWebsite(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditWebsite(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{website02 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={websiteImg} alt="website02" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal34 && !editWebsite02) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Website</span>
              <span className="text-gray-500 text-sm">{websiteName02}</span>
            </div>
          )}
          {(!modal34 && !editWebsite02) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditWebsite02(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal34(true)}
              />
            </div>
          )}
          {modal34 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal34(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteWebsite02(_id);
                    window.location.reload();
                    setModal34(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editWebsite02 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Website</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="websiteText02"
                    placeholder={websiteName02}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="website02"
                    placeholder={website02}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditWebsite02(_id);
                    setEditWebsite02(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditWebsite02(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{website03 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={websiteImg} alt="website03" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal35 && !editWebsite03) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Website</span>
              <span className="text-gray-500 text-sm">{websiteName03}</span>
            </div>
          )}
          {(!modal35 && !editWebsite03) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditWebsite03(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal35(true)}
              />
            </div>
          )}
          {modal35 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal35(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteWebsite03(_id);
                    window.location.reload();
                    setModal35(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editWebsite03 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Website</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="websiteText03"
                    placeholder={websiteName03}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="website03"
                    placeholder={website03}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditWebsite03(_id);
                    setEditWebsite03(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditWebsite03(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{twitterLink && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={threads} alt="twitter01" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal36 && !editTwitter) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Twitter</span>
              <span className="text-gray-500 text-sm">{twitterName}</span>
            </div>
          )}
          {(!modal36 && !editTwitter) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditTwitter(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal36(true)}
              />
            </div>
          )}
          {modal36 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal36(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteTwitter(_id);
                    window.location.reload();
                    setModal36(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editTwitter && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Twitter</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="twitterText"
                    placeholder={twitterName}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="twitter"
                    placeholder={twitterLink}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditTwitter(_id);
                    setEditTwitter(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditTwitter(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{twitterLink02 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={threads} alt="twitter02" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal37 && !editTwitter02) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Twitter</span>
              <span className="text-gray-500 text-sm">{twitterName02}</span>
            </div>
          )}
          {(!modal37 && !editTwitter02) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditTwitter02(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal37(true)}
              />
            </div>
          )}
          {modal37 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal37(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteTwitter02(_id);
                    window.location.reload();
                    setModal37(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editTwitter02 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Twitter</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="twitterText02"
                    placeholder={twitterName02}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="twitter02"
                    placeholder={twitterLink02}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditTwitter02(_id);
                    setEditTwitter02(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditTwitter02(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{twitterLink03 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={threads} alt="twitter03" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal38 && !editTwitter03) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Twitter</span>
              <span className="text-gray-500 text-sm">{twitterName03}</span>
            </div>
          )}
          {(!modal38 && !editTwitter03) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditTwitter03(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal38(true)}
              />
            </div>
          )}
          {modal38 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal38(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteTwitter03(_id);
                    window.location.reload();
                    setModal38(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editTwitter03 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Twitter</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="twitterText03"
                    placeholder={twitterName03}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="twitter03"
                    placeholder={twitterLink03}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditTwitter03(_id);
                    setEditTwitter03(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditTwitter03(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{googleReviewLink && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={greview} alt="googleReview01" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal39 && !editGoogleReview) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Google Review</span>
              <span className="text-gray-500 text-sm">{googleReviewName}</span>
            </div>
          )}
          {(!modal39 && !editGoogleReview) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditGoogleReview(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal39(true)}
              />
            </div>
          )}
          {modal39 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal39(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteGoogleReview(_id);
                    window.location.reload();
                    setModal39(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editGoogleReview && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Google Review</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="googleReviewText"
                    placeholder={googleReviewName}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="googleReview"
                    placeholder={googleReviewLink}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditGoogleReview(_id);
                    setEditGoogleReview(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditGoogleReview(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{googleReviewLink02 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={greview} alt="googleReview02" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal40 && !editGoogleReview02) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Google Review</span>
              <span className="text-gray-500 text-sm">{googleReviewName02}</span>
            </div>
          )}
          {(!modal40 && !editGoogleReview02) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditGoogleReview02(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal40(true)}
              />
            </div>
          )}
          {modal40 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal40(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteGoogleReview02(_id);
                    window.location.reload();
                    setModal40(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editGoogleReview02 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Google Review</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="googleReviewText02"
                    placeholder={googleReviewName02}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="googleReview02"
                    placeholder={googleReviewLink02}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditGoogleReview02(_id);
                    setEditGoogleReview02(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditGoogleReview02(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{googleReviewLink03 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={greview} alt="googleReview03" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal41 && !editGoogleReview03) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Google Review</span>
              <span className="text-gray-500 text-sm">{googleReviewName03}</span>
            </div>
          )}
          {(!modal41 && !editGoogleReview03) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditGoogleReview03(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal41(true)}
              />
            </div>
          )}
          {modal41 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal41(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteGoogleReview03(_id);
                    window.location.reload();
                    setModal41(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editGoogleReview03 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Google Review</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="googleReviewText03"
                    placeholder={googleReviewName03}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="googleReview03"
                    placeholder={googleReviewLink03}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditGoogleReview03(_id);
                    setEditGoogleReview03(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditGoogleReview03(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{googleMapLink && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={locations} alt="googleMap01" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal42 && !editGoogleMap) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Google Map</span>
              <span className="text-gray-500 text-sm">{googleMapName}</span>
            </div>
          )}
          {(!modal42 && !editGoogleMap) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditGoogleMap(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal42(true)}
              />
            </div>
          )}
          {modal42 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal42(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteGoogleMap(_id);
                    window.location.reload();
                    setModal42(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editGoogleMap && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Google Map</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="googleMapText"
                    placeholder={googleMapName}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="googleMap"
                    placeholder={googleMapLink}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditGoogleMap(_id);
                    setEditGoogleMap(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditGoogleMap(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{googleMapLink02 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={locations} alt="googleMap02" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal43 && !editGoogleMap02) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Google Map</span>
              <span className="text-gray-500 text-sm">{googleMapName02}</span>
            </div>
          )}
          {(!modal43 && !editGoogleMap02) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditGoogleMap02(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal43(true)}
              />
            </div>
          )}
          {modal43 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal43(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteGoogleMap02(_id);
                    window.location.reload();
                    setModal43(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editGoogleMap02 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Google Map</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="googleMapText02"
                    placeholder={googleMapName02}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="googleMap02"
                    placeholder={googleMapLink02}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditGoogleMap02(_id);
                    setEditGoogleMap02(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditGoogleMap02(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{googleMapLink03 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={locations} alt="googleMap03" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal44 && !editGoogleMap03) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Google Map</span>
              <span className="text-gray-500 text-sm">{googleMapName03}</span>
            </div>
          )}
          {(!modal44 && !editGoogleMap03) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditGoogleMap03(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal44(true)}
              />
            </div>
          )}
          {modal44 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal44(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteGoogleMap03(_id);
                    window.location.reload();
                    setModal44(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editGoogleMap03 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Google Map</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="googleMapText03"
                    placeholder={googleMapName03}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="googleMap03"
                    placeholder={googleMapLink03}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditGoogleMap03(_id);
                    setEditGoogleMap03(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditGoogleMap03(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{menuLink && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={menu} alt="menu01" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal45 && !editMenu) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Menu</span>
              <span className="text-gray-500 text-sm">{menuName}</span>
            </div>
          )}
          {(!modal45 && !editMenu) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditMenu(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal45(true)}
              />
            </div>
          )}
          {modal45 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal45(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteMenu(_id);
                    window.location.reload();
                    setModal45(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editMenu && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Menu</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="menuText"
                    placeholder={menuName}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="menuLink"
                    placeholder={menuLink}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditMenu(_id);
                    setEditMenu(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditMenu(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{catalogueLink && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={catalog} alt="catalogue01" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal46 && !editCatalogue) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Catalogue</span>
              <span className="text-gray-500 text-sm">{catalogueName}</span>
            </div>
          )}
          {(!modal46 && !editCatalogue) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditCatalogue(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal46(true)}
              />
            </div>
          )}
          {modal46 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md  text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal46(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteCatalogue(_id);
                    window.location.reload();
                    setModal46(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editCatalogue && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Catalogue</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="catalogueText"
                    placeholder={catalogueName}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="catalogueLink"
                    placeholder={catalogueLink}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditCatalogue(_id);
                    setEditCatalogue(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditCatalogue(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{profileLink01 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={profile} alt="profile01" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal48 && !editProfile01) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Profile</span>
              <span className="text-gray-500 text-sm">{profileName01}</span>
            </div>
          )}
          {(!modal48 && !editProfile01) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditProfile01(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal48(true)}
              />
            </div>
          )}
          {modal48 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal48(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteProfile01(_id);
                    window.location.reload();
                    setModal48(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editProfile01 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Profile</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="profileText01"
                    placeholder={profileName01}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="profile01"
                    placeholder={profileLink01}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditProfile01(_id);
                    setEditProfile01(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditProfile01(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}
{profileLink02 && (
  <div className="flex justify-center mt-3">
    <a className="flex w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
      <div className="flex items-center space-x-6 w-full">
        <img src={profile} alt="profile02" className="h-10 w-10" />
        <div className="flex flex-1 items-center justify-between">
          {(!modal47 && !editProfile02) && (
            <div className="flex flex-col text-start gap-y-1">
              <span className="font-medium">Profile</span>
              <span className="text-gray-500 text-sm">{profileName02}</span>
            </div>
          )}
          {(!modal47 && !editProfile02) && (
            <div className="flex space-x-3">
              <FaEdit
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setEditProfile02(true)}
              />
              <MdDelete
                size={20}
                color="black"
                className="cursor-pointer"
                onClick={() => setModal47(true)}
              />
            </div>
          )}
          {modal47 && (
            <div className="text-start w-full">
              <div className="text-sm font-medium mb-2">
                Are you sure you want to delete?
              </div>
              <div className="flex justify-start space-x-1">
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => setModal47(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
                  onClick={() => {
                    handleDeleteProfile02(_id);
                    window.location.reload();
                    setModal47(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
          {editProfile02 && (
            <div className="flex flex-col text-start gap-y-1 w-full">
              <span className="font-medium">Profile</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex flex-col space-y-2 mt-1">
                  <label>Account Name:</label>
                  <input
                    id="profileText02"
                    placeholder={profileName02}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                  <label>Account Link:</label>
                  <input
                    id="profile02"
                    placeholder={profileLink02}
                    className="flex-1 max-w-[150px] px-3 py-0.5 border rounded-md focus:outline-none"
                  />
                </div>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => {
                    handleEditProfile02(_id);
                    setEditProfile02(false);
                    window.location.reload();
                  }}
                >
                  &#x2714;
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
                  onClick={() => setEditProfile02(false)}
                >
                  &#x2716;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  </div>
)}

{ (
  phone01 == "" || phone02 == "" || phone03 == "" || 
  telephone01 == "" || telephone02 == "" || telephone03 == "" ||
  address == "" || whatsapp01 == "" || whatsapp02 == "" || whatsapp03 == "" ||
  instagramLink == "" || instagramLink02 == "" || instagramLink03 == "" ||
  snapchatLink == "" || snapchatLink02 == "" || snapchatLink03 == "" ||
  youtubeLink == "" || youtubeLink02 == "" || youtubeLink03 == "" ||
  tiktokLink == "" || tiktokLink02 == "" || tiktokLink03 == "" ||
  twitterLink == "" || twitterLink02 == "" || twitterLink03 == "" ||
  facebookLink == "" || facebookLink02 == "" || facebookLink03 == "" ||
  googleReviewLink == "" || googleReviewLink02 == "" || googleReviewLink03 == "" ||
  website == "" || website02 == "" || website03 == "" ||
  email == "" || email02 == "" || email03 == "" ||
  youtubeShortsLink == "" || youtubeShortsLink02 == "" || youtubeShortsLink03 == "" ||
  googleMapLink == "" || googleMapLink02 == "" || googleMapLink03 == "" ||
  menuLink == "" || catalogueLink == "" || profileLink01 == "" || profileLink02 == ""
 ) && <div 
  className="flex items-center  cursor-pointer bg-white mx-auto rounded-lg border-4 border-white shadow-md px-1 py-2 mt-3 gap-x-2" 
  onClick={() => handleShow02()}
>
  <IoIosAddCircle className="text-black" size={30} />
  <div className="text-lg font-bold ">Add More Social Medias</div>
</div>}
</div>
{ services != "" && <div className="px-4 ">
      <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-5">Services</h2>
      <hr className="border-gray-300" />
      {services && (
  <div className="flex justify-center mt-2 w-full px-5 py-3 bg-white text-gray-700 shadow rounded-lg max-w-md">
    <a className="flex w-full py-1  text-gray-700  max-w-md">
      <div className="flex items-center space-x-6 w-full">
      <div className="flex flex-row w-full  items-start justify-between gap-x-3">
  {(!modal01 && !editServices) && (
    <div className="flex flex-col text-md max-w-[250px] font-medium text-gray-800 pt-1 text-start gap-y-1">
      {services.split("\n").map((line, index) => (
        <div key={index} className="flex items-start space-x-2">
          <span className="text-gray-700">•</span>
          <span>{line}</span>
        </div>
      ))}
    </div>
  )}
  
  {/* Modal for confirmation */}
  {modal01 && (
    <div className="text-center w-full">
      <div className="text-sm font-medium mb-2">
        Are you sure you want to delete?
      </div>
      <div className="flex justify-start space-x-1">
        <button
          className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
          onClick={() => setModal01(false)}
        >
          Cancel
        </button>
        <button
          className="bg-black font-medium text-md text-white px-3 py-1 rounded-md border border-white"
          onClick={() => {
            handleDeleteServices(_id);
            window.location.reload();
            setModal01(false);
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  )}

  {/* Edit services modal */}
  {editServices && (
    <div className="flex flex-col text-start gap-y-1 w-full">
      <span className="font-semibold">Services:</span>
      <div className="flex items-center w-full space-x-2 mt-1">
  <div className="flex flex-col space-y-2 mt-1 w-full max-w-[250px]">
    <textarea
      id="services"
      rows="4"  // Setting rows for better height management
      placeholder={services}
      className="w-full px-3 py-0.5 border rounded-md focus:outline-none"
    />
  </div>
  <div className="flex space-x-2">
    <button
      className="bg-green-600 text-white px-2 py-1 rounded-md text-sm"
      onClick={() => {
        handleEditServices(_id);
        setEditServices(false);
        window.location.reload();
      }}
    >
      &#x2714;
    </button>
    <button
      className="bg-red-600 text-white px-2 py-1 rounded-md text-sm"
      onClick={() => setEditServices(false)}
    >
      &#x2716;
    </button>
  </div>
</div>

    </div>
  )}
</div>

      </div>
      {(!modal01 && !editServices) && (
    <div className="flex justify-center items-center space-x-3">
      <FaEdit
        size={20}
        color="black"
        className="cursor-pointer"
        onClick={() => setEditServices(true)}
      />
      <MdDelete
        size={20}
        color="black"
        className="cursor-pointer"
        onClick={() => setModal01(true)}
      />
    </div>
  )}

    </a>
  </div>
)}

</div>}


      <div className="px-4">
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

        {!editImg01 && !deleteModal01 && (
          <div className="space-x-2">
            <button
              className="btn bg-green-500 text-white rounded-md py-1 px-6"
              onClick={() => {setDeleteModal01(false)
                setEditImg01(true)}}
            >
              Edit
            </button>
            <button
              className="btn bg-red-500 text-white rounded-md py-1 px-4"
              onClick={() => {
                setDeleteModal01(true)}}
            >
              Delete
            </button>
          </div>
        )}

        {deleteModal01 && (
          <div>
            <div className="text-center text-md font-medium">
              Are you sure you want to delete?
            </div>
            <div className="flex items-center justify-center mt-1 space-x-1">
              <button
                className="bg-black text-white py-1 px-4 border border-white rounded-md hover:bg-gray-800"
                onClick={() => {
                  setDeleteModal01(false);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-black text-white py-1 px-3 border border-white rounded-md hover:bg-gray-800"
                onClick={() => {
                  handleDeleteImg01(_id);
                  setDeleteModal01(false);
                  window.location.reload();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        )}

        {editImg01 && (
                  <div className="flex items-center justify-center pt-1.5 gap-6 w-fit mx-auto">
                  <input
                    type="file"
                    className="file-input w-56 h-8 text-sm"
                    onChange={handleEditImg01}
                  />
                  <ImCross
                    color="white"
                    size={18}
                    className="cursor-pointer bg-black p-1 rounded-sm"
                    onClick={() => {
                      setEditImg01(false);
                    }}
                  />
                </div>
        )}


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

      {!editImg02 && !deleteModal02 && (
        <div className="space-x-2">
          <button
            className="btn bg-green-500 text-white rounded-md py-1 px-6"
            onClick={() => {
              setDeleteModal02(false);
              setEditImg02(true);
            }}
          >
            Edit
          </button>
          <button
            className="btn bg-red-500 text-white rounded-md py-1 px-4"
            onClick={() => {
              setDeleteModal02(true);
            }}
          >
            Delete
          </button>
        </div>
      )}

      {deleteModal02 && (
        <div>
          <div className="text-center text-md font-medium">
            Are you sure you want to delete?
          </div>
          <div className="flex items-center justify-center mt-1 space-x-1">
            <button
              className="bg-black text-white py-1 px-4 border border-white rounded-md hover:bg-gray-800"
              onClick={() => {
                setDeleteModal02(false);
              }}
            >
              Cancel
            </button>
            <button
              className="bg-black text-white py-1 px-3 border border-white rounded-md hover:bg-gray-800"
              onClick={() => {
                handleDeleteImg02(_id);
                window.location.reload();
                setDeleteModal02(false);
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {editImg02 && (
        <div className="flex items-center justify-center pt-1.5 gap-6 w-fit mx-auto">
  <input
    type="file"
    className="file-input w-56 h-8 text-sm"
    onChange={handleEditImg02}
  />
  <ImCross
    color="white"
    size={18}
    className="cursor-pointer bg-black p-1 rounded-sm"
    onClick={() => {
      setEditImg02(false);
    }}
  />
</div>
      )}
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

      {!editImg03 && !deleteModal03 && (
        <div className="space-x-2">
          <button
            className="btn bg-green-500 text-white rounded-md py-1 px-6"
            onClick={() => {
              setDeleteModal03(false);
              setEditImg03(true);
            }}
          >
            Edit
          </button>
          <button
            className="btn bg-red-500 text-white rounded-md py-1 px-4"
            onClick={() => {
              setDeleteModal03(true);
            }}
          >
            Delete
          </button>
        </div>
      )}

      {deleteModal03 && (
        <div>
          <div className="text-center text-md font-medium">
            Are you sure you want to delete?
          </div>
          <div className="flex items-center justify-center mt-1 space-x-1">
            <button
              className="bg-black text-white py-1 px-4 border border-white rounded-md hover:bg-gray-800"
              onClick={() => {
                setDeleteModal03(false);
              }}
            >
              Cancel
            </button>
            <button
              className="bg-black text-white py-1 px-3 border border-white rounded-md hover:bg-gray-800"
              onClick={() => {
                handleDeleteImg03(_id);
                window.location.reload();
                setDeleteModal03(false);
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {editImg03 && (
                <div className="flex items-center justify-center pt-1.5 gap-6 w-fit mx-auto">
                <input
                  type="file"
                  className="file-input w-56 h-8 text-sm"
                  onChange={handleEditImg03}
                />
                <ImCross
                  color="white"
                  size={18}
                  className="cursor-pointer bg-black p-1 rounded-sm"
                  onClick={() => {
                    setEditImg03(false);
                  }}
                />
              </div>
      )}
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

      {!editImg04 && !deleteModal04 && (
        <div className="space-x-2">
          <button
            className="btn bg-green-500 text-white rounded-md py-1 px-6"
            onClick={() => {
              setDeleteModal04(false);
              setEditImg04(true);
            }}
          >
            Edit
          </button>
          <button
            className="btn bg-red-500 text-white rounded-md py-1 px-4"
            onClick={() => {
              setDeleteModal04(true);
            }}
          >
            Delete
          </button>
        </div>
      )}

      {deleteModal04 && (
        <div>
          <div className="text-center text-md font-medium">
            Are you sure you want to delete?
          </div>
          <div className="flex items-center justify-center mt-1 space-x-1">
            <button
              className="bg-black text-white py-1 px-4 border border-white rounded-md hover:bg-gray-800"
              onClick={() => {
                setDeleteModal04(false);
              }}
            >
              Cancel
            </button>
            <button
              className="bg-black text-white py-1 px-3 border border-white rounded-md hover:bg-gray-800"
              onClick={() => {
                handleDeleteImg04(_id);
                window.location.reload();
                setDeleteModal04(false);
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {editImg04 && (
               <div className="flex items-center justify-center pt-1.5 gap-6 w-fit mx-auto">
               <input
                 type="file"
                 className="file-input w-56 h-8 text-sm"
                 onChange={handleEditImg04}
               />
               <ImCross
                 color="white"
                 size={18}
                 className="cursor-pointer bg-black p-1 rounded-sm"
                 onClick={() => {
                   setEditImg04(false);
                 }}
               />
             </div>
      )}
    </div>)}

    {img05 && ( <div className="flex flex-col items-center bg-white mx-auto rounded-xl border-4 border-white shadow-md p-1 space-y-2 mt-3">
      <a href={img05}>
        <img
          src={img05}
          alt="Image"
          className="w-100 h-auto rounded-xl shadow-md hover:shadow-lg"
        />
      </a>

      {!editImg05 && !deleteModal05 && (
        <div className="space-x-2">
          <button
            className="btn bg-green-500 text-white rounded-md py-1 px-6"
            onClick={() => {
              setDeleteModal05(false);
              setEditImg05(true);
            }}
          >
            Edit
          </button>
          <button
            className="btn bg-red-500 text-white rounded-md py-1 px-4"
            onClick={() => {
              setDeleteModal05(true);
            }}
          >
            Delete
          </button>
        </div>
      )}

      {deleteModal05 && (
        <div>
          <div className="text-center text-md font-medium">
            Are you sure you want to delete?
          </div>
          <div className="flex items-center justify-center mt-1 space-x-1">
            <button
              className="bg-black text-white py-1 px-4 border border-white rounded-md hover:bg-gray-800"
              onClick={() => {
                setDeleteModal05(false);
              }}
            >
              Cancel
            </button>
            <button
              className="bg-black text-white py-1 px-3 border border-white rounded-md hover:bg-gray-800"
              onClick={() => {
                handleDeleteImg05(_id);
                window.location.reload();
                setDeleteModal05(false);
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {editImg05 && (
                <div className="flex items-center justify-center pt-1.5 gap-6 w-fit mx-auto">
                <input
                  type="file"
                  className="file-input w-56 h-8 text-sm"
                  onChange={handleEditImg05}
                />
                <ImCross
                  color="white"
                  size={18}
                  className="cursor-pointer bg-black p-1 rounded-sm"
                  onClick={() => {
                    setEditImg05(false);
                  }}
                />
              </div>
      )}
    </div>)}

    {img06 && ( <div className="flex flex-col items-center bg-white mx-auto rounded-xl border-4 border-white shadow-md p-1 space-y-2 mt-3">
      <a href={img06}>
        <img
          src={img06}
          alt="Image"
          className="w-100 h-auto rounded-xl shadow-md hover:shadow-lg"
        />
      </a>

      {!editImg06 && !deleteModal06 && (
        <div className="space-x-2">
          <button
            className="btn bg-green-500 text-white rounded-md py-1 px-6"
            onClick={() => {
              setDeleteModal06(false);
              setEditImg06(true);
            }}
          >
            Edit
          </button>
          <button
            className="btn bg-red-500 text-white rounded-md py-1 px-4"
            onClick={() => {
              setDeleteModal06(true);
            }}
          >
            Delete
          </button>
        </div>
      )}

      {deleteModal06 && (
        <div>
          <div className="text-center text-md font-medium">
            Are you sure you want to delete?
          </div>
          <div className="flex items-center justify-center mt-1 space-x-1">
            <button
              className="bg-black text-white py-1 px-4 border border-white rounded-md hover:bg-gray-800"
              onClick={() => {
                setDeleteModal06(false);
              }}
            >
              Cancel
            </button>
            <button
              className="bg-black text-white py-1 px-3 border border-white rounded-md hover:bg-gray-800"
              onClick={() => {
                handleDeleteImg06(_id);
                window.location.reload();
                setDeleteModal06(false);
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      )}

{editImg06 && (
                <div className="flex items-center justify-center pt-1.5 gap-6 w-fit mx-auto">
                <input
                  type="file"
                  className="file-input w-56 h-8 text-sm"
                  onChange={handleEditImg06}
                />
                <ImCross
                  color="white"
                  size={18}
                  className="cursor-pointer bg-black p-1 rounded-sm"
                  onClick={() => {
                    setEditImg06(false);
                  }}
                />
              </div>
      )}
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

    {!editImg07 && !deleteModal07 && (
      <div className="space-x-2">
        <button
          className="btn bg-green-500 text-white rounded-md py-1 px-6"
          onClick={() => {
            setDeleteModal07(false);
            setEditImg07(true);
          }}
        >
          Edit
        </button>
        <button
          className="btn bg-red-500 text-white rounded-md py-1 px-4"
          onClick={() => {
            setDeleteModal07(true);
          }}
        >
          Delete
        </button>
      </div>
    )}

    {deleteModal07 && (
      <div>
        <div className="text-center text-md font-medium">
          Are you sure you want to delete?
        </div>
        <div className="flex items-center justify-center mt-1 space-x-1">
          <button
            className="bg-black text-white py-1 px-4 border border-white rounded-md hover:bg-gray-800"
            onClick={() => {
              setDeleteModal07(false);
            }}
          >
            Cancel
          </button>
          <button
            className="bg-black text-white py-1 px-3 border border-white rounded-md hover:bg-gray-800"
            onClick={() => {
              handleDeleteImg07(_id);
              window.location.reload();
              setDeleteModal07(false);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    )}

    {editImg07 && (
              <div className="flex items-center justify-center pt-1.5 gap-6 w-fit mx-auto">
              <input
                type="file"
                className="file-input w-56 h-8 text-sm"
                onChange={handleEditImg07}
              />
              <ImCross
                color="white"
                size={18}
                className="cursor-pointer bg-black p-1 rounded-sm"
                onClick={() => {
                  setEditImg07(false);
                }}
              />
            </div>
    )}
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

    {!editImg08 && !deleteModal08 && (
      <div className="space-x-2">
        <button
          className="btn bg-green-500 text-white rounded-md py-1 px-6"
          onClick={() => {
            setDeleteModal08(false);
            setEditImg08(true);
          }}
        >
          Edit
        </button>
        <button
          className="btn bg-red-500 text-white rounded-md py-1 px-4"
          onClick={() => {
            setDeleteModal08(true);
          }}
        >
          Delete
        </button>
      </div>
    )}

    {deleteModal08 && (
      <div>
        <div className="text-center text-md font-medium">
          Are you sure you want to delete?
        </div>
        <div className="flex items-center justify-center mt-1 space-x-1">
          <button
            className="bg-black text-white py-1 px-4 border border-white rounded-md hover:bg-gray-800"
            onClick={() => {
              setDeleteModal08(false);
            }}
          >
            Cancel
          </button>
          <button
            className="bg-black text-white py-1 px-3 border border-white rounded-md hover:bg-gray-800"
            onClick={() => {
              handleDeleteImg08(_id);
              window.location.reload();
              setDeleteModal08(false);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    )}

    {editImg08 && (
              <div className="flex items-center justify-center pt-1.5 gap-6 w-fit mx-auto">
              <input
                type="file"
                className="file-input w-56 h-8 text-sm"
                onChange={handleEditImg08}
              />
              <ImCross
                color="white"
                size={18}
                className="cursor-pointer bg-black p-1 rounded-sm"
                onClick={() => {
                  setEditImg08(false);
                }}
              />
            </div>
    )}
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

    {!editImg09 && !deleteModal09 && (
      <div className="space-x-2">
        <button
          className="btn bg-green-500 text-white rounded-md py-1 px-6"
          onClick={() => {
            setDeleteModal09(false);
            setEditImg09(true);
          }}
        >
          Edit
        </button>
        <button
          className="btn bg-red-500 text-white rounded-md py-1 px-4"
          onClick={() => {
            setDeleteModal09(true);
          }}
        >
          Delete
        </button>
      </div>
    )}

    {deleteModal09 && (
      <div>
        <div className="text-center text-md font-medium">
          Are you sure you want to delete?
        </div>
        <div className="flex items-center justify-center mt-1 space-x-1">
          <button
            className="bg-black text-white py-1 px-4 border border-white rounded-md hover:bg-gray-800"
            onClick={() => {
              setDeleteModal09(false);
            }}
          >
            Cancel
          </button>
          <button
            className="bg-black text-white py-1 px-3 border border-white rounded-md hover:bg-gray-800"
            onClick={() => {
              handleDeleteImg09(_id);
              window.location.reload();
              setDeleteModal09(false);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    )}

    {editImg09 && (
              <div className="flex items-center justify-center pt-1.5 gap-6 w-fit mx-auto">
              <input
                type="file"
                className="file-input w-56 h-8 text-sm"
                onChange={handleEditImg09}
              />
              <ImCross
                color="white"
                size={18}
                className="cursor-pointer bg-black p-1 rounded-sm"
                onClick={() => {
                  setEditImg09(false);
                }}
              />
            </div>
    )}
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

    {!editImg10 && !deleteModal10 && (
      <div className="space-x-2">
        <button
          className="btn bg-green-500 text-white rounded-md py-1 px-6"
          onClick={() => {
            setDeleteModal10(false);
            setEditImg10(true);
          }}
        >
          Edit
        </button>
        <button
          className="btn bg-red-500 text-white rounded-md py-1 px-4"
          onClick={() => {
            setDeleteModal10(true);
          }}
        >
          Delete
        </button>
      </div>
    )}

    {deleteModal10 && (
      <div>
        <div className="text-center text-md font-medium">
          Are you sure you want to delete?
        </div>
        <div className="flex items-center justify-center mt-1 space-x-1">
          <button
            className="bg-black text-white py-1 px-4 border border-white rounded-md hover:bg-gray-800"
            onClick={() => {
              setDeleteModal10(false);
            }}
          >
            Cancel
          </button>
          <button
            className="bg-black text-white py-1 px-3 border border-white rounded-md hover:bg-gray-800"
            onClick={() => {
              handleDeleteImg10(_id);
              window.location.reload();
              setDeleteModal10(false);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    )}

    {editImg10 && (
              <div className="flex items-center justify-center pt-1.5 gap-6 w-fit mx-auto">
              <input
                type="file"
                className="file-input w-56 h-8 text-sm"
                onChange={handleEditImg10}
              />
              <ImCross
                color="white"
                size={18}
                className="cursor-pointer bg-black p-1 rounded-sm"
                onClick={() => {
                  setEditImg10(false);
                }}
              />
            </div>
    )}
  </div>
)}

{ (img01 == "" || img02 == "" || img03 == "" || img04 == "" || img05 == "" || img06 == "" || img07 == "" || img08 == "" || img09 == "" || img10 == "") && <div 
  className="flex items-center  cursor-pointer bg-white mx-auto rounded-xl border-4 border-white shadow-md px-1 py-2 mt-3 gap-x-2" 
  onClick={() => handleShow03()}
>
  <IoIosAddCircle className="text-black" size={30} />
  <div className="text-lg font-bold ">Add More Images</div>
</div>}



      </div>

    
      <div className="px-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-5">Location</h2>
      <hr className="border-gray-300" />
      <div className="flex flex-col items-center bg-white mx-auto rounded-xl border-4 border-white shadow-md  space-y-4 mt-3">
        {location && (
         <iframe src={location} width="100%" height="300" allowfullscreen="" loading="lazy" className="rounded-xl"></iframe> 
        )}
      </div>
      </div>
      <div className="px-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-5">Share Profile</h2>
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
      <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-5">Share Contact & QR</h2>
      <hr className="border-gray-300" />
      <div className="flex justify-center space-x-3 mt-3 px-4">
              <div className=" flex justify-center items-center w-16 h-16 rounded-full border-2 border-white bg-white"  onClick={handleShow} >
              <IoQrCodeSharp size={35} color="black" />
              </div>
       
              <div  className=" flex justify-center items-center w-16 h-16 rounded-full border-2 border-white bg-white" onClick={downloadContactCard} value="download">
              <FaDownload size={30} color="black" />
              </div>
      </div>
        
      <p className="pt-4">Copyright © <span className="company">{companyName}</span>. All Rights Reserved.</p>
    </div>
          </section>
}

{show02 && (
      <div
      className="min-h-screen bg-gradient-to-tr from-[#ffb8d6] via-[#f9d6cd] to-[#f6ece9] w-full max-w-md mx-auto shadow-lg flex flex-col items-center justify-center relative"
      style={{ backgroundAttachment: "fixed" }}
    >
      <div className="bg-white border-gray-500 rounded-lg pb-8 pt-16 px-10 relative">
        {/* Close Icon */}
        <ImCross
          className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-black"
          onClick={()=>{
            window.location.reload()
            handleClose02()
            setSelected("")
            setSelected02("")
            
          }}
        />

        <div className="flex flex-col items-center justify-center space-y-8">
          {/* QR Code */}
          {/* Buttons and Social Icons */}
          <div style={{
          position: 'initial',
          display: 'flex',
          flexDirection: 'column', // Makes the content flow vertically
          alignItems: 'center',
        }}>
            <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
              <div style={{fontSize:"20px", color:"rgb(22, 33, 92)", fontFamily:"sans-serif", fontWeight:"bold", marginBlock:"10px"}}>Select One of them</div>
            </div>
            <div style={{
      display: 'flex',
      flexWrap: 'wrap', // Allows icons to wrap
      justifyContent: 'center',
      maxWidth: '650px', // Set a max width for the icon container
      gapInline: '5px', // Adds space between icons
      paddingBlock: '5px',
    }}
>
              {(phone01 == "" || phone02 == "" || phone01 == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Phone Number")
                setSelected02("")
              }} src={phone} height={50} width={50}></img>}
              {(email02 == "" || email03 == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Email")
                setSelected02("")
              }} src={emailImg} height={50} width={50}></img>}
              {(whatsapp01 == "" || whatsapp02 == ""|| whatsapp03 == "" )&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Whatsapp Number")
                setSelected02("")
              }} src={whatsapp} height={50} width={50}></img>}
              {(telephone01 == "" || telephone02 == ""|| telephone03 == "" )&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Telephone Number")
                setSelected02("")
              }} src={telephone} height={50} width={50}></img>}
              {(tiktokLink == "" || tiktokLink02 == "" || tiktokLink03 == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Tiktok Link")
                setSelected02("Tiktok Account Name")
              }} src={tiktok} height={50} width={50}></img>}
              {(twitterLink == "" || twitterLink02 == "" || twitterLink03 == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Twitter Link")
                setSelected02("Twitter Account Name")
              }} src={threads} height={50} width={50}></img>}
              {(instagramLink == "" || instagramLink02 == "" || instagramLink03 == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Instagram Link")
                setSelected02("Instagram Account Name")
              }} src={insta} height={50} width={50}></img>}
               {(googleMapLink == "" || googleMapLink02 == "" || googleMapLink03 == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Google Map Link")
                setSelected02("Google Map Account Name")
              }} src={locations} height={50} width={50}></img>}
               {(googleReviewLink == "" || googleReviewLink02 == "" || googleReviewLink03 == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Google Review Link")
                setSelected02("Google Review Account Name")
              }} src={greview} height={50} width={50}></img>}
               {(snapchatLink == "" || snapchatLink02 == "" || snapchatLink03 == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Snapchat Link")
                setSelected02("Snapchat Account Name")
              }} src={snap} height={50} width={50}></img>}
               {(youtubeLink == "" || youtubeLink02 == "" || youtubeLink03 == "")&&<img style={{marginInline:"8px" ,marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Youtube Link")
                setSelected02("Youtube Account Name")
              }} src={yt} height={50} width={50} ></img>}
               {(youtubeShortsLink == "" || youtubeShortsLink02 == "" || youtubeShortsLink03 == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover", borderRadius:"5px"}} onClick={()=>{
                setSelected("Linkedin Link")
                setSelected02("Linkedin Account Name")
              }} src={linkedin02} height={50} width={50}></img>}
               {(facebookLink == "" || facebookLink02 == "" || facebookLink03 == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Facebook Link")
                setSelected02("Facebook Account Name")
              }} src={fb} height={50} width={50}></img>}
               {(website == "" || website02 == "" || website03 == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Website Link")
                setSelected02("Website Name")
              }} src={websiteImg} height={50} width={50}></img>}
               {(address == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Address")
                setSelected02("")
              }} src={addressImg} height={50} width={50}></img>}
               {(menuLink == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Menu Link")
                setSelected02("Menu Name")
              }} src={menu} height={50} width={50}></img>}
               {(catalogueLink == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Catalogue Link")
                setSelected02("Catalogue Name")
              }} src={catalog} height={50} width={50}></img>}
               {(profileLink01 == "" || profileLink02 == "")&&<img style={{marginInline:"8px",marginBlock:"8px", objectFit:"cover"}} onClick={()=>{
                setSelected("Profile Link")
                setSelected02("Profile Name")
              }} src={profile} height={50} width={50}></img>}
             
              </div>

             {(selected !="") && <div>
              <div className="flex flex-col justify-center">
               {(selected02 !="") && <div>
                <span style={{display:"flex", alignItems:"center", justifyContent:"center",fontSize:"20px", color:"rgb(22, 33, 92)", fontFamily:"sans-serif", fontWeight:"bold", marginBlock:"10px"}}> Enter {selected02}: </span>
               <span style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <input  className="px-3 py-0.5 border border-gray-300 rounded-md focus:outline-none" id="add-link-text" style={{paddingBlock:"5px", width:"200px", paddingInline:"10px"}} type="text" /></span></div>}
                <div>
                <span style={{display:"flex", alignItems:"center", justifyContent:"center",fontSize:"20px", color:"rgb(22, 33, 92)", fontFamily:"sans-serif", fontWeight:"bold", marginBlock:"10px"}}> Enter {selected}: </span>
               <span style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <input className="px-3 py-0.5 border border-gray-300 rounded-md focus:outline-none" id="add-link" style={{paddingBlock:"5px", width:"200px", paddingInline:"10px"}} type="text" /></span></div>
                <ToastContainer />

                <button className="mt-5" onClick={()=>{
                  if(selected == "Phone Number")
                    {
                      if(phone01 == "")
                      {
                        handleAddPhone01(_id)
                        toast("Phone Number Added Successfully!")
                        document.getElementById('add-link').value = "";
                        document.getElementById('add-link-text').value = "";
                      } else if(phone02 == "")
                        {
                          handleAddPhone02(_id)
                        toast("Phone Number Added Successfully!")
                        document.getElementById('add-link').value = "";
                        document.getElementById('add-link-text').value = "";
                        }
                        else if(phone03 == "")
                          {
                            handleAddPhone03(_id)
                        toast("Phone Number Added Successfully!")
                        document.getElementById('add-link').value = "";
                        document.getElementById('add-link-text').value = "";
                          }

                    }
                  else  if(selected == "Telephone Number")
                    {
                      if(telephone01 == "")
                      {
                        handleAddTelephone01(_id)
                        toast("Telephone Number Added Successfully!")
                        document.getElementById('add-link').value = "";
                        document.getElementById('add-link-text').value = "";
                      } else if(telephone02 == "")
                        {
                          handleAddTelephone02(_id)
                        toast("Telephone Number Added Successfully!")
                        document.getElementById('add-link').value = "";
                        document.getElementById('add-link-text').value = "";
                        }
                        else if(telephone03 == "")
                          {
                            handleAddTelephone03(_id)
                        toast("Telephone Number Added Successfully!")
                        document.getElementById('add-link').value = "";
                        document.getElementById('add-link-text').value = "";
                          }

                    }
                  else if(selected == "Tiktok Link")
                  {
                    if(tiktokLink == "")
                      {
                        handleAddTiktok(_id)
                        toast("Tiktok Added Successfully!")
                        document.getElementById('add-link').value = "";
                        document.getElementById('add-link-text').value = "";
                      } else if(tiktokLink02 == "")
                        {
                          handleAddTiktok02(_id)
                        toast("Tiktok Added Successfully!")
                        document.getElementById('add-link').value = "";
                        document.getElementById('add-link-text').value = "";
                        }
                        else if(tiktokLink03 == "")
                          {
                            handleAddTiktok03(_id)
                          toast("Tiktok Added Successfully!")
                          document.getElementById('add-link').value = "";
                          document.getElementById('add-link-text').value = "";
                          }
                    
                  }
                  else if(selected == "Whatsapp Number")
                    {
                      if(whatsapp01 == "")
                        {
                          handleAddWhatsapp01(_id)
                          toast("Whatsapp Added Successfully!")
                          document.getElementById('add-link').value = "";
                          document.getElementById('add-link-text').value = "";
                        } else if(whatsapp02 == "")
                          {
                            handleAddWhatsapp02(_id)
                            toast("Whatsapp Added Successfully!")
                            document.getElementById('add-link').value = "";
                            document.getElementById('add-link-text').value = "";
                          }
                          else if(whatsapp03 == "")
                            {
                              handleAddWhatsapp03(_id)
                              toast("Whatsapp Added Successfully!")
                              document.getElementById('add-link').value = "";
                              document.getElementById('add-link-text').value = "";
                            }
                    }
                  else if(selected == "Email")
                      {
                        if(email == "")
                          {
                            handleAddEmail(_id)
                            toast("Email Added Successfully!")
                            document.getElementById('add-link').value = "";
                            document.getElementById('add-link-text').value = "";
                          } else if(email02 == "")
                            {
                              handleAddEmail02(_id)
                              toast("Email Added Successfully!")
                              document.getElementById('add-link').value = "";
                              document.getElementById('add-link-text').value = "";
                            }
                            else if(email03 == "")
                              {
                                handleAddEmail03(_id)
                                toast("Email Added Successfully!")
                                document.getElementById('add-link').value = "";
                                document.getElementById('add-link-text').value = "";
                              }
  
                      }
                  else if(selected == "Instagram Link")
                      {
                        if(instagramLink == "")
                          {
                            handleAddInstagram(_id)
                            toast("Instagram Added Successfully!")
                            document.getElementById('add-link').value = "";
                            document.getElementById('add-link-text').value = "";
                          } else if(instagramLink02 == "")
                            {
                              handleAddInstagram02(_id)
                              toast("Instagram Added Successfully!")
                              document.getElementById('add-link').value = "";
                              document.getElementById('add-link-text').value = "";
                            }
                            else if(instagramLink03 == "")
                              {
                                handleAddInstagram03(_id)
                                toast("Instagram Added Successfully!")
                                document.getElementById('add-link').value = "";
                                document.getElementById('add-link-text').value = "";
                              }
  
  
                      }
                 else if(selected == "Snapchat Link")
                      {
                        if(snapchatLink == "")
                          {
                            handleAddSnapchat(_id)
                            toast("Snapchat Added Successfully!")
                            document.getElementById('add-link').value = "";
                            document.getElementById('add-link-text').value = "";
                          } else if(snapchatLink02 == "")
                            {
                              handleAddSnapchat02(_id)
                              toast("Snapchat Added Successfully!")
                              document.getElementById('add-link').value = "";
                              document.getElementById('add-link-text').value = "";
                            }
                            else if(snapchatLink03 == "")
                              {
                                handleAddSnapchat03(_id)
                                toast("Snapchat Added Successfully!")
                                document.getElementById('add-link').value = "";
                                document.getElementById('add-link-text').value = "";
                              }
  
                      }
                      else if(selected == "Twitter Link")
                        {
                          if(twitterLink == "")
                            {
                              handleAddTwitter(_id)
                              toast("Twitter Added Successfully!")
                              document.getElementById('add-link').value = "";
                              document.getElementById('add-link-text').value = "";
                            } else if(twitterLink02 == "")
                              {
                                handleAddTwitter02(_id)
                                toast("Twitter Added Successfully!")
                                document.getElementById('add-link').value = "";
                                document.getElementById('add-link-text').value = "";
                              }
                              else if(twitterLink03 == "")
                                {
                                  handleAddTwitter03(_id)
                                  toast("Twitter Added Successfully!")
                                  document.getElementById('add-link').value = "";
                                  document.getElementById('add-link-text').value = "";
                                }
                        }
                      
                      else if(selected == "Youtube Link")
                      {
                        if(youtubeLink == "")
                          {
                            handleAddYoutube(_id)
                            toast("Youtube Added Successfully!")
                            document.getElementById('add-link').value = "";
                            document.getElementById('add-link-text').value = "";
                          } else if(youtubeLink02 == "")
                            {
                              handleAddYoutube02(_id)
                              toast("Youtube Added Successfully!")
                              document.getElementById('add-link').value = "";
                              document.getElementById('add-link-text').value = "";
                            }
                            else if(youtubeLink03 == "")
                              {
                                handleAddYoutube03(_id)
                                toast("Youtube Added Successfully!")
                                document.getElementById('add-link').value = "";
                                document.getElementById('add-link-text').value = "";
                              }
  
                      }
                      else if(selected == "Linkedin Link")
                        {
                          if(youtubeShortsLink == "")
                            {
                              handleAddYoutubeShorts(_id)
                              toast("YoutubeShorts Added Successfully!")
                              document.getElementById('add-link').value = "";
                              document.getElementById('add-link-text').value = "";
                            } else if(youtubeShortsLink02 == "")
                              {
                                handleAddYoutubeShorts02(_id)
                                toast("YoutubeShorts Added Successfully!")
                                document.getElementById('add-link').value = "";
                                document.getElementById('add-link-text').value = "";
                              }
                              else if(youtubeShortsLink03 == "")
                                {
                                  handleAddYoutubeShorts03(_id)
                                  toast("YoutubeShorts Added Successfully!")
                                  document.getElementById('add-link').value = "";
                                  document.getElementById('add-link-text').value = "";
                                }
                        }
                        
                        else if(selected == "Facebook Link")
                      {
                        if(facebookLink == "")
                          {
                            handleAddFacebook(_id)
                            toast("Facebook Added Successfully!")
                            document.getElementById('add-link').value = "";
                            document.getElementById('add-link-text').value = "";
                          } else if(facebookLink02 == "")
                          {
                            handleAddFacebook02(_id)
                            toast("Facebook Added Successfully!")
                            document.getElementById('add-link').value = "";
                            document.getElementById('add-link-text').value = "";
                          } else if(facebookLink03 == "")
                          {
                            handleAddFacebook03(_id)
                            toast("Facebook Added Successfully!")
                            document.getElementById('add-link').value = "";
                            document.getElementById('add-link-text').value = "";
                          }
                          
                      }
                      else if(selected == "Google Map Link")
                        {
                         
                              if(googleMapLink == "")
                              {
                                handleAddGoogleMap(_id)
                                toast("GoogleMap Added Successfully!")
                                document.getElementById('add-link').value = "";
                                document.getElementById('add-link-text').value = "";
                              } else if(googleMapLink02 == "")
                              {
                                handleAddGoogleMap02(_id)
                                toast("GoogleMap Added Successfully!")
                                document.getElementById('add-link').value = "";
                                document.getElementById('add-link-text').value = "";
                              } else if(googleMapLink03 == "")
                              {
                                handleAddGoogleMap03(_id)
                                toast("GoogleMap Added Successfully!")
                                document.getElementById('add-link').value = "";
                                document.getElementById('add-link-text').value = "";
                              }
                    
                            
                        }
                        else if(selected == "Google Review Link")
                          {
                                if(googleReviewLink == "")
                                {
                                  handleAddGoogleReview(_id)
                                  toast("GoogleReview Added Successfully!")
                                  document.getElementById('add-link').value = "";
                                  document.getElementById('add-link-text').value = "";
                                } else if(googleReviewLink02 == "")
                                {
                                  handleAddGoogleReview02(_id)
                                  toast("GoogleReview Added Successfully!")
                                  document.getElementById('add-link').value = "";
                                  document.getElementById('add-link-text').value = "";
                                } else if(googleReviewLink03 == "")
                                {
                                  handleAddGoogleReview03(_id)
                                  toast("GoogleReview Added Successfully!")
                                  document.getElementById('add-link').value = "";
                                  document.getElementById('add-link-text').value = "";
                                }
                              
                          }
                          else if(selected == "Website Link")
                            {
                              if(website == "")
                                {
                                  handleAddWebsite(_id)
                                  toast("Website Added Successfully!")
                                  document.getElementById('add-link').value = "";
                                  document.getElementById('add-link-text').value = "";
                                } else if(website02 == "")
                                {
                                  handleAddWebsite02(_id)
                                  toast("Website Added Successfully!")
                                  document.getElementById('add-link').value = "";
                                  document.getElementById('add-link-text').value = "";
                                } else if(website03 == "")
                                {
                                  handleAddWebsite03(_id)
                                  toast("Website Added Successfully!")
                                  document.getElementById('add-link').value = "";
                                  document.getElementById('add-link-text').value = "";
                                }
                                
                            }
                            else if(selected == "Address")
                              {
                                handleAddAddress(_id)
                                toast("Address Added Successfully!")
                                document.getElementById('add-link').value = "";
                              }
                              else if(selected == "Menu Link")
                                {
                                  handleAddMenu(_id)
                                  toast("Menu Added Successfully!")
                                  document.getElementById('add-link').value = "";
                                }
                                else if(selected == "Catalogue Link")
                                  {
                                    handleAddCatalogue(_id)
                                    toast("Menu Added Successfully!")
                                    document.getElementById('add-link').value = "";
                                  }
                                  else if(selected == "Profile Link")
                                    {
                                      if(profileLink01 == "")
                                        {
                                          handleAddProfile01(_id)
                                          toast("Profile Added Successfully!")
                                          document.getElementById('add-link').value = "";
                                          document.getElementById('add-link-text').value = "";
                                        } else if(profileLink02 == "")
                                        {
                                          handleAddProfile02(_id)
                                          toast("Profile Added Successfully!")
                                          document.getElementById('add-link').value = "";
                                          document.getElementById('add-link-text').value = "";
                                        }
                                    }
                }} style={{fontSize:"15px", backgroundColor:"rgb(22, 33, 92)", 
                color:"white",fontFamily:"sans-serif", fontWeight:"bold", marginInline:"10px", paddingInline:"20px", paddingBlock:"5px", borderRadius:"5px"}}>ADD</button>
              </div>
              </div>}

              </div>
        </div>
      </div>
    </div>

)}

{show03 && ( <div
  className="qr-modal min-h-screen bg-gradient-to-tr from-[#ffb8d6] via-[#f9d6cd] to-[#f6ece9] w-full max-w-md mx-auto shadow-lg flex flex-col items-center justify-center relative"
  style={{ backgroundAttachment: "fixed" }}
>
  <div className="bg-white border-gray-500 rounded-lg pb-8 pt-16 px-10 relative">
    {/* Close Icon */}
    <ImCross
      className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-black"
      onClick={()=>{
        window.location.reload()
        handleClose03()}}
    />

    <div className="flex flex-col items-center justify-center space-y-8">
      {/* QR Code */}
      <p>Please upload the image </p>
      <div className="flex items-center justify-center">
      <input
  type="file"
  className="w-[200px] max-w-[200px]"
  onChange={(e) => {
    if (img01 === "") {
      handleEditImg01(e);
    }
    else if(img02 === "") {
      handleEditImg02(e);
    }
    else if(img03 === "") {
      handleEditImg03(e);
    }
    else if(img04 === "") {
      handleEditImg04(e);
    }
    else if(img05 === "") {
      handleEditImg05(e);
    }
    else if(img06 === "") {
      handleEditImg06(e);
    }
    else if(img07 === "") {
      handleEditImg07(e);
    }
    else if(img08 === "") {
      handleEditImg08(e);
    }
    else if(img09 === "") {
      handleEditImg09(e);
    }
    else if(img10 === "") {
      handleEditImg10(e);
    }
  }}
  
/>

      </div>
      {/* Buttons and Social Icons */}
  
    </div>
  </div>
</div>)}
          </div>
        );
      }
      else{
        return(
        <div className="spin">
          </div>);
      }
      }

export default EditPortal01
import { useParams } from "react-router-dom";
import { useEffect } from "react";
// import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import EditPortal01 from "./EditPortal01";
import EditPortal02 from "./EditPortal02";
import EditPortal03 from "./EditPortal03";
import axios from "axios";
// import ScaleLoader from "react-spinners/ScaleLoader";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import ScaleLoader from "react-spinners/ScaleLoader";
import EditPortal04 from "./EditPortal04";
import EditPortal05 from "./EditPortal05";
import EditPortal07 from "./EditPortal07";
import EditPortal08 from "./EditPortal08";
import EditPortal09 from "./EditPortal09";
import EditPortal10 from "./EditPortal10";
import EditPortal11 from "./EditPortal11";
import EditPortal12 from "./EditPortal12";
import EditPortal13 from "./EditPortal13";
import EditPortal14 from "./EditPortal14";
import EditPortal15 from "./EditPortal15";
import EditPortal16 from "./EditPortal16";
import EditPortal17 from "./EditPortal17";
import EditPortal18 from "./EditPortal18";
import EditPortal19 from "./EditPortal19";
import EditPortal20 from "./EditPortal20";
import EditPortal21 from "./EditPortal21";
const EditPortal = () => {
  const params = useParams();
  const clientId = params.id;
  console.log(clientId);
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState("");
  console.log(params);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(
          `https://www.scan-taps.com/api/data/clients/${clientId}`
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
  }, []);

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
    visitCount,
    flag,
    option,
  } = client;

  console.log(client);
  console.log(option);

  if (client) {
    if (option === "1") {
      return <EditPortal01 />;
    } else if (option === "2") {
      return <EditPortal02 />;
    } else if (option === "3") {
      return <EditPortal03 />;
    } else if (option === "4") {
      return <EditPortal04 />;
    } else if (option === "5") {
      return <EditPortal05 />;
    } else if (option === "7") {
      return <EditPortal07 />;
    } else if (option === "8") {
      return <EditPortal08 />;
    } else if (option === "9") {
      return <EditPortal09 />;
    } else if (option === "10") {
      return <EditPortal10 />;
    } else if (option === "11") {
      return <EditPortal11 />;
    } else if (option === "12") {
      return <EditPortal12 />;
    } else if (option === "13") {
      return <EditPortal13 />;
    } else if (option === "14") {
      return <EditPortal14 />;
    } else if (option === "15") {
      return <EditPortal15 />;
    } else if (option === "16") {
      return <EditPortal16 />;
    } else if (option === "17") {
      return <EditPortal17 />;
    } else if (option === "18") {
      return <EditPortal18 />;
    } else if (option === "19") {
      return <EditPortal19 />;
    } else if (option === "20") {
      return <EditPortal20 />;
    } else if (option === "21") {
      return <EditPortal21 />;
    } else {
      return (
        <div>{/* Add fallback UI or any other component you want here */}</div>
      );
    }
  } else {
    return (
      <div
        className={`min-h-screen w-full max-w-md mx-auto shadow-lg pb-5 text-center flex justify-center align-center bg-white pt-[25%]`}
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

export default EditPortal;

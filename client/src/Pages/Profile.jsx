import React from "react";

import ScaleLoader from "react-spinners/ScaleLoader";
import Profile01 from "./Profile01";
import Profile02 from "./Profile02";
import Profile03 from "./Profile03";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
// import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import axios from "axios";
import Profile04 from "./Profile04";
import Profile05 from "./Profile05";
import Profile06 from "./Profile06";
import Profile07 from "./Profile07";
import Profile08 from "./Profile08";
import Profile09 from "./Profile09";
import Profile10 from "./Profile10";
import Profile11 from "./Profile11";
import Profile12 from "./Profile12";
import Profile13 from "./Profile13";
import Profile14 from "./Profile14";
import Profile15 from "./Profile15";
import Profile16 from "./Profile16";
import Profile17 from "./Profile17";
import Profile18 from "./Profile18";
import Profile19 from "./Profile19";
import Profile20 from "./Profile20";
import Profile21 from "./Profile21";
import Profile22 from "./Profile22";
import Profile23 from "./Profile23";
import Profile24 from "./Profile24";
import Profile25 from "./Profile25";
import Profile26 from "./Profile26";
import Profile27 from "./Profile27";
// import ScaleLoader from "react-spinners/ScaleLoader";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
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

  console.log(params);

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

  console.log(option);

  if (client) {
    if (option === "1") {
      return <Profile01 />;
    } else if (option === "2") {
      return <Profile02 />;
    } else if (option === "3") {
      return <Profile03 />;
    } else if (option === "4") {
      return <Profile04 />;
    } else if (option === "5") {
      return <Profile05 />;
    } else if (option === "6") {
      return <Profile06 />;
    } else if (option === "7") {
      return <Profile07 />;
    } else if (option === "8") {
      return <Profile08 />;
    } else if (option === "9") {
      return <Profile09 />;
    } else if (option === "10") {
      return <Profile10 />;
    } else if (option === "11") {
      return <Profile11 />;
    } else if (option === "12") {
      return <Profile12 />;
    } else if (option === "13") {
      return <Profile13 />;
    } else if (option === "14") {
      return <Profile14 />;
    } else if (option === "15") {
      return <Profile15 />;
    } else if (option === "16") {
      return <Profile16 />;
    } else if (option === "17") {
      return <Profile17 />;
    } else if (option === "18") {
      return <Profile18 />;
    } else if (option === "19") {
      return <Profile19 />;
    } else if (option === "20") {
      return <Profile20 />;
    } else if (option === "21") {
      return <Profile21 />;
    } else if (option === "22") {
      return <Profile22 />;
    } else if (option === "23") {
      return <Profile23 />;
    } else if (option === "24") {
      return <Profile24 />;
    } else if (option === "25") {
      return <Profile25 />;
    } else if (option === "26") {
      return <Profile26 />;
    } else if (option === "27") {
      return <Profile27 />;
    } else {
      return <Profile02 />;
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

export default Profile;

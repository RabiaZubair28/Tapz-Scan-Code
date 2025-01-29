import React from 'react'
import Profile01 from './Profile01';
import Profile02 from './Profile02';
import Profile03 from "./Profile03"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
// import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import axios from "axios";
// import ScaleLoader from "react-spinners/ScaleLoader";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const params = useParams();
  const clientId = params.id;
  console.log(clientId)
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState("");
  console.log(params)


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


console.log(client)

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
  flag, option
} = client;

console.log(option)

if (client) {
  if (option === "1") {
    return <Profile01 />;
  } else if(option === "2")
    {
    return <Profile02 />;
  }
  else if(option === "3")
    {
    return <Profile03 />;
  }
    else {
    return (
      <div>
        {/* Add fallback UI or any other component you want here */}
      </div>
    );
  }
} else {
  return (
    <div className="spin">
      {/* Add loading spinner or placeholder */}
    </div>
  );
}
}


export default Profile
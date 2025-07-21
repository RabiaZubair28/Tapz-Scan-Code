import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useNavigate } from "react-router-dom";
// import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import axios from "axios";
// import ScaleLoader from "react-spinners/ScaleLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { link } from "../../../server/router/auth-router";
const Dashboard = () => {
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
  const handleFileUpload = async (event, fieldName) => {
    const file = event.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "first_time_using_cloudinary");
    data.append("cloud_name", "dxokfhkhu");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dxokfhkhu/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const uploadedImgURL = await res.json();
    setFormData({ ...formData, [fieldName]: uploadedImgURL.url });
    console.log(formData);
  };

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

  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    description: "",
    phone01: "",
    phone02: "",
    phone03: "",
    telephone01: "",
    telephone02: "",
    telephone03: "",
    services: "",
    clientName: "",
    designation: "",
    qr: "",
    address: "",
    whatsapp01: "",
    location: "",
    whatsapp02: "",
    whatsapp03: "",
    instagramLink: "",
    instagramLink02: "",
    instagramLink03: "",
    instagramName: "",
    instagramName02: "",
    instagramName03: "",
    snapchatLink: "",
    snapchatLink02: "",
    snapchatLink03: "",
    snapchatName: "",
    snapchatName02: "",
    snapchatName03: "",
    youtubeLink: "",
    youtubeLink02: "",
    youtubeLink03: "",
    youtubeName: "",
    youtubeName02: "",
    youtubeName03: "",
    tiktokLink: "",
    tiktokLink02: "",
    tiktokLink03: "",
    tiktokName: "",
    tiktokName02: "",
    tiktokName03: "",
    twitterLink: "",
    twitterLink02: "",
    twitterLink03: "",
    twitterName: "",
    twitterName02: "",
    twitterName03: "",
    facebookLink: "",
    facebookLink02: "",
    facebookLink03: "",
    facebookName: "",
    facebookName02: "",
    facebookName03: "",
    googleReviewLink: "",
    googleReviewLink02: "",
    googleReviewLink03: "",
    googleReviewName: "",
    googleReviewName02: "",
    googleReviewName03: "",
    website: "",
    website02: "",
    website03: "",
    websiteName: "",
    websiteName02: "",
    websiteName03: "",
    email: "",
    email02: "",
    email03: "",
    youtubeShortsLink: "",
    youtubeShortsLink02: "",
    youtubeShortsLink03: "",
    youtubeShortsName: "",
    youtubeShortsName02: "",
    youtubeShortsName03: "",
    googleMapLink: "",
    googleMapLink02: "",
    googleMapLink03: "",
    googleMapName: "",
    googleMapName02: "",
    googleMapName03: "",
    menuLink: "",
    menuName: "",
    catalogueLink: "",
    catalogueName: "",
    profileLink01: "",
    profileLink02: "",
    profileName01: "",
    profileName02: "",
    logo: "",
    romanName: "",
    images: "",
    img01: "",
    img02: "",
    img03: "",
    img04: "",
    img05: "",
    img06: "",
    img07: "",
    img08: "",
    img09: "",
    img10: "",
    color01: "",
    color02: "",
    color03: "",
    password: "",
    option: "",
    visitCount: 5,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://www.scan-taps.com/api/data/addClient",
        formData
      );
      toast.success("Client added successfully");
      setFormData({ ...formData }); // clear a few fields or all
    } catch (error) {
      toast.error("Failed to add client");
      console.error(error);
    }
  };

  if (client) {
    return (
      <div>
        {client && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 max-w-md mx-auto mt-10"
          >
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              className="border p-2"
              required
            />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="border p-2"
            />
            <input
              type="text"
              name="phone01"
              value={formData.phone01}
              onChange={handleChange}
              placeholder="Phone 1"
              className="border p-2"
            />
            <input
              type="text"
              name="option"
              value={formData.option}
              onChange={handleChange}
              placeholder="Option"
              className="border p-2"
            />
            {/* Add more fields as needed */}
            <div className="col-span-full">
              <label className="block mb-1 font-semibold">Upload Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "logo")}
                className="border p-2 w-full"
              />
            </div>

            <div className="col-span-full">
              <label className="block mb-1 font-semibold">
                Upload Image 01
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "img01")}
                className="border p-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Client
            </button>
          </form>
        )}
      </div>
    );
  } else {
    return (
      <div
        className={`min-h-screen  w-full max-w-md mx-auto shadow-lg pb-5 text-center flex justify-center align-center bg-gradient-to-tr from-[#ffb8d6] via-[#f9d6cd] to-[#f6ece9] pt-[30%]`}
        style={{ backgroundAttachment: "fixed" }}
      >
        <ScaleLoader
          color={"black"}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
};

export default Dashboard;

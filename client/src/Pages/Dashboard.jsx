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
      setFormData({ ...formData });

      console.log(formData); // clear a few fields or all
    } catch (error) {
      toast.error("Failed to add client");
      console.error(error);
    }
  };

  const [isAdd, setIsAdd] = useState(true);

  const handleClick = () => setIsAdd(!isAdd);

  if (client) {
    return (
      <div>
        <ToastContainer />
        <h2 className="text-center text-[80px] font-bold mt-10">Dashboard</h2>
        <div className="flex items-center justify-between p-4 border-b mb-4">
          <button
            onClick={handleClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition"
          >
            {isAdd ? "Delete Client" : "Add Client"}
          </button>
        </div>

        {client && !isAdd && (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-x-2 gap-y-2 max-w-4xl mx-auto mt-4 px-4"
          >
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="URL Name"
              className="border p-2 w-full"
              required
            />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Company Name"
              className="border p-2 w-full"
            />
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              placeholder="Client Name"
              className="border p-2 w-full"
            />
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Designation"
              className="border p-2 w-full"
            />
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="border p-2 w-full"
            />

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="border p-2 w-full"
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Map URL"
              className="border p-2 w-full"
            />
            <input
              type="text"
              name="services"
              value={formData.services}
              onChange={handleChange}
              placeholder="Services"
              className="border p-2 w-full"
            />
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email 01"
              className="border p-2 w-full"
            />
            <input
              type="text"
              name="email02"
              value={formData.email02}
              onChange={handleChange}
              placeholder="Email 02"
              className="border p-2 w-full"
            />
            <input
              type="text"
              name="email03"
              value={formData.email03}
              onChange={handleChange}
              placeholder="Email 03"
              className="border p-2 w-full"
            />

            <input
              type="text"
              name="phone01"
              value={formData.phone01}
              onChange={handleChange}
              placeholder="Phone Number 01"
              className="border p-2 w-full"
            />
            <input
              type="text"
              name="phone02"
              value={formData.phone02}
              onChange={handleChange}
              placeholder="Phone Number 02"
              className="border p-2 w-full"
            />
            <input
              type="text"
              name="phone03"
              value={formData.phone03}
              onChange={handleChange}
              placeholder="Phone Number 03"
              className="border p-2 w-full"
            />

            <input
              type="text"
              name="whatsapp01"
              value={formData.whatsapp01}
              onChange={handleChange}
              placeholder="Whatsapp Number 01"
              className="border p-2 w-full"
            />
            <input
              type="text"
              name="whatsapp02"
              value={formData.whatsapp02}
              onChange={handleChange}
              placeholder="Whatsapp Number 02"
              className="border p-2 w-full"
            />
            <input
              type="text"
              name="whatsapp03"
              value={formData.whatsapp03}
              onChange={handleChange}
              placeholder="Whatsapp Number 01"
              className="border p-2 w-full"
            />
            <input
              type="text"
              name="telephone01"
              value={formData.telephone01}
              onChange={handleChange}
              placeholder="Telephone Number 01"
              className="border p-2 w-full"
            />
            <input
              type="text"
              name="telephone02"
              value={formData.telephone02}
              onChange={handleChange}
              placeholder="Telephone Number 02"
              className="border p-2 w-full"
            />
            <input
              type="text"
              name="telephone03"
              value={formData.telephone03}
              onChange={handleChange}
              placeholder="Telephone Number 03"
              className="border p-2 w-full"
            />
            {/* Instagram 01 */}
            <input
              type="text"
              name="instagramName"
              value={formData.instagramName}
              onChange={handleChange}
              placeholder="Instagram Name 01"
              className="border p-2 w-full"
            />
            <input
              type="text"
              name="instagramLink"
              value={formData.instagramLink}
              onChange={handleChange}
              placeholder="Instagram Link 01"
              className="border p-2 w-full"
            />

            {/* Instagram 02 */}
            <input
              type="text"
              name="instagramName02"
              value={formData.instagramName02}
              onChange={handleChange}
              placeholder="Instagram Name 02"
              className="border p-2 w-full"
            />
            <input
              type="text"
              name="instagramLink02"
              value={formData.instagramLink02}
              onChange={handleChange}
              placeholder="Instagram Link 02"
              className="border p-2 w-full"
            />

            {/* Instagram 03 */}
            <input
              type="text"
              name="instagramName03"
              value={formData.instagramName03}
              onChange={handleChange}
              placeholder="Instagram Name 03"
              className="border p-2 w-full"
            />
            <input
              type="text"
              name="instagramLink03"
              value={formData.instagramLink03}
              onChange={handleChange}
              placeholder="Instagram Link 03"
              className="border p-2 w-full"
            />
            <input
              name="snapchatName"
              value={formData.snapchatName}
              onChange={handleChange}
              placeholder="Snapchat Name 01"
              className="border p-2 w-full"
            />
            <input
              name="snapchatLink"
              value={formData.snapchatLink}
              onChange={handleChange}
              placeholder="Snapchat Link 01"
              className="border p-2 w-full"
            />
            <input
              name="snapchatName02"
              value={formData.snapchatName02}
              onChange={handleChange}
              placeholder="Snapchat Name 02"
              className="border p-2 w-full"
            />
            <input
              name="snapchatLink02"
              value={formData.snapchatLink02}
              onChange={handleChange}
              placeholder="Snapchat Link 02"
              className="border p-2 w-full"
            />
            <input
              name="snapchatName03"
              value={formData.snapchatName03}
              onChange={handleChange}
              placeholder="Snapchat Name 03"
              className="border p-2 w-full"
            />
            <input
              name="snapchatLink03"
              value={formData.snapchatLink03}
              onChange={handleChange}
              placeholder="Snapchat Link 03"
              className="border p-2 w-full"
            />
            <input
              name="youtubeName"
              value={formData.youtubeName}
              onChange={handleChange}
              placeholder="YouTube Name 01"
              className="border p-2 w-full"
            />
            <input
              name="youtubeLink"
              value={formData.youtubeLink}
              onChange={handleChange}
              placeholder="YouTube Link 01"
              className="border p-2 w-full"
            />
            <input
              name="youtubeName02"
              value={formData.youtubeName02}
              onChange={handleChange}
              placeholder="YouTube Name 02"
              className="border p-2 w-full"
            />
            <input
              name="youtubeLink02"
              value={formData.youtubeLink02}
              onChange={handleChange}
              placeholder="YouTube Link 02"
              className="border p-2 w-full"
            />
            <input
              name="youtubeName03"
              value={formData.youtubeName03}
              onChange={handleChange}
              placeholder="YouTube Name 03"
              className="border p-2 w-full"
            />
            <input
              name="youtubeLink03"
              value={formData.youtubeLink03}
              onChange={handleChange}
              placeholder="YouTube Link 03"
              className="border p-2 w-full"
            />

            <input
              name="tiktokName"
              value={formData.tiktokName}
              onChange={handleChange}
              placeholder="TikTok Name 01"
              className="border p-2 w-full"
            />
            <input
              name="tiktokLink"
              value={formData.tiktokLink}
              onChange={handleChange}
              placeholder="TikTok Link 01"
              className="border p-2 w-full"
            />
            <input
              name="tiktokName02"
              value={formData.tiktokName02}
              onChange={handleChange}
              placeholder="TikTok Name 02"
              className="border p-2 w-full"
            />
            <input
              name="tiktokLink02"
              value={formData.tiktokLink02}
              onChange={handleChange}
              placeholder="TikTok Link 02"
              className="border p-2 w-full"
            />
            <input
              name="tiktokName03"
              value={formData.tiktokName03}
              onChange={handleChange}
              placeholder="TikTok Name 03"
              className="border p-2 w-full"
            />
            <input
              name="tiktokLink03"
              value={formData.tiktokLink03}
              onChange={handleChange}
              placeholder="TikTok Link 03"
              className="border p-2 w-full"
            />

            <input
              name="twitterName"
              value={formData.twitterName}
              onChange={handleChange}
              placeholder="Twitter Name 01"
              className="border p-2 w-full"
            />
            <input
              name="twitterLink"
              value={formData.twitterLink}
              onChange={handleChange}
              placeholder="Twitter Link 01"
              className="border p-2 w-full"
            />
            <input
              name="twitterName02"
              value={formData.twitterName02}
              onChange={handleChange}
              placeholder="Twitter Name 02"
              className="border p-2 w-full"
            />
            <input
              name="twitterLink02"
              value={formData.twitterLink02}
              onChange={handleChange}
              placeholder="Twitter Link 02"
              className="border p-2 w-full"
            />
            <input
              name="twitterName03"
              value={formData.twitterName03}
              onChange={handleChange}
              placeholder="Twitter Name 03"
              className="border p-2 w-full"
            />
            <input
              name="twitterLink03"
              value={formData.twitterLink03}
              onChange={handleChange}
              placeholder="Twitter Link 03"
              className="border p-2 w-full"
            />

            <input
              name="facebookName"
              value={formData.facebookName}
              onChange={handleChange}
              placeholder="Facebook Name 01"
              className="border p-2 w-full"
            />
            <input
              name="facebookLink"
              value={formData.facebookLink}
              onChange={handleChange}
              placeholder="Facebook Link 01"
              className="border p-2 w-full"
            />
            <input
              name="facebookName02"
              value={formData.facebookName02}
              onChange={handleChange}
              placeholder="Facebook Name 02"
              className="border p-2 w-full"
            />
            <input
              name="facebookLink02"
              value={formData.facebookLink02}
              onChange={handleChange}
              placeholder="Facebook Link 02"
              className="border p-2 w-full"
            />
            <input
              name="facebookName03"
              value={formData.facebookName03}
              onChange={handleChange}
              placeholder="Facebook Name 03"
              className="border p-2 w-full"
            />
            <input
              name="facebookLink03"
              value={formData.facebookLink03}
              onChange={handleChange}
              placeholder="Facebook Link 03"
              className="border p-2 w-full"
            />

            <input
              name="googleReviewName"
              value={formData.googleReviewName}
              onChange={handleChange}
              placeholder="Google Review Name 01"
              className="border p-2 w-full"
            />
            <input
              name="googleReviewLink"
              value={formData.googleReviewLink}
              onChange={handleChange}
              placeholder="Google Review Link 01"
              className="border p-2 w-full"
            />
            <input
              name="googleReviewName02"
              value={formData.googleReviewName02}
              onChange={handleChange}
              placeholder="Google Review Name 02"
              className="border p-2 w-full"
            />
            <input
              name="googleReviewLink02"
              value={formData.googleReviewLink02}
              onChange={handleChange}
              placeholder="Google Review Link 02"
              className="border p-2 w-full"
            />
            <input
              name="googleReviewName03"
              value={formData.googleReviewName03}
              onChange={handleChange}
              placeholder="Google Review Name 03"
              className="border p-2 w-full"
            />
            <input
              name="googleReviewLink03"
              value={formData.googleReviewLink03}
              onChange={handleChange}
              placeholder="Google Review Link 03"
              className="border p-2 w-full"
            />

            <input
              name="websiteName"
              value={formData.websiteName}
              onChange={handleChange}
              placeholder="Website Name 01"
              className="border p-2 w-full"
            />
            <input
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Website Link 01"
              className="border p-2 w-full"
            />
            <input
              name="websiteName02"
              value={formData.websiteName02}
              onChange={handleChange}
              placeholder="Website Name 02"
              className="border p-2 w-full"
            />
            <input
              name="website02"
              value={formData.website02}
              onChange={handleChange}
              placeholder="Website Link 02"
              className="border p-2 w-full"
            />
            <input
              name="websiteName03"
              value={formData.websiteName03}
              onChange={handleChange}
              placeholder="Website Name 03"
              className="border p-2 w-full"
            />
            <input
              name="website03"
              value={formData.website03}
              onChange={handleChange}
              placeholder="Website Link 03"
              className="border p-2 w-full"
            />

            <input
              name="youtubeShortsName"
              value={formData.youtubeShortsName}
              onChange={handleChange}
              placeholder="Linkedin Name 01"
              className="border p-2 w-full"
            />
            <input
              name="youtubeShortsLink"
              value={formData.youtubeShortsLink}
              onChange={handleChange}
              placeholder="Linkedin Link 01"
              className="border p-2 w-full"
            />
            <input
              name="youtubeShortsName02"
              value={formData.youtubeShortsName02}
              onChange={handleChange}
              placeholder="Linkedin Name 02"
              className="border p-2 w-full"
            />
            <input
              name="youtubeShortsLink02"
              value={formData.youtubeShortsLink02}
              onChange={handleChange}
              placeholder="Linkedin Link 02"
              className="border p-2 w-full"
            />
            <input
              name="youtubeShortsName03"
              value={formData.youtubeShortsName03}
              onChange={handleChange}
              placeholder="Linkedin Name 03"
              className="border p-2 w-full"
            />
            <input
              name="youtubeShortsLink03"
              value={formData.youtubeShortsLink03}
              onChange={handleChange}
              placeholder="Linkedin Link 03"
              className="border p-2 w-full"
            />

            <input
              name="googleMapName"
              value={formData.googleMapName}
              onChange={handleChange}
              placeholder="Google Map Name 01"
              className="border p-2 w-full"
            />
            <input
              name="googleMapLink"
              value={formData.googleMapLink}
              onChange={handleChange}
              placeholder="Google Map Link 01"
              className="border p-2 w-full"
            />
            <input
              name="googleMapName02"
              value={formData.googleMapName02}
              onChange={handleChange}
              placeholder="Google Map Name 02"
              className="border p-2 w-full"
            />
            <input
              name="googleMapLink02"
              value={formData.googleMapLink02}
              onChange={handleChange}
              placeholder="Google Map Link 02"
              className="border p-2 w-full"
            />
            <input
              name="googleMapName03"
              value={formData.googleMapName03}
              onChange={handleChange}
              placeholder="Google Map Name 03"
              className="border p-2 w-full"
            />
            <input
              name="googleMapLink03"
              value={formData.googleMapLink03}
              onChange={handleChange}
              placeholder="Google Map Link 03"
              className="border p-2 w-full"
            />

            <input
              name="menuName"
              value={formData.menuName}
              onChange={handleChange}
              placeholder="Menu Name"
              className="border p-2 w-full"
            />
            <input
              name="menuLink"
              value={formData.menuLink}
              onChange={handleChange}
              placeholder="Menu Link"
              className="border p-2 w-full"
            />

            <input
              name="catalogueName"
              value={formData.catalogueName}
              onChange={handleChange}
              placeholder="Catalogue Name"
              className="border p-2 w-full"
            />
            <input
              name="catalogueLink"
              value={formData.catalogueLink}
              onChange={handleChange}
              placeholder="Catalogue Link"
              className="border p-2 w-full"
            />

            <input
              name="profileName01"
              value={formData.profileName01}
              onChange={handleChange}
              placeholder="Company Profile Name 01"
              className="border p-2 w-full"
            />
            <input
              name="profileLink01"
              value={formData.profileLink01}
              onChange={handleChange}
              placeholder="Company Profile Link 01"
              className="border p-2 w-full"
            />
            <input
              name="profileName02"
              value={formData.profileName02}
              onChange={handleChange}
              placeholder="Company Profile Name 02"
              className="border p-2 w-full"
            />
            <input
              name="profileLink02"
              value={formData.profileLink02}
              onChange={handleChange}
              placeholder="Company Profile Link 02"
              className="border p-2 w-full"
            />

            <select
              name="option"
              value={formData.option}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value="">Select Profile Option</option>
              <option value="1">Blue & White</option>
              <option value="2">Pink & Peach</option>
              <option value="3">Violet & Purple</option>
              <option value="4">Black & Grey</option>
              <option value="5">Indigo & Green</option>
            </select>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="border p-2 w-full"
              required
            />

            {/* Upload Fields in full width */}
            <div className="col-span-2">
              <label className="block mb-1 font-semibold">
                Upload Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "logo")}
                className="border p-2 w-full"
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-1 font-semibold">
                Upload Cover Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "cover")}
                className="border p-2 w-full"
              />
            </div>

            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="col-span-1">
                <label className="block mb-1 font-semibold">
                  Upload Image 0{i + 1}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, `img0${i + 1}`)}
                  className="border p-2 w-full"
                />
              </div>
            ))}

            <div className="col-span-2">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
              >
                Add Client
              </button>
            </div>
          </form>
        )}

        {client && isAdd && <div>delete</div>}
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

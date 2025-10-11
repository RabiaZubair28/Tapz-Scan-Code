import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import ScaleLoader from "react-spinners/ScaleLoader";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { RiMessage2Line } from "react-icons/ri";
import { ImWhatsapp } from "react-icons/im";
import { FaDownload } from "react-icons/fa";
function School() {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState("");

  // Fetch all reviews
  useEffect(() => {
    axios
      .get("https://www.scan-taps.com/api/data/reviews")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Add a review
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = { name, description, stars: Number(stars) };
    const res = await axios.post(
      "https://www.scan-taps.com/api/data/addReview",
      newReview
    );
    setReviews([...reviews, res.data]);
    setName("");
    setDescription("");
    setStars("");
  };
  //   const downloadContactCard = async () => {
  //     const vcard = `BEGIN:VCARD
  // VERSION:3.0
  // N:${};;;;
  // FN:${clientName}
  // ORG:${name}
  // TITLE:${designation}
  // TEL;CELL:${phone01}
  // TEL;CELL:${phone02}
  // EMAIL;HOME:${email}
  // END:VCARD`;

  //     const blob = new Blob([vcard], { type: "text/vcard" });
  //     const url = URL.createObjectURL(blob);

  //     // Check if it's an iPhone/iPad device
  //     const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  //     if (isIOS) {
  //       // Open vCard in a new tab instead of forcing download
  //       window.location.href = url;
  //     } else {
  //       // Regular download for other devices
  //       const newLink = document.createElement("a");
  //       newLink.download = `${clientName}.vcf`;
  //       newLink.href = url;
  //       newLink.click();
  //     }

  //     // Revoke the object URL to free memory
  //     setTimeout(() => URL.revokeObjectURL(url), 1000);
  //   };

  if (reviews) {
    return (
      <section>
        <Helmet>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <title>Alandalus Primary School for Girls</title>

          <link
            rel="icon"
            type="image/x-icon"
            href="https://res.cloudinary.com/dxokfhkhu/image/upload/v1760161721/Screenshot_2025-10-11_at_10.47.17_AM_zk9cxn.png"
          />

          <meta
            name="description"
            content="Alandalus Primary School for Girls"
          />
          <meta
            property="article:section"
            content="Alandalus Primary School for Girls"
          />
          <meta
            property="og:title"
            content="Alandalus Primary School for Girls"
          />
          <meta
            property="og:description"
            content="Alandalus Primary School for Girls"
          />
          <meta
            property="og:url"
            content={`https://www.scan-taps.com/${companyName}`}
          />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/dxokfhkhu/image/upload/v1760161721/Screenshot_2025-10-11_at_10.47.17_AM_zk9cxn.png"
          />
          <meta
            name="twitter:title"
            content="Alandalus Primary School for Girls"
          />
          <meta
            name="twitter:description"
            content="Alandalus Primary School for Girls"
          />
        </Helmet>

        <div
          className={`min-h-screen pt-2 w-full max-w-md mx-auto shadow-lg pb-5 text-center bg-gradient-to-tr from-[#b10000] via-[#c12c2c] to-[#fab23f]`}
          style={{ backgroundAttachment: "fixed" }}
        >
          <div className="flex  flex-row items-center  justify-center mx-auto rounded-full ps-0 pe-0 space-y-2 mt-4">
            <a href="https://res.cloudinary.com/dxokfhkhu/image/upload/v1760161721/Screenshot_2025-10-11_at_10.47.17_AM_zk9cxn.png">
              <div className="relative mb-2 ">
                <img
                  src="https://res.cloudinary.com/dxokfhkhu/image/upload/v1760161721/Screenshot_2025-10-11_at_10.47.17_AM_zk9cxn.png"
                  alt="profile"
                  className="w-[10rem] h-[10rem] mx-auto rounded-2xl border-[2px] border-white shadow-md"
                />
              </div>
            </a>
          </div>

          <div className="px-6">
            <div className="flex flex-col justify-center items-center pt-0.5">
              <h2 className="text-2xl font-semibold text-white text-center pt-1 ">
                Alandalus Primary School for Girls
              </h2>
              <h2 className="text-md font-semibold text-gray-50 text-center pt-1 ">
                Doha, Qatar
              </h2>
            </div>
            <div>
              {" "}
              <div className="px-6">
                <div className="flex justify-start space-x-5 mt-3 mb-2.5">
                  <a
                    href={`tel:${90999}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center bg-gray-600 hover:bg-gray-500 border-white justify-center rounded-full bg-gray-7 border-[0.25px] shadow-sm hover:shadow-md "
                  >
                    <MdOutlinePhoneAndroid size={20} color="white" />
                  </a>
                  <a
                    href={`mailto:${999}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full border-[0.25px]  shadow-sm hover:shadow-md bg-gray-600 hover:bg-gray-500 border-white "
                  >
                    <AiOutlineMail size={20} color="white" />
                  </a>
                  <a
                    href={`sms:${99889}`}
                    className="w-12 h-12 flex items-center justify-center rounded-full  border-[0.25px]  shadow-sm hover:shadow-md bg-gray-600 hover:bg-gray-500 border-white "
                  >
                    <RiMessage2Line size={20} color="white" />
                  </a>
                  <a
                    href={`https://wa.me/${whatsapp01}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-600 hover:bg-gray-500 border-white border-[0.25px] shadow-sm hover:shadow-md "
                  >
                    <ImWhatsapp size={20} color="white" />
                  </a>
                </div>
              </div>
            </div>

            {/* <div className="flex items-center justify-center mt-0 mb-0 px-4">
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
            </div> */}

            <div className="flex flex-col items-center mt-4 space-y-3">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="w-full max-w-md bg-white border border-[#38572e] shadow rounded-lg p-4 hover:bg-gray-50"
                >
                  {/* Top section: Name (left) + Stars (right) */}
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold text-[#231f20]">
                      {review.name}
                    </span>
                    <div className="flex space-x-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          fill={i < review.rating ? "currentColor" : "none"}
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M11.48 3.499a.562.562 0 011.04 0l2.005 4.06a.563.563 0 00.424.308l4.48.651a.563.563 0 01.312.96l-3.24 3.159a.563.563 0 00-.162.498l.765 4.46a.563.563 0 01-.817.593l-4.01-2.107a.563.563 0 00-.524 0l-4.01 2.107a.563.563 0 01-.818-.593l.766-4.46a.563.563 0 00-.163-.498l-3.24-3.16a.563.563 0 01.312-.959l4.48-.65a.563.563 0 00.424-.309l2.005-4.06z"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {review.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="pt-4 text-white">
              Copyright ©{" "}
              <span className="company">
                {" "}
                Alandalus Primary School for Girls
              </span>
              . All Rights Reserved.
            </p>
          </div>
        </div>
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
}

export default School;

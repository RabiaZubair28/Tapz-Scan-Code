import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import ScaleLoader from "react-spinners/ScaleLoader";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { RiMessage2Line } from "react-icons/ri";
import { ImWhatsapp } from "react-icons/im";
import { FaDownload } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { ToastContainer, toast } from "react-toastify";
import schoolImg from "../assets/ar-foods.jpg";
import "react-toastify/dist/ReactToastify.css";
function RafaMotor() {
  const [reviews, setReviews] = useState([]);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [stars, setStars] = useState(0);
  const [show, setShow] = useState(false);

  // Fetch all reviews
  useEffect(() => {
    axios
      .get("https://www.scan-taps.com/api/data/rafareviews")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Add a review
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = { name, description, stars: Number(stars) };
    const res = await axios.post(
      "https://www.scan-taps.com/api/data/addRafaReview",
      newReview
    );
    setReviews([...reviews, res.data]);
    setName("");
    setDescription("");
    setStars(0);
    setShow(false);
    toast("Review added Successfully!");
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

  const [visibleCount, setVisibleCount] = useState(10);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  // Reverse order, then slice to show only visible reviews
  const visibleReviews = reviews.slice().reverse().slice(0, visibleCount);
  const allShown = visibleCount >= reviews.length;
  if (reviews) {
    return (
      <section>
        <ToastContainer />
        <Helmet>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <title>Saray Wellness & Health</title>

          <link
            rel="icon"
            type="image/x-icon"
            href="https://res.cloudinary.com/dxokfhkhu/image/upload/v1763836991/Screenshot_2025-11-22_at_11.42.05_PM_w0bzn7.png"
          />

          <meta name="description" content="Saray Wellness & Health" />
          <meta property="article:section" content="Saray Wellness & Health" />
          <meta property="og:title" content="Saray Wellness & Health" />
          <meta property="og:description" content="Saray Wellness & Health" />
          <meta
            property="og:url"
            content={`https://www.scan-taps.com/reviews/elevate-strategy-partners`}
          />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/dxokfhkhu/image/upload/v1763836991/Screenshot_2025-11-22_at_11.42.05_PM_w0bzn7.png"
          />
          <meta name="twitter:title" content="Saray Wellness & Health" />
          <meta name="twitter:description" content="Saray Wellness & Health" />
        </Helmet>
        {show && (
          <div
            className="qr-modal min-h-screen bg-white w-full max-w-md mx-auto shadow-lg flex flex-col items-center justify-center relative px-8"
            style={{
              backgroundAttachment: "fixed",
              backgroundImage: `url(${schoolImg})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          >
            <div className="w-full bg-white shadow-md border border-[#DDB86A] rounded-lg pb-8 pt-16 px-6 relative">
              {/* Close Icon */}
              <ImCross
                className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-[#DDB86A]"
                onClick={() => {
                  setShow(false);
                }}
              />

              <h2 className="text-2xl font-bold text-center text-[#DDB86A] mb-6">
                Leave a Review / ترك التعليق
              </h2>

              {/* Review Form */}
              <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="اسم الوصي"
                  className="w-full border text-right border-[#DDB86A] rounded-md p-2 "
                  required
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="...أكتب رأيك
"
                  rows="4"
                  className="w-full text-right border border-[#DDB86A] rounded-md p-2 "
                  required
                />

                {/* ⭐ Star Rating */}
                <div className="flex justify-center space-x-1">
                  {[1, 2, 3, 4, 5].map((starValue) => (
                    <button
                      key={starValue}
                      type="button"
                      onClick={() => setStars(starValue)}
                      className="focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={starValue <= stars ? "#facc15" : "none"}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#facc15"
                        className="w-8 h-8 transition-transform duration-200 hover:scale-110"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.07 4.198 4.637.674a.562.562 0 01.312.959l-3.357 3.273.792 4.616a.563.563 0 01-.816.592L12 15.896l-4.158 2.185a.563.563 0 01-.816-.592l.792-4.616-3.357-3.273a.562.562 0 01.312-.959l4.637-.674 2.07-4.198z"
                        />
                      </svg>
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full max-w-md bg-[#DDB86A] mt-4 shadow rounded-lg p-3 text-white"
                  onClick={() => {}}
                >
                  Submit Review / إرسال المراجعة
                </button>
              </form>
            </div>
          </div>
        )}

        {!show && (
          <div
            className={`min-h-screen pt-2 w-full max-w-md mx-auto shadow-lg pb-5 text-center bg-white`}
            style={{
              backgroundAttachment: "fixed",
              backgroundImage: `url(${schoolImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* <div className="flex  flex-row items-center  justify-center mx-auto rounded-full ps-0 pe-0 space-y-2 mt-4">
              <a href="https://res.cloudinary.com/dxokfhkhu/image/upload/v1760161721/Screenshot_2025-10-11_at_10.47.17_AM_zk9cxn.png">
                <div className="relative mb-2 ">
                  <img
                    src="https://res.cloudinary.com/dxokfhkhu/image/upload/v1760161721/Screenshot_2025-10-11_at_10.47.17_AM_zk9cxn.png"
                    alt="profile"
                    className="w-[10rem] h-[10rem] mx-auto rounded-2xl border-[1px] border-[#231f20] shadow-md"
                  />
                </div>
              </a>
            </div> */}

            <div className="px-6 mt-4">
              <div className="flex flex-col justify-center items-center pt-0.5">
                <div className="flex flex-col items-center mx-auto rounded-x p-1 space-y-2 ">
                  <a href="https://res.cloudinary.com/dxokfhkhu/image/upload/v1763836991/Screenshot_2025-11-22_at_11.42.05_PM_w0bzn7.png">
                    <div className="relative mb-2 ">
                      <img
                        src="https://res.cloudinary.com/dxokfhkhu/image/upload/v1763836991/Screenshot_2025-11-22_at_11.42.05_PM_w0bzn7.png"
                        alt="profile"
                        className="w-48 h-48  mx-auto rounded-full border-[6px] border-[#DDB86A] shadow-md"
                      />
                    </div>
                  </a>
                </div>
                <h2 className="text-3xl font-bold text-[#DDB86A] text-center pt-2 ">
                  Saray Wellness & Health
                </h2>

                <p className="text-md font-medium text-[#DDB86A] text-center pt-4 pb-8 ">
                  A strategic and execution-oriented advisory firm that helps
                  middle-market companies, investors, and families make
                  data-driven decisions, align leadership & operations, and
                  drive sustainable growth.
                </p>
              </div>
              {/* <div className="flex justify-center items-center pt-1 pb-2">
                {" "}
                <div className="px-6">
                  <div className="flex justify-start space-x-5 mt-3 mb-2.5">
                    <a
                      href={`tel:+97433221915`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center text-gray-800 bg-white border border-[#231f20] justify-center rounded-full bg-gray-7 shadow-sm hover:shadow-md "
                    >
                      <MdOutlinePhoneAndroid size={20} color="[#DDB86A]" />
                    </a>
                    <a
                      href={`mailto:n.aloutibi2306@education.qa`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center rounded-full shadow-sm hover:shadow-md text-gray-800 bg-white border border-[#231f20]  "
                    >
                      <AiOutlineMail size={20} color="[#DDB86A]" />
                    </a>
                    <a
                      href={`sms:+97433221915`}
                      className="w-12 h-12 flex items-center justify-center rounded-full   shadow-sm hover:shadow-md text-gray-800 bg-white border border-[#231f20] "
                    >
                      <RiMessage2Line size={20} color="[#DDB86A]" />
                    </a>
                    <a
                      href={`https://wa.me/+97433221915`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center rounded-full text-gray-800 bg-white border border-[#231f20]  shadow-sm hover:shadow-md "
                    >
                      <ImWhatsapp size={20} color="[#DDB86A]" />
                    </a>
                  </div>
                </div>
              </div> */}

              {/* <div className="flex items-center justify-center mt-0 mb-0 px-4">
              <button className="flex w-full justify-center gap-x-2 items-center  text-[#DDB86A] bg-white border-[0.5px] border-white shadow-sm hover:shadow-md hover:bg-white  py-3 mt-2 mb-3 rounded-lg hover:text-[#DDB86A] ">
                <FaDownload
                  size={20}
                  onClick={downloadContactCard}
                  color="[#DDB86A]"
                  className="text-[#DDB86A] hover:text-[#DDB86A]"
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

              <div
                className="w-full max-w-md bg-[#DDB86A] mt-2 shadow rounded-lg p-3 text-white"
                onClick={() => {
                  setShow(true);
                }}
              >
                Leave a Review / ترك التعليق
              </div>
              <div className="flex flex-col items-center mt-3 space-y-3">
                {visibleReviews.map((review, index) => (
                  <div
                    key={index}
                    className="w-full max-w-md bg-white shadow-md rounded-lg px-4 pt-3 pb-4 border border-[#DDB86A] text-right"
                  >
                    {/* Name */}
                    <p className="text-[#DDB86A] text-lg font-semibold leading-relaxed">
                      {review.name}
                    </p>

                    {/* Stars (fill right to left) */}
                    <div className="flex justify-end items-center mb-1">
                      <div className="flex pt-1 flex-row-reverse text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            fill={i < review.stars ? "currentColor" : "none"}
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

                {/* Load More Button */}
                {!allShown && (
                  <button
                    onClick={handleLoadMore}
                    className="mt-4 mb-6 px-5 py-2.5 bg-[#DDB86A] text-white rounded-lg hover:bg-[#204b82] transition"
                  >
                    Load More Reviews / تحميل المزيد من التقييمات
                  </button>
                )}
              </div>
            </div>
            <p className="pt-8 text-[#DDB86A] text-center text-sm font-semibold px-1">
              Copyright © Saray Wellness & Health - All Rights Reserved.
            </p>
          </div>
        )}
      </section>
    );
  } else {
    return (
      <div
        className={`min-h-screen w-full max-w-md mx-auto shadow-lg pb-5 text-center flex justify-center align-center bg-gradient-to-tr from-[#b10000] via-[#c12c2c] to-[#fab23f] pt-[25%]`}
        style={{
          backgroundAttachment: "fixed",
          backgroundImage:
            "url('https://res.cloudinary.com/dxokfhkhu/image/upload/v1760179854/BG-01_p9h0ao.jpg",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
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

export default RafaMotor;

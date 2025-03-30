import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { createPortal } from "react-dom";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

import { Link } from "react-router-dom";
const FloatingCard = ({ title, image, name, link }) => {
  const cardRef = useRef(null);
  const overlayRef = useRef(null);
  const form = useRef();

  const [modalOpen, setModalOpen] = useState(false);
  const [order, setOrder] = useState({
    name: "",
    description: "",
    itemNo: "",
    contactNo: "",
  });

  useEffect(() => {
    emailjs.init("jcVI9RMOUyvYiqeSL");
  }, []);

  useEffect(() => {
    gsap.to(cardRef.current, {
      y: -5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 3,
    });
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setOrder((prev) => ({ ...prev, [name]: value }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_levr829",
        "template_inswzq6",
        form.current,
        "jcVI9RMOUyvYiqeSL"
      )
      .then(() => {
        toast.success("Email sent successfully!");
        setModalOpen(false);
        setOrder({ name: "", description: "", itemNo: "", contactNo: "" });
      })
      .catch((error) => {
        toast.error("Failed to send email. Please try again.");
      });
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
      {modalOpen &&
        createPortal(
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            style={{
              backgroundImage:
                "url(https://liamcrest.com/assets/static/header/Asset%2072.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="bg-white m-4 pt-12 pb-4 px-3 rounded-lg w-full max-w-md">
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setModalOpen(false);
                }}
                className="absolute right-1 -mt-28 w-12 h-12 bg-[#1a237e] text-white rounded-full flex items-center justify-center shadow-lg"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
              <h2 className="text-3xl font-bold text-center text-[#1a237e] pb-4">
                Send Us Inquiry!
              </h2>
              <form ref={form} onSubmit={sendEmail} className="space-y-2">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={order.name}
                  onChange={handleInput}
                  required
                  className="w-full p-2 border rounded-lg"
                />
                <input
                  type="number"
                  min={1}
                  placeholder="Item Quantity"
                  name="itemNo"
                  value={order.itemNo}
                  onChange={handleInput}
                  required
                  className="w-full p-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Contact Number"
                  name="contactNo"
                  value={order.contactNo}
                  onChange={handleInput}
                  required
                  className="w-full p-2 border rounded-lg"
                />
                <textarea
                  placeholder="Description"
                  name="description"
                  value={order.description}
                  onChange={handleInput}
                  required
                  className="w-full p-2 border rounded-lg"
                />
                <button
                  type="submit"
                  className="w-full bg-[#95d1d9] text-[#1a237e] font-semibold py-2 rounded-lg"
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </div>,
          document.body
        )}

      <div
        className="relative w-full h-[200px] xs:h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[350px] xxl:h-[350px] bg-white shadow-lg rounded-lg overflow-hidden"
        ref={cardRef}
        onMouseEnter={() =>
          gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 })
        }
        onMouseLeave={() =>
          gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 })
        }
      >
        <Link to={link}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover border border-1 border-white rounded-lg"
          />
        </Link>
      </div>
      <div
        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg opacity-0 transition-opacity"
        ref={overlayRef}
      >
        {title}
      </div>

      <div className="my-3 flex flex-col items-center justify-center">
        <div className=" flex items-center justify-center text-center text-white text-[12px] xs:text-[12px] sm:text-[12px] md:text-[15px] lg:text-[18px] xl:text-[18px] xxl:text-[18px] font-semibold">
          {title}
        </div>
        <button
          className="flex items-center justify-center mt-1  px-6 py-1 border rounded-md text-[12px] xs:text-[12px] sm:text-[12px] md:text-[15px] lg:text-[18px] xl:text-[18px] xxl:text-[18px]text-white bg-[#95d1d9] hover:bg-bg-[#95d1d9] transition-all"
          onClick={() => {
            setOrder({ ...order, name });
            setModalOpen(true);
          }}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default FloatingCard;

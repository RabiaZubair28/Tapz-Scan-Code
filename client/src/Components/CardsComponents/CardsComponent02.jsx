import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { createPortal } from "react-dom";
import emailjs from "@emailjs/browser";
import google from "../../assets/products/google.jpg";
import insta from "../../assets/products/insta.jpg";
import menu from "../../assets/products/menu.jpg";
import two from "../../assets/products/two.jpg";
import three from "../../assets/products/three.jpg";
import four from "../../assets/products/four.jpg";
import "./CardsComponent.css";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";

const CustomModal = ({ children, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-blue-50 bg-opacity-95 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-3xl p-6 max-w-xl w-full relative shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
      >
        <motion.button
          whileHover={{ rotate: 90, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={closeModal}
          className="absolute -right-4 -top-4 w-12 h-12 bg-[#1a237e] text-white rounded-full flex items-center justify-center shadow-lg"
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

        <div className="flex flex-col space-y-4">
          <h2 className="text-3xl font-bold text-[#1a237e] text-center mb-4">
            Send Us Inquiry!
          </h2>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

const defaultOrderFormData = {
  name: "",
  description: "",
  itemNo: "",
  contactNo: "",
};

const FloatingCard = ({ title, image, name }) => {
  const cardRef = useRef(null);
  const overlayRef = useRef(null);
  const form = useRef();

  const [modalOpen, setModalOpen] = useState(false);
  const [order, setOrder] = useState(defaultOrderFormData);

  useEffect(() => {
    gsap.to(cardRef.current, {
      y: -20,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 4,
    });
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setOrder((prev) => ({ ...prev, [name]: value }));
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_levr829", "template_inswzq6", form.current, "jcVI9RMOUyvYiqeSL") // Replace with your actual EmailJS User ID
      .then(() => {
        toast.success("Email sent successfully!");
        setModalOpen(false);
        setOrder(defaultOrderFormData);
      })
      .catch((error) => {
        toast.error("Failed to send email. Please try again.");
        console.error("FAILED...", error);
      });
  };

  return (
    <div className="parentCard">
      {modalOpen &&
        createPortal(
          <CustomModal closeModal={() => setModalOpen(false)}>
            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  id="name"
                  autoComplete="off"
                  value={order.name}
                  onChange={handleInput}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <input
                  type="number"
                  min={1}
                  placeholder="Item Quantity"
                  name="itemNo"
                  id="itemNo"
                  autoComplete="off"
                  value={order.itemNo}
                  onChange={handleInput}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Contact Number"
                  name="contactNo"
                  id="contactNo"
                  autoComplete="off"
                  value={order.contactNo}
                  onChange={handleInput}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <textarea
                  placeholder="Description"
                  name="description"
                  id="description"
                  autoComplete="off"
                  value={order.description}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-[#87CEEB] mt-2 text-[#1a237e] font-semibold py-3 rounded-xl hover:bg-[#75bde0] transition-colors text-lg text-center cursor-pointer"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </CustomModal>,
          document.body
        )}

      <div
        className="card2"
        ref={cardRef}
        onMouseEnter={() => gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 })}
        onMouseLeave={() => gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 })}
      >
        <img src={image} alt={title} className="card-image" />
        <div className="card-overlay" ref={overlayRef}>
          <h2 className="font-bold">{title}</h2>
        </div>
      </div>
      <button
        className="px-12 py-2 mt-3 border border-gray-200 rounded-lg ml-40 text-white"
        onClick={() => {
          setOrder({ ...order, name });
          setModalOpen(true);
        }}
      >
        Shop Now
      </button>
    </div>
  );
};

const CardsComponent02 = () => {
  return (
    <>
      <Toaster />
      <div className="parentDivCard">
        <div className="pt-6">
          <div className="card-container">
            <FloatingCard
              title="NFC Google Review Card"
              image={google}
              name="NFC Google Review Card"
            />
            <FloatingCard
              title="NFC Instagram Card"
              image={insta}
              name="NFC Instagram Card"
            />
          </div>
        </div>
        <div className="component">
          <div className="card-container">
            <FloatingCard
              title="NFC Facebook Card"
              image="https://via.placeholder.com/300"
              name="NFC Facebook Card"
            />
            <FloatingCard
              title="NFC WhatsApp Card"
              image="https://via.placeholder.com/300"
              name="NFC WhatsApp Card"
            />
          </div>
        </div>
        <div className="component">
          <div className="card-container">
            <FloatingCard
              title="NFC Snapchat Card"
              image="https://via.placeholder.com/300"
              name="NFC Snapchat Card"
            />
            <FloatingCard
              title="NFC Tiktok Card"
              image="https://via.placeholder.com/300"
              name="NFC Tiktok Card"
            />
          </div>
        </div>
        <div className="component">
          <div className="card-container">
            <FloatingCard
              title="NFC Menu Card"
              image={menu}
              name="NFC Menu Card"
            />
            <FloatingCard
              title="Any Two NFC Cards Deal"
              image={two}
              name="Any Two NFC Cards Deal"
            />
          </div>
        </div>
        <div className="component">
          <div className="card-container">
            <FloatingCard
              title="Any Three NFC Cards Deal"
              image={three}
              name="Any Three NFC Cards Deal"
            />
            <FloatingCard
              title="Any Four NFC Cards Deal"
              image={four}
              name="Any Four NFC Cards Deal"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardsComponent02;
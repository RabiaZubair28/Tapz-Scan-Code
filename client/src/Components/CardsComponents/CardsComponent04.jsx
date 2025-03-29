import React from "react";// Add optional styles here
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { createPortal } from "react-dom";
import emailjs from "@emailjs/browser";
import blackcard from "../../assets/b-card.jpg";
import whitecard from "../../assets/logos/b-card-5.jpg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import net from "../../assets/products/crinkle.jpg"
import a6 from "../../assets/products/a6.jpg"
import a3 from "../../assets/products/a3.jpg"
import twoa3 from "../../assets/products/2a3.jpg"
import a4 from "../../assets/products/a4.jpg"
import twoa4 from "../../assets/products/2a4.jpg"
import a5 from "../../assets/products/a5.jpg"
import twoa5 from "../../assets/products/2a5.jpg"
import "./CardsComponent.css";
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
    // Initialize EmailJS
    emailjs.init("jcVI9RMOUyvYiqeSL"); // Replace "your_user_id" with your actual EmailJS User ID
  }, []);

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
        console.log("SUCCESS!");
        // alert("Inquiry Sent Successfully!")
        toast.success("Email sent successfully!");
        setModalOpen(false);
        order.name= "";
        order.description= "";
        order.itemNo= "";
        order.contactNo= "";
      
      })
      .catch((error) => {
        console.error("FAILED...", error);
        toast.error("Failed to send email. Please try again.");
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
                <button type="submit"
                  
                  className="w-full bg-[#87CEEB] mt-2 text-[#1a237e] font-semibold py-3 rounded-xl hover:bg-[#75bde0] transition-colors text-lg text-center cursor-pointer"
                >
                  SUBMIT</button>
                
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

const CardsComponent04 = () => {
  return (
    <>
     <Toaster />
      <div className="parentDivCard">
        <div className="pt-6">
        <div className="card-container">
            <FloatingCard
              title="A-3.5 Size NFC Stand"
              image={a3}
              name="A-3.5 Size NFC Stand"
            />
            <FloatingCard
              title="Two A-3.5 Size NFC Stands"
              image={twoa3}
              name="Two A-3.5 Size NFC Stands"
            />
          </div>
        </div>
      
        <div className="component">
          <div className="card-container">
            <FloatingCard
              title="A-4 Size NFC Stand"
              image={a4}
              name="A-4 Size NFC Stand"
            />
            <FloatingCard
              title="A-5 Size NFC Stand"
              image={a5}
              name="A-5 Size NFC Stand"
            />
          </div>
        </div>
        <div className="component">
          <div className="card-container">
             <FloatingCard
              title="Two A-4 Size NFC Stands"
              image={twoa4}
              name="Two A-4 Size NFC Stands"
            />
            <FloatingCard
              title="Two A-5 Size NFC Stands"
              image={twoa5}
              name="Two A-5 Size NFC Stands"
            />
          </div>
        </div>
        <div className="component">
          
          <div className="card-container">
            <FloatingCard
              title="Net-Style NFC Stand"
              image={net}
              name="Net-Style NFC Stand"
            />
            <FloatingCard
              title="A-6 Size NFC Stand"
              image={a6}
              name="A-6 Size NFC Stand"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardsComponent04;

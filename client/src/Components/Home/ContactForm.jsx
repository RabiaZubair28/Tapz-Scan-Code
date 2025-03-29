import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const ContactForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    inquiry: "",
  });

  const navigate = useNavigate();
  const [contactModal, setContactModal] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await emailjs.send(
        "service_levr829",
        "template_9pj59gp",
        {
          name: formData.name,
          email: formData.email,
          contactNumber: formData.contact,
          message: formData.inquiry,
        },
        "jcVI9RMOUyvYiqeSL"
      );

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", inquiry: "", contact: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(https://liamcrest.com/assets/static/header/Asset%2072.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {contactModal && (
        <div
          className="fixed inset-0  flex items-center justify-center p-6"
          style={{
            backgroundImage:
              "url(https://liamcrest.com/assets/static/header/Asset%2072.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Toaster position="top-center" />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-3xl p-6 max-w-xl w-full relative"
          >
            <motion.button
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setContactModal(false);
                navigate("/");
              }}
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
              <div className="w-full">
                {/* <img
              src="https://liamcrest.com/assets/static/CONTACT%20US%20IMAGE-N1-01.png"
              alt="Contact Us"
              className="w-full h-auto rounded-lg mb-4"
            /> */}
                <h2 className="text-3xl font-bold text-[#1a237e] text-center mb-4">
                  Connect With Us!
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e] focus:ring-opacity-20 transition-all text-[#1a237e] placeholder-gray-400"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e] focus:ring-opacity-20 transition-all text-[#1a237e] placeholder-gray-400"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="Your Contact Number"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e] focus:ring-opacity-20 transition-all text-[#1a237e] placeholder-gray-400"
                  />
                </div>

                <div>
                  <textarea
                    name="inquiry"
                    value={formData.inquiry}
                    onChange={handleChange}
                    placeholder="Your Message..."
                    required
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1a237e] focus:ring-2 focus:ring-[#1a237e] focus:ring-opacity-20 transition-all resize-none text-[#1a237e] placeholder-gray-400"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-[#87CEEB] text-[#1a237e] font-semibold py-3 rounded-xl hover:bg-[#75bde0] transition-colors text-lg"
                >
                  LET'S TALK
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;

// #root {
//   max-width: 1280px;
//   margin: 0 auto;
//   padding: 2rem;
//   text-align: center;
// }

// .logo {
//   height: 6em;
//   padding: 1.5em;
//   will-change: filter;
//   transition: filter 300ms;
// }
// .logo:hover {
//   filter: drop-shadow(0 0 2em #646cffaa);
// }
// .logo.react:hover {
//   filter: drop-shadow(0 0 2em #61dafbaa);
// }

// @keyframes logo-spin {
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// }

// @media (prefers-reduced-motion: no-preference) {
//   a:nth-of-type(2) .logo {
//     animation: logo-spin infinite 20s linear;
//   }
// }

// .card {
//   padding: 2em;
// }

// .read-the-docs {
//   color: #888;
// }

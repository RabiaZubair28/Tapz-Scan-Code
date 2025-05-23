import React from "react";
import { motion } from "framer-motion";
import FloatingDots from "./FloatingDots";
import ProjectCounter from "./ProjectCounter";
import WaveBackground from "./WaveBackground";
import Navbar from "../Home/Navbar";
function App() {
  return (
    <div className="bg-[#16215c] relative min-h-screen overflow-hidden pt-0">
      <Navbar /> {/* Backgrounds */}
      <WaveBackground />
      {/* Animated Dots */}
      <FloatingDots />
      {/* Content */}
      <div className=" relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl  md:text-3xl font-bold text-navy-900 mb-4 text-center"
        >
          WE'VE DELIVERED
        </motion.h1>

        <ProjectCounter />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-2xl md:text-5xl font-bold text-navy-900 mt-4 text-center"
        >
          NFC PRODUCTS
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-lg md:text-2xl text-navy-700 mt-2 text-center"
        >
          all around Qatar successfully!
        </motion.p>
      </div>
      {/* Bottom dark wave */}
      <br />
      <br />
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-0 left-0 right-0 z-10 w-full"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dxokfhkhu/image/upload/v1743097674/001_igz3ei.png)",
          backgroundSize: "100% auto",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom center",
          height: "40vh",
          minHeight: "300px",
        }}
      />
    </div>
  );
}

export default App;

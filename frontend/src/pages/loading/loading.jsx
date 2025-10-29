// src/components/LoadingPage.jsx
import React from "react";
import { motion } from "framer-motion";

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50">
      <motion.div
        className="w-30 h-30 border-8 border-pink-300 border-t-pink-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />

      <motion.h1
        className="font-mons text-2xl font-semibold mt-6 text-pink-600 tracking-wide"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading...
      </motion.h1>
    </div>
  );
};

export default LoadingPage;

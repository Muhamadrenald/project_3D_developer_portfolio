import { motion } from "framer-motion";

const DownloadButton = () => {
  return (
    <motion.a
      href="/assets/Renald_CV.pdf"
      download="Renald_CV.pdf"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="bg-[#915EFF] text-white py-3 px-6 rounded-lg shadow-md text-lg font-bold cursor-pointer mt-5 inline-block"
      style={{
        position: "relative",
        zIndex: 20, // Pastikan tombol memiliki z-index tinggi
      }}
    >
      Download CV
    </motion.a>
  );
};

export default DownloadButton;

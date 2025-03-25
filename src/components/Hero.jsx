import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-green-pink-gradient" />
          <div className="w-1 sm:h-80 h-40 green-pink-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#2de6fa]">Renald</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            <TypeAnimation
              sequence={[
                "Frontend Developer",
                3000,
                "Fullstack Developer",
                3000,
              ]}
              wrapper="span"
              speed={50}
              style={{ color: "#5EFF" }}
              repeat={Infinity}
            />
          </p>
        </div>
      </div>

      <ComputersCanvas />

      {/* Tombol Download CV */}
      <div className="absolute bottom-5 w-full flex justify-center items-center">
        <motion.a
          href="../../public/pdf/cv_renald.pdf"
          download="Renald_CV.pdf"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#09c4d8] text-white-100 py-3 px-6 rounded-lg shadow-md text-lg font-bold cursor-pointer"
        >
          Download Resume
        </motion.a>
      </div>

      {/* Tombol Scroll */}
      <div className="absolute xs:bottom-20 bottom-40 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;

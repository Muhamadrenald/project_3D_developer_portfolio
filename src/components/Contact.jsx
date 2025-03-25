import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State untuk menangani error pada setiap field
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    // Reset error untuk field yang sedang diubah
    setErrors({
      ...errors,
      [name]: false,
    });
  };

  const validateForm = () => {
    const { name, email, message } = form;
    const newErrors = {
      name: name.trim() === "",
      email: email.trim() === "",
      message: message.trim() === "",
    };

    setErrors(newErrors);

    // Validasi email menggunakan regex sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email.trim());

    if (newErrors.name) {
      toast.error("Please enter your name", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "colored",
        pauseOnHover: true, // Diubah menjadi true untuk pause saat hover
        pauseOnFocusLoss: false,
      });
      return false;
    }

    if (newErrors.email || !isValidEmail) {
      toast.error("Please enter a valid email address", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "colored",
        pauseOnHover: true, // Diubah menjadi true untuk pause saat hover
        pauseOnFocusLoss: false,
      });
      return false;
    }

    if (newErrors.message) {
      toast.error("Please enter your message", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "colored",
        pauseOnHover: true, // Diubah menjadi true untuk pause saat hover
        pauseOnFocusLoss: false,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Monolog",
          from_email: form.email,
          to_email: "logmono098@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          toast.success(
            "Message sent successfully! I'll get back to you soon.",
            {
              position: "bottom-right",
              autoClose: 5000,
              theme: "colored",
              pauseOnHover: true, // Diubah menjadi true untuk pause saat hover
              pauseOnFocusLoss: false,
            }
          );

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          toast.error("Failed to send message. Please try again.", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "colored",
            pauseOnHover: true, // Diubah menjadi true untuk pause saat hover
            pauseOnFocusLoss: false,
          });
        }
      );
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        pauseOnHover={true} // Diubah menjadi true untuk pause saat hover
        draggable
        theme="colored"
      />

      {/* Kode lainnya tetap sama */}
      <div
        className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
      >
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
        >
          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className={styles.sectionHeadText}>Contact.</h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col gap-8"
          >
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your good name?"
                className={`
                  bg-tertiary py-4 px-6 placeholder:text-secondary 
                  text-white rounded-lg outline-none border-none font-medium
                  ${errors.name ? "border-2 border-red-500" : ""}
                `}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">Name is required</p>
              )}
            </label>

            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your web address?"
                className={`
                  bg-tertiary py-4 px-6 placeholder:text-secondary 
                  text-white rounded-lg outline-none border-none font-medium
                  ${errors.email ? "border-2 border-red-500" : ""}
                `}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
            </label>

            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Message</span>
              <textarea
                rows={7}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What you want to say?"
                className={`
                  bg-tertiary py-4 px-6 placeholder:text-secondary 
                  text-white rounded-lg outline-none border-none font-medium
                  ${errors.message ? "border-2 border-red-500" : ""}
                `}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">Message is required</p>
              )}
            </label>

            <button
              type="submit"
              className={`
                bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary
                ${loading ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
        >
          <EarthCanvas />
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");

import { useEffect, useContext } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaBuilding, FaUsers, FaHandshake } from "react-icons/fa";
import { LanguageContext } from "../context/LanguageContext";
import data from "../../public/data.json";

export default function About() {
  const { lang } = useContext(LanguageContext);
  const content = data.about[lang];

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="relative bg-gray-100 py-20 px-6 md:px-12 overflow-hidden">
      {/* تأثير القمة الخلفية - عكس الاتجاه بناءً على اللغة */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          className="w-full h-auto"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#1a1a1a"
            fillOpacity="1"
            d={
              lang === "ar"
                ? "M0,128L60,138.7C120,149,240,171,360,186.7C480,203,600,213,720,186.7C840,160,960,96,1080,74.7C1200,53,1320,75,1380,85.3L1440,96V320H0Z"
                : "M1440,128L1380,138.7C1320,149,1200,171,1080,186.7C960,203,840,213,720,186.7C600,160,480,96,360,74.7C240,53,120,75,60,85.3L0,96V320H1440Z"
            }
          />
        </svg>
      </div>

      {/* العنوان */}
      <h2
        className="relative text-5xl font-extrabold text-center mb-16 text-dark"
        data-aos="fade-up"
      >
        {content.title}
      </h2>

      {/* المحتوى */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 items-center">
        {/* صورة داخل شكل أنيق */}
        <motion.div
          className="relative w-full flex justify-center"
          data-aos="fade-right"
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        >
          <div className="absolute -bottom-8 right-8 w-52 h-52 bg-black rounded-full opacity-20 blur-2xl"></div>

          <div className="relative bg-white/60 backdrop-blur-lg p-2 rounded-2xl shadow-lg border border-gray-200">
            <img
              src={content.image}
              alt="من نحن"
              className="w-[100%] md:w-[100%] h-auto object-cover rounded-xl"
            />
          </div>
        </motion.div>

        {/* النصوص */}
        <div data-aos="fade-left">
          <p className="text-lg leading-relaxed text-gray-800 font-medium mt-4 md:mt-0">
            {content.description}
          </p>

          {/* الميزات */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[FaBuilding, FaUsers, FaHandshake].map((Icon, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center justify-center p-6 border border-gray-300 rounded-xl shadow-md bg-white hover:bg-gray-50 transition text-center"
                whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center justify-center w-16 h-16 bg-red-500 text-white text-3xl rounded-full shadow-lg">
                  <Icon />
                </div>
                <span className="text-lg font-semibold mt-3">
                  {content.features[index]}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { LanguageContext } from "../context/LanguageContext";
import data from "../../public/data.json";

export default function HeroSection() {
  const { lang, setLang } = useContext(LanguageContext);
  const content = data.heroSection[lang];

  // تغيير اتجاه الصفحة بناءً على اللغة المختارة
  useEffect(() => {
    document.documentElement.lang = lang; // تحديد لغة الصفحة
    document.body.dir = lang === "ar" ? "rtl" : "ltr"; // ضبط اتجاه النص
    document.body.classList.toggle("rtl", lang === "ar"); // إضافة كلاس CSS
  }, [lang]);

  return (
    <section
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="relative h-[865px] bg-black text-white flex items-center px-4 sm:px-6 lg:px-24"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 w-full">
        
        {/* المحتوى النصي */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }} 
          className={`md:w-1/2 mt-12 text-center ${lang === "ar" ? "md:text-right" : "md:text-left"}`}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
            {content.title}
          </h1>
          <p className="text-gray-400 mt-4">{content.description}</p>

          {/* الإحصائيات مع عداد متحرك */}
          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-6 md:gap-10">
            {content.stats.map((stat, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: index * 0.2 }} 
                className="text-center"
              >
                <h3 className="text-3xl font-bold text-red-500">
                  <CountUp start={0} end={stat.value} duration={2.5} />+
                </h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* زر التواصل */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
            className="mt-8"
          >
            <button className="bg-red-600 px-6 py-3 rounded-lg text-white font-bold text-lg shadow-lg hover:bg-red-700 transition duration-300">
              {content.buttonText}
            </button>
          </motion.div>
        </motion.div>

        {/* صورة */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1, ease: "easeOut" }}
          className="md:w-1/2 flex justify-center"
        >
          <img
            src={content.image}
            alt="Home"
            className="relative w-64 sm:w-80 md:w-[603px] h-auto rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}

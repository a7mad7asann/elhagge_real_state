import { useEffect, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { LanguageContext } from "../context/LanguageContext";

export default function Gallery() {
  const { lang } = useContext(LanguageContext);
  const [galleryData, setGalleryData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-in-out",
      once: true,
    });

    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setGalleryData(data.gallerySection))
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  if (!galleryData) return <p className="text-center text-gray-500">جار التحميل...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16" dir={lang === "ar" ? "rtl" : "ltr"}>
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800" data-aos="fade-up">
        {galleryData.title[lang]}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryData.images.map((image, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-xl cursor-pointer shadow-md hover:shadow-xl transition-transform group"
            data-aos="fade-up"
            data-aos-delay={index * 100}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image.src}
              alt={image.alt[lang]}
              className="w-full h-64 object-cover rounded-xl transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
              <h3 className="text-xl font-semibold">{image.alt[lang]}</h3>
              <p className="text-sm opacity-90">{image.description ? image.description[lang] : ""}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative bg-white rounded-xl shadow-xl p-4 max-w-4xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                className="absolute top-3 right-3 text-black text-3xl hover:text-red-500 transition"
                onClick={() => setSelectedImage(null)}
              >
                ✖
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt[lang]}
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
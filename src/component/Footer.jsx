import { useState, useEffect, useContext } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { LanguageContext } from "../context/LanguageContext";

export default function Footer() {
  const { lang } = useContext(LanguageContext);
  const [footer, setfooter] = useState(null);

  useEffect(() => {
    fetch(`${window.location.origin}/data.json`)
      .then((res) => res.json())
      .then((data) => setfooter(data.footer[lang]))
      .catch((err) => console.error("Error loading JSON:", err));
  }, [lang]);

  if (!footer) return <p className="text-center text-gray-500">جار التحميل...</p>;

  return (
    <footer className={`bg-black text-white py-12 overflow-hidden ${lang === 'ar' ? 'rtl' : 'ltr'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* شعار الشركة */}
        <div className={`text-center ${lang === 'ar' ? 'md:text-right' : 'md:text-left'}`} data-aos="fade-up">
          <h2 className="text-3xl font-bold">{footer.company}</h2>
          <p className="mt-2 text-gray-400">{footer.slogan}</p>
        </div>

        {/* معلومات الاتصال */}
        <div className={`text-center mt-2 ${lang === 'ar' ? 'md:text-right' : 'md:text-left'}`} data-aos="fade-right">
          <div className="space-y-2">
            <p>📞 {footer.contact.phone.join(" | ")}</p>
            <p>✉ {footer.contact.email}</p>
            <p>📍 {footer.contact.address}</p>
          </div>
        </div>

        {/* عرض حصري */}
        <div className="text-center bg-white rounded-lg p-4 shadow-lg" data-aos="fade-left">
          <h3 className="text-xl font-semibold mb-3 text-black">{footer.offer.title}</h3>
          <p className="text-gray-600">{footer.offer.description}</p>
          <button className="mt-3 bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-700 transition">
            {footer.offer.button}
          </button>
        </div>
      </div>

      {/* وسائل التواصل الاجتماعي وحقوق النشر */}
      <div className="text-center mt-10 border-t border-gray-700 pt-5" data-aos="fade-up">
        <p className="text-gray-400 mb-3">{footer.follow}</p>
        <div className="flex justify-center gap-6 mt-2 text-xl">
          <a href={footer.social.facebook} className="text-gray-400 hover:text-blue-500 transition">
            <FaFacebookF />
          </a>
          <a href={footer.social.twitter} className="text-gray-400 hover:text-blue-400 transition">
            <FaTwitter />
          </a>
          <a href={footer.social.instagram} className="text-gray-400 hover:text-pink-500 transition">
            <FaInstagram />
          </a>
          <a href={footer.social.linkedin} className="text-gray-400 hover:text-blue-700 transition">
            <FaLinkedinIn />
          </a>
        </div>
        <p className="text-gray-500 text-sm mt-4">{footer.copyright}</p>
      </div>
    </footer>
  );
}

import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { HashLink as Link } from "react-router-hash-link";
import { FaBars, FaTimes } from "react-icons/fa";
import data from "../../public/data.json";

export default function Navbar() {
  const { lang, setLang } = useContext(LanguageContext);
  const content = data.navbar[lang];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("rtl", lang === "ar");

    // التحقق من التمرير وإضافة خلفية عند النزول
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lang]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 shadow-md backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* الشعار */}
        <Link to="/">
          <img src={content.logo} alt="Logo" className="w-28  h-24 filter invert brightness-75 transition-all duration-300 hover:brightness-100" />
        </Link>

        {/* القائمة في وضع الهاتف */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white transition-transform duration-300 hover:scale-110">
            {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>

        {/* القائمة الرئيسية */}
        <ul className={`md:flex gap-8 text-lg font-medium text-white transition-all duration-300 ${
          isMenuOpen ? "flex flex-col absolute bg-black/80 w-full left-0 top-16 py-6 px-4 shadow-xl rounded-md" : "hidden md:flex"
        }`}>
          {["home", "about", "properties", "contact"].map((item) => (
            <li key={item} className="relative group">
              <Link 
                to={`/${item}`} 
                className="relative inline-block transition-all duration-300 ease-in-out hover:text-gray-300 hover:scale-105"
              >
                {content[item]}
                {/* خط متحرك تحت الرابط عند الهوفر */}
                <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-gray-300 transition-all duration-500 ease-in-out  group-hover:w-full group-hover:left-0"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* زر اللغة */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={lang === "ar"}
            onChange={() => setLang(lang === "ar" ? "en" : "ar")}
          />
          <div className="w-16 h-8 bg-gray-500 rounded-full flex items-center p-1 transition-all duration-300 peer-checked:bg-gray-200">
            <span
              className={`w-6 h-6 bg-white text-xs font-bold flex items-center justify-center rounded-full shadow-md transition-transform duration-300 ${
                lang === "ar" ? "translate-x-0 text-black" : "translate-x-0 text-black"
              }`}
            >
              {lang === "ar" ? "AR" : "EN"}
            </span>
          </div>
        </label>
      </div>
    </nav>
  );
}

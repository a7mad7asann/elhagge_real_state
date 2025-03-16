import { useState, useEffect, useContext } from "react";
import { FaMapMarkerAlt, FaBuilding, FaDollarSign, FaPhone, FaBed, FaRulerCombined } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { LanguageContext } from "../context/LanguageContext";
import data from "../../public/data.json";

export default function PropertySearchForm() {
  const { lang } = useContext(LanguageContext);
  const content = data[lang].labels;
  const propertyTypes = data[lang].propertyType;
  const conditions = data[lang].condition;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    propertyType: propertyTypes[0],
    rooms: "",
    area: "",
    price: ""
  });

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && !/^\d*$/.test(value)) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      alert(content.name);
      return;
    }

    // Create the message to send to WhatsApp with emojis and support for both languages
    const message = lang === "en" ? `
  🏠 Property Inquiry 🏠

  📞 Phone Number: ${formData.phone}
  🏡 Number of Rooms: ${formData.rooms}
  📏 Area: ${formData.area} sqm
  📌 Property Condition: ${formData.condition}
  💰 Budget: $${formData.price} (Negotiable)
  👤 Name: ${formData.name}
` : `
  🏠 استفسار عن العقار 🏠

  📞 رقم الهاتف: ${formData.phone}
  🏡 عدد الغرف: ${formData.rooms}
  📏 المساحة: ${formData.area} م²
  📌 حالة العقار: ${formData.condition}
  💰 الميزانية: $${formData.price} (قابل للتفاوض)
  👤 الاسم: ${formData.name}
`;


    // Encode the message to handle special characters like emojis
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "+201061380485";  // Replace with your WhatsApp number

    // Create the WhatsApp link
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Redirect to WhatsApp chat
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg overflow-hidden" data-aos="fade-up">
      <h2 className="text-xl font-semibold mb-4 text-center" data-aos="fade-up">
        {content.search}
      </h2>

      <div className="mb-4" data-aos="fade-right">
        <input type="text" name="name" placeholder={content.name} value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none" />
      </div>

      <div className="mb-4" data-aos="fade-left">
        <input type="tel" name="phone" placeholder={content.phone} value={formData.phone} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none" />
      </div>

      <div className="mb-4" data-aos="fade-right">
        <input type="text" name="address" placeholder={content.address} value={formData.address} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none" />
      </div>

      <div className="mb-4" data-aos="fade-left">
        <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none">
          {propertyTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="mb-4" data-aos="fade-right">
        <input type="number" name="rooms" placeholder={content.rooms} value={formData.rooms} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none" />
      </div>

      <div className="mb-4" data-aos="fade-left">
        <input type="number" name="area" placeholder={content.area} value={formData.area} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none" />
      </div>

      <div className="mb-4" data-aos="fade-right">
        <input type="number" name="price" placeholder={content.price} value={formData.price} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none" />
      </div>

      <button onClick={handleSearch} className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-all" data-aos="fade-up">
        {content.search}
      </button>
    </div>
  );
}

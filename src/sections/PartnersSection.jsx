import { useEffect, useState, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { LanguageContext } from "../context/LanguageContext";

export default function PartnersSection() {
  const { lang } = useContext(LanguageContext);
  const [partnersData, setPartnersData] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-in-out",
      once: true,
    });

    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setPartnersData(data.partnersSection))
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  if (!partnersData) return <p className="text-center text-gray-500">جار التحميل...</p>;

  return (
    <section className="bg-black p-6">
      <div className="flex justify-center space-x-12">
        {partnersData.partners.map((partner, index) => (
          <a
            key={index}
            href={partner.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
            data-aos="fade-up"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-12 mx-4 opacity-70 hover:opacity-100 transition"
            />
          </a>
        ))}
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";
import BuildingLoader from "./component/BuildingLoader.jsx"; // استيراد الكود الذي كتبته
import { BrowserRouter as Router } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Nav from "./sections/Navbarr";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Mques from "./sections/CTA";
import Gallery from "./sections/Gallery";
import Form from "./sections/Form";
import Prtner from "./sections/PartnersSection";
import Footer from "./component/Footer";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // مدة الانتظار (2 ثانية)
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <BuildingLoader loading={loading} />
        {!loading && (
          <>
            <Nav />
            <Hero />
            <Prtner />
            <About />
            <Mques />
            <Gallery />
            <Form />
            <Footer />
          </>
        )}
      </Router>
    </LanguageProvider>
  );
}

export default App;

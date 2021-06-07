import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState } from "react";
import MainSection from "../components/MainSection";
import InfoSection from "../components/InfoSection/Index";
import { homeObjOne } from "../components/InfoSection/Data";
import Services from "../components/Platforms";
import Footer from "../components/Footer";
import FAQSection from "../components/FAQ";
import ContactSection from "../components/Contact";

const Home = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <MainSection />
      <InfoSection {...homeObjOne} />
      <Services />
      <FAQSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Home;

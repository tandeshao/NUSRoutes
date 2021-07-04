import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState } from "react";
import MainSection from "../components/MainSection";
import InfoSection from "../components/InfoSection/Index";
import { homeObjOne } from "../components/InfoSection/Data";
import Footer from "../components/Footer";
import FAQSection from "../components/FAQ";
import ContactSection from "../components/Contact";
import BusInfo from '../components/BusInfo';

const Home = () => {
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
      <BusInfo />
      <FAQSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Home;

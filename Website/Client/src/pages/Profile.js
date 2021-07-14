import Sidebar from "../components/ProfileSidebar";
import ProfileNavbar from "../components/ProfileNavbar";
import { useState } from "react";
import ProfileSection from "../components/ProfileSection";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { animationOne, transition } from "./pageAnimation";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(() => false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const [section, setSection] = useState(() => true);

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={animationOne}
      transition={transition}
    >
      <Sidebar isOpen={isOpen} toggle={toggle} setSection={setSection} />
      <ProfileNavbar toggle={toggle} setSection={setSection} />
      <ProfileSection section={section} />
      <Footer />
    </motion.div>
  );
};

export default Profile;

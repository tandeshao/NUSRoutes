import Sidebar from "../components/ProfileSidebar";
import ProfileNavbar from "../components/ProfileNavbar";
import { useState } from "react";
import ProfileSection from "../components/ProfileSection";
import Footer from "../components/Footer";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(() => false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const [section, setSection] = useState(() => true);

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} setSection={setSection} />
      <ProfileNavbar toggle={toggle} setSection={setSection} />
      <ProfileSection section={section} />
      <Footer />
    </>
  );
};

export default Profile;

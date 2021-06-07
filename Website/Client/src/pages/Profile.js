import Sidebar from "../components/ProfileSidebar";
import Navbar from "../components/ProfileNavbar";
import { useState } from "react";
import ProfileSection from "../components/ProfileSection";
import Footer from "../components/Footer";

const Profile = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <ProfileSection />
      <Footer />
    </>
  );
};

export default Profile;

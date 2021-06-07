import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavProfile,
} from "./NavbarElements";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import styles from "./SignOut.module.css";
import { Link, useHistory } from "react-router-dom";

const Navbar = (props) => {
  const { toggle } = props;
  const [scrollNav, setScrollNav] = useState(false);
  const handleLogout = () => window.localStorage.getItem("handleLogout");
  const googleSignOut = () => window.localStorage.getItem("googleSignOut");
  const user = window.localStorage.getItem("user");

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  const history = useHistory();
  const handleSubmit = (e) => {
    //prevents page refreshing
    e.preventDefault();

    if (googleSignOut) {
      googleSignOut();
    }
    if (handleLogout) {
      handleLogout();
    }
    //clear cache
    window.localStorage.clear();

    //redirect
    history.push("/");
  };

  return (
    <>
      <Nav scrollNav={scrollNav}>
        <NavbarContainer>
          <NavLogo to="/" onClick={toggleHome}>
            NUSROUTES
          </NavLogo>
          <MobileIcon onClick={toggle}>
            <h3>
              <FaBars />
            </h3>
          </MobileIcon>
          <NavMenu>
            <NavProfile to={user ? "/profile" : "/signin"}>Profile</NavProfile>
            <NavItem>
              <NavLinks
                to="about"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                About
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to="platforms"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                Platforms
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to="faq"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                FAQs
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to="contact"
                smooth={true}
                duration={500}
                spy={true}
                exact="true"
                offset={-80}
              >
                Contact Us
              </NavLinks>
            </NavItem>
          </NavMenu>
          <NavBtn>
            {user ? (
              <button onClick={handleSubmit} className={styles.signout}>
                Logout
              </button>
            ) : (
              <Link to="/signin" className={styles.signout}>
                Login
              </Link>
            )}
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;

import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavToggle,
} from "./ProfileNavbarElements";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import styles from "./SignOut.module.css";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

const ProfileNavbar = (props) => {
  const { toggle } = props;
  const [scrollNav, setScrollNav] = useState(false);
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

  const signOut = () => {
    // [START auth_sign_out]
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("Sign Out Successful");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleSubmit = (e) => {
    //prevents page refreshing
    e.preventDefault();
    signOut();
    //clear cache
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("id");
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
            <NavItem>
              <NavLinks to="/">Home</NavLinks>
            </NavItem>
            <NavItem>
              <NavToggle to='/profile'>History</NavToggle>
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

export default ProfileNavbar;

import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarLink,
  SidebarRoute,
  SidebarMenu,
  SideBtnWrap,
  SidebarButton,
  SidebarProfile,
} from "./SidebarElements";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

const Sidebar = ({ isOpen, toggle }) => {
  const user = window.localStorage.getItem("user");
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
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarProfile to={user ? "/profile" : "/signin"}>
            Profile
          </SidebarProfile>
          <SidebarLink to="about" onClick={toggle}>
            About
          </SidebarLink>
          <SidebarLink to="platforms" onClick={toggle}>
            Platforms
          </SidebarLink>
          <SidebarLink to="faq" onClick={toggle}>
            FAQs
          </SidebarLink>
          <SidebarLink to="contact" onClick={toggle}>
            Contact Us
          </SidebarLink>
        </SidebarMenu>
        <SideBtnWrap>
          {user ? (
            <SidebarButton onClick={handleSubmit}>Logout</SidebarButton>
          ) : (
            <SidebarRoute to="/signin">Login</SidebarRoute>
          )}
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;

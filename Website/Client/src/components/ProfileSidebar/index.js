import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarRoute,
  SidebarMenu,
  SideBtnWrap,
  SidebarButton,
  SidebarProfile,
} from "./ProfileSidebarElements";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

const ProfileSidebar = ({ isOpen, toggle, setSection }) => {
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
          <SidebarProfile to="/">Home</SidebarProfile>
          <SidebarProfile to="/profile" onClick={() => setSection(true)}>
            History
          </SidebarProfile>
          <SidebarProfile to="/profile" onClick={() => setSection(false)}>
            Favourites
          </SidebarProfile>
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

export default ProfileSidebar;

import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarLink,
  SidebarRoute,
  SidebarMenu,
  SideBtnWrap,
} from "./SidebarElements";

const Sidebar = ({isOpen, toggle}) => {
  return (
    <SidebarContainer isOpen = {isOpen} onClick= {toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="about" onClick= {toggle}>About</SidebarLink>
          <SidebarLink to="platforms" onClick= {toggle}>Platforms</SidebarLink>
          <SidebarLink to="faq" onClick= {toggle}>FAQs</SidebarLink>
          <SidebarLink to="contact" onClick= {toggle}>Contact Us</SidebarLink>
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute to="/signin"> Sign In</SidebarRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;

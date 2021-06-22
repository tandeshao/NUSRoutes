import {
  FooterContainer,
  FooterWrap,
  FooterLinksContainer,
  FooterLinksWrapper,
  FooterLinkItems,
  FooterLinkTitle,
  FooterLink,
  SocialMedia,
  SocialMediaWrap,
  SocialLogo,
  WebsiteRights,
  SocialIcons,
  SocialIconLink,
} from "./FooterElements";
import { animateScroll as scroll } from "react-scroll";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <FooterContainer>
      <FooterWrap>
        <FooterLinksContainer>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle> Placeholder </FooterLinkTitle>
              <FooterLink to="/"> Placeholder </FooterLink>
              <FooterLink to="/"> Placeholder </FooterLink>
              <FooterLink to="/"> Placeholder </FooterLink>
              <FooterLink to="/"> Placeholder </FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle> Placeholder </FooterLinkTitle>
              <FooterLink to="/"> Placeholder </FooterLink>
              <FooterLink to="/"> Placeholder </FooterLink>
              <FooterLink to="/"> Placeholder </FooterLink>
              <FooterLink to="/"> Placeholder </FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle> Placeholder </FooterLinkTitle>
              <FooterLink to="/"> Placeholder </FooterLink>
              <FooterLink to="/"> Placeholder </FooterLink>
              <FooterLink to="/"> Placeholder </FooterLink>
              <FooterLink to="/"> Placeholder </FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle> Placeholder </FooterLinkTitle>
              <FooterLink to="/"> Placeholder </FooterLink>
              <FooterLink to="/"> Placeholder </FooterLink>
              <FooterLink to="/"> Placeholder </FooterLink>
              <FooterLink to="/"> Placeholder </FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
        </FooterLinksContainer>
        <SocialMedia>
          <SocialMediaWrap>
            <SocialLogo to="/" onClick={toggleHome}>
              NUSROUTES
            </SocialLogo>
            <WebsiteRights>
              NUSROUTES © {new Date().getFullYear()} All rights reserved.
            </WebsiteRights>
            <SocialIcons>
              <SocialIconLink herf="/" target="blank" aria-label="Facebook">
                <FaFacebook />
              </SocialIconLink>
              <SocialIconLink herf="/" target="blank" aria-label="Youtube">
                <FaYoutube />
              </SocialIconLink>
              <SocialIconLink herf="/" target="blank" aria-label="Twitter">
                <FaTwitter />
              </SocialIconLink>
              <SocialIconLink herf="/" target="blank" aria-label="Instagram">
                <FaInstagram />
              </SocialIconLink>
            </SocialIcons>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;

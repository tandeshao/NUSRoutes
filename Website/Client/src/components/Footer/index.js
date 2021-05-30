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
              <FooterLinkTitle> About us </FooterLinkTitle>
              <FooterLink to="/signin"> How it works </FooterLink>
              <FooterLink to="/signin"> Testimonials </FooterLink>
              <FooterLink to="/signin"> Careers </FooterLink>
              <FooterLink to="/signin"> Tems of Service </FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle> About us </FooterLinkTitle>
              <FooterLink to="/signin"> How it works </FooterLink>
              <FooterLink to="/signin"> Testimonials </FooterLink>
              <FooterLink to="/signin"> Careers </FooterLink>
              <FooterLink to="/signin"> Tems of Service </FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle> Videos </FooterLinkTitle>
              <FooterLink to="/signin"> Submit Video </FooterLink>
              <FooterLink to="/signin"> Ambassadors </FooterLink>
              <FooterLink to="/signin"> Agency </FooterLink>
              <FooterLink to="/signin"> Tems of Service </FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle> Social Media </FooterLinkTitle>
              <FooterLink to="/signin"> Instagram </FooterLink>
              <FooterLink to="/signin"> Facebook </FooterLink>
              <FooterLink to="/signin"> Youtube </FooterLink>
              <FooterLink to="/signin"> Twitter </FooterLink>
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

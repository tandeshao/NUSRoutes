import { MapNavbarContainer, Item, LinkItem } from "./MapNavbar";
import { FaHome, FaHistory, FaRoute, FaInfoCircle } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const MapNavbar = ({ open, toggle }) => {
  const history = useHistory();

  const push = (location) => {
    history.push(location);
  };

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  return (
    <>
      <MapNavbarContainer>
        <Item
          onClick={() => {
            toggle(false);
            push("/");
          }}
        >
          <FaHome size={27} />
          Home
        </Item>
        <Item onClick={() => toggle(!open)}>
          <FaRoute size={27} /> {open ? "Map" : "Routes"}
        </Item>
        <LinkItem
          to="/#businfo"
          scroll={(el) => scrollWithOffset(el)}
          style={{ textDecoration: "none" }}
          onClick={() => toggle(false)}
        >
          <FaInfoCircle size={27}/>
          Bus Info
        </LinkItem>
        <Item
          onClick={() => {
            toggle(false);
            push("/profile");
          }}
        >
          <FaHistory size={27}/>
          History
        </Item>
      </MapNavbarContainer>
    </>
  );
};

export default MapNavbar;

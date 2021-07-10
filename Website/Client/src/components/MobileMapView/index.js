import { MapNavbarContainer, Item } from "./MobileMapView";
import { FaHome, FaHistory, FaRoute, FaInfoCircle } from "react-icons/fa";


const MobileMapView = ({toggle}) => {
  return (
    <>
      <MapNavbarContainer>
        <Item>
          <FaHome />
          Home
        </Item>
        <Item onClick={toggle} >
          <FaRoute /> Routes
        </Item>
        <Item>
          <FaInfoCircle />
          Bus Info
        </Item>
        <Item>
          <FaHistory />
          History
        </Item>
      </MapNavbarContainer>
    </>
  );
};

export default MobileMapView;

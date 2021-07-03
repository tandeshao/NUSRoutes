import useGeoLocation from "../Hooks/useGeoLocation";
import { HeroContainer, HeroBg, HeroContent, HeroH1 } from "./ProfileElements";

const FavouritesSection = () => {
  const location = useGeoLocation();

  return (
    <HeroContainer id="home">
      <HeroBg />
      <HeroContent>
        <HeroH1>Favourites</HeroH1>
        <div style={{ color: "white" }}>
          {location.loaded
            ? JSON.stringify(location)
            : "Location data not available yet"}
        </div>
      </HeroContent>
    </HeroContainer>
  );
};

export default FavouritesSection;

import { HeroContainer, HeroBg } from "./ProfileElements";
import HistorySection from "../HistorySection/index";
import FavouritesSection from "../FavouritesSection/index";

const ProfileSection = (props) => {
  const { section } = props;
  return (
    <HeroContainer id="home">
      <HeroBg />
      <div> {section ? <HistorySection /> : <FavouritesSection />}</div>
    </HeroContainer>
  );
};

export default ProfileSection;

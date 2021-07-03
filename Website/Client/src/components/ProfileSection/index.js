import { HeroContainer, HeroBg } from "./ProfileElements";
import HistorySection from "../HistorySection/index";

const ProfileSection = () => {
  return (
    <HeroContainer id="home">
      <HeroBg />
      <div>
        <HistorySection />
      </div>
    </HeroContainer>
  );
};

export default ProfileSection;

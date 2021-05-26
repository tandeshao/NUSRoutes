import Icon1 from "../../images/svg-1.png";
import Icon2 from "../../images/svg-3.png";
import Icon3 from "../../images/svg-4.png";
import Icon4 from "../../images/svg-2.png";

import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP,
} from "./PlatformElements";

const Services = () => {
  return (
    <ServicesContainer id="platforms">
      <ServicesH1> Our Platforms </ServicesH1>
      <ServicesWrapper>
        <ServicesCard>
          <ServicesIcon src={Icon1} />
          <ServicesH2> Website</ServicesH2>
          <ServicesP>
            Easy to use interface for those who prefer a web interface.
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon2} />
          <ServicesH2> Telegram </ServicesH2>
          <ServicesP>
            For those who prefer to use the service on their phone.
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon3} />
          <ServicesH2> Android</ServicesH2>
          <ServicesP>Downloadable from Android store.</ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon4} />
          <ServicesH2> iPhone </ServicesH2>
          <ServicesP>Downloadable from Apple store.</ServicesP>
        </ServicesCard>
      </ServicesWrapper>
    </ServicesContainer>
  );
};

export default Services;

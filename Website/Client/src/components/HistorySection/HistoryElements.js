import styled from "styled-components";

export const HeroContainer = styled.div`
  background: #0c0c0c;
  display: flex;
  justify-content: center;
  align-items: top;
  margin-top: 120px;
  padding: 0 30px;
  height: 887px;
  position: relative;
  z-index: 1;
  width: 100%;
  background-color: #35363a;
`;

export const GhostContainer = styled.div`
  background: #0c0c0c;
  display: block;
  justify-content: center;
  align-items: top;
  margin-top: 120px;
  padding: 0 30px;
  height: 887px;
  position: relative;
  z-index: 1;
  width: 100%;
  background-color: #35363a;
`;

export const HeroContent = styled.div`
  z-index: 3;
  width: 100%;
  padding: 8px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeroH1 = styled.h1`
  color: #ff2400;
  font-size: 40px;
  text-align: center;
  margin-bottom: 30px;

  @media screen and (max-width: 768px) {
    font-size: 40px;
  }

  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`;

export const HeroEmpty = styled.h1`
  color: #fff;
  font-size: 24px;
  text-align: center;
  justify-content: center;
  margin-bottom: 100px;

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

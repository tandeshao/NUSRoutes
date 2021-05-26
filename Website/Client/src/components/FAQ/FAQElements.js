import styled from "styled-components";

export const FAQContainer = styled.div`
  height: 800px;
  background: #f9f9f9;
  display: grid;
  grid-template-columns: 60% 40%;
  grid-template-rows: 20% 80%;
  grid-template-areas: 'header header' 'qns gif';
 
  @media screen and (max-width: 768px) {
    height: 600px;
  }

  @media screen and (max-width: 480px) {
    height: 400px;
  }
`;

export const FAQH1 = styled.h1`
  font-size: 3rem;
  grid-area: header;
  margin-top: 60px;
  color: #000;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 2rem;
    margin-left: 40px;
  }

  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const FAQWrapper = styled.div`
  width: 80%;
  max-width: 80rem;
  margin: 0 auto;
  margin-top: 60px;
`;

export const FAQSet = styled.div`
  background-color: #203042;
  border-radius: 0.4rem;
  margin-bottom: 1rem;
  padding: 1rem;
  box-shadow: 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
  grid-area: qns;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
  }
`;

export const Question = styled.div`
  color: #fff;
  font-size: 1;
  display: flex;
  justify-content: space-between;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;

  @media screen and (max-width: 480px) {
    font-size: 0.5rem;
  }
`;

export const OpenIcon = styled.div`
  font-size: 1rem;
`;

export const Answer = styled.p`
  margin-top: 1rem;
  color: #29e3c1;
  font-size: 0.9rem;
  border-left-style: solid;
  border-left-color: #8fc468;
  padding-left: 0.4rem;
  background-color: #0e182e;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const Image = styled.img`
    margin-top: 60px;
    height: 400px;
    width: 400px;
    margin-bottom: 10px;
    object-fit: contain;
    grid-area: gif;  

    @media screen and (max-width: 768px) {
      height: 200px;
      width: 200px;
    }

    @media screen and (max-width: 480px) {
      height: 150px; 
      width: 150px;
    }
`
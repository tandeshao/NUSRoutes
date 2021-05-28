import styled from "styled-components";

export const ContactContainer = styled.div`
  height: 860px;
  width: 100%;
  background-color: #010606;
  display: grid;
  grid-template-rows: 10% 80%;
  grid-template-columns: 60% 40%;
  grid-template-areas: "hd hd" "contact info";
`;

export const ContactHeader = styled.h1`
  grid-area: hd;
  font-size: 2.5rem;
  color: #fff;
  text-align: center;
  margin-top: 40px;
`;

export const ContactForm = styled.form`
  margin-top: 20px;
  display: block;
  font-family: "Times New Roman", Times, serif;
  color: #29f2f2;
  margin-left: 15vw;
  border-radius: 5%;
`;

export const Formhd = styled.p`
  font-size: 1.6rem;
  text-align: center;
`;

export const NameSet = styled.div`
  font-size: 1rem;
  margin-top: 20px;
  padding: 10px;
`;

export const EmailSet = styled.div`
  font-size: 0.5rem;
  margin-top: 20px;
  padding: 10px;
`;

export const SubjectSet = styled.div`
  grid-area: sbj;
  margin-top: 20px;
  font-size: 0.5rem;
  padding: 10px;
`;

export const MessageSet = styled.div`
  grid-area: message;
  margin-top: 20px;
  padding: 10px;
`;

export const Label = styled.label`
  font-size: 1rem;
  margin-right: 10px;
  font-style: italic;
`;

export const MessageBox = styled.textarea`
  border: 1px solid #29f2f2;
  background: transparent;
  min-width: 100%;
  min-height: 150px;
  max-width: 100%;
  max-height: 350px;
  margin-top: 10px;
  color: white;
  font-size: 1.2rem;
  padding: 0.5%;

  ::placeholder {
    color: #2eb8b8;
    font-style: italic;
  }
`;

export const EmailBox = styled.input`
  border: 1px solid #29f2f2;
  background: transparent;
  width: 100%;
  height: 50px;
  margin-top: 10px;
  color: white;
  font-size: 1.2rem;
  padding: 0.5%;

  ::placeholder {
    color: #2eb8b8;
    padding: 0.5%;
    font-style: italic;
  }
`;

export const NameBox = styled.input`
  border: 1px solid #29f2f2;
  background: transparent;
  width: 100%;
  height: 50px;
  margin-top: 10px;
  color: white;
  font-size: 1.2rem;
  padding: 0.5%;

  ::placeholder {
    color: #2eb8b8;
    padding: 0.5%;
    font-style: italic;
  }
`;

export const SubjectBox = styled.input`
  border: 1px solid #29f2f2;
  background: transparent;
  width: 100%;
  height: 50px;
  margin-top: 10px;
  padding: 0.5%;
  font-size: 1.2rem;
  color: white;

  ::placeholder {
    color: #2eb8b8;
    padding: 0.5%;
    font-style: italic;
  }

  &:focus {
    border: 1px solid #3dfc03;
    border-color: #509632;
  }
`;

export const FormButton = styled.p`
  padding: 10px;
`;

export const ContactInfo = styled.img`
  grid-area: info;
  margin-left: 8vw;
  margin-top: 6vh;
`;

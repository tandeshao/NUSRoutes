import {
  ContactContainer,
  ContactHeader,
  ContactForm,
  NameSet,
  EmailSet,
  MessageSet,
  NameBox,
  EmailBox,
  MessageBox,
  Formhd,
  Label,
  SubjectSet,
  SubjectBox,
  FormButton,
  ContactInfo
} from "./ContactElements";
import Image from '../../images/svg-6.png';
import { Button } from '../ButtonElement';


const ContactSection = () => {
  return (
    <ContactContainer id="contact">
      <ContactHeader>Contact Us</ContactHeader>
      <ContactForm>
        <Formhd> Do you have any feedbacks? We love to hear it from you!</Formhd>
          <NameSet>
            <Label> Name </Label>
            <NameBox placeholder="Your Name..." />
          </NameSet>
          <EmailSet>
            <Label> Email </Label>
            <EmailBox placeholder="Your Email..." />
          </EmailSet>       
        <SubjectSet>
          <Label> Subject</Label>
          <SubjectBox placeholder="Your Subject.." />
        </SubjectSet>
        <MessageSet>
          <Label> Message </Label>
          <MessageBox placeholder = 'Drag box to adjust size...'/>
        </MessageSet>
        <FormButton>
        <Button secondary="true">
        Send Message
      </Button>
      </FormButton>
      </ContactForm>
      <ContactInfo src ={Image}>
      </ContactInfo>
      
    </ContactContainer>
  );
};

export default ContactSection;

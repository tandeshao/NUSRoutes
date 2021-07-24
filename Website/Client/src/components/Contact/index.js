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
  ContactInfo,
} from "./ContactElements";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Image from "../../images/svg-6.png";
import { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const ContactSection = () => {
  const [name, setName] = useState(() => "");
  const [email, setEmail] = useState(() => "");
  const [subject, setSubject] = useState(() => "");
  const [message, setMessage] = useState(() => "");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameError(false);
    setEmailError(false);
    setSubjectError(false);
    setMessageError(false);

    const db = firebase.firestore();

    if (name === "") {
      setNameError(true);
    } else if (email === "") {
      setEmailError(true);
    } else if (subject === "") {
      setSubjectError(true);
    } else if (message === "") {
      setMessageError(true);
    } else {
      var feedback = db.collection("feedback").doc(email);
      feedback.set(
        {
          name: name,
          subject: subject,
          message: message,
        },
        {
          merge: true,
        }
      );

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      handleClickOpen();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ContactContainer id="contact">
      <ContactHeader>Contact Us</ContactHeader>
      <ContactForm>
        <Formhd> Do you have any feedback? We love to hear it from you!</Formhd>
        <NameSet>
          <Label> Name </Label>
          <NameBox
            placeholder="Your Name..."
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={nameError}
          />
        </NameSet>
        <EmailSet>
          <Label> Email </Label>
          <EmailBox
            placeholder="Your Email..."
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
          />
        </EmailSet>
        <SubjectSet>
          <Label> Subject</Label>
          <SubjectBox
            placeholder="Your Subject.."
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            error={subjectError}
          />
        </SubjectSet>
        <MessageSet>
          <Label> Message </Label>
          <MessageBox
            placeholder="Drag box to adjust size..."
            type="text"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            error={messageError}
          />
        </MessageSet>
        <FormButton>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<Icon>send</Icon>}
            onClick={handleSubmit}
          >
            Send Message
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Feedback received!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Thank you for your feedback! We will work to improve the website
                based on your suggestions.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" autoFocus>
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </FormButton>
      </ContactForm>
      <ContactInfo src={Image}></ContactInfo>
    </ContactContainer>
  );
};

export default ContactSection;

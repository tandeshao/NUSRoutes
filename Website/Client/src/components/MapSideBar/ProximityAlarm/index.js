import { useState, useEffect } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { AlarmContainer } from "./alarmContainer";

const ProximityAlarm = ({ destination }) => {
  const [alarmToggle, setAlarmToggle] = useState(false);
  const [alarm, setAlarm] = useState(false);
  const [location, setLocation] = useState({
    loaded: false,
    lat: "",
    lng: "",
  });
  const [openToggle, setOpenToggle] = useState(false);
  const [openReached, setOpenReached] = useState(false);

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: false,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  useEffect(() => {
    if (alarmToggle) {
      if (!alarm) {
        if (!("geolocation" in navigator)) {
          onError({
            code: 0,
            message: "Geolocation not supported",
          });
        }
        const id = setTimeout(
          () => navigator.geolocation.getCurrentPosition(onSuccess, onError),
          10000
        );

        console.log("Far from destination");
        if (location.loaded) {
          fetch(
            "http://localhost:5000" +
              "/proximityAlarm?" +
              "lat=" +
              location.lat +
              "&" +
              "lng=" +
              location.lng +
              "&" +
              "dest=" +
              destination
          )
            .then((response) => response.json())
            .then((data) => {
              if (data) {
                setAlarm(true);
                setOpenReached(true);
                clearTimeout(id);
              }
            });
        }
      } else {
        console.log("Arriving at destination");
      }
    }

    return () => {
      clearTimeout();
    };
  }, [destination, location, alarmToggle, alarm]);

  const handleClickOpenToggle = () => {
    setAlarmToggle(!alarmToggle);
    if (!alarmToggle) {
      setOpenToggle(true);
    }
  };

  const handleCloseToggle = () => {
    setOpenToggle(false);
  };

  const handleCloseReached = () => {
    setOpenReached(false);
  };

  return (
    <AlarmContainer>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={alarmToggle}
              onChange={handleClickOpenToggle}
              name="checkedB"
              color="primary"
            />
          }
          label="Alarm"
        />
        <Dialog
          open={openToggle}
          onClose={handleCloseToggle}
          aria-labelledby="Proximity Alarm toggle"
          aria-describedby="Proximity Alarm toggle"
        >
          <DialogTitle id="Proximity Alarm toggle">
            {"Proximity Alarm enabled!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="Proximity Alarm toggle">
              Sit back and relax, once you are close to {destination}, we will
              alert you.
              <br></br>
              <br></br>
              *Desktop users: Kindly allow location access.
              <br></br>
              *Mobile users: Please turn on your GPS.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseToggle} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openReached}
          onClose={handleCloseReached}
          aria-labelledby="Proximity Alarm destination"
          aria-describedby="Proximity Alarm destinatione"
        >
          <DialogTitle id="Proximity Alarm destination">
            {"You are close to your destination!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="Proximity Alarm destination">
              {destination} is on the horizon. Please alight at the next bus
              stop.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseReached} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </FormGroup>
    </AlarmContainer>
  );
};

export default ProximityAlarm;

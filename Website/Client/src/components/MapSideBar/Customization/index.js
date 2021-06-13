import {
  OptionsContainer,
  Item1,
  Item2,
  Item3,
  Options,
  Item4,
} from "./OptionsContainer";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const getDate = (str) => {
  if (str === null) {
    return null;
  } else {
    const map = {
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
      Sun: 0,
    };

    const month = {
      Jan: 1,
      Feb: 2,
      Mar: 3,
      Apr: 4,
      May: 5,
      Jun: 6,
      Jul: 7,
      Aug: 8,
      Sep: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12,
    };
    let result = [];
    result.push(
      parseInt(str.substring(16, 18)) * 100 + parseInt(str.substring(19, 21))
    );
    result.push(map[str.substring(0, 3)]);
    result.push(parseInt(str.substring(4).substring(4, 6)));
    result.push(month[str.substring(4, 7)]);
    result.push(parseInt(str.substring(11, 15)));
    //[time, day, date, month, year] format
    return result;
  }
};

const Customization = ({
  setTime,
  setArrivalTime,
  setDistance,
  setDifferentService,
  setBfs,
  isOpen,
  setIsOpen,
  setMonth,
  setYear,
  setDate,
  setDay,
}) => {
  const [anchorEl, setAnchorEl] = useState(() => null);
  const [btnName, setBtnName] = useState(() => "Depart Now");
  const [content, setContent] = useState(() => "true");
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const changeVar = (arr) => {
    setTime(arr[0]);
    setDay(arr[1]);
    setDate(arr[2]);
    setMonth(arr[3]);
    setYear(arr[4]);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const res = getDate(String(date));
    if (res !== null) {
      changeVar(res);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (name) => {
    if (name === btnName) {
      setAnchorEl(null);
    } else if (name === "Depart Now") {
      setAnchorEl(null);
      setBtnName(name);
      setIsOpen(false);
      setContent(true);
    } else {
      // name === depart later
      setAnchorEl(null);
      setBtnName(name);
      setIsOpen(true);
      setContent(false);
    }
  };
  const materialTheme = createMuiTheme({
    overrides: {
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: "#939990"
        },
      },
      MuiPickersCalendarHeader: {
        switchHeader: {
          backgroundColor: "white",
          color: "#1b5e20",
        },
      },
    },
  });

  const makeOpen = () => {
    if (!content && isOpen) {
      setContent(true);
    } else if (content && isOpen && btnName === "Depart Now") {
      setIsOpen(false);
    } else if (content && isOpen) {
      setContent(false);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <OptionsContainer style={isOpen ? { height: "25vh" } : { height: "10vh" }}>
      {content && isOpen ? (
        <h4
          style={{
            color: "#fff",
            position: "relative",
            top: "50px",
            left: "30px",
          }}
        >
          Route Options
        </h4>
      ) : (
        <div>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={handleClick}
            style={{
              width: "240px",
              position: "relative",
              top: "30px",
              left: '1.5vw'
            }}
          >
            {btnName}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => handleClose}
          >
            <MenuItem
              onClick={() => {
                const obj = new Date();
                const today = obj.getDay();
                let [hour, minute] = obj
                  .toLocaleTimeString("it-IT")
                  .split(/:| /);
                let [monthNow, dateNow, yearNow] = obj
                  .toLocaleDateString("en-US")
                  .split("/");
                setTime(hour + minute);
                setDay(today);
                setDate(dateNow);
                setMonth(monthNow);
                setYear(yearNow);
                handleClose("Depart Now");
              }}
            >
              Depart Now
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose("Depart Later");
              }}
            >
              Depart Later
            </MenuItem>
          </Menu>
        </div>
      )}

      {content && isOpen ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={makeOpen}
          style={{
            width: "100px",
            margin: "20px",
            position: "relative",
            left: "60%",
          }}
        >
          CLOSE
        </Button>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          onClick={makeOpen}
          style={{
            width: "100px",
            margin: "20px",
            position: "relative",
            bottom: "25px",
            left: "60%",
          }}
        >
          OPTIONS
        </Button>
      )}

      {content ? (
        isOpen ? (
          <Options action="/">
            <input
              type="checkbox"
              id="getArrivalTime"
              name="options"
              value="getArrivalTime"
              style={{ marginLeft: "20px" }}
            />
            <Item1 for="getArrivalTime">Include Arrival Time of Buses</Item1>
            <br />
            <input
              type="checkbox"
              id="getDistance"
              name="options"
              value="getDistance"
              style={{ marginLeft: "20px" }}
            />
            <Item2 for="getDistance">Include Distance Needed to Travel</Item2>{" "}
            <br />
            <input
              type="checkbox"
              id="getDifferentService"
              name="options"
              value="getDifferentService"
              style={{ marginLeft: "20px" }}
            />
            <Item3 for="getDifferentService">
              Include Different Service Available Per Bus Stop
            </Item3>
            <br />
            <input
              type="checkbox"
              id="getShortestBusStops"
              name="options"
              value="getShortestBusStops"
              style={{ marginLeft: "20px" }}
            />
            <Item4 for="">Include Route for Shortest Number of Bus Stops</Item4>
          </Options>
        ) : (
          ""
        )
      ) : isOpen ? (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={materialTheme}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="dd/MM/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                style={{
                  position: "relative",
                  right: "3.5vw",
                  bottom: "3vh",
                  background: "#fff",
                }}
              />

              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
                style={{
                  position: "relative",
                  right: "3.5vw",
                  bottom: "3vh",
                  background: "#fff",
                }}
              />
            </Grid>
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      ) : (
        ""
      )}
    </OptionsContainer>
  );
};

export default Customization;

import {
  OptionsContainer,
  Item1,
  Item2,
  Item3,
  Options,
  Item4,
  DepartureContainer,
  SectionContainer,
  RouteOptionsContainer
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
          backgroundColor: "#939990",
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
    <SectionContainer style={isOpen ? { height: "21vh" } : { height: "5vh" }}>
      {content && isOpen ? (
        <h4
          style={{
            color: "#fff",
            position: "absolute",
            top: "20%",
            left: "30px",
          }}
        >
          Route Options
        </h4>
      ) : (
        <DepartureContainer>
          <Button
            onClick={handleClick}
            aria-controls="simple-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
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
                setDate(parseInt(dateNow));
                setMonth(parseInt(monthNow));
                setYear(parseInt(yearNow));
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
        </DepartureContainer>
      )}

      {content && isOpen ? (
        <OptionsContainer>
          <Button variant="contained" color="secondary" onClick={makeOpen}>
            CLOSE
          </Button>
        </OptionsContainer>
      ) : (
        <OptionsContainer>
          <Button variant="contained" color="secondary" onClick={makeOpen}>
            OPTIONS
          </Button>
        </OptionsContainer>
      )}

      {content ? (
        isOpen ? (
          <RouteOptionsContainer>
            <Options action="/">
              <input
                type="checkbox"
                id="getArrivalTime"
                name="options"
                value="getArrivalTime"
              />
              <Item1 for="getArrivalTime">Include Arrival Time of Buses</Item1>
              <br />
              <input
                type="checkbox"
                id="getDistance"
                name="options"
                value="getDistance"
              />
              <Item2 for="getDistance">Include Distance Needed to Travel</Item2>{" "}
              <br />
              <input
                type="checkbox"
                id="getDifferentService"
                name="options"
                value="getDifferentService"
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
              />
              <Item4 for="">
                Include Route for Shortest Number of Bus Stops
              </Item4>
            </Options>
          </RouteOptionsContainer>
        ) : (
          ""
        )
      ) : isOpen ? (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={materialTheme}>
            <div
              style={{
                position: "absolute",
                top: "30%",
                width: "100%",
                right: ''
              }}
            >
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
                    background: "#fff",
                  }}
                />
              </Grid>
            </div>
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      ) : (
        ""
      )}
    </SectionContainer>
  );
};

export default Customization;

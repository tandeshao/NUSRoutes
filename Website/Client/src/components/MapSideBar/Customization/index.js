import {
  OptionsContainer,
  DepartureContainer,
  SectionContainer,
  OptionsContainer2,
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
import { useHistory } from "react-router-dom";
import map from "../../../data/map.json";
import data from "../../../data/vacation.json";

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
  isOpen,
  setIsOpen,
  setMonth,
  setYear,
  setDate,
  setDay,
  setIncludeArrivalTime,
  setSelectedRoute,
  current,
  destination,
}) => {
  const [anchorEl, setAnchorEl] = useState(() => null);
  const [btnName, setBtnName] = useState(() => "Depart Now");
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const history = useHistory();
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
    if (isOpen === false && name === "Depart Later") {
      setAnchorEl(null);
      setBtnName(name);
      setIsOpen((prev) => !prev);
    } else if (isOpen === true && name === "Depart Now") {
      setAnchorEl(null);
      setBtnName(name);
      setIsOpen((prev) => !prev);
    } else {
      setAnchorEl(null);
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

  return (
    <SectionContainer style={isOpen ? { height: "45%" } : { height: "7%" }}>
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
              let [hour, minute] = obj.toLocaleTimeString("it-IT").split(/:| /);
              let [monthNow, dateNow, yearNow] = obj
                .toLocaleDateString("en-US")
                .split("/");
              setTime(hour + minute);
              setDay(today);
              setDate(parseInt(dateNow));
              setMonth(parseInt(monthNow));
              setYear(parseInt(yearNow));
              handleClose("Depart Now");
              setIncludeArrivalTime(true);
              setSelectedRoute(null);
              const year = parseInt(yearNow);
              const month = parseInt(monthNow);
              const date = parseInt(dateNow);
              const day = today;
              const time = hour + minute;
              const category =
                data.reduce((x, y) => {
                  if (x !== null) {
                    return x;
                  } else if (y["duration-year"].includes(year)) {
                    if (
                      y["duration-month"][0] < month &&
                      month < y["duration-month"][1]
                    ) {
                      return "vacation";
                    } else if (
                      y["duration-month"][0] === month ||
                      month === y["duration-month"][1]
                    ) {
                      return y["duration-date"][0] <= date &&
                        date <= y["duration-date"][1]
                        ? "vacation"
                        : "term";
                    } else {
                      return "term";
                    }
                  } else {
                    return null;
                  }
                }, null) +
                (day === 0 ? "-sun/ph" : day === 6 ? "-sat" : "-weekdays");
              history.push(
                "/map/routeRecommedation?start=" +
                  encodeURIComponent(map[current]) +
                  "&end=" +
                  encodeURIComponent(map[destination]) +
                  "&time=" +
                  encodeURIComponent(time) +
                  "&date=" +
                  encodeURIComponent(category)
              );
            }}
          >
            Depart Now
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose("Depart Later");
              setIncludeArrivalTime(false);
              setSelectedRoute(null);
              setSelectedDate(new Date());
            }}
          >
            Depart Later
          </MenuItem>
        </Menu>
      </DepartureContainer>

      <OptionsContainer>
        <Button variant="contained" color="secondary">
          FIND NEAREST BUS STOPS
        </Button>
      </OptionsContainer>

      <OptionsContainer2>
        <Button variant="contained" color="secondary">
          STOPS NEAR ME
        </Button>
      </OptionsContainer2>

      {isOpen ? (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={materialTheme}>
            <div
              style={{
                position: "absolute",
                top: "30%",
                width: "100%",
                height: "100%",
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

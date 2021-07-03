import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  RouteContainer,
  ScrollBar,
  Effect,
  Container,
  ScrollBar2,
  Container2,
} from "./RouteElements";
import { Button } from "../../ButtonElement";
import map from "../../../data/reverseMap.json";
import startIcon from "../../../images/Picture2.png";
import endIcon from "../../../images/Picture3.png";
import { useEffect } from "react";

const findTransferredBuses = (route, selectedRoute) => {
  const transferredBuses = [];
  let prev = "";
  let start = 0;
  let end = 0;
  if (selectedRoute === null) {
    return transferredBuses;
  } else if (route.length === 2) {
    transferredBuses.push({
      start: 0,
      end: 1,
      service: route[1].substring(route[1].indexOf("_") + 1, route[1].length),
    });
  } else {
    for (let i = 1; i < route.length; i++) {
      const busStop = route[i];
      const service = busStop.substring(
        busStop.indexOf("_") + 1,
        busStop.length
      );

      if (i === 1) {
        prev = service;
      } else if (service !== prev && i === route.length - 1) {
        transferredBuses.push({ start: start, end: end, service: prev });
        transferredBuses.push({ start: end, end: i, service: service });
      } else if (service !== prev) {
        transferredBuses.push({ start: start, end: end, service: prev });
        start = end;
        prev = service;
      } else if (i === route.length - 1) {
        transferredBuses.push({ start: start, end: end + 1, service: prev });
      }

      end = i;
    }
  }

  return transferredBuses;
};

const Routes = ({
  isOpen,
  setRoute,
  routeRecommendations,
  route,
  selectedRoute,
  setSelectedRoute,
  transferredBuses,
  setTransferredBuses,
  busArrivalTime,
  setBusArrivalTime,
  includeArrivalTime,
}) => {
  const units = ["hrs", "hrs", "", "mins", "metres", ""];
  const { REACT_APP_DOMAIN } = process.env;
  useEffect(() => {
    transferredBuses.forEach((obj) => {
      const busStop = route[obj.start].substring(
        0,
        route[obj.start].indexOf("_")
      );
      const busService = obj.service;
      const checkBusService =
        busStop === "COM2" && busService === "D1"
          ? route[obj.start + 1] === "LT13-OPP"
            ? encodeURIComponent("D1(To UTown)")
            : encodeURIComponent("D1(To BIZ2)")
          : busStop === "UTown" && busService === "C"
          ? route[obj.start + 1] === "RAFFLES"
            ? encodeURIComponent("C(To KRT)")
            : encodeURIComponent("C(To FOS)")
          : encodeURIComponent(busService);
      fetch(
        `${REACT_APP_DOMAIN}` +
          "/api/" +
          "getArrivalTime" +
          "?" +
          "busStop=" +
          busStop +
          "&" +
          "busService=" +
          checkBusService
      )
        .then((response) => response.json())
        .then((data) => {
          setBusArrivalTime((arr) => {
            if (arr.length < transferredBuses.length) {
              return arr.concat([data]);
            } else {
              return [];
            }
          });
        })
        .catch(console.log);
    });
  }, [transferredBuses, REACT_APP_DOMAIN, route, setBusArrivalTime]);

  return (
    <div
      style={{
        height: isOpen ? "100%" : "100%",
      }}
    >
      {selectedRoute === null ? (
        <ScrollBar isOpen={isOpen}>
          {routeRecommendations[0]["Cost"] !== -1 ? (
            <TransitionGroup component={Effect}>
              {routeRecommendations.map((route, index) => {
                return (
                  <CSSTransition
                    key={index + 100}
                    in={true}
                    appear={true}
                    timeout={500}
                    classNames="fade"
                    unmountOnExit
                  >
                    <RouteContainer
                      key={index + 200}
                      onClick={() => {
                        setRoute(route["Path"]);
                        setSelectedRoute(index);
                        setTransferredBuses(
                          findTransferredBuses(route["Path"], index)
                        );
                      }}
                    >
                      {Object.keys(route).map(
                        (str, index) =>
                          str !== "Path" && str !== "Cost" && (
                            <p key={index + 300}>
                              {str + ": " + route[str] + " " + units[index]}
                            </p>
                          )
                      )}
                    </RouteContainer>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          ) : (
            <TransitionGroup component={Effect}>
              <CSSTransition
                in={true}
                appear={true}
                timeout={500}
                classNames="fade"
                unmountOnExit
              >
                <RouteContainer>
                  <p> {routeRecommendations[0]["String"]}</p>
                </RouteContainer>
              </CSSTransition>
            </TransitionGroup>
          )}
        </ScrollBar>
      ) : (
        <ScrollBar2 isOpen={isOpen}>
          <TransitionGroup component={Effect}>
            <CSSTransition
              in={true}
              appear={true}
              timeout={500}
              classNames="fade"
              unmountOnExit
            >
              <Container>
                {Object.keys(routeRecommendations[selectedRoute]).map(
                  (str, index) => {
                    return (
                      str !== "Path" && str !== "Cost" && (
                        <p key={index + 400}>
                          {str +
                            ": " +
                            routeRecommendations[selectedRoute][str] +
                            " " +
                            units[index]}
                        </p>
                      )
                    );
                  }
                )}
              </Container>
            </CSSTransition>
          </TransitionGroup>
          <TransitionGroup component={Effect}>
            <CSSTransition
              in={true}
              appear={true}
              timeout={500}
              classNames="fade"
              unmountOnExit
            >
              <Container2>
                Start from {map[route[0].substring(0, route[0].indexOf("_"))]}.{" "}
                <img
                  src={startIcon}
                  alt=""
                  style={{
                    display: "inline",
                    float: "right",
                    width: "30px",
                    height: "30px",
                  }}
                />
              </Container2>
            </CSSTransition>
          </TransitionGroup>

          <TransitionGroup component={Effect}>
            {transferredBuses.map((x, index) => {
              return (
                <CSSTransition
                  key={index + 500}
                  in={true}
                  appear={true}
                  timeout={500}
                  classNames="fade"
                  unmountOnExit
                >
                  <Container2 key={index + 500}>
                    Take {x.service} from{" "}
                    {
                      map[
                        route[x.start].substring(0, route[x.start].indexOf("_"))
                      ]
                    }{" "}
                    to{" "}
                    {map[route[x.end].substring(0, route[x.end].indexOf("_"))]}.{" "}
                    <br />
                    {includeArrivalTime ? <br /> : ""}
                    {includeArrivalTime ? "Bus Arrival Time: " : ""}
                    {includeArrivalTime
                      ? busArrivalTime[index] === undefined
                        ? "loading.."
                        : busArrivalTime[index][0] === "-"
                        ? "-"
                        : busArrivalTime[index][0] + " mins"
                      : ""}
                    {includeArrivalTime ? <br /> : " "}
                    {includeArrivalTime ? "Next Bus Arrival Time: " : ""}
                    {includeArrivalTime
                      ? busArrivalTime[index] === undefined
                        ? "loading.."
                        : busArrivalTime[index][1] === "-"
                        ? "-"
                        : +busArrivalTime[index][1] + " mins"
                      : ""}
                    {includeArrivalTime ? <br /> : ""} <br />
                    Path: <br />
                    {route
                      .map((y) => map[y.substring(0, y.indexOf("_"))])
                      .slice(x.start, x.end + 1)
                      .join(" >> ")}
                    .
                  </Container2>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
          <TransitionGroup component={Effect}>
            <CSSTransition
              in={true}
              appear={true}
              timeout={500}
              classNames="fade"
              unmountOnExit
            >
              <Container2>
                {
                  map[
                    route[route.length - 1].substring(
                      0,
                      route[route.length - 1].indexOf("_")
                    )
                  ]
                }{" "}
                reached.
                <img
                  src={endIcon}
                  alt=""
                  style={{
                    display: "inline",
                    float: "right",
                    width: "20px",
                    height: "35px",
                  }}
                />
              </Container2>
            </CSSTransition>
          </TransitionGroup>
          <TransitionGroup component={Effect}>
            <CSSTransition
              in={true}
              appear={true}
              timeout={500}
              classNames="fade"
              unmountOnExit
            >
              <Button
                primary="false"
                dark="true"
                onClick={() => {
                  setSelectedRoute(null);
                  setBusArrivalTime([]);
                  setTransferredBuses([]);
                }}
                style={{ width: "100%" }}
              >
                Go Back to Route Search
              </Button>
            </CSSTransition>
          </TransitionGroup>
        </ScrollBar2>
      )}
    </div>
  );
};

export default Routes;

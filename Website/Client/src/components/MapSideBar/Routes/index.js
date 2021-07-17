import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  RouteContainer,
  ScrollBar,
  Effect,
  Container,
  ScrollBar2,
  Container2,
  Arrow,
  Notifier,
} from "./RouteElements";
import map from "../../../data/reverseMap.json";
import startIcon from "../../../images/Picture2.png";
import endIcon from "../../../images/Picture3.png";
import { useEffect } from "react";
// import { BiRefresh } from "react-icons/bi";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import useWindowDimensions from "../../../useWindowDimensions";

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
  renderRouteIndex,
  setRenderRouteIndex,
}) => {
  const { height, width } = useWindowDimensions();
  const units = ["hrs", "hrs", "", "mins", "", ""];
  const { REACT_APP_DOMAIN } = process.env;
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      console.log("fetch called");
      transferredBuses.forEach((obj) => {
        if (route[obj.start]) {
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
        }
      });
    }, 10000);
    return () => clearTimeout(timeoutID);
      
  
  }, [transferredBuses, REACT_APP_DOMAIN, route, setBusArrivalTime, busArrivalTime]);

  return (
    <div
      style={{
        height: "100%",
      }}
    >
      {selectedRoute === null ? (
        <ScrollBar>
          {routeRecommendations[0]["Cost"] !== -1 ? (
            <TransitionGroup component={Effect}>
              <CSSTransition
                in={true}
                appear={true}
                timeout={500}
                classNames="fade"
                unmountOnExit
              >
                {
                  <h4
                    style={{
                      color: "#b3b3b3",
                      margin: "10px 0 20px 20px",
                      fontSize: "15px",
                    }}
                  >
                    Route Recommendations
                  </h4>
                }
              </CSSTransition>

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
                        setRenderRouteIndex(index);
                      }}
                    >
                      {renderRouteIndex === index && (
                        <Notifier>Rendered</Notifier>
                      )}
                      {Object.keys(route).map(
                        (str, index) =>
                          str !== "Path" &&
                          str !== "Cost" &&
                          str !== "Distance" && (
                            <p key={index + 300} style={{ marginTop: "2px" }}>
                              {str + ": " + route[str] + " " + units[index]}
                            </p>
                          )
                      )}
                      {routeRecommendations[0]["Cost"] && (
                        <Arrow>
                          <MdKeyboardArrowRight size={70} />
                        </Arrow>
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
        <ScrollBar2>
          <TransitionGroup component={Effect}>
            <CSSTransition
              in={true}
              appear={true}
              timeout={500}
              classNames="fade"
              unmountOnExit
            >
              <div
                style={{
                  display: "flex",
                  margin: "10px 0 20px 20px",
                  color: "#b3b3b3",
                  cursor: "pointer",
                  fontSize: "15px",
                }}
                onClick={() => {
                  setSelectedRoute(null);
                  setBusArrivalTime([]);
                  setTransferredBuses([]);
                }}
              >
                {" "}
                <MdKeyboardArrowLeft size={22} />
                <h4>Route Information</h4>
              </div>
            </CSSTransition>

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
                      str !== "Path" &&
                      str !== "Cost" &&
                      str !== "Distance" && (
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
                Start from{" "}
                {route[0] && map[route[0].substring(0, route[0].indexOf("_"))]}.{" "}
                <img
                  src={startIcon}
                  alt=""
                  style={
                    width <= 450 && height < 900
                      ? {
                          display: "inline",
                          width: "20px",
                          float: "right",
                          marginRight: "5%",
                          height: "20px",
                        }
                      : {
                          display: "inline",
                          width: "30px",
                          float: "right",
                          height: "35px",
                        }
                  }
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
                    {route[x.start] &&
                      map[
                        route[x.start].substring(0, route[x.start].indexOf("_"))
                      ]}{" "}
                    to{" "}
                    {route[x.end] &&
                      map[route[x.end].substring(0, route[x.end].indexOf("_"))]}
                    . <br />
                    {includeArrivalTime ? <br /> : ""}
                    {/* {includeArrivalTime ? (
                      <strong style={{ cursor: "pointer" }}> Refresh </strong>
                    ) : (
                      ""
                    )}
                    {includeArrivalTime ? (
                      <BiRefresh style={{ cursor: "pointer" }} />
                    ) : (
                      ""
                    )} */}
                    {includeArrivalTime ? <br /> : ""}
                    {includeArrivalTime ? "Bus Arrival Time: " : ""}
                    {includeArrivalTime
                      ? busArrivalTime[index] === undefined
                        ? "loading.."
                        : busArrivalTime[index][0] === "-"
                        ? "-"
                        : busArrivalTime[index][0] !== "Arr"
                        ? busArrivalTime[index][0] + " mins"
                        : busArrivalTime[index][0]
                      : ""}
                    {includeArrivalTime ? <br /> : " "}
                    {includeArrivalTime ? "Next Bus Arrival Time: " : ""}
                    {includeArrivalTime
                      ? busArrivalTime[index] === undefined
                        ? "loading.."
                        : busArrivalTime[index][1] === "-"
                        ? "-"
                        : busArrivalTime[index][1] !== "Arr"
                        ? busArrivalTime[index][1] + " mins"
                        : busArrivalTime[index][1]
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
                {route[route.length - 1] &&
                  map[
                    route[route.length - 1].substring(
                      0,
                      route[route.length - 1].indexOf("_")
                    )
                  ]}{" "}
                reached.
                <img
                  src={endIcon}
                  alt=""
                  style={
                    width <= 450 && height < 900
                      ? {
                          display: "inline",
                          width: "15px",
                          float: "right",
                          marginRight: "7%",
                          height: "20px",
                        }
                      : {
                          display: "inline",
                          width: "20px",
                          float: "right",
                          height: "35px",
                        }
                  }
                />
              </Container2>
            </CSSTransition>
          </TransitionGroup>
        </ScrollBar2>
      )}
    </div>
  );
};

export default Routes;

import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useState } from "react";
import { RouteContainer, ScrollBar, Effect, Container, ScrollBar2 } from "./RouteElements";

const Routes = ({ isOpen, setRoute, routeRecommendations }) => {
  const [selectedRoute, setSelectedRoute] = useState(() => null);
  const units = ["hrs", "hrs", "", "mins", "metres", ""];

  console.log(routeRecommendations);
  console.log(selectedRoute);
  return (
    <div
      style={{
        height: isOpen ? "40.4vh" : "55.4vh",
      }}
    >
      {selectedRoute === null ? (
        <ScrollBar isOpen={isOpen}>
          {routeRecommendations[0]["Cost"] !== -1 ? (
            <TransitionGroup component={Effect}>
              {routeRecommendations.map((route, index) => {
                return (
                  <CSSTransition
                    key={index}
                    in={true}
                    appear={true}
                    timeout={500}
                    classNames="fade"
                    unmountOnExit
                  >
                    <RouteContainer
                      key={index}
                      onClick={() => {
                        setRoute(route["Path"]);
                        setSelectedRoute(index);
                      }}
                    >
                      {Object.keys(route).map(
                        (str, index) =>
                          str !== "Path" && (
                            <p>
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
                key={1}
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
          <Container>
            {Object.keys(routeRecommendations[selectedRoute]).map(
              (str, index) => {
                return (
                  str !== "Path" && (
                    <p>
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
          <div style={{background: 'grey', height: '20vh', width: '17.7vw', margin: '0'}}> </div>
            <div
              style={{
                position: "absolute",
                borderRight: "7px solid aquamarine",
                height: "100px",
                top: '68vh',
                left: '5vw',
                paddingRight: '10px'
              }}
            >test <br/> test</div>
        </ScrollBar2>
      )}
    </div>
  );
};

export default Routes;

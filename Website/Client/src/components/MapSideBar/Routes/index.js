import { useEffect } from "react";

const Routes = ({ isOpen, setRoute, routeRecommendations }) => {
  return (
    <div
      style={
        isOpen
          ? { background: "#8a8a8a", height: "40vh" }
          : { background: "#8a8a8a", height: "55vh" }
      }
    >
      {routeRecommendations.map((route, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              setRoute(route["path"]);
            }}
            style={{ cursor: "pointer" }}
          >           
            {String(route["path"])}
          </div>
        );
      })}
    </div>
  );
};

export default Routes;

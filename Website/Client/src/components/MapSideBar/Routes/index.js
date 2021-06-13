const Routes = ({ isOpen, setRoute, routeRecommendations }) => {
  return (
    <div
      style={{
        height: isOpen ? "40vh" : "55vh",
      }}
    >
      {routeRecommendations.map((route, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              setRoute(route["path"]);
            }}
            style={{
              padding: "20px",
              cursor: "pointer",
              color: "#fff",
              maxWidth: "20vw"
            }}
          >
            {String(route["path"]).split(",").map(str => <p> {str}</p>)}
          </div>
        );
      })}
    </div>
  );
};

export default Routes;

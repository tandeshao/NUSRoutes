const Routes = ({ isOpen, setRoute, routeRecommendations }) => {
  return (
    <div
      style={
        isOpen
          ? { background: "black", height: "40vh" }
          : { background: "black", height: "55vh" }
      }
    >
      {routeRecommendations.map((route, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              setRoute(route["path"]);
            }}
            style={{ padding: '20px', cursor: "pointer", color: '#fff'}}
          >           
            {String(route["path"])}
          </div>
        );
      })}
    </div>
  );
};

export default Routes;

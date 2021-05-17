import { useState } from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [current, setCurrent] = useState("here");
  const [destination, setDestination] = useState("there");
  const history = useHistory();

  const handleSubmit = (e) => {
    //prevents page refreshing
    e.preventDefault();
    const routing = { current, destination };

    // do something, print for now
    console.log(routing);

    // redirect
    history.push("/");
  };

  return (
    <div className="home">
      <h2>Where to</h2>
      <form onSubmit={handleSubmit}>
        <label>Current location: </label>
        <select
          name="Current"
          id="Current"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
        >
          <option value="here">here</option>
          <option value="HERE">HERE</option>
        </select>
        <label> Destination: </label>
        <select
          name="Destination"
          id="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        >
          <option value="there">there</option>
          <option value="THERE">THERE</option>
        </select>
        <button>Go</button>
      </form>
    </div>
  );
};

export default Home;

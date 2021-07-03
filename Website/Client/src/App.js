import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/index";
import SigninPage from "./pages/signin";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Map from "./pages/Map";
import dotenv from 'dotenv';

function App() {
  dotenv.config();
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={SigninPage} />
        <Route exact path="/profile" component={Profile} />
        <Route path="/map/:string" component={Map} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;

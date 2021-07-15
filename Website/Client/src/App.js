import "./App.css";
import { Switch, Route, useLocation } from "react-router-dom";
import Home from "./pages/index";
import SigninPage from "./pages/signin";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Map from "./pages/Map";
import dotenv from "dotenv";
import { AnimatePresence } from "framer-motion";


function App() {
  dotenv.config();
  const location = useLocation();
  return (
    <>
      <AnimatePresence exitBeforeEnter>    
          <Switch location={location} key={location.pathname}>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={SigninPage} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/map/:string" component={Map} />
            <Route path="*" component={NotFound} />
          </Switch>
      </AnimatePresence>
    </>
  );
}

export default App;

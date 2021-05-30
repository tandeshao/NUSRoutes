import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SigninPage from "./pages/signin";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SigninPage} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;

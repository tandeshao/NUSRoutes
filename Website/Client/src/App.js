import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SigninPage from "./pages/signin";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={SigninPage} exact />
      </Switch>
    </Router>
  );
}

export default App;

import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/Layouts/NavBar";
import Home from "./Components/Pages/Home";
import About from "./Components/Pages/About";
import ContactState from "./Components/Contexts/Contact/ContactState";
import AuthState from "./Components/Contexts/Auth/AuthState";
import AlertState from "./Components/Contexts/Alert/AlertState";
import { Register } from "./Components/Auth/Register";
import { Login } from "./Components/Auth/Login";
import { Alerts } from "./Components/Layouts/Alerts";
import setAuthToken from "./Components/Utils/setAuthToken";
import { PrivateRoute } from "./Components/Routing/PrivateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <NavBar />
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;

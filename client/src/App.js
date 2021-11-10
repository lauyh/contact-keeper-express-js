import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import NavBar from "./Components/Layouts/NavBar"
import Home from "./Components/Pages/Home";
import About from "./Components/Pages/About";
import ContactState from "./Components/Contexts/Contact/ContactState";


const App = () => {
  return (
    <ContactState>
      <Router>
        <Fragment>
          <NavBar/> 
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/about" component={About}/>
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ContactState>
  );
}

export default App;

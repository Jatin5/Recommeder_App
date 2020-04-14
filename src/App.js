import React from "react";
import "./App.css";
import SideBar from "./components/sidebar";
import Emi_Calculator from "./components/emi_calculator";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home";
import Quote from "./components/screener/quote";

function App() {
  return (
    <Router>
      <div className="row" style={{ minHeight: "100vh" }}>
        <div className="col-3 pr-0">
          <SideBar />
        </div>
        <div className="col-9 pl-0">
          <Switch>
            <Route path="/emi" exact component={Emi_Calculator} />
            <Route path="/screener" exact component={Quote} />
            <Route path="/home" exact component={Home} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

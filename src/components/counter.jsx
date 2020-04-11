import React, { Component } from "react";
import Form from "./form";

class Counter extends Component {
  state = {
    count: 0,
  };

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg bg-primary mb-4">
          <button className="btn bg-light">Home</button>
        </nav>
        <div className="col-12">
          <h5>EMI Calculator</h5>
          <Form />
        </div>
      </React.Fragment>
    );
  }
}

export default Counter;

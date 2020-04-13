import React, { Component } from "react";
import Form from "./form";

class Emi_Calculator extends Component {
  state = {
    count: 0,
  };

  render() {
    return (
      <React.Fragment>
        {/* <nav className="navbar navbar-expand-lg bg-light mb-4">
          <button className="btn bg-light">Home</button>
        </nav> */}
        <React.Fragment>
          <div className="jumbotron">EMI Calculator</div>
          <div className="col-12">
            <Form />
          </div>
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default Emi_Calculator;

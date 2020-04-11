import React, { Component } from "react";
import AmmortizationSchedule from "./ammSchedule";

class Form extends Component {
  state = {
    value: "Name",
    principal: 100000,
    rate: 10,
    months: 120,
    emi: 0,
    yrs: 10,
    interest: 0,
    amt: 10,
    totalPayment: 100,
    monthlyValues: [],
  };

  getInterest = (principal_left, rate) => {
    return principal_left * (rate / 12) * 0.01;
  };

  formatDecimal = (num) => {
    const n = Math.floor(num * 100) / 100;
    return parseFloat(n.toFixed(2));
  };

  getEmi() {
    const amt1 =
      this.state.principal *
      ((this.state.rate * 0.01) / 12) *
      (Math.pow(1 + (this.state.rate * 0.01) / 12, this.state.yrs * 12) /
        (Math.pow(1 + (this.state.rate * 0.01) / 12, this.state.yrs * 12) - 1));
    this.setState({
      amt: amt1,
    });
  }

  setMonthlyValues = async () => {
    await this.getEmi();
    const monthlyValues = [];
    const value = {};
    value.month = 0;
    value.emi = 0;
    value.interest = 0;
    value.principal_payment = 0;
    value.principal_left = this.formatDecimal(this.state.principal);
    value.totalInterest = 0;
    monthlyValues.push(value);
    for (let i = 1; i < this.state.yrs * 12; i++) {
      const val = {};
      val.month = i;
      val.emi = this.formatDecimal(this.state.amt);
      val.interest = this.formatDecimal(
        this.getInterest(monthlyValues[i - 1].principal_left, this.state.rate)
      );
      val.principal_payment = this.formatDecimal(this.state.amt - val.interest);
      val.principal_left = this.formatDecimal(
        monthlyValues[i - 1].principal_left - val.principal_payment
      );
      val.totalInterest = monthlyValues[i - 1].totalInterest + val.interest;
      monthlyValues.push(val);
    }
    const final_val = {};
    final_val.month = this.state.yrs * 12;
    final_val.emi = this.formatDecimal(this.state.amt);
    final_val.interest = this.formatDecimal(
      this.getInterest(
        monthlyValues[final_val.month - 1].principal_left,
        this.state.rate
      )
    );
    final_val.principal_payment = this.formatDecimal(
      monthlyValues[final_val.month - 1].principal_left
    );
    final_val.principal_left = 0;
    final_val.totalInterest =
      monthlyValues[final_val.month - 1].totalInterest + final_val.interest;
    monthlyValues.push(final_val);
    this.setState({
      monthlyValues: monthlyValues,
      months: this.state.yrs * 12,
      totalPayment:
        parseFloat(this.state.principal) + parseFloat(final_val.totalInterest),
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = () => {
    this.setMonthlyValues();
  };

  cardStyle = (col) => {
    return {
      background: col,
      justifyContent: "center",
      width: "40%",
    };
  };

  contentStyle = {
    textAlign: "center",
    color: "white",
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-6">
            <form className="form-horizontal">
              <div class="form-group">
                <label for="principal">
                  <b>Loan Amount</b>
                </label>
                <input
                  onChange={this.handleChange}
                  type="float"
                  className="form-control mb-2"
                  name="principal"
                  id="principal"
                  placeholder="Enter Loan Amount"
                  value={this.state.principal}
                />
                <label for="yrs">
                  <b>Years</b>
                </label>
                <input
                  onChange={this.handleChange}
                  type="int"
                  className="form-control mb-2"
                  name="yrs"
                  id="yrs"
                  placeholder="Enter Years"
                  value={this.state.yrs}
                />
                <label for="rate">
                  <b>Interest Rate</b>
                </label>
                <input
                  onChange={this.handleChange}
                  type="float"
                  className="form-control mb-2"
                  name="rate"
                  id="rate"
                  placeholder="Enter Rate"
                  value={this.state.rate}
                />
              </div>
            </form>
            <button className="btn-md" onClick={this.handleSubmit}>
              Show Schedule
            </button>
          </div>
          {this.state.monthlyValues.length !== 0 && (
            <div className="col-6">
              <div
                style={{ height: "100%", justifyContent: "center" }}
                className="d-flex flex-wrap"
              >
                <div style={this.cardStyle("#3264a4")} className="card m-2">
                  <h5 style={this.contentStyle}>
                    Total Payment: {this.formatDecimal(this.state.totalPayment)}
                  </h5>
                </div>
                <div style={this.cardStyle("#003e8e")} className="card m-2">
                  <h5 style={this.contentStyle}>
                    Total Interest:{" "}
                    {this.formatDecimal(
                      this.state.monthlyValues[this.state.months].totalInterest
                    )}
                  </h5>
                </div>
                <div style={this.cardStyle("#003171")} className="card m-2">
                  <h5 style={this.contentStyle}>
                    {this.formatDecimal(this.state.amt)} per month
                  </h5>
                </div>
                <div style={this.cardStyle("#002554")} className="card m-2">
                  <h5 style={this.contentStyle}>
                    {this.formatDecimal(this.state.months)} months
                  </h5>
                </div>
              </div>
            </div>
          )}
        </div>
        <hr />
        {this.state.monthlyValues.length !== 0 && (
          <div style={{ overflow: "hidden" }}>
            <AmmortizationSchedule monthlyValues={this.state.monthlyValues} />
          </div>
        )}
      </div>
    );
  }
}

export default Form;

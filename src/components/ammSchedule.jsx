import React, { Component } from "react";

class AmmortizationSchedule extends Component {
  state = {};
  render() {
    const { monthlyValues } = this.props;
    return (
      <div style={{ overflowY: "scroll", maxHeight: 400 }}>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Month</th>
              <th>EMI</th>
              <th>Prinicpal Payment</th>
              <th>Interest</th>
              <th>Principal Left</th>
            </tr>
          </thead>
          <tbody>
            {monthlyValues.map((value) => {
              return (
                <tr key={value.principal_left}>
                  <td>{value.month}</td>
                  <td>{value.emi}</td>
                  <td>{value.principal_payment}</td>
                  <td>{value.interest}</td>
                  <td>{value.principal_left}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AmmortizationSchedule;

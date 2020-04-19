import React, { Component } from "react";
import { Link } from "react-router-dom";

class SideBar extends Component {
  state = {};

  renderSidebar = () => {
    return (
      <div className="sidebar">
        <div className="sidebar-title">Recco App</div>
        <Link to="/">
          <div className="sidebar-link">Home</div>
        </Link>
        <Link to="/screener">
          <div className="sidebar-link">Screener</div>
        </Link>
        <Link to="/emi">
          <div className="sidebar-link">EMI Calculator</div>
        </Link>
      </div>
    );
  };

  render() {
    return <div className="sidebar-container">{this.renderSidebar()}</div>;
  }
}

export default SideBar;

import React, { Component } from "react";
import _ from "lodash";
import data from "../../resources/security_codes.json";
import Autocomplete from "../autocomplete";
import { connect } from "react-redux";

class Quote extends Component {
  state = {
    quote: {},
    value: "",
  };

  getSecurity = (code) => {
    //const sec = data;
    const url =
      "https://api.bseindia.com/BseIndiaAPI/api/ComHeader/w?quotetype=EQ&scripcode=" +
      code +
      "&seriesid=";
    fetch(url)
      .then((Response) => Response.json())
      .then((res) => {
        console.log(res);
        this.setState({
          quote: res,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const sec = data;
    const final = _.find(sec, ["Security Name", this.props.favourites[0]]);
    this.props.favourites.length !== 0 &&
      this.getSecurity(final["Security Code"]);
    const all_securities = sec.map((security) => {
      return security["Security Name"];
    });
    const {
      SecurityId,
      Grp_Index,
      FaceVal,
      SecurityCode,
      Industry,
      Group,
      Index,
      EPS,
      CEPS,
      PE,
      OPM,
      NPM,
      PB,
      ROE,
    } = this.state.quote;
    return (
      <React.Fragment>
        <div className="titleBar col-12">Stock Screener</div>
        <div className="col-12">
          <div className="row col-12">
            <Autocomplete suggestions={all_securities} />
          </div>
          {this.props.favourites.length !== 0 && (
            <div className="col-12">
              <p>Security ID -{SecurityId}</p>
              <p>Group Index -{Grp_Index}</p>
              <p>Face Value -{FaceVal}</p>
              <p>Security Code -{SecurityCode}</p>
              <p>Industry -{Industry}</p>
              <p>Group -{Group}</p>
              <p>Index -{Index}</p>
              <p>EPS -{EPS}</p>
              <p>CEPS -{CEPS}</p>
              <p>PE -{PE}</p>
              <p>OPM -{OPM}</p>
              <p>NPM -{NPM}</p>
              <p>PB -{PB}</p>
              <p>ROE -{ROE}</p>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  favourites: state.itemActions.favourites,
});

export default connect(mapStateToProps, {})(Quote);

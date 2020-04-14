import React, { Component } from "react";

class Quote extends Component {
  state = {
    quote: {},
  };

  componentDidMount() {
    fetch(
      "https://api.bseindia.com/BseIndiaAPI/api/ComHeader/w?quotetype=EQ&scripcode=500820&seriesid="
    )
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
  }

  render() {
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
    );
  }
}

export default Quote;

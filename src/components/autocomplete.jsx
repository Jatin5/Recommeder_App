import React, { Component } from "react";
import { connect } from "react-redux";
import { markFavourite } from "../actions";

class Autocomplete extends Component {
  static defaultProperty = {
    suggestions: [],
  };
  state = {
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: "",
  };
  updateFavourites = (name) => {
    return this.props.markFavourite(name);
  };
  onKeyDown = (e) => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion],
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };
  onClick = (e) => {
    this.updateFavourites(e.currentTarget.innerText);
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
    });
  };
  onChange = (e) => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value,
    });
  };
  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: { filteredSuggestions, showSuggestions, userInput },
    } = this;
    let suggestionsListComponent;
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              return (
                <li key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions!</em>
          </div>
        );
      }
    }
    return (
      <React.Fragment>
        <label for="stock">
          <b>Select Stock - </b>
        </label>
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          className="form-control mb-2"
          name="stock"
          id="stock"
        />
        {suggestionsListComponent}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  favourites: state.itemActions.favourites,
});

export default connect(mapStateToProps, { markFavourite })(Autocomplete);

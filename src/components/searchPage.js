import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: "",
    };
    this.textInput = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      textInput: event.target.value
    });
  }

  handleSubmit(event, searchInput) {
    event.preventDefault();
    searchInput = this.state.textInput;
    console.log(searchInput);
    return searchInput;
  }

  render() {
    return (
      <div>
        <div className="header"></div>
        <h1>Find Your destination</h1>
        <label>
          Destination
          <input
            name="location"
            onChange={this.handleChange}
            type="text"
            placeholder="Search"
            id="searchButton"
          />
        </label>
        <button onClick={this.handleSubmit}>Search</button>
        <div className="footer"></div>
      </div>
    );
  }
}

export default Search;

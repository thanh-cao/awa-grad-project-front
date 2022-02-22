import React from 'react';
import {Button, Form} from 'react-bootstrap';
import Map from './Map'
// import PeopleFeed from './PeopleFeed';

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
      <div className="m-5">
        <h1>Where are you going?</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="d-flex">
            <Form.Control
              name="location"
              onChange={this.handleChange}
              type="text"
              placeholder="Destination"
              id="searchButton"
            />
            <Button variant="primary" type="submit" className="mx-2">GO</Button>
          </Form.Group>
        </Form>
        {/* <PeopleFeed /> */}
      </div>
    );
  }
}

export default Search;

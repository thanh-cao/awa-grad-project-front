import React from 'react';
import {Button, Form} from 'react-bootstrap';
import Map from './Map'
import PeopleFeed from './PeopleFeed';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: "",
      search: ''
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

  handleSubmit(e) {
    e.preventDefault();
    const textInput = this.state.textInput
    const search = textInput.charAt(0).toUpperCase() + textInput.slice(1);
    console.log('Search:', search)
    
    this.setState({
      search
    })
  }

  render() {
    return (
      <div className="m-5">
        <h2>Where are you going?</h2>
        <Form onSubmit={(e) => this.handleSubmit(e)} className="mb-5">
          <Form.Group className="d-flex">
            <Form.Control
              name="location"
              onChange={this.handleChange}
              type="text"
              placeholder="Destination"
              id="searchButton"
            />
            <Button variant="primary" type="submit">GO</Button>
          </Form.Group>
        </Form>
        <h3></h3>
        <PeopleFeed search={this.state.search}/>
        
      </div>
    );
  }
}

export default Search;

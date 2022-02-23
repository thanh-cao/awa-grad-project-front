import React from 'react';
import {Button, Form} from 'react-bootstrap';
import Map from './Map2';
import EventFeed2 from './EventFeed2';
import PeopleFeed from './PeopleFeed';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: "",
      search: '',
      view: 'people'
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
    const search = this.state.textInput.toLowerCase();
    
    this.setState({
      search
    })
  }

  handleView(view){
    this.setState({view})
  }

  render() {
    const {search, view} = this.state;


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
        <h3>{search.charAt(0).toUpperCase() + search.slice(1)}</h3>
        <div className="menu-items">
          <h5 onClick={() => this.handleView('people')}>People</h5>
          <h5 onClick={() => this.handleView('events')}>Events</h5>
        </div>
        {view === 'people' ? <PeopleFeed search={this.state.search}/> :
        <EventFeed2 search={search}/>}
      </div>
    );
  }
}

export default Search;

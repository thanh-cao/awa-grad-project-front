import React from 'react';
import {Button, Form} from 'react-bootstrap';
// import Map from './Map2';
import EventFeed2 from './EventFeed2';
import PeopleFeed from './PeopleFeed';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: "",
      search: '',
      date: new Date().toISOString().slice(0, 10), 
      view: 'people'
    };

    this.textInput = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, field) {
    console.log(field)
    console.log(e.target.value)
    this.setState({
      [field]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const search = this.state.destination.toLowerCase();
    
    this.setState({
      search,

    })
  }

  handleView(view){
    this.setState({view})
  }

  render() {
    const {search, date, view} = this.state;

    return (
      <div className="m-4">
        <h2>Where are you going?</h2>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Group className="d-flex">
            <Form.Control
              name="location"
              onChange={(e) => this.handleChange(e, 'destination')}
              type="text"
              placeholder="Destination"
              id="searchButton"
            />
            <Form.Control 
            type="date" 
            onChange={(e)=> this.handleChange(e, 'date')}/>
            <Button variant="primary" type="submit">GO</Button>
          </Form.Group>
          
        </Form>
        <h3 className="m-3">{search.charAt(0).toUpperCase() + search.slice(1)} <small>{search && date}</small></h3>
        <div className="menu-items">
          <h5 onClick={() => this.handleView('people')}>People</h5>
          <h5 onClick={() => this.handleView('events')}>Events</h5>
        </div>
        {view === 'people' ? <PeopleFeed search={search} date={date}/> :
        <EventFeed2 search={search} date={date}/>}
      </div>
    );
  }
}

export default Search;

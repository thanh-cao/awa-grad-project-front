import React from 'react';
import {Button, Form} from 'react-bootstrap';
import {GoogleMap} from "@react-google-maps/api";

// import Map from './Map2';
import EventFeed2 from './EventFeed2';
import PeopleFeed from './PeopleFeed';
import { getCurrentPosition } from './getCurrentLocation';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


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

  async componentDidMount(){
    getCurrentPosition(position => {
      let lat = position['coords']['latitude'];
      let lng = position['coords']['longitude'];
      this.reverseGeocodeCoordinates(lat, lng)
    })
  }

  reverseGeocodeCoordinates(lat, lng){
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      const currentAddress = data.results[0].address_components[3].long_name.toLowerCase();;
      this.setState({search: currentAddress})
    })
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
    console.log(search);

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

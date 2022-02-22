import React from "react";
import { Link } from "react-router-dom";

import { getEvents } from "../services/ticketmaster";
import SimpleMap from "./map";
import peopleFeed from "./peopleFeed";

class eventFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textInput: "",
      events: [],
      isLoading: false,
      error: null,
      city: "",
      adress: {}
    };

    this.textInput = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleChange(event) {
    this.setState({
      textInput: event.target.value,
    });
  }

  async handleSubmit(event, searchInput) {
    event.preventDefault();
    const events = await getEvents(this.state.textInput)
    console.log(events)
    this.props.history.replace("/eventfeed/" + this.state.textInput)
    const searchedEvent = this.getEventsPlease(events)
    this.setState({
      events: searchedEvent,
      textInput: searchInput,
    })
    console.log(this.state.textInput)
  }

  getEventsPlease(events) {
    const eventLocation = [];
    const adress = fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.city},+EU&key=AIzaSyAGIPSSAJGsWmI8LPCFg5gqo4TZDRthXf8`)
              .then(response => response.json())
              .then(data => {
                this.setState({
                  ...this.state,
                  adress: data.results[0].geometry.location
                })
                return data.results[0].geometry.location;
              });
    console.log(adress)

    events["_embedded"].events.forEach((event) => {
      const location = event["_embedded"].venues[0].location;
      const venueName = event["_embedded"].venues[0].name;
      const dates = event.dates.start;
      const url = event.url;
      

      if (!eventLocation.find((el) => el.name === event.name)) {
        eventLocation.push({
          lat: location.latitude,
          lng: location.longitude,
          id: event.id,
          name: event.name,
          image: event.images[0],
          venue: venueName,
          date: dates["localDate"],
          time: dates["localTime"],
          url: url,
        });
      }
    });
    return eventLocation;
  }

  async componentDidMount() {
    console.log('didmount')
    try {
      this.setState({ isLoading: true });
      const city = this.props.history.location?.pathname.split("/")[2];
      console.log(this.props.history.location?.pathname.split("/"))
      if (city) {
        await this.setState({
          ...this.state,
          city
        })
      } else {
        await this.setState({
          ...this.state,
          city: "Oslo"
        })
      }

      const events = await getEvents(this.state.city);
      

      this.setState({ events: this.getEventsPlease(events), isLoading: false });
    } catch (error) {
      this.setState({ error });
    }
  }

  componentDidUpdate() {
    const city = this.props.history.location?.pathname.split("/")[2];

    if(city && city !== this.state.city) {
      this.setState({
        ...this.state,
        city
      })
    }
  }

  render() {
    const { events, isLoading, error } = this.state;
    console.log('render', this.props.history.location)

    if (error) {
      return (
        <div>
          <p>Oops! Something went wrong!</p>
          <pre>{error.message}</pre>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div>
          <p>Loading events...</p>
        </div>
      );
    }

    const eventElements = events.map((event) => {
      return (
        <div key={event.id} className="event-box">
          <a className="link-text" href={event.url}>
            <li className="event">
              <h4 className="name-title">
                <span className="link-text">{event.name}</span>
              </h4>
              <h5 className="venue-text">Venue: {event.venue} </h5>
              <h6 className="date-text">
                Date: {event.date} at {event.time}
              </h6>
            </li>
          </a>
        </div>
      );
    });

    return (
      <div className="people-feed">
        <div>
          <div className="search-header"></div>
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
          <br></br>
        </div>

        <div className="header"></div>
        <h1 className="header-peoplefeed">
          Destination
          <br></br>
          <span className="searchedDest">:{this.state.city}</span>
        </h1>
        <div className="menu-items">
          <h5><Link to="/peopleFeed">People</Link></h5>
          <h5 style={{ textDecoration: "underline" }}>Events</h5>
        </div>
        <SimpleMap events={this.state.events} adress={this.state.adress}></SimpleMap>
        <peopleFeed adress={this.state.adress}></peopleFeed>
        {eventElements.length ? (
          <ul className="events">{eventElements}</ul>
        ) : (
          <p>No events here.</p>
        )}

        <div className="footer"></div>
      </div>
    );
  }
}

export default eventFeed;

// return (
//   <div className="people-feed">
//     <div className="header"></div>
//     <h1 className="header-peoplefeed">
//       Destination
//       <br></br>
//       <span className="searchedDest">:Oslo</span>
//     </h1>
//     <div className="menu-items">
//       <h5>People</h5>
//       <h5 style={{ textDecoration: "underline" }}>Events</h5>
//     </div>
//     <div className="profile-card">
//       <img src={osloSpektrum} />
//       <div className="inner-profile-card">
//         <h3 className="name-title">Post Malone</h3>
//         <p className="profile-info">
//           Date: 19.12.2022 <br></br>
//           MONDAY - 20:00
//           <br></br>
//           <br></br>
//           <span className="event-genre">Concert</span>
//         </p>
//         <button>View event</button>
//       </div>
//     </div>
//     <div className="profile-card">
//       <img src={holmenkollen} />
//       <div className="inner-profile-card">
//         <h3 className="name-title">Biathlon</h3>
//         <p className="profile-info">
//           Date: 11.12.2022 <br></br>
//           MONDAY - 12:00
//           <br></br>
//           <br></br>
//           <span className="event-genre">Sports</span>
//         </p>
//         <button>View event</button>
//       </div>
//     </div>
//     <div className="profile-card">
//       <img src={chicago} />
//       <div className="inner-profile-card">
//         <h3 className="name-title">Chicago</h3>
//         <p className="profile-info">
//           Date: 25.11.2022 <br></br>
//           FRIDAY - 19:00
//           <br></br>
//           <br></br>
//           <span className="event-genre">Arts & Theater</span>
//         </p>
//         <button>View event</button>
//       </div>
//     </div>

//     <div className="footer"></div>
//   </div>
// );

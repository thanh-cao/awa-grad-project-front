import React from "react";

import holmenkollen from "../photos/holmenkollen.PNG";
import osloSpektrum from "../photos/osloSpektrum.PNG";
import chicago from "../photos/chicagoMusical.PNG";
import SimpleMap from "./maps"

import { getEvents } from "../services/ticketmaster";
// import SimpleMap from "./map";

class eventFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      isLoading: false,
      error: null,
    };
  }

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      const events = await getEvents("Oslo");
      console.log(events);
      function getEventsPlease(events) {
        const eventLocation = [];
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

      this.setState({ events: getEventsPlease(events), isLoading: false });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    const { events, isLoading, error } = this.state;

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
        <div className="header"></div>
        <SimpleMap>

        </SimpleMap>
        <h1 className="header-peoplefeed">
          Destination
          <br></br>
          <span className="searchedDest">:Oslo</span>
        </h1>
        <div className="menu-items">
          <h5>People</h5>
          <h5 style={{ textDecoration: "underline" }}>Events</h5>
        </div>
        <SimpleMap events={this.state.events}></SimpleMap>
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

import React from "react";
import holmenkollen from "./photos/holmenkollen.PNG";
import osloSpektrum from "./photos/osloSpektrum.PNG";
import chicago from "./photos/chicagoMusical.PNG";

class eventFeed extends React.Component {
  render() {
    return (
      <div className="people-feed">
        <div className="header"></div>
        <h1 className="header-peoplefeed">
          Destination
          <br></br>
          <span className="searchedDest">:Oslo</span>
        </h1>
        <div className="menu-items">
          <h5>People</h5>
          <h5 style={{ textDecoration: "underline" }}>Events</h5>
        </div>
        <div className="profile-card">
          <img src={osloSpektrum} />
          <div className="inner-profile-card">
            <h3 className="name-title">Post Malone</h3>
            <p className="profile-info">
              Date: 19.12.2022 <br></br>
              MONDAY - 20:00
              <br></br>
              <br></br>
              <span className="event-genre">Concert</span>
            </p>
            <button>View event</button>
          </div>
        </div>
        <div className="profile-card">
          <img src={holmenkollen} />
          <div className="inner-profile-card">
            <h3 className="name-title">Biathlon</h3>
            <p className="profile-info">
              Date: 11.12.2022 <br></br>
              MONDAY - 12:00
              <br></br>
              <br></br>
              <span className="event-genre">Sports</span>
            </p>
            <button>View event</button>
          </div>
        </div>
        <div className="profile-card">
          <img src={chicago} />
          <div className="inner-profile-card">
            <h3 className="name-title">Chicago</h3>
            <p className="profile-info">
              Date: 25.11.2022 <br></br>
              FRIDAY - 19:00
              <br></br>
              <br></br>
              <span className="event-genre">Arts & Theater</span>
            </p>
            <button>View event</button>
          </div>
        </div>

        <div className="footer"></div>
      </div>
    );
  }
}

export default eventFeed;

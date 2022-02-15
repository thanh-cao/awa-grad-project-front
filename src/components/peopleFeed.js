import React from "react";
import femalePhoto from "../photos/sampleprofilephotofemale.png";
import malePhoto from "../photos/sampleprofilephotomale.PNG";

class peopleFeed extends React.Component {
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
          <h5 style={{ textDecoration: "underline" }}>People</h5>
          <h5>Events</h5>
        </div>
        <div className="profile-card">
          <img src={femalePhoto} alt="femalesample" />
          <div className="inner-profile-card">
            <h3 className="name-title">Thanh</h3>
            <p className="profile-info">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu
              rutrum (...).{" "}
            </p>
            <button>View profile</button>
          </div>
        </div>
        <div className="profile-card">
          <img src={malePhoto} alt="malesample" />
          <div className="inner-profile-card">
            <h3 className="name-title">Suleman</h3>
            <p className="profile-info">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu
              rutrum (...).{" "}
            </p>
            <button>View profile</button>
          </div>
        </div>
        <div className="profile-card">
          <img src={malePhoto} alt="malesample" />
          <div className="inner-profile-card">
            <h3 className="name-title">Frederik</h3>
            <p className="profile-info">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu
              rutrum (...).{" "}
            </p>
            <button>View profile</button>
          </div>
        </div>
        <div className="profile-card">
          <img src={femalePhoto} alt="femalesample" />
          <div className="inner-profile-card">
            <h3 className="name-title">Daniela</h3>
            <p className="profile-info">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu
              rutrum (...).{" "}
            </p>
            <button>View profile</button>
          </div>
        </div>
        <div className="footer"></div>
      </div>
    );
  }
}

export default peopleFeed;

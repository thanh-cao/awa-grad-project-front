import React from "react";
import { Link } from "react-router-dom";

import femalePhoto from "../photos/sampleprofilephotofemale.png";
import malePhoto from "../photos/sampleprofilephotomale.PNG";
import parryHotter from "../photos/ParryHotter.jpg";

import { getPeople } from "../services/people";

class PeopleFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [],
      isLoading: false,
      error: null,
    };
  }

  async componentDidMount() {
    await this.populatePeople();
  }

  async populatePeople() {
    console.log(process.env.TICKETMASTER_API_KEY);
    try {
      this.setState({ isLoading: true });
      const people = await getPeople();
      console.log(people);
      this.setState({ people: people, isLoading: false });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    const {
      name,
      countrycode,
      location,
      profilePicture,
      interests,
      languages,
    } = this.props.match.params;

    const { people, isLoading, error } = this.state;

    if (error) {
      return <div>Unable to fetch users: {error.message}</div>;
    }

    if (isLoading) {
      return <div>Loading users...</div>;
    }

    console.log(people);
    const peopleCard = people.map(
      ({
        profilePicture,
        id,
        name,
        email,
        countrycode,
        location,
        interests,
        languages,
      }) => {
        // const styles = {
        //   border: '1px solid black',
        // };

        return (
          <div key={id} className="profile-card">
            <br></br>
            <h4>{name}</h4>
            <p>
              Location: {location}
              Interests: {interests}
              Languages: {languages}
            </p>
            <button>
              {" "}
              <Link to={`/users/${id}`}>View profile</Link>
            </button>
          </div>
        );
      }
    );

    // return (
    //   <div style={{ width: 500, margin: '0 auto'}}>
    //     <h3 style={{ textAlign: 'center' }}>{name}</h3>
    //     <div>{peopleCard}</div>
    //   </div>
    // )

    return (
      <div className="people-feed">
        <div className="header"></div>
        <h1 className="header-peoplefeed">
          Destination
          <br></br>
          <span className="searchedDest">{this.state.city}</span>
        </h1>
        <div className="menu-items">
          <h5 style={{ textDecoration: "underline" }}>People</h5>
          <h5>
            <Link to="/eventFeed">Events</Link>
          </h5>
        </div>
        <div className="profile-card">
          <img src={parryHotter} alt="femalesample" />
          <div className="inner-profile-card">
            <h3 className="name-title">{name}</h3>
            <div>{peopleCard}</div>
            <p className="profile-info">
              {countrycode} {location} {interests} {languages}
            </p>
          </div>
        </div>

        <div className="footer"></div>
      </div>
    );
  }
}

export default PeopleFeed;

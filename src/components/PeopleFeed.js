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
    try {
      this.setState({ isLoading: true });
      const people = await getPeople();
      this.setState({ people: people, isLoading: false });
    } catch (error) {
      this.setState({ error });
    }
    
  }


  render() {
    // const {
    //   name,
    //   countrycode,
    //   location,
    //   profilePicture,
    //   interests,
    //   languages,
    // } = this.props.match.params;

    const { people, isLoading, error } = this.state;
    const { search } = this.props;

    if (error) {
      return <div>Unable to fetch users: {error.message}</div>;
    }

    if (isLoading) {
      return <div>Loading users...</div>;
    }

    const locationByPeople = people.filter((person) => {
      return person.location.toLowerCase().includes(search);
    });

    const peopleToDisplay = locationByPeople.map((person) => {
      return (
        <Link key={person.id} to={`user/${person.id}`} className="text-decoration-none">
          <li >
            <div className="card my-3">
              <div className="card-bg-gradient"></div>
              <div className="card-body bg-white d-flex">
                <div>
                  {person.profilePicture && <img src={person.profilePicture} />}
                  {!person.profilePicture && <img src={malePhoto}/>}
                </div>
                <div className="mx-4">
                  <h3>{person.name}</h3>
                  <p><strong>Location:</strong> {person.location}</p>
                  <p><strong>Interests:</strong> {person.interests}</p>
                </div>
              </div>
            </div>
          </li>
        </Link>
      );
    });

    // console.log(people);
    // const peopleCard = people.map(
    //   ({
    //     profilePicture,
    //     id,
    //     name,
    //     email,
    //     countrycode,
    //     location,
    //     interests,
    //     languages,
    //   }) => {
    //     // const styles = {
    //     //   border: '1px solid black',
    //     // };

    //     return (
    //       <div key={id} className="profile-card">
    //         <br></br>
    //         <h4>{name}</h4>
    //         <p>
    //           Location: {location}
    //           Interests: {interests}
    //           Languages: {languages}
    //         </p>
    //         <button>
    //           {" "}
    //           <Link to={`/users/${id}`}>View profile</Link>
    //         </button>
    //       </div>
    //     );
    //   }
    // );

    // return (
    //   <div style={{ width: 500, margin: '0 auto'}}>
    //     <h3 style={{ textAlign: 'center' }}>{name}</h3>
    //     <div>{peopleCard}</div>
    //   </div>
    // )

    return (
      <div className="people-feed pb-5">
        <div className="menu-items">
          <h5 style={{ textDecoration: "underline" }}>People</h5>
          <h5>
            <Link to="/eventFeed">Events</Link>
          </h5>
        </div>
        <ul className="p-0">{peopleToDisplay}</ul>
        {/* <div className="profile-card">
          <img src={parryHotter} alt="femalesample" />
          <div className="inner-profile-card">
            <h3 className="name-title">Harry</h3>
            <div></div>
            <p className="profile-info">
              {countrycode} {location} {interests} {languages}
            </p>
          </div>
        </div> */}
      </div>
    );
  }
}

export default PeopleFeed;

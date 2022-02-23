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
        <Link
          key={person.id}
          to={`user/${person.id}`}
          className="text-decoration-none"
        >
          <li>
            <div className="card my-3">
              <div className="card-bg-gradient"></div>
              <div className="card-body bg-white d-flex">
                <div>
                  {person.profilePicture && <img src={person.profilePicture} />}
                  {!person.profilePicture && <img src={malePhoto} />}
                </div>
                <div className="mx-4">
                  <h3>{person.name}</h3>
                  <p>
                    <strong>Location:</strong> {person.location}
                  </p>
                  <p>
                    <strong>Interests:</strong> {person.interests}
                  </p>
                </div>
              </div>
            </div>
          </li>
        </Link>
      );
    });

    return (
      <div className="people-feed pb-5">
        <ul className="p-0">{peopleToDisplay}</ul>
      </div>
    );
  }
}

export default PeopleFeed;

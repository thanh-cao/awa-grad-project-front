import React from 'react';
import {Link} from "react-router-dom";
import dateFormat, { masks } from "dateformat";
import profilePlaceholder from "../photos/profilePlaceholder.png";


class ProfilePage extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            user: {},
            isLoading: true
        }
    }

    componentDidMount(){
        const {id} = this.props.match.params

        fetch(`${process.env.REACT_APP_API_URL}/users/${id}`)
        .then(res => res.json())
        .then(data => {
            this.setState({user: data, isLoading: false})

        });
    }

    render(){
        const isLoading = this.state.isLoading;

        if(isLoading){
            return <div>Loading....</div>
        }

        const {id, name, createdAt, about, profilePicture, interests, languages} = this.state.user
        const firstName = name.split(' ')[0] 

        const date = new Date(createdAt)
        const joined = dateFormat(date, 'mmmm, yyyy');

        return(
            <div className="profile-page">
                <div className="main-info">
                    <img src={profilePicture ? profilePicture : profilePlaceholder} alt="profile picture"/>
                    <div>
                        <h2>Hi, I'm {firstName}</h2>
                        <p><small>Joined in {joined} </small></p>
                        <p><small>12 Reviews</small></p>
                        <Link to="#">Write a review for {firstName}</Link>
                    </div>
                </div>
                <hr />
                <div className="about-info">
                    <h3>About</h3>
                    <p>{about ? about : `no info added yet..`}</p>
                    <h4>Interest</h4>
                    <p>{interests ? interests  : `No info added yet..`}</p>
                    <div className="extra-info">
                        <p>From Oslo, Norway</p>
                        <p>Speaks {languages}</p>
                    </div>
                    <Link to={`/edit/${id}`} className="edit-profile-btn">Edit</Link>
                </div>
                <hr />
                <div className="user-reviews">
                    <h3>Reviews <span>(12)</span></h3>
                    <div className="review">
                        <p>I met Jane in Lisbon last month and she is an amazing person. She is very interesting to talk to and fun to go out with.</p>
                        <div className="review-user">
                            <img src={profilePlaceholder}/>
                            <div>
                                <p>Alexandra, Lisbon, Portugal</p>
                                <p>January 2022</p>
                            </div>
                        </div>
                    </div>
                    <div className="review">
                        <p>I had an amazing time showing Jane around my beloved Paris and just spent the lazy days from one French bakery to another.</p>
                        <div className="review-user">
                            <img src={profilePlaceholder}/>
                            <div>
                                <p>Joseph, Paris, France</p>
                                <p>November 2021</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfilePage;
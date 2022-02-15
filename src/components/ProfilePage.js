import React from 'react';
// import {Link} from "react-router-dom";
import profilePlaceholder from "../photos/profilePlaceholder.png";


class ProfilePage extends React.Component{
    componentDidMount(){

    }

    render(){
        return(
            <div className="profile-page">
                <div className="main-info">
                    <img src={profilePlaceholder} alt="profile picture"/>
                    <div>
                        <h2>Hi, I'm Jane!</h2>
                        <p><small>Joined in February 2021 </small></p>
                        <p><small>12 Reviews</small></p>
                        <a href="#">Write a review for Jane</a>
                    </div>
                </div>
                <hr />
                <div className="about-info">
                    <h3>About</h3>
                    <p>I'm from Oslo, Norway and a lone traveller of the milennials. I want to make new friends along the way and just explore the unbeaten path and eat the best foods in the city I visit.</p>
                    <h4>Interest</h4>
                    <p>I love going to museums and eat all the local foods. Parties could be fun too but I'm also up to just a quiet and cosy evening with talks.</p>
                    <div className="extra-info">
                        <p>From Oslo, Norway</p>
                        <p>Speaks English, Norsk</p>
                    </div>
                    <div className="edit-profile-btn">Edit</div>
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
                    <div clasName="review">
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
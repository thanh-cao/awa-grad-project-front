import React from 'react';
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { HouseDoor, ChatQuote, Messenger, Instagram, Twitter } from 'react-bootstrap-icons';

import profilePlaceholder from "../photos/profilePlaceholder.png";
import { getUserProfile, getUserReviews } from "../services/users";

import WriteReviewModal from "./WriteReviewModel";
import ReviewItem from "./ReviewItem";

class ProfilePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            reviews: [],
            isLoading: true
        }
    }

    async populateUserData() {
        const { id } = this.props.match.params
        const user = await getUserProfile(id);
        console.log(user);
        const reviews = await getUserReviews(id);
        this.setState({
            user,
            reviews,
            isLoading: false
        })
    }

    componentDidMount() {
        this.populateUserData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({
                isLoading: true
            })
            return this.populateUserData();
        }
    }

    render() {
        const isLoading = this.state.isLoading;

        if (isLoading) {
            return <div>Loading....</div>
        }

        const { id, name, createdAt, about, profilePicture, interests, languages, location } = this.state.user;
        const { facebook, instagram, twitter } = this.state.user.ContactInfo;

        const { reviews } = this.state;
        const firstName = name.split(' ')[0];

        const date = new Date(createdAt);
        const joined = dateFormat(date, 'mmmm, yyyy');

        const reviewList = reviews.rows.map(review => {
            return (
                <ReviewItem
                    key={review.id}
                    content={review.content}
                    reviewDate={review.createdAt}
                    reviewer={review.reviewer}
                    reviewId={review.id}
                    receiverId={review.receiverId}
                    receiverName={name}
                    refresh={this.populateUserData.bind(this)}
                    isAuthor={review.reviewer.id === this.props.loggedInUser.id}
                />
            );
        });

        const contactInfo = (
            <div className="contact-info">
                {facebook && (
                    <div className="d-inline">
                        <a href={`http://m.me/${facebook}`} target="_blank" rel="noopener noreferrer">
                            <Messenger className="contact-info-icon" />
                        </a>
                    </div>
                )}
                {instagram && (
                    <div className="d-inline">
                        <a href={`https://www.instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer">
                            <Instagram className="contact-info-icon" />
                        </a>
                    </div>
                )}
                {twitter && (
                    <div className="d-inline">
                        <a href={`https://www.twitter.com/${twitter}`} target="_blank" rel="noopener noreferrer">
                            <Twitter className="contact-info-icon" />
                        </a>
                    </div>
                )}
            </div>
        )



        return (
            <Container className="profile-page px-4">
                <Row>
                    <Col xs={5} md={5} className="text-center offset-md-1">
                        <img src={profilePicture ? profilePicture : profilePlaceholder} alt={firstName + ' profile'} />
                        {/* <div className="d-md-none d-block">{contactInfo}</div> */}
                    </Col>
                    <Col xs={7} md={6}>
                        <h2>Hi, I'm {firstName}</h2>
                        <p><small>Joined in {joined} </small></p>
                        <p onClick={() => { document.querySelector('#userReviews').scrollIntoView({ behavior: 'smooth', block: 'center' }) }}>
                            <small>{reviews.count} Review{reviews.count > 1 ? 's' : null}</small>
                        </p>

                        {this.props.loggedInUser.id !== id && (
                            <>
                                <WriteReviewModal
                                    receiverId={id}
                                    name={name}
                                    btnVariant="outline-primary"
                                    btnText={`Write a review to ${firstName}`}
                                    refresh={this.populateUserData.bind(this)}
                                />
                                {/* <a href={`http://m.me/${facebook}"`} className="btn btn-outline-primary mt-2" target="_blank" rel="noreferrer">
                                        Contact {firstName}
                                    </a> */}
                            </>
                        )}
                        {contactInfo}
                    </Col>
                </Row>
                <hr />
                <Row className="about-info">
                    <Col>
                        <h3>About</h3>
                        <p>{about ? about : `No info added yet...`}</p>

                        <h3>Interest</h3>
                        <p>{interests ? interests : `No info added yet...`}</p>

                        <div className="extra-info">
                            <p><HouseDoor className="me-2 text-primary" />From {location}</p>
                            <p><ChatQuote className="me-2 text-primary" />Speaks {languages}</p>
                        </div>

                        {this.props.loggedInUser.id === id && (
                            <Link to={`/user/${id}/edit`} className="edit-profile-btn btn btn-outline-primary">
                                Edit
                            </Link>
                        )}
                    </Col>
                </Row>
                <hr />
                <Row id="userReviews" className="user-reviews">
                    <h3>Review{reviews.count > 1 ? 's' : null} ({reviews.count})</h3>

                    {reviewList}

                </Row>
            </Container>
        )
    }
}

export default ProfilePage;
import React from 'react';
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
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
        const reviews = await getUserReviews(id);
        console.log(reviews);
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

        const { id, name, createdAt, about, profilePicture, interests, languages } = this.state.user
        const { reviews } = this.state;
        const firstName = name.split(' ')[0]

        const date = new Date(createdAt)
        const joined = dateFormat(date, 'mmmm, yyyy');
        
        const reviewList = reviews.rows.map(review => {
            return (
                <ReviewItem
                    key={review.id}
                    content={review.content}
                    reviewDate={review.createdAt}
                    user={review.reviewer.name}
                    imgUrl={review.reviewer.profilePicture && review.reviewer.profilePicture}
                    location={review.reviewer.location}
                    reviewId={review.id}
                    receiverId={review.receiverId}
                    receiverName={name}
                    refresh={this.populateUserData.bind(this)}
                    // isAuthor={review.reviewer.id === loggedin.id} to be implemented
                />
            )
        });

        return (
            <div className="profile-page">
                <div className="main-info">
                    <img src={profilePicture ? profilePicture : profilePlaceholder} alt={firstName + ' profile'} />
                    <div>
                        <h2>Hi, I'm {firstName}</h2>
                        <p><small>Joined in {joined} </small></p>
                        <p onClick={() => { document.querySelector('#userReviews').scrollIntoView({ behavior: 'smooth', block: 'center' }) }}><small>{reviews.count} Reviews</small></p>
                        
                        <WriteReviewModal
                            receiverId={id}
                            name={name}
                            btnVariant="outline-primary"
                            btnText={`Write a review to ${firstName}`}
                            refresh={this.populateUserData.bind(this)}
                        />

                    </div>
                </div>
                <hr />
                <div className="about-info">
                    <h3>About</h3>
                    <p>{about ? about : `no info added yet..`}</p>
                    <h4>Interest</h4>
                    <p>{interests ? interests : `No info added yet..`}</p>
                    <div className="extra-info">
                        <p>From Oslo, Norway</p>
                        <p>Speaks {languages}</p>
                    </div>
                    <Link to={`/users/${id}/edit`} className="edit-profile-btn">Edit</Link>
                </div>
                <hr />
                <div id="userReviews" className="user-reviews">
                    <h3>Reviews <span>({reviews.count})</span></h3>

                    {reviewList}

                </div>
            </div>
        )
    }
}

export default ProfilePage;
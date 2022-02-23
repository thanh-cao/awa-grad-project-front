import React, { Component } from 'react';
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import { deleteUserReview } from "../services/users";

import profilePlaceholder from "../photos/profilePlaceholder.png";
import WriteReviewModal from "./WriteReviewModel";

import { flash } from "../services/helpers";
export default class ReviewItem extends Component {
    async onDelete() {
        try {
            await deleteUserReview(this.props.reviewId, this.props.receiverId);
            flash('Review deleted successfully', 'success');
            this.props.refresh();
        } catch (error) {
            flash(error.message, 'error');
        }
    }

    render() {
        let reviewDate = new Date(this.props.reviewDate);
        reviewDate = dateFormat(reviewDate, 'mmmm yyyy');

        const editButton = (
            <>
                <PencilSquare
                    aria-hidden="true"
                />
                <span className="visually-hidden">Edit review</span>
            </>
        );
        const deleteButton = (
            <>
                <Trash
                    aria-hidden="true"
                    onClick={this.onDelete.bind(this)}
                />
                <span className="visually-hidden">Delete review</span>
            </>
        );

        return (
            <div className="review">
                <div className="review-user">
                    <Link to={`/user/${this.props.reviewer.id}/`}>
                        <img src={this.props.reviewer.profilePicture ? this.props.reviewer.profilePicture : profilePlaceholder} alt={this.props.reviewer.name + ' profile picture'} />
                    </Link>

                    <div>
                        <Link className="text-decoration-none" to={`/user/${this.props.reviewer.id}/`}>
                            <p className="mb-0 fw-bold">
                                {this.props.reviewer.name}{this.props.reviewer.location && (', ' + this.props.reviewer.location)}
                            </p>
                        </Link>
                        <p className="mb-0">{reviewDate}</p>
                    </div>
                </div>

                <p>{this.props.content}</p>

                {this.props.isAuthor && (
                    <div className="py-2">
                        <WriteReviewModal
                            btnVariant="outline-primary"
                            btnText={editButton}
                            btnSize="sm"
                            receiverId={this.props.receiverId}
                            review={this.props.content}
                            name={this.props.receiverName}
                            reviewId={this.props.reviewId}
                            receiverId={this.props.receiverId}
                            refresh={this.props.refresh}
                            actionType="edit"
                        />
                        <Button
                            className="ms-2"
                            variant="outline-danger"
                            size="sm"
                            onClick={this.props.onDelete}>
                            {deleteButton}
                        </Button>
                    </div>
                )}
            </div >
        )
    }
}
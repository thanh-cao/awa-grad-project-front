import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createUserReview, updateUserReview } from '../services/users';
import { flash } from '../services/helpers';
export default class WriteReviewModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            review: this.props.review || '',
            error: ''
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleChange(event) {
        this.setState({
            review: event.target.value
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.review !== this.props.review) {
            this.setState({
                review: this.props.review
            })
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (this.state.review === '') {
            this.setState({ error: 'Please write a review' });
            return;
        }

        try {
            if (this.props.actionType === 'edit') {
                await updateUserReview(this.props.reviewId, this.state.review, this.props.receiverId);
                flash('Review updated successfully', 'success');
            } else {
                await createUserReview(this.props.receiverId, this.state.review);
                flash('Review created successfully', 'success');
            }
            this.setState({
                show: false,
                error: '',
                review: ''
            });
            this.props.refresh();

        } catch (error) {
            flash(error.message, 'error');
        }
    }

    render() {
        return (
            <>
                <Button variant={this.props.btnVariant} size={this.props.btnSize} onClick={this.handleShow}>
                    {this.props.btnText}
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Let others know your experience with {this.props.name}</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="review"
                                    value={this.state.review}
                                    onChange={this.handleChange}
                                    placeholder="Write a review"
                                />
                                {this.state.error && <Form.Text className="text-danger">{this.state.error}</Form.Text>}
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}
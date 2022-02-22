import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

export default class FlashMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            message: null,
            variant: null
        };
    }

    componentDidMount() {
        if (this.props.isShown) {
            this.setState({
                show: true,
                message: this.props.message,
                variant: this.props.variant
            });
        }
        this.hideFlashMessage();
    }

    hideFlashMessage() {
        setTimeout(() => {
            this.setState({
                show: false,
                message: null,
                variant: null
            });
        }, 3000);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.message !== this.props.message) {
            this.setState({
                show: this.props.isShown,
                message: this.props.message,
                variant: this.props.variant
            });
        }
    }

    componentWillUnmount() {
        this.setState({
            show: false,
            message: null,
            variant: null
        });
    }

    render() {
        const variant = this.props.variant === 'success' ? 'primary' : 'danger';
        if (this.state.show)
            return (
                <div className="container">
                    <Alert variant={variant} className="flash-message" onClose={() => this.setState({ show: false })
                    } dismissible >
                        {this.props.message}
                    </Alert >
                </div>
            )
        return null;
    };
}

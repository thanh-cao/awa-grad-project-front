import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

import { flashEmitter } from '../services/helpers';
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
        flashEmitter.addListener('flash', (message, variant) => {
            this.setState({
                show: true,
                message,
                variant
            });
            this.hideFlashMessage();
        });
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

    render() {
        const variant = this.state.variant === 'success' ? 'primary' : 'danger';
        if (this.state.show) {
            return (
                <div className="container">
                    <Alert variant={variant} className="flash-message" onClose={() => this.setState({ show: false })
                    } dismissible >
                        {this.state.message}
                    </Alert >
                </div>
            );
        }

        return null;
    };
}

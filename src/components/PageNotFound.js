import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PageNotFound extends Component {
    render() {
        const backgroundStyle = {
            background: `url("https://images.unsplash.com/photo-1582457493468-1cd9a3b48e79") bottom center / cover no-repeat`,
            position: 'relative',
            zIndex: '1',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        };

        return (
            <div className="g-0 flex-grow-1 h-auto container-fluid" style={backgroundStyle} >
                <h1 className="text-primary text-center" style={{ fontSize: '3rem' }}>Woops...<br/>Page not found</h1>
                <Link to="/search" className="btn btn-primary mt-3">Go back to home page</Link>
            </div>
        )
    }
}
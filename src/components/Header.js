import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        const isAuthenticated = this.props.isAuthenticated;
        const handleLogout = this.props.handleLogout;

        return (
            <Navbar className="d-flex justify-content-between" bg="primary" variant="light">
                <Link to='/' className="text-decoration-none"><Navbar.Brand href="#home" className="text-white ms-3">Travel App</Navbar.Brand></Link>
                {isAuthenticated && <Button onClick={() => handleLogout()} className="mx-2" size="sm" variant="primary">Log out</Button>}
            </Navbar>
        );
    }
}

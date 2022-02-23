import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default class Header extends Component {
    render() {
        const {isAuthenticated, user, handleLogout} = this.props

        return (
            // <Navbar className="d-flex justify-content-between" bg="primary" variant="light">
            //     <Link to='/' className="text-decoration-none"><Navbar.Brand href="#home" className="text-white ms-3">Travel App</Navbar.Brand></Link>
            //     {isAuthenticated && <Button onClick={() => handleLogout()} className="mx-2" size="sm" variant="primary">Log out</Button>}
            <Navbar bg="white" variant="light" className="d-flex justify-content-between">
                <Navbar.Brand href="/" className="ms-3">TRAVTHENTICATE</Navbar.Brand>
                {isAuthenticated && user && (
                    <div>
                        <Link to={`/user/${user.id}/edit`}>
                            <Button onClick={() => {}} size="sm" variant="primary">Profile</Button>
                            </Link>
                        <Button onClick={() => handleLogout()} className="mx-2" size="sm" variant="primary">Log out</Button>
                    </div>
                )}
            </Navbar>
        );
    }
}

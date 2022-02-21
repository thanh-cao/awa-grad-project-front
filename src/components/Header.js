import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

export default class Header extends Component {
    render() {
        return (
            <Navbar bg="white" variant="light">
                <Navbar.Brand href="/" className="ms-3">TRAVTHENTICATE</Navbar.Brand>
            </Navbar>
        );
    }
}

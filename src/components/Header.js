import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

export default class Header extends Component {
    render() {
        return (
            <Navbar bg="primary" variant="light">
                <Navbar.Brand href="#home" className="text-white ms-3">Travel App</Navbar.Brand>
            </Navbar>
        );
    }
}

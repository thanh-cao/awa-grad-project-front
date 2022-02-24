import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default class Header extends Component {

    closeNavbar() {
        document.getElementsByClassName("navbar-collapse")[0].classList.remove("show");
        document.getElementsByClassName("navbar-toggler")[0].classList.add("collapsed");
    }

    render() {
        const { isAuthenticated, user, handleLogout } = this.props

        return (
            <Navbar bg="white" variant="light" className="d-flex justify-content-between" expand={'xl'} collapseOnSelect>
                <Navbar.Brand href="/" className="ms-3">TRAVTHENTICATE</Navbar.Brand>
                {isAuthenticated && user && (
                    <>
                        <Navbar.Toggle aria-controls='basic-navbar-nav' className="toggle-navbar" />
                        <Navbar.Collapse id='basic-navbar-nav'>
                            <Nav>
                                <Link to='/search' onClick={() => this.closeNavbar()} className="nav-link text-decoration-none">Search</Link>
                                <Link to={`/user/${user.id}`} onClick={() => this.closeNavbar()} className="nav-link text-decoration-none">Your Profile</Link>
                                <Link to={`/user/${user.id}/edit`} onClick={() => this.closeNavbar()} className="nav-link text-decoration-none">Edit Your Profile</Link>
                                <Link to='#' onClick={() => handleLogout()} className="nav-link text-decoration-none">Log out</Link>
                            </Nav>
                        </Navbar.Collapse>

                    </>
                )}
            </Navbar>
        );
    }
}

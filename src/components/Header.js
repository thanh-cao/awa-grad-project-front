import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import {Link} from 'react-router-dom';


export default class Header extends Component {

    closeNavbar(){

    }
    render() {
        const {isAuthenticated, user, handleLogout} = this.props

        return (
            // <Navbar className="d-flex justify-content-between" bg="primary" variant="light">
            //     <Link to='/' className="text-decoration-none"><Navbar.Brand href="#home" className="text-white ms-3">Travel App</Navbar.Brand></Link>
            //     {isAuthenticated && <Button onClick={() => handleLogout()} className="mx-2" size="sm" variant="primary">Log out</Button>}
            <Navbar bg="white" variant="light" className="d-flex justify-content-between" expand={'xl'} collapseOnSelect>
                <Navbar.Brand href="/" className="ms-3">TRAVTHENTICATE</Navbar.Brand>
                {isAuthenticated && user && (
                    <>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' className="toggle-navbar"/>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav>
                            <Nav.Link href="#"><Link to='/search' onClick={() => this.closeNavbar()} className="text-decoration-none">Search Destination</Link></Nav.Link>
                            <Nav.Link href="#"><Link to={`/user/${user.id}`} onClick={() => this.closeNavbar()} className="text-decoration-none">Your Profile</Link></Nav.Link>
                            <Nav.Link href="#"><Link to={`/user/${user.id}/edit`} onClick={() => this.closeNavbar()} className="text-decoration-none">Edit Your Profile</Link></Nav.Link>
                            <Nav.Link href="#"><Link onClick={() => handleLogout()} className="text-decoration-none">Log out</Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

                    </>
                    
                    
                )}
            </Navbar>
        );
    }
}

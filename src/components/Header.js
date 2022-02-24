import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import {Link} from 'react-router-dom';


export default class Header extends Component {
    render() {
        const {isAuthenticated, user, handleLogout} = this.props

        return (
            // <Navbar className="d-flex justify-content-between" bg="primary" variant="light">
            //     <Link to='/' className="text-decoration-none"><Navbar.Brand href="#home" className="text-white ms-3">Travel App</Navbar.Brand></Link>
            //     {isAuthenticated && <Button onClick={() => handleLogout()} className="mx-2" size="sm" variant="primary">Log out</Button>}
            <Navbar bg="white" variant="light" className="d-flex justify-content-between" expand={'xl'}>
                <Navbar.Brand href="/" className="ms-3">TRAVTHENTICATE</Navbar.Brand>
                {isAuthenticated && user && (
                    <>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' className="toggle-navbar"/>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav>
                            <Link to='/search' className="text-decoration-none">Search Destination</Link>
                            <Link to={`/user/${user.id}`} className="text-decoration-none">Your Profile</Link>
                            <Link to={`/user/${user.id}/edit`} className="text-decoration-none">Edit Your Profile</Link>
                            <Link onClick={() => handleLogout()} className="text-decoration-none">Log out</Link>
                            
                            {/* <NavDropdown id="dropdown-item-start" className="mx-2 w-100"> */}
                            {/* <DropdownButton
                                as={ButtonGroup}
                                id={`dropdown-button-drop-start`}
                                drop="start"
                                variant="primary"
                                title={` Menu `}
                                > */}
                                {/* <NavDropdown.Item><Link to={`/search`} className="text-decoration-none">Search Destination</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link to={`/user/${user.id}/edit`} className="text-decoration-none">Edit Profile</Link></NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleLogout()} ><Link className="text-decoration-none">Log out</Link></NavDropdown.Item> */}
                            {/* </DropdownButton> */}
                        {/* </Dropdown> */}
                            {/* </NavDropdown> */}
                        </Nav>
                    </Navbar.Collapse>

                    </>
                    
                    
                )}
            </Navbar>
        );
    }
}

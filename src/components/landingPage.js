import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import Footer from './Footer';
import landingPhoto from "../photos/landingpagephoto.jpg";

class LandingPage extends React.Component {


  render() {
    return (
      <Container fluid className="g-0">
        <img id='landingpagephoto' src={landingPhoto} alt="landingphoto" />
        <h5>Tired of the established tourist traps
          and ready for authentic
          travel experience with a local?</h5>
        <div className='text-center'>
          <Link className='btn btn-primary me-2' to='/login'>Login</Link>
          <Link className='btn btn-outline-primary' to='/signup'>Sign up</Link>
        </div>
        <Footer />
      </Container>
    );
  }
}

export default LandingPage;
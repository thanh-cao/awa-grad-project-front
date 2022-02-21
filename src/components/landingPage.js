import React from 'react';
import {Link} from 'react-router-dom'
import landingPhoto from "../photos/landingpagephoto.jpg";

class LandingPage extends React.Component {
  

  render() {
    return (
        <div className='landingMain'>
            <div className='header'>Travel App </div>   
            <img id='landingpagephoto' src={landingPhoto} alt="landingphoto" />
            <h5>Tired of the established tourist traps 
and ready for authentic 
travel experience with a local?</h5>
            <div className='landingButtons'><Link className='logIn' to='login'>Login</Link> <Link className='logIn' to='/signup'>Sign up</Link></div>
            <div className='footer'></div>
      </div>
    );
  }
}

export default LandingPage;
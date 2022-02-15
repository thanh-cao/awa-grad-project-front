import React from 'react';


class Login extends React.Component {
  
  

  render() {
    return (
        <div className='main'>
            <div className='header'></div>        
            <h1 className='logInH1'>Login</h1>
            <div className='inputFields'>
                <label>
                <input type="text" placeholder='E-mail' id='name'/>
                </label>
                <br></br> 
                <label>
                <input type="password" placeholder='Password' id='pass'/>
                </label>
                <br></br>
                <button class="logInButton" role="button">Log in here</button>
            </div> 
            <div className='footer'></div>
      </div>
    );
  }
}

export default Login;


import React from 'react';


class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
    }
  }

  handleChange(e, field){
    this.setState({
      [field]: e.target.value
    })
  }

  handleSignup(){
    const {name, email, password} = this.state
    fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({name, email, password})
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
  }
  

  render() {
    return (
        <div className='main'>
            <div className='header'></div>        
            <h1 className='logInH1'>Sign up</h1>
            <div className='inputFields'>
              <label>
              <input 
                type="text" 
                placeholder='name' 
                id='name'
                onChange={(e) => this.handleChange(e, 'name')}/>
              </label>
              <label>
              <input 
                type="email" 
                placeholder='E-mail' 
                id='email'
                onChange={(e) => this.handleChange(e, 'email')}/>
              </label>
              <br></br> 
              <label>
              <input 
                type="password" 
                placeholder='Password' 
                id='pass'
                onChange={(e) => this.handleChange(e, 'password')}/>
              </label>
              <br></br>
              <button 
              className="logInButton"
              onClick={() => this.handleSignup()}>Sign up</button>
            </div> 
            <div className='footer'></div>
      </div>
    );
  }
}

export default SignUp;
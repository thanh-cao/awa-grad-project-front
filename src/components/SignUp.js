import React from 'react';
import { Form, Button } from 'react-bootstrap';


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
        <div className='w-50 m-auto my-5'>    
            <h1 className='logInH1'>Sign up</h1>
            <Form>
              <Form.Control 
                type="text" 
                placeholder='name' 
                id='name'
                onChange={(e) => this.handleChange(e, 'name')}/>
              <br />
              <Form.Control 
                type="email" 
                placeholder='E-mail' 
                id='email'
                onChange={(e) => this.handleChange(e, 'email')}/>
              <br />
              <Form.Control 
                type="password" 
                placeholder='Password' 
                id='pass'
                onChange={(e) => this.handleChange(e, 'password')}/>
              <br></br>
              <Button
              className="logInButton"
              onClick={() => this.handleSignup()}>Sign up</Button>
            </Form> 
      </div>
    );
  }
}

export default SignUp;
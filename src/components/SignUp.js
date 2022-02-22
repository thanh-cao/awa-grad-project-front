import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { registerUser } from '../services/userAuth';

class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
    }
  }

  handleChange(e, field) {
    this.setState({
      [field]: e.target.value
    })
  }

  async handleSignup() {
    const { name, email, password } = this.state;
    try {
      const user = await registerUser(name, email, password);
      
      if (user.error) {
        throw new Error(user.error);
      }

      this.props.setAuth(true);
      this.props.setUser(user);
      this.props.history.push(`/user/${user.id}/edit`);

    } catch (err) {
      console.log(err);
    }
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
            onChange={(e) => this.handleChange(e, 'name')} />
          <br />
          <Form.Control
            type="email"
            placeholder='E-mail'
            id='email'
            onChange={(e) => this.handleChange(e, 'email')} />
          <br />
          <Form.Control
            type="password"
            placeholder='Password'
            id='pass'
            onChange={(e) => this.handleChange(e, 'password')} />
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
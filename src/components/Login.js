import React from 'react';
import { Button, Form } from 'react-bootstrap';

import { flash } from '../services/helpers';
const { loginUser } = require('../services/userAuth');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.email = React.createRef();
    this.password = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      flash('Please fill in all fields', 'error');
      return;
    }

    try {
      const user = await loginUser(email, password);

      if (user.error) {
        throw new Error(user.error);
      }

      await this.props.setAuth(true)
      this.props.history.replace('/search');

    } catch (error) {
      flash(error.message, 'error');
    }
  }


  render() {
    return (
      <div className='w-50 m-auto my-5'>
        <h1 className='logInH1'>Login</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Control name='email' onChange={this.handleChange} type="text" placeholder='E-mail' id='name' />
          <br></br>
          <Form.Control name='password' onChange={this.handleChange} type="password" placeholder='Password' id='pass' />
          <br></br>
          <Button type="submit" variant="outline-primary">Log in here</Button>
        </Form>
      </div>
    );
  }
}

export default Login;


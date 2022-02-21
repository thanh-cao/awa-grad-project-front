import React from 'react';

const { loginUser, authenticateUser } = require('./loginUser');

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
    try {
      const user = await loginUser(email, password);

      if (user.error) {
        throw new Error(user.error);
      }

      await this.props.setAuth(true)
      this.props.history.replace('/search');

    } catch (error) {
      console.log(error);
    }
  }
  

  render() {
    return (
        <div className='main'>
            <div className='header'></div>        
            <h1 className='logInH1'>Login</h1>
            <div className='inputFields'>
                <label>
                <input name='email' onChange={this.handleChange} type="text" placeholder='E-mail' id='name'/>
                </label>
                <br></br> 
                <label>
                <input name='password' onChange={this.handleChange} type="password" placeholder='Password' id='pass'/>
                </label>
                <br></br>
                <button onClick={this.handleSubmit} className="logInButton" >Log in here</button>
            </div> 
            <div className='footer'></div>
      </div>
    );
  }
}

export default Login;


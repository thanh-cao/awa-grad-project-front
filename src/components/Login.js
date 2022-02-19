import React from 'react';


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
    console.log('handleSubmit');
    event.preventDefault();
    const { email, password } = this.state;
    try {
      const user = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      }).then(res => res.json());

      if (user.error) {
        throw new Error(user.error);
      }

      localStorage.setItem('userAthenticated', JSON.stringify(user));
      return this.props.history.push('/tweets');

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
            <input type="text" placeholder="Email" id="email" name="email" onChange={this.handleChange} />
          </label>
          <br></br>
          <label>
            <input type="password" placeholder="Password" id="password" name="password" onChange={this.handleChange} />
          </label>
          <br></br>
          <button className="logInButton" role="button" onClick={this.handleSubmit}>Log in here</button>
        </div>
        <div className='footer'></div>
      </div>
    );
  }
}

export default Login;


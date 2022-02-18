import { HashRouter, Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';

import Login from "./components/Login";
import peopleFeed from "./components/peopleFeed";
import eventFeed from "./components/eventFeed";
import SimpleMap from "./components/map";

import SignUp from "./components/signUp";
import LandingPage from "./components/landingPage";

import Search from "./components/searchPage";

import ProfilePage from "./components/ProfilePage";
import EditProfile from "./components/EditProfile";

import "./App.css";
import "./components/Login.css";
import "./components/landingpagephoto.css";
import "./components/map.css";

const { authenticateUser } = require('./components/loginUser');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthenticated: false
    };
  }

  async componentDidMount() {
    try {
      const user = await authenticateUser();
      if (!user.error) {
        this.setState({
          user: user,
          isAuthenticated: true
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  render () {
    return (
      <HashRouter>
      <Switch>
        <Route path="/users/login" component={Login} />
        <Route path="/users/peoplefeed" component={peopleFeed} />
        <Route path="/users/eventfeed" component={eventFeed} />

        <Route path="/signup" component={SignUp} />
        <Route path="/landingpage" component={LandingPage} />
  
        <Route path="/users/search" component={Search} />

        <Route path="/signup" component={SignUp} />
        <Route path="/landingpage" component={LandingPage} />

        <Route path="/users/:id" component={ProfilePage} />
        <Route path="/createProfile/:id" component={CreateProfile} />

      </Switch>
    </HashRouter>
    );
  }
}

export default App;

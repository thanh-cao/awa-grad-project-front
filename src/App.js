import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import React, { Component } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Login from "./components/Login";
import PeopleFeed from "./components/PeopleFeed";
import EventFeed from "./components/EventFeed";

import SignUp from "./components/SignUp";

import LandingPage from "./components/LandingPage";

import Search from "./components/SearchPage";

import ProfilePage from "./components/ProfilePage";
import EditProfile from "./components/EditProfile";

import "./App.css";
import './scss/customs.scss';
import "./components/Login.css";
import "./components/landingpagephoto.css";
import "./components/map.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthenticated: false
    };
  }

  async componentDidMount() {

    await fetch(`${process.env.REACT_APP_API_URL}/users/authenticate`, { credentials: 'include' })
      .then(res => res.json())
      .then(user => {
        if (user.error) {
          throw new Error(user.error);
        }
        this.setState({ user, isAuthenticated: true })
      })
      .catch(err => err);
  }

  setAuth(auth) {
    this.setState({ isAuthenticated: auth })
  }

  handleLogout() {
    fetch(`${process.env.REACT_APP_API_URL}/users/logout`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        this.setState({ isAuthenticated: false, user: null })
      })
  }

  render() {
    const { isAuthenticated, user } = this.state
    console.log('Is Authenticated: ', isAuthenticated);
    console.log('User: ', user)

    return (
      <HashRouter>
        <Header isAuthenticated={isAuthenticated} handleLogout={() => this.handleLogout()} />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/signup" component={SignUp} />
          <Route
            exact
            path="/login"
            render={props =>
              !isAuthenticated ? (
                <Login {...props} setAuth={this.setAuth.bind(this)} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/people"
            render={props =>
              isAuthenticated ? (
                <PeopleFeed {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/search"
            render={props =>
              isAuthenticated ? (
                <Search {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/events"
            render={props =>
              isAuthenticated ? (
                <EventFeed {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/user/:id/edit"
            render={props =>
              isAuthenticated ? (
                <EditProfile {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/user/:id"
            render={props =>
              isAuthenticated ? (
                <ProfilePage {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          {/* <Route path="/signup" component={SignUp} />
        <Route exact path="/" component={LandingPage} />
        <Route path="/login">
          <Login
          handleAuthentication={this.handleAthentication.bind(this)}/>
        </Route>
        <ProtectedRoutes path="/people" component={peopleFeed} /> 
        <ProtectedRoutes path="/events" component={EventFeed} />
        <ProtectedRoutes path="/search" component={Search} />
        <ProtectedRoutes path="/users/:id/edit" component={EditProfile} />
        <ProtectedRoutes path="/users/:id" component={ProfilePage} /> */}


        </Switch>

        <Footer />

      </HashRouter >
    );
  }
}

export default App;

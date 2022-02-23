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
import FlashMessage from "./components/FlashMessage";

import { flash } from './services/helpers';
import { authenticateUser, logoutUser } from "./services/userAuth";

import "./App.css";
import './scss/customs.scss';
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
    try {
      const user = await authenticateUser();
      if (user.error) {
        throw new Error(user.error);
      }
      this.setState({ user, isAuthenticated: true });
    } catch (error) {
      console.log(error);
    }
  }

  setAuth(auth) {
    if (auth) {
      flash('Logged in successfully', 'success');
    } else {
      flash('Unable to authenticate', 'error');
    }
    this.setState({ isAuthenticated: auth })
  }
  
  async handleLogout() {
    try {
      await logoutUser();
      flash('Logged out successfully', 'success');
      this.setState({ user: null, isAuthenticated: false });
    } catch (error) {
      flash(error, 'error');
    }
  }

  render() {
    const { isAuthenticated, user } = this.state;
    console.log('Is Authenticated: ', isAuthenticated);
    console.log('User: ', user)

    return (
      <HashRouter>
        <Header isAuthenticated={isAuthenticated} handleLogout={() => this.handleLogout()} />

        <FlashMessage />

        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route
            path="/signup"
            render={props => 
            <SignUp {...props} setAuth={this.setAuth.bind(this)} />}
          />
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
            path="/events/:location"
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
                <EditProfile {...props} loggedInUser={this.state.user} />
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
                <ProfilePage {...props} loggedInUser={this.state.user} />
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

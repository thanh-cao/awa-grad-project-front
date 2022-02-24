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
import PageNotFound from "./components/PageNotFound";

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

  setAuth(auth, user) {
    if (auth) {
      flash('Logged in successfully', 'success');
    } else {
      flash('Unable to authenticate', 'error');
    }
    this.setState({ user, isAuthenticated: auth })
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
        <Header isAuthenticated={isAuthenticated} user={user} handleLogout={() => this.handleLogout()} />

        <FlashMessage />

        <Switch>
          <Route exact path="/" render={props => <LandingPage {...props} isAuthenticated={isAuthenticated}/>} />
          <Route
            path="/signup"
            render={props =>
              isAuthenticated ? (
                <Redirect to="/search" />
              ) : (
              <SignUp {...props} setAuth={this.setAuth.bind(this)} />
            )}
          />
          <Route
            exact
            path="/login"
            render={props =>
              !isAuthenticated ? (
                <Login {...props} setAuth={this.setAuth.bind(this)} />
              ) : (
                <Redirect to="/search" />
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
          <Route path="*" component={PageNotFound} />
        </Switch>

        <Footer />

      </HashRouter >
    );
  }
}

export default App;

import { HashRouter, Switch, Route } from 'react-router-dom';
import React from 'react';

import Login from './components/Login';
import peopleFeed from './components/peopleFeed';
import eventFeed from './components/eventFeed';
import SignUp from './components/signUp';
import LandingPage from './components/landingPage';
//import UserProfile from './components/profilePage';
import Search from './components/searchPage';


import './App.css';
import './components/Login.css'
import './components/landingpagephoto.css'

function App() {
  return (
    <HashRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/peoplefeed" component={peopleFeed} />
      <Route path="/eventfeed" component={eventFeed} />
      <Route path="/signup" component={SignUp} />
      <Route path="/landingpage" component={LandingPage} />
     { /* <Route path="/users/:id" component={UserProfile} /> */}
     <Route path="/search" component={Search} />

    </Switch>
  </HashRouter>
  );
}

export default App;

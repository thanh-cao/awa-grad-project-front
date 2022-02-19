import { HashRouter, Switch, Route } from 'react-router-dom';
import React from 'react';

import Login from './components/Login';
import peopleFeed from './components/peopleFeed';
import eventFeed from './components/eventFeed';

import SignUp from './components/signUp';
import LandingPage from './components/landingPage';

import Search from './components/searchPage';

import ProfilePage from './components/ProfilePage';
import EditProfile from './components/EditProfile';


import './App.css';
import './components/Login.css'
import './components/landingpagephoto.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <HashRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/peoplefeed" component={peopleFeed} />
      <Route path="/eventfeed" component={eventFeed} />

      <Route path="/signup" component={SignUp} />
      <Route path="/landingpage" component={LandingPage} />
 
      <Route path="/search" component={Search} />

      <Route path="/users/:id/edit" component={EditProfile}/>
      <Route path="/users/:id" component={ProfilePage} />
      

    </Switch>
  </HashRouter>
  );
}

export default App;

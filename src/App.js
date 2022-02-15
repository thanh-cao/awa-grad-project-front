import { HashRouter, Switch, Route } from 'react-router-dom';
import React from 'react';

import Login from './components/Login';
import peopleFeed from './components/peopleFeed';
import eventFeed from './components/eventFeed';

import './App.css';

function App() {
  return (
    <HashRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/peoplefeed" component={peopleFeed} />
      <Route path="/eventfeed" component={eventFeed} />
    </Switch>
  </HashRouter>
  );
}

export default App;

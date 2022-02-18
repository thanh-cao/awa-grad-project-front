import { HashRouter, Switch, Route } from "react-router-dom";
import React from "react";

import Login from "./components/Login";
import peopleFeed from "./components/peopleFeed";
import eventFeed from "./components/eventFeed";
import SimpleMap from "./components/map";

import "./App.css";
import "./components/map.css";

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/peoplefeed" component={peopleFeed} />
        <Route path="/eventfeed" component={eventFeed} />
        <Route path="/map" component={SimpleMap} />
      </Switch>
    </HashRouter>
  );
}

export default App;

import React, {Component} from 'react';
import Entry from './Entry';
import Nav from './Nav';
import {Route} from 'react-router-dom';
import axios from 'axios';

import '../styles/App.css';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Nav />
        <Route exact path="/" component={Entry} />
        {/* <Route
          exact
          path="/summary"
          render={props => <Summary props={props} entries={entries} />}
        />
        <Route
          path="/summary/:word"
          render={props => <Summary props={props} entries={entries} />}
        />
        <Route
          path="/map"
          render={props => <Map props={props} entries={entries} />}
        /> */}
      </div>
    );
  }
}

export default App;

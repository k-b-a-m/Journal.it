//libraries
import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import axios from 'axios';

//components
import Home from './Home';
import Entry from './Entry';
import Nav from './Nav';

//styles
import '../styles/App.css';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Nav />
        <Route exact path="/" component={Home} />
        <Route path="/entry" component={Entry} />
        {/*
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

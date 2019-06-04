//libraries
import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import GoogleApiWrapper from './GoogleMaps';
import axios from 'axios';
import {connect} from 'react-redux';

//components
import Home from './Home';
import Entry from './Entry';
import Nav from './Nav';

//redux
import {fetchEntries} from '../redux/store';

//styles
import '../styles/App.css';

class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchEntries();
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
        /> */}
        <Route
          path="/map"
          render={props => (
            <GoogleApiWrapper props={props} /*entries={entries}*/ />
          )}
        />
      </div>
    );
  }
}

export default connect(
  null,
  {fetchEntries}
)(App);

//libraries
<<<<<<< HEAD
import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
=======
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
>>>>>>> ca06213fb54c8ad4b750b8efc80b94b9333304d9
import ReactDependentScript from 'react-dependent-script';
//import {GOOGLE_API_KEY} from '../../config';

//components
import Home from './Home';
import HomeCheck from './Home-Check';
import Nav from './Nav';
import Map from './Map';

//redux
import {fetchNearby} from '../redux/store';

//styles
import '../styles/App.css';

class App extends Component {
  componentDidMount() {
    var socket = io('http://localhost:3000');
    socket.on('updateNearby', entry => {
      console.log(entry);
    });

    navigator.geolocation.getCurrentPosition(position => {
<<<<<<< HEAD
      const {latitude, longitude} = position.coords;
      this.props.fetchNearby({
        coordinate: {latitude, longitude},
=======
      const { latitude, longitude } = position.coords;
      this.props.fetchNearby({
        coordinate: { latitude, longitude },
>>>>>>> ca06213fb54c8ad4b750b8efc80b94b9333304d9
        distance: 500,
      }); //distance is in feet 5280ft = 1mi
    });

    await axios
      .get('/googlemaps')
      .then(response => this.setState({ key: response.data }));
  }

  render() {
    return this.state.key.length ? (
      <div>
        {/* <Nav /> */}
        <Route exact path="/" component={Home} />
        <Route path="/homecheck" component={HomeCheck} />
        {/* <Route path="/entry" component={Entry} /> */}
        <Route
          exact
          path="/map"
          render={() => (
            <ReactDependentScript
              scripts={[
                `https://maps.googleapis.com/maps/api/js?key=${
                  this.state.key
                }&libraries=visualization`,
              ]}
            >
              <Map />
            </ReactDependentScript>
          )}
        />
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default connect(
  null,
  {fetchNearby}
)(App);

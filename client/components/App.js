//libraries
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import ReactDependentScript from 'react-dependent-script';
//import {GOOGLE_API_KEY} from '../../config';

//components
import HomeSphere from './Home-Sphere';
import Home from './Home';
import Nav from './Nav';
import Map from './Map';

//redux
import { fetchNearby } from '../redux/store';

//styles
import '../styles/App.css';

class App extends Component {
  componentDidMount() {
    var socket = io('http://localhost:3000');
    socket.on('updateNearby', entry => {
      console.log(entry);
    });

    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      this.props.fetchNearby({
        coordinate: { latitude, longitude },
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
        <Nav />
        <Route exact path="/" component={Home} />
        <Route exact path="/homesphere" component={HomeSphere} />
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
  { fetchNearby }
)(App);

//libraries
import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import ReactDependentScript from 'react-dependent-script';

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
    var socket = io('https://localhost:8443');
    socket.on('updateNearby', entry => {
      console.log(entry);
    });

    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      this.props.fetchNearby({
        coordinate: {latitude, longitude},
        distance: 500,
      }); //distance is in feet 5280ft = 1mi
    });
  }

  render() {
    return (
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
                  process.env.GOOGLE_API_KEY
                }&libraries=visualization`,
              ]}
            >
              <Map />
            </ReactDependentScript>
          )}
        />
      </div>
    );
  }
}

export default connect(
  null,
  {fetchNearby}
)(App);

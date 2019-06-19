//libraries
<<<<<<< HEAD
import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
=======
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
>>>>>>> 4e20fddba1589a3ed39a3c23e00ea353bfb74386
import axios from 'axios';

//components
import Home from './Home';
import HomeCheck from './Home-Check';
import Nav from './Nav';
import Map from './Map';
<<<<<<< HEAD

//redux
import {fetchNearby} from '../redux/store';
=======
import PrivacyPolicy from './PrivacyPolicy';

//redux
import { fetchNearby } from '../redux/store';
>>>>>>> 4e20fddba1589a3ed39a3c23e00ea353bfb74386

//styles
import '../styles/App.css';
import UserProfile from './UserPage';

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { key: '' };
  // }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      this.props.fetchNearby({
<<<<<<< HEAD
        coordinate: {latitude, longitude},
=======
        coordinate: { latitude, longitude },
>>>>>>> 4e20fddba1589a3ed39a3c23e00ea353bfb74386
        distance: 500,
      }); //distance is in feet 5280ft = 1mi
    });

    // await axios
    //   .get('/googlemaps')
    //   .then(response => this.setState({ key: response.data }));
  }

  render() {
    return (
      <div>
<<<<<<< HEAD
        <Nav className="nav-container" />
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/homecheck" component={HomeCheck} />
          <Route
            path="/user/:fbUserId"
            render={({match}) => (
              <UserProfile fbUserId={match.params.fbUserId} />
            )}
          />
          <Route exact path="/map" render={() => <Map />} />
          <Route exact path="/map" component={Map} />
        </div>
=======
        <Nav />
        <Route exact path="/" component={Home} />
        <Route path="/homecheck" component={HomeCheck} />
        <Route
          path="/user/:fbUserId"
          render={({ match }) => (
            <UserProfile fbUserId={match.params.fbUserId} />
          )}
        />
        <Route exact path="/map" component={Map} />
        <Route path="/privacypolicy" component={PrivacyPolicy} />
>>>>>>> 4e20fddba1589a3ed39a3c23e00ea353bfb74386
      </div>
    );
  }
}

export default connect(
  null,
  {fetchNearby}
)(App);

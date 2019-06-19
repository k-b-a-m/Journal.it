//libraries
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

//components
import Home from './Home';
import HomeCheck from './Home-Check';
import Nav from './Nav';
import Map from './Map';
import PrivacyPolicy from './PrivacyPolicy';

//redux
import { fetchNearby } from '../redux/store';

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
      const { latitude, longitude } = position.coords;
      this.props.fetchNearby({
        coordinate: { latitude, longitude },
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
      </div>
    );
  }
}

export default connect(
  null,
  { fetchNearby }
)(App);

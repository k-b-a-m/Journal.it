//libraries
import React, { Component } from "react";
import { Route } from "react-router-dom";
import GoogleApiWrapper from "./GoogleMaps";
import axios from "axios";
import { connect } from "react-redux";

//components
import HomeSphere from "./Home-Sphere";
import Home from "./Home";
import Entry from "./Entry";
import Nav from "./Nav";

//redux
import { fetchNearby } from "../redux/store";

//styles
import "../styles/App.css";

class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      //can put in distance in miles as 2nd parameter
      const {latitude, longitude} = position.coords
      this.props.fetchNearby({coordinate:{latitude, longitude}, distance:1})
      .then((resp) =>{
        console.log(resp.entries)
      });
    });
  }

  render() {
    return (
      <div>
        <Nav />
        <Route exact path="/" component={Home} />
        <Route exact path="/homesphere" component={HomeSphere} />
        {/* <Route path="/entry" component={Entry} /> */}
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
  { fetchNearby }
)(App);

/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Entry from './Entry';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import { addEntryThunk, getOrCreateUser } from '../redux/store';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGlobeAmericas,
  faPlusCircle,
  faHome,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import faker from 'faker';
import socket from './socket';
import axios from 'axios';
import session from 'express-session';

//style
import '../styles/Nav.css';

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      entry: '',
      spotifyUrl: '',
    };
  }

  toggleEntryFormOpen = () => {
    this.setState({ entryFormOpen: !this.state.entryFormOpen });
  };
  handleChangeInput = evt => {
    const { target } = evt;
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      const newDate = new Date().toString()
      const newEntry = {
        content: this.state.entry,
        latitude,
        longitude,
        dateTime: newDate,
        spotifyUrl: this.state.spotifyUrl,
        expireDate: new Date(Date.parse(newDate) + 30 * 24 * 60 * 60 * 1000).toString()
      };
      socket.emit('addNearby', newEntry);

      this.props
        .addEntryThunk(newEntry)
        .then(() => $('#exampleModalCenter').modal('hide'))
        .then(() => this.setState({ entry: '' }))
        .catch(e => console.log(`Error adding Entry:\n${e}`));
    });
    console.log(this.state);
  };

  render() {
    console.log(this.state.FB_APP);
    const { entryFormOpen, entry, spotifyUrl, FB_APP } = this.state;

    const responseFacebook = response => {
      this.props.getOrCreateUser(response.userID, response)
        .then(() => this.props.history.push(`/user/${response.userID}`))
        .catch(e => console.log(`Error gettingOrCreating Facebook User:\n${e}`));
    };
    return (
      <nav className="nav-container navbar">
        <FacebookLogin
          appId={'2336628819983490'}
          fields="name,email,picture"
          callback={responseFacebook}
          icon="fa-facebook"
          render={renderProps => (
            <button id="fbButton" onClick={renderProps.onClick}>
              <FontAwesomeIcon icon={faSignInAlt} />
            </button>
          )}
        />
        <NavLink to="/map" className="link">
          <FontAwesomeIcon
            icon={faGlobeAmericas}
            style={{ color: 'white', fontSize: '40px' }}
          />
        </NavLink>
        <NavLink exact to="/" className="link">
          <FontAwesomeIcon
            icon={faHome}
            style={{ color: 'white', fontSize: '40px' }}
          />
        </NavLink>
        <button
          type="button"
          className="btn"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          <FontAwesomeIcon
            icon={faPlusCircle}
            style={{ color: 'white', fontSize: '40px' }}
          />
        </button>
        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <div className="mb-2">
                      <label htmlFor="entry">Enter you story here</label>
                      <input
                        name="entry"
                        className="form-control"
                        type="text"
                        value={entry}
                        onChange={this.handleChangeInput}
                      />
                    </div>
                    <div>
                      <label htmlFor="spotifyUrl">
                        Enter spotify song link here!
                      </label>
                      <input
                        name="spotifyUrl"
                        className="form-control"
                        type="textarea"
                        value={spotifyUrl}
                        onChange={this.handleChangeInput}
                      />
                    </div>
                    <br />
                    <button
                      type="submit"
                      onClick={() => this.handleSubmit(event)}
                      className="btn btn-success"
                      disabled={entry === ''}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(connect(
  null,
  { addEntryThunk, getOrCreateUser }
)(Nav));

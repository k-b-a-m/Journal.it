/* eslint-disable no-unused-expressions */
import React, { Fragment, Component } from 'react';
import { NavLink, withRouter, Link } from 'react-router-dom';
import Entry from './Entry';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import {
  addEntryThunk,
  getOrCreateUser,
  logout,
  fetchUser,
} from '../redux/store';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGlobeAmericas,
  faPlusCircle,
  faHome,
  faSignInAlt,
  faSignOutAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import socket from './socket';
import axios from 'axios';
import session from 'express-session';

//TODO add conditional render of Link to UserPage

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
    console.log('New Entry user', this.props.user);
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      const newDate = new Date().toString();
      const newEntry = {
        content: this.state.entry,
        latitude,
        longitude,
        dateTime: newDate,
        spotifyUrl: this.state.spotifyUrl,
        expireDate: new Date(
          Date.parse(newDate) + 30 * 24 * 60 * 60 * 1000
        ).toString(),
        userId: this.props.user.id || null,
      };
      socket.emit('addNearby', newEntry);

      this.props
        .addEntryThunk(newEntry)
        .then(() => $('#exampleModalCenter').modal('hide'))
        .then(() => this.setState({ entry: '' }))
        .catch(e => console.log(`Error adding Entry:\n${e}`));
    });
  };

  render() {
    const { entryFormOpen, entry, spotifyUrl, FB_APP } = this.state;
    const { user } = this.props;

    const handleLogout = () => {
      this.props.logout();
      this.props.history.push('/');
    };

    const responseFacebook = response => {
      this.props
        .getOrCreateUser(response.userID, response)
        .then(() => this.props.history.push(`/user/${response.userID}`))
        .catch(e =>
          console.log(`Error gettingOrCreating Facebook User:\n${e}`)
        );
    };
    return (
      <nav className="nav-container navbar" style={{ backgroundColor: 'none' }}>
        <NavLink exact to="/" className="link">
          <FontAwesomeIcon
            icon={faHome}
            style={{ color: 'white', fontSize: '40px' }}
          />
        </NavLink>

        <NavLink to="/map" className="link">
          <FontAwesomeIcon
            icon={faGlobeAmericas}
            style={{ color: 'white', fontSize: '40px' }}
          />
        </NavLink>

        <div
          className="link"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          <FontAwesomeIcon
            icon={faPlusCircle}
            style={{ color: 'white', fontSize: '40px' }}
          />
        </div>
        {!user.facebookId ? (
          <FacebookLogin
            appId={'2336628819983490'}
            fields="name,email,picture"
            callback={responseFacebook}
            icon="fa-facebook"
            render={renderProps => (
              <div id="fbButton" onClick={renderProps.onClick} className="link">
                <FontAwesomeIcon icon={faSignInAlt} />
              </div>
            )}
          />
        ) : (
          <Fragment>
            <NavLink to={`/user/${user.facebookId}`} className="link">
              <FontAwesomeIcon
                icon={faUser}
                style={{ color: 'white', fontSize: '40px' }}
              />
            </NavLink>
            <NavLink onClick={handleLogout} id="logout">
              <FontAwesomeIcon icon={faSignOutAlt} />
            </NavLink>
          </Fragment>
        )}
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
                      <label htmlFor="entry">Enter your story here</label>
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
                      onClick={this.handleSubmit}
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

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { addEntryThunk, getOrCreateUser, logout, fetchUser }
  )(Nav)
);

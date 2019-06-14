/* eslint-disable no-unused-expressions */
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Entry from './Entry';

import {addEntryThunk} from '../redux/store';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGlobeAmericas, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import faker from 'faker';
import socket from './socket';

//style
import '../styles/Nav.css';

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      entry: '',
    };
  }

  toggleEntryFormOpen = () => {
    this.setState({entryFormOpen: !this.state.entryFormOpen});
  };
  handleChangeInput = evt => {
    const {target} = evt;
    this.setState({entry: target.value});
  };

  handleSubmit = evt => {
    evt.preventDefault();
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      const newEntry = {
        content: this.state.entry,
        latitude,
        longitude,
        dateTime: new Date().toString(),
      };
      socket.emit('addNearby', newEntry);

      this.props
        .addEntryThunk(newEntry)
        .then(() => $('#exampleModalCenter').modal('hide'))
        .then(() => this.setState({entry: ''}))
        .catch(e => console.log(`Error adding Entry:\n${e}`));
    });
  };

  render() {
    const {entryFormOpen} = this.state;
    const {entry} = this.state;
    return (
      <nav className="nav-container navbar">
        <NavLink to="/map" className="link">
          <FontAwesomeIcon
            icon={faGlobeAmericas}
            style={{color: 'white', fontSize: '40px'}}
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
            style={{color: 'white', fontSize: '40px'}}
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
                  <div>
                    <label htmlFor="entry">Enter your story here</label>
                    <input
                      name="content"
                      className="form-control"
                      type="textarea"
                      value={entry}
                      onChange={() => this.handleChangeInput(event)}
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default connect(
  null,
  {addEntryThunk}
)(Nav);

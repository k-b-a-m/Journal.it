import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Entry from "./Entry";
import "../styles/Nav.css";
import {addEntryThunk} from '../redux/store';
import {connect} from 'react-redux';

class Nav extends React.Component {
  constructor() {
    super(),
      (this.state = {
        entryFormOpen: false
      });
  }

  toggleEntryFormOpen = () =>{
    this.setState({entryFormOpen: !this.state.entryFormOpen})
  }
  handleChangeInput = evt => {
    const {target} = evt;
    this.setState({entry: target.value});
  };

  handleSubmit = evt => {
    evt.preventDefault();
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      const newEntry = {
        content: evt.target.content.value,
        latitude,
        longitude,
      };
      this.props.addEntryThunk(newEntry)
        .then(() => {
          this.props.toggleEntryFormOpen();
        });
    });
    $('#exampleModalCenter').modal('hide');
  };

  render() {
    const { entryFormOpen } = this.state;
    const {entry} = this.state;
    return (
      <div className="nav-container" style={{backgroundColor: 'white'}}>
        <div>
          <h1 className="logo">Journal.it</h1>
        </div>
        <div className="menu-container">
          <NavLink exact to="/" className="link">
            <h4 style={{ marginLeft: "10px", marginRight: "10px" }}>Home</h4>
          </NavLink>

          <NavLink to="/map" className="link">
            <h4 style={{ marginLeft: "10px", marginRight: "10px" }}>Map</h4>
          </NavLink>

          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
            Add new Entry
          </button>

          <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalCenterTitle">Contribute with a new Journal</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={() => this.handleSubmit(event)}>
                    <div>
                      <label htmlFor="entry">Enter you story here</label>
                      <input
                        name="content"
                        className="form-control"
                        type="textarea"
                        value={entry}
                        onChange={evt => this.handleChangeInput(evt)}
                      />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-success" disabled={entry === ''}>Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {addEntryThunk}
)(Nav);

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Entry from "./Entry";
import "../styles/Nav.css";

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

  render() {
    const { entryFormOpen } = this.state;
    return (
      <div className="nav-container">
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

  
            <h4
              style={{ marginLeft: "10px", marginRight: "10px" }}
              onClick={this.toggleEntryFormOpen}
            >
              New Entry
            </h4>
          </div>

        {entryFormOpen ? <Entry toggleEntryFormOpen = {this.toggleEntryFormOpen} /> : <div />}
      </div>
    );
  }
}

export default Nav;

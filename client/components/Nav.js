import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

import '../styles/Nav.css';

const Nav = props => {
  return (
    <div className="nav-container">
      <div>
        <h1 className="logo">ONE</h1>
      </div>
      <div className="menu-container">
        <NavLink exact to="/" className="link">
          <h4 style={{marginLeft: '10px', marginRight: '10px'}}>Entry</h4>
        </NavLink>
        <NavLink to="/summary" className="link">
          <h4 style={{marginLeft: '10px', marginRight: '10px'}}>Summary</h4>
        </NavLink>
        <NavLink to="/map" className="link">
          <h4 style={{marginLeft: '10px', marginRight: '10px'}}>Map</h4>
        </NavLink>
      </div>
    </div>
  );
};

export default Nav;

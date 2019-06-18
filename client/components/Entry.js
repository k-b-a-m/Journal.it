import React, {Component} from 'react';
import Nav from './Nav';
import {addEntryThunk} from '../redux/store';
import {connect} from 'react-redux';
import '../styles/Entry.css';
import {Redirect} from 'react-router-dom';

class Entry extends Component {
  constructor() {
    super();
    this.state = {
      entry: '',
    };
  }

  handleChangeInput = evt => {
    const {target} = evt;
    this.setState({entry: target.value});
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const date = new Date().toString();
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      const newEntry = {
        content: evt.target.content.value,
        latitude,
        longitude,
        dateTime: date,
      };
      this.props.addEntryThunk(newEntry).then(() => {
        this.props.toggleEntryFormOpen();
      });
    });
  };

  render() {
    const {entry} = this.state;
    return (
      <div className="modal fade">
        <div>
          <h3>Enter Something</h3>
          <div>
            <form
              className="d-flex flex-column justify-content-center"
              onSubmit={() => this.handleSubmit(event)}
            >
              <input
                name="content"
                type="text"
                value={entry}
                onChange={evt => this.handleChangeInput(evt)}
              />
              <br />
              <button disabled={entry === ''}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {addEntryThunk}
)(Entry);

import React, { Component } from "react";
import Nav from "./Nav";
import { addEntryThunk } from "../redux/store";
import { connect } from "react-redux";
import "../styles/Entry.css";
import { Redirect } from "react-router-dom";

class Entry extends Component {
  constructor() {
    super();
    this.state = {
      entry: ""
    };
  }

  handleChangeInput = evt => {
    const { target } = evt;
    this.setState({ entry: target.value });
  };

<<<<<<< HEAD
  getDateTime = () => {
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const hours =
      today.getHours() < 10 ? `0${today.getHours()}` : today.getHours();
    const minutes =
      today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
    const seconds =
      today.getSeconds() < 10 ? `0${today.getSeconds()}` : today.getSeconds();
    const time = hours + ":" + minutes + ":" + seconds;
    this.setState({ date, time });
  };

  componentDidMount() {
    this.getDateTime();
    this.interval = setInterval(() => this.getDateTime(), 1000);
    navigator.geolocation.getCurrentPosition(success => this.setState({
      curLatitude: success.coords.latitude,
      curLongitude: success.coords.longitude,
    }))
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     JSON.stringify(JSON.stringify(prevProps)) !==
  //       JSON.stringify(JSON.stringify(this.props)) ||
  //     prevState.date !== this.state.date
  //   ) {
  //     const submittedEntry = this.props.entries.filter(
  //       entry => entry.date === this.state.date
  //     )[0];
  //     this.setState({submittedEntry});
  //   }
  // }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

=======
>>>>>>> 017db5c6f1080c91a16e15a8aaa039dff57b7f28
  handleSubmit = evt => {
    evt.preventDefault();
    const newEntry = {
      content: evt.target.content.value
    };
    this.props.addEntryThunk(newEntry).then(() => {
      this.props.toggleEntryFormOpen();
    });
  };

  render() {
    const { entry } = this.state;
    return (
      <div className="entry-container"> 
        <div >
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
              <button disabled={entry === ""}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addEntryThunk }
)(Entry);

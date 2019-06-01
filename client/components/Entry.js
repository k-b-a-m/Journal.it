import React, {Component} from 'react';
import Nav from './Nav';

import '../styles/JournalEntry.css';

class JournalEntry extends Component {
  constructor() {
    super();
    this.state = {
      entry: '',
      date: '',
      time: '',
      submittedEntry: '',
    };
  }

  handleChangeInput = evt => {
    const {target} = evt;
    this.setState({entry: target.value});
  };

  getDateTime = () => {
    const today = new Date();
    const date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    const hours =
      today.getHours() < 10 ? `0${today.getHours()}` : today.getHours();
    const minutes =
      today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
    const seconds =
      today.getSeconds() < 10 ? `0${today.getSeconds()}` : today.getSeconds();
    const time = hours + ':' + minutes + ':' + seconds;
    this.setState({date, time});
  };

  componentDidMount() {
    this.getDateTime();
    if (this.props.entries[0]) {
      const submittedEntry = this.props.entries.filter(
        entry => entry.date === this.state.date
      )[0];
      this.setState({submittedEntry});
    } else {
      this.interval = setInterval(() => this.getDateTime(), 1000);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(JSON.stringify(prevProps)) !==
        JSON.stringify(JSON.stringify(this.props)) ||
      prevState.date !== this.state.date
    ) {
      const submittedEntry = this.props.entries.filter(
        entry => entry.date === this.state.date
      )[0];
      this.setState({submittedEntry});
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      history,
      match,
      location,
      colors,
      handleChangeColor,
      currentColor,
      handleSubmit,
      entries,
    } = this.props;
    if (!entries[0]) return <div />;
    const {entry, date, time, submittedEntry} = this.state;

    if (submittedEntry) {
      clearInterval(this.interval);
      return (
        <div
          className={`${
            submittedEntry.color.name
              ? `${submittedEntry.color.name}-background`
              : ''
          }`}
          style={{width: '100vw', height: '100vh'}}
        >
          <Nav />
          <div className="container-fluid entry-container">
            {/* <div>Location</div> */}
            <div style={{marginTop: '15px'}}>
              <h1>{submittedEntry.text}</h1>
            </div>
            <div className="date-container">
              <h3>{submittedEntry.date}</h3>
              <h3>{submittedEntry.time}</h3>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Nav />
          <div className="container-fluid entry-container">
            <div>Location</div>
            <div>
              <form className="d-flex flex-column justify-content-center">
                <input
                  type="text"
                  value={entry}
                  onChange={evt => this.handleChangeInput(evt)}
                />
              </form>
            </div>
            <div>
              {colors.map(color => (
                <button
                  className={`${color.name} ${
                    color.name === currentColor ? 'active' : ''
                  }`}
                  key={color.id}
                  onClick={evt => handleChangeColor(evt, color.id)}
                >
                  {color.name}
                </button>
              ))}
            </div>
            <button
              onClick={() =>
                handleSubmit({text: entry, date: date, time: time})
              }
              disabled={entry === '' || currentColor === ''}
            >
              Submit
            </button>
            <div className="date-container">
              <h3>{date}</h3>
              <h3>{time}</h3>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default JournalEntry;

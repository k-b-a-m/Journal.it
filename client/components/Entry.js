import React, {Component} from 'react';
import Nav from './Nav';

import '../styles/Entry.css';

class Entry extends Component {
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
    // if (this.props.entries[0]) {
    //   const submittedEntry = this.props.entries.filter(
    //     entry => entry.date === this.state.date
    //   )[0];
    //   this.setState({submittedEntry});
    // } else {
    //   this.interval = setInterval(() => this.getDateTime(), 1000);
    // }
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

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  render() {
    return <div>hi</div>;
  }
}

export default Entry;

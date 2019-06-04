import React from "react";
import { connect } from "react-redux";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPos: { latitude: 0, longitude: 0 }
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      this.setState({
        currentPos: {
          latitude,
          longitude
        }
      });
    });
  }

  render() {
    const { entries } = this.props;

    return (
      <div>
        <div className="container">
          <h3>Location</h3>
          <ul>
            {entries.map(entry => (
              <li key={entry.id}>
                {entry.content}
                {entry.latitude}
                {entry.longitude}
                {entry.likes}
                {entry.createdAt}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { entries: state };
};

export default connect(mapStateToProps)(Home);

// getDateTime = () => {
//   const today = new Date();
//   const date =
//     today.getFullYear() +
//     "-" +
//     (today.getMonth() + 1) +
//     "-" +
//     today.getDate();
//   const hours =
//     today.getHours() < 10 ? `0${today.getHours()}` : today.getHours();
//   const minutes =
//     today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
//   const seconds =
//     today.getSeconds() < 10 ? `0${today.getSeconds()}` : today.getSeconds();
//   const time = hours + ":" + minutes + ":" + seconds;
//   this.setState({ date, time });
// };

// componentDidMount() {
//   this.getDateTime();
//   this.interval = setInterval(() => this.getDateTime(), 1000);
//   navigator.geolocation.getCurrentPosition(success => this.setState({
//     curLatitude: success.coords.latitude,
//     curLongitude: success.coords.longitude,
//   }))
// }

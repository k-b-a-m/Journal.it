import React from "react";
import { connect } from "react-redux";
import * as geolib from 'geolib';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPos: { latitude: 0, longitude: 0 },
      entriesCoords: [],
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
    // const {entries} = this.props;
    // const entriesCoords = [];
    // entries.forEach(entry => {
    //   entriesCoords.push({latitude: entry.latitude, longitude: entry.longitude})
    // })
    // this.setState({entriesCoords: entriesCoordsArr})
  }

  render() {
    const { entries } = this.props;
    const {entriesCoords} = this.state;
    const distance = geolib.convertDistance(geolib.getDistance(
        {latitude: this.state.currentPos.latitude, longitude: this.state.currentPos.longitude},
        {latitude: this.state.currentPos.latitude -0.001, longitude: this.state.currentPos.longitude}
      ), 'ft')
    const bounds = geolib.getBounds([
      {latitude: this.state.currentPos.latitude, longitude: this.state.currentPos.longitude},
      {latitude: this.state.currentPos.latitude -0.001, longitude: this.state.currentPos.longitude}
    ])
    const entriesCoordsArr = [];
    entries.forEach(entry => {
      entriesCoordsArr.push({latitude: entry.latitude, longitude: entry.longitude})
    })
    console.log([...entriesCoordsArr]);
    entriesCoordsArr.forEach(entry => {
      console.log(`Is ${{...entry}} within radius?: ${geolib.isPointWithinRadius({latitude: entry.latitude, longitude: entry.longitude}, {latitude: this.state.currentPos.latitude,longitude: this.state.currentPos.longitude}, 5000000)}`)
    })
    // const entriesInBounds = geolib.isPointWithinRadius([...entriesCoordsArr])
    return (
      <div>
        <div className="container">
          <h3>Location, your coordinates right now are: {this.state.currentPos.latitude}, {this.state.currentPos.longitude}</h3>
          {/* <h3>You are {Math.round(distance)} feet away from {this.state.currentPos.latitude -0.001}, {this.state.currentPos.longitude} right now!</h3> */}
          <ul>
            <h5>Here are coordinates within 1640 feet of your coordinates</h5>
            <hr/>
            {entries.map(entry => (
              geolib.isPointWithinRadius({latitude: entry.latitude, longitude: entry.longitude}, {latitude: this.state.currentPos.latitude,longitude: this.state.currentPos.longitude}, 5000) ?
              <li key={entry.id} style={{marginBottom: '3px'}}>
                Content: {entry.content}
                <br/>
                Lat: {entry.latitude}
                <br/>
                Long: {entry.longitude}
                <br/>
                Likes: {entry.likes}
                <br/>
                CreatedAt: {entry.createdAt}
              </li>
              : null
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

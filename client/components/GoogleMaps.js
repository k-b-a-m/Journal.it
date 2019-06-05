/* eslint-disable no-warning-comments */
import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {fetchEntries} from '../redux/store';
import {connect} from 'react-redux';

// Read here for more info on functions and stuff... https://github.com/fullstackreact/google-maps-react

export class Container extends Component {
  constructor(){
    super();
    this.state = {
      curLatitude: '',
      curLongitude: '',
      entries: [],
      heatmapVisible: false,
    }
  }
  componentDidMount() {
    // this.props.fetchEntries()
    //   .then(entries => {
    //     this.setState({entries})
    //     this.props.google.maps.heatmap.setMap(true);
    //   })
    //   .catch(e => console.log(`Error fetching Entries:\n${e}`));

  }
  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    const {entries} = this.state;
    const style = {
      width: '100vw',
      height: '100vh'
    }
    const heatMapData = {
      positions: [entries],
      options: {
        radius: 20,
        opacity: 0.6,
      }
    }
    return (
      <div>
        <Map
          google={this.props.google}
          onReady={this.fetchPlaces}
          style={style}
          initialCenter={{
            lat: 40.763383,
            lng: -73.9758986
          }}
          zoom={15}
          onClick={this.onMapClicked}
          id="map"
          heatmapLibrary={true}
          heatmap={heatMapData}
        >

          <Marker onClick={this.onMarkerClick}
                  title="Grand Central"
                  name={'Current location'} />

          <InfoWindow onClose={this.onInfoWindowClose}>
              <div>
                <p>Click on the map or drag the marker to select location where the incident occurred</p>
              </div>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}


// TODO: Move api key to an .env file
export default connect(
  null,
  {fetchEntries}
)(GoogleApiWrapper({
  apiKey: ('AIzaSyAaAqRSIMwcm4FFeKZc-rldVWRbufj-7fA')
})(Container))

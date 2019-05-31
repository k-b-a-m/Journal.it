/* eslint-disable no-warning-comments */
import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

// Read here for more info on functions and stuff... https://github.com/fullstackreact/google-maps-react

export class Container extends Component {
  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    const style = {
      width: '100vw',
      height: '100vh'
    }
    var points = [
      { lat: 42.02, lng: -77.01 },
      { lat: 42.03, lng: -77.02 },
      { lat: 41.03, lng: -77.04 },
      { lat: 42.05, lng: -77.02 }
    ]
    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }
    return (
      <Map
        google={this.props.google}
        onReady={this.fetchPlaces}
        style={style}
        initialCenter={{
          lat: 40.753383,
          lng: -73.9758986
        }}
        zoom={15}
        onClick={this.onMapClicked}
        bounds={bounds}
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
    )
  }
}


// TODO: Move api key to an .env file
export default GoogleApiWrapper({
  apiKey: ('AIzaSyAaAqRSIMwcm4FFeKZc-rldVWRbufj-7fA')
})(Container)

/* eslint-disable no-warning-comments */
import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

// Read here for more info on functions and stuff... https://github.com/fullstackreact/google-maps-react

function initAutocomplete() {
  // Create the search box and link it to the UI element.

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

export class Container extends Component {
  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    const style = {
      width: '100vw',
      height: '100vh'
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
export default GoogleApiWrapper({
  apiKey: ('AIzaSyAaAqRSIMwcm4FFeKZc-rldVWRbufj-7fA')
})(Container)

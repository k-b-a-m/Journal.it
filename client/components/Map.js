import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateHeatMap } from '../redux/store';
import { GoogleApiWrapper } from 'google-maps-react';

import '../styles/App.css';

class Map extends Component {
  constructor() {
    super();
    this.state = { currentPosition: { lat: 40.705092, lng: -74.009166 } };
  }

  componentDidMount() {
    const { heatmapData, updateHeatMapThunk } = this.props;
    const { currentPosition } = this.state;
    let map, heatmap, marker, markerImage, circle;

    const locationUpdateInterval = 10000;
    let self = this;

    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        disableDefaultUI: true,
        zoomControl: true,
        center: currentPosition,
        zoom: 14,
        styles: [
          {
            elementType: 'geometry',
            stylers: [
              {
                color: '#212121',
              },
            ],
          },
          {
            elementType: 'labels.icon',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#757575',
              },
            ],
          },
          {
            elementType: 'labels.text.stroke',
            stylers: [
              {
                color: '#212121',
              },
            ],
          },
          {
            featureType: 'administrative',
            elementType: 'geometry',
            stylers: [
              {
                color: '#757575',
              },
            ],
          },
          {
            featureType: 'administrative.country',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#9e9e9e',
              },
            ],
          },
          {
            featureType: 'administrative.land_parcel',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#bdbdbd',
              },
            ],
          },
          // {
          //   featureType: 'poi',
          //   elementType: 'labels.text.fill',
          //   stylers: [
          //     {
          //       color: '#757575',
          //     },
          //   ],
          // },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [
              {
                color: '#181818',
              },
            ],
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#616161',
              },
            ],
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.stroke',
            stylers: [
              {
                color: '#1b1b1b',
              },
            ],
          },
          {
            featureType: 'road',
            elementType: 'geometry.fill',
            stylers: [
              {
                color: '#2c2c2c',
              },
            ],
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#8a8a8a',
              },
            ],
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [
              {
                color: '#373737',
              },
            ],
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [
              {
                color: '#3c3c3c',
              },
            ],
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry',
            stylers: [
              {
                color: '#4e4e4e',
              },
            ],
          },
          {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#616161',
              },
            ],
          },
          {
            featureType: 'transit',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#757575',
              },
            ],
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
              {
                color: '#000000',
              },
            ],
          },
          // {
          //   featureType: 'water',
          //   elementType: 'labels.text.fill',
          //   stylers: [
          //     {
          //       color: '#3d3d3d  ',
          //     },
          //   ],
          // },
        ],
      });
    }

    initMap();

    navigator.geolocation.getCurrentPosition(position => {
      let pos;
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      self.setState({
        currentPosition: pos,
      });

      map.setCenter(pos);
      markerImage = new google.maps.MarkerImage(
        'bluedotsm.png',
        new google.maps.Size(15, 15),
        new google.maps.Point(0, 0),
        new google.maps.Point(7.5, 7.5)
      );

      marker = new google.maps.Marker({
        position: self.state.currentPosition,
        map: map,
        icon: markerImage,
      });

      circle = new google.maps.Circle({
        strokeColor: 'blue',
        strokeOpacity: 0.8,
        strokeWeight: 0.6,
        fillColor: 'blue',
        fillOpacity: 0.35,
        map: map,
        center: self.state.currentPosition,
        radius: 152.4,
      });
    });

    setInterval(function() {
      let pos;
      navigator.geolocation.getCurrentPosition(position => {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        //checking if user has moved more than ~500ft since last position update,
        //and setting map center if they have.
        if (
          Math.abs(pos.lat - self.state.currentPosition.lat) > 0.00137826 ||
          Math.abs(pos.lng - self.state.currentPosition.lng) > 0.00137826
        ) {
          map.panTo(pos);
        }

        self.setState({
          currentPosition: pos,
        });
      });

      marker.setOptions({ position: self.state.currentPosition });
      circle.setOptions({ center: self.state.currentPosition });
    }, locationUpdateInterval);

    setInterval(function() {
      if (circle.fillColor === 'blue') {
        circle.setOptions({ fillColor: 'white', strokeColor: 'white' });
      } else {
        circle.setOptions({ fillColor: 'blue', strokeColor: 'blue' });
      }
    }, 2500);

    const getPoints = () => {
      return this.props.heatmapData.map(entry => {
        return new google.maps.LatLng(entry.latitude, entry.longitude);
      });
    };

    google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
      var bounds = map.getBounds();
      var ne = bounds.getNorthEast();
      var sw = bounds.getSouthWest();

      const coords = {
        max: { latitude: ne.lat(), longitude: ne.lng() },
        min: { latitude: sw.lat(), longitude: sw.lng() },
      };

      updateHeatMapThunk(coords);

      heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map,
        gradient: [
          'rgba(0,0,0,0)',
          'rgba(255,0,255,1)',
          'rgba(0,255,255,1)',
          'rgba(255,255,255,1)',
        ],
      });
    });

    google.maps.event.addListener(map, 'idle', function() {
      var bounds = map.getBounds();
      var ne = bounds.getNorthEast();
      var sw = bounds.getSouthWest();

      const coords = {
        max: { latitude: ne.lat(), longitude: ne.lng() },
        min: { latitude: sw.lat(), longitude: sw.lng() },
      };

      updateHeatMapThunk(coords);
      if (heatmap !== undefined) {
        heatmap.setOptions({
          data: getPoints(),
        });
      }
    });
  }

  componentWillUnmount() {
    clearInterval();
  }

  render() {
    return <div id="map" />;
  }
}

const mapStateToProps = state => {
  return {
    entries: state.entries,
    heatmapData: state.heatmap,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateHeatMapThunk: coords => dispatch(updateHeatMap(coords)),
  };
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDU3C_l0COpEISg44ejBmRNgYZkW_CX32g',
  libraries: ['visualization'],
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Map)
);

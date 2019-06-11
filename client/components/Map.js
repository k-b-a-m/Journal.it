import React, { Component } from 'react';
import { connect } from 'react-redux';
import updateHeatMap from '../redux/store'

class Map extends Component {
  componentDidMount() {
    let map, heatmap;
    const { entries } = this.props;

    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.6679211, lng: -73.9826607 },
        zoom: 12,
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
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#757575',
              },
            ],
          },
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
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#3d3d3d',
              },
            ],
          },
        ],
      });

      console.log(map.getBounds())
      heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map,
      });
    }

    // Heatmap data
    const getPoints = () => {
      return entries.map(
        entry =>
          new google.maps.LatLng(
            Number(entry.latitude),
            Number(entry.longitude)
          )
      );
    };
    initMap();
  }
  render() {
    return <div id="map" />;
  }
}

const mapStateToProps = state => {
  return {
    entries: state.entries,
  };
};

export default connect(
  mapStateToProps,
  null
)(Map);

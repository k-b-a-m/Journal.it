import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateHeatMap } from '../redux/store';

class Map extends Component {
  // constructor() {
  //   super();
  //   state: {
  //     heatmap: null;
  //   }
  // }

  componentDidMount() {
    const { heatmapData, updateHeatMapThunk } = this.props;
    let map, heatmap;

    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.705092, lng: -74.009166 },
        zoom: 18,
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

    const getPoints = () => {
      console.log('in get points');
      console.log(this.props.heatmapData);

      return this.props.heatmapData.map(entry => {
        const newPoint = new google.maps.LatLng(
          entry.latitude,
          entry.longitude
        );
        return newPoint;
      });
    };

    google.maps.event.addListener(map, 'idle', function() {
      console.log('bounds changed');
      var bounds = map.getBounds();
      var ne = bounds.getNorthEast();
      var sw = bounds.getSouthWest();
      var nw = new google.maps.LatLng(ne.lat(), sw.lng());
      var se = new google.maps.LatLng(sw.lat(), ne.lng());

      const coords = {
        max: { latitude: ne.lat(), longitude: ne.lng() },
        min: { latitude: sw.lat(), longitude: sw.lng() },
      };

      updateHeatMapThunk(coords);
      heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map,
      });
    });
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);

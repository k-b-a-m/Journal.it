import React, { Component } from "react";
import { connect } from "react-redux";
import { updateHeatMap } from "../redux/store";
import Nav from './Nav';
import { GoogleApiWrapper } from "google-maps-react";

class Map extends Component {
  componentDidMount() {
    const { heatmapData, updateHeatMapThunk } = this.props;
    let map, heatmap;

    function initMap() {
      map = new google.maps.Map(document.getElementById("map"), {
        disableDefaultUI: true,
        zoomControl: true,
        center: { lat: 40.705092, lng: -74.009166 },
        zoom: 14,
        styles: [
          {
            elementType: "geometry",
            stylers: [
              {
                color: "#212121"
              }
            ]
          },
          {
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#757575"
              }
            ]
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#212121"
              }
            ]
          },
          {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [
              {
                color: "#757575"
              }
            ]
          },
          {
            featureType: "administrative.country",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#9e9e9e"
              }
            ]
          },
          {
            featureType: "administrative.land_parcel",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#bdbdbd"
              }
            ]
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
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [
              {
                color: "#181818"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#616161"
              }
            ]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#1b1b1b"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#2c2c2c"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#8a8a8a"
              }
            ]
          },
          {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [
              {
                color: "#373737"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [
              {
                color: "#3c3c3c"
              }
            ]
          },
          {
            featureType: "road.highway.controlled_access",
            elementType: "geometry",
            stylers: [
              {
                color: "#4e4e4e"
              }
            ]
          },
          {
            featureType: "road.local",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#616161"
              }
            ]
          },
          {
            featureType: "transit",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#757575"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                color: "#000000"
              }
            ]
          }
          // {
          //   featureType: 'water',
          //   elementType: 'labels.text.fill',
          //   stylers: [
          //     {
          //       color: '#3d3d3d  ',
          //     },
          //   ],
          // },
        ]
      });
    }

    initMap();

    const getPoints = () => {
      return this.props.heatmapData.map(entry => {
        return new google.maps.LatLng(entry.latitude, entry.longitude);
      });
    };

    google.maps.event.addListener(map, "idle", function() {
      var bounds = map.getBounds();
      var ne = bounds.getNorthEast();
      var sw = bounds.getSouthWest();

      const coords = {
        max: { latitude: ne.lat(), longitude: ne.lng() },
        min: { latitude: sw.lat(), longitude: sw.lng() }
      };

      updateHeatMapThunk(coords);

      heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map
      });
    });
  }

  render() {
    return <div><Nav className="nav-container"/><div id="map" /></div>;
  }
}

const mapStateToProps = state => {
  return {
    entries: state.entries,
    heatmapData: state.heatmap
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateHeatMapThunk: coords => dispatch(updateHeatMap(coords))
  };
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDU3C_l0COpEISg44ejBmRNgYZkW_CX32g",
  libraries: ["visualization"]
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Map)
);

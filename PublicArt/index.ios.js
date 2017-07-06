/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  DeviceEventEmitter,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Image
} from 'react-native';
import { StackNavigator, TabNavigator, NavigationActions} from 'react-navigation';
import PointDetails from './app/PointDetails.js'
import Mapview from './app/MapView/Mapview.js'
import AppCamera from './app/CameraView/Camera.js';
import firebaseApp from './firebase';
import Icon from 'react-native-vector-icons/Ionicons';
<<<<<<< HEAD
import Favorites from './app/FavoritesView/MyFavorites.js';
import TabBar from './app/tabBar/Navigator.js'
=======
import Favorites from './app/MyFavorites'
import MostPopular from './app/MostPopular';
>>>>>>> master


export default class PublicArt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: '',
      nearbyPois: [],
      allPois: [],
    }
  }

  componentDidMount() {

    let nearbyPOIs = [];
    // get location of current user
    navigator.geolocation.getCurrentPosition((position) => {
        this.setState({'position': position});
        firebaseApp.database().ref('/').orderByChild('name')
        .on('value', snapshot => {
          nearbyPOIs = [];
          let allpois = snapshot.val();
          if (typeof allpois == 'object') {
            allpois = Object.values(allpois);
          }

          this.setState({allPois: allpois});
          allpois.forEach(poi => {
            let x1 = +poi.lat;
            let y1 = +poi.lng;
            let x2 = +this.state.position.coords.latitude;
            let y2 = +this.state.position.coords.longitude;
            let distance = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2))
            if (distance < 0.008) nearbyPOIs.push(poi);
          })
          this.setState({'nearbyPois': nearbyPOIs})
      },
      (error) => console.error(error),
      {timeout: 25000, enableHighAccuracy: true, maximumAge: 1000})
    });

    this.watchID = navigator.geolocation.watchPosition((newPosition) => {
        this.setState({'position': newPosition });
        nearbyPOIs = [];
        this.state.allPois.forEach(poi => {
            let x1 = +poi.lat;
            let y1 = +poi.lng;
            let x2 = +this.state.position.coords.latitude;
            let y2 = +this.state.position.coords.longitude;
            let distance = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2))
            if (distance < 0.008) nearbyPOIs.push(poi);
        })
        this.setState({'nearbyPois': nearbyPOIs})
      },
      (error) => console.error(error),
      {timeout: 10000, enableHighAccuracy: true, maximumAge: 1000, distanceFilter: 3}
    )
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <TabBar screenProps={{
        pois: this.state.nearbyPois,
        allPois: this.state.allPois,
        position: this.state.position}} />)
  }
}

AppRegistry.registerComponent('PublicArt', () => PublicArt);


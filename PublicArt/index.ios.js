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
  TouchableWithoutFeedback
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { Accelerometer, Gyroscope } from 'react-native-sensors';
import PointDetails from './app/PointDetails'
import Mapview from './app/Mapview'
import ReactNativeHeading from 'react-native-heading'
import AppCamera from './app/Camera';
import firebaseApp from './firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import Favorites from './app/MyFavorites'

export default class PublicArt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headingIsSupported: false,
      heading: '',
      position: '',
      nearbyPois: [],
      allPois: [],
      gyro: {}
    }
    this.onMapPress = this.onMapPress.bind(this)
    this.onFavPress = this.onFavPress.bind(this)
}

  componentDidMount() {
    const accelerationObservable = new Accelerometer({
      updateInterval: 100, // defaults to 100ms
    });

  // Normal RxJS functions
  accelerationObservable
  .subscribe(speed => this.setState({gyro: speed}));
    /* get direction of user */
    ReactNativeHeading.start(15)
    .then(didStart => {
      this.setState({'headingIsSupported': didStart})
    })

    DeviceEventEmitter.addListener('headingUpdated', data => {
      this.setState({'heading': data.heading})
    })

    let nearbyPOIs = [];
    /* get location of current user*/
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
      },
      (error) => console.error(error),
      {timeout: 25000, enableHighAccuracy: true, maximumAge: 1000}
    )
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
    this.props.navigation.setParams({ handleMapInfo: this.onMapPress });
    this.props.navigation.setParams({ handleMyFaves: this.onFavPress });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onMapPress(){
    this.props.navigation.navigate('Mapview', {userLocation: this.state.position, markers: this.state.allPois})
  }

  onFavPress() {
    this.props.navigation.navigate('Favorites', {})
  }

  static navigationOptions = (props) => {
      var navigation = props.navigation
      return {
        headerRight:
          <Icon name="ios-map" size={30} iconStyle={marginLeft=20}
                onPress={navigation.state.params && navigation.state.params.handleMapInfo}>
              <Text>  </Text>
          </Icon>,
        headerLeft:
          <Text>  <Icon name="ios-heart" size={30} iconStyle={marginLeft=20}
                        onPress={navigation.state.params && navigation.state.params.handleMyFaves} />
          </Text>,
        title: 'I (AR)t NY'
        };
    }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <AppCamera tilt={this.state.gyro} pois={this.state.nearbyPois} position={this.state.position} heading={this.state.heading} navigation={navigation} />
      </View>
    );
  }



}

// App Router

const AppRouter = StackNavigator({
    Home: {
        screen: PublicArt
    },
    Details: {
        screen: PointDetails,
        path: 'poi/:name'
    },
    Mapview: {
      screen: Mapview
    },
    Favorites: {
      screen: Favorites
    }
})

// Stylesheet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 1.0)',
    borderRadius: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  }
});

AppRegistry.registerComponent('PublicArt', () => AppRouter);

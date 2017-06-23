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
  DeviceEventEmitter
} from 'react-native';
import ReactNativeHeading from 'react-native-heading'
import AppCamera from './app/Camera';
import firebaseApp from './firebase';

export default class PublicArt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headingIsSupported: false,
      heading: '',
      position: ''
    }
  }

  componentDidMount() {
    const result = firebaseApp.database().ref('/').orderByChild('name')
    .on('value', (snapshot) => {
      console.log('here');
      const val = snapshot.val();
      console.log(val);
    })

    navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          position: position
        });
      },
      (error) => console.error(error),
      {timeout: 10000, enableHighAccuracy: true, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition((newPosition) => {
        this.setState({
          position: newPosition
        });
      },
      (error) => console.error(error),
      {timeout: 10000, enableHighAccuracy: true, maximumAge: 1000, distanceFilter: 3}
    )

    ReactNativeHeading.start(1)
    .then(didStart => {
      this.setState({'headingIsSupported': didStart})
    })

    DeviceEventEmitter.addListener('headingUpdated', data => {
      this.setState({'heading': data.heading})
    })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Lat: {this.state.position.coords ? this.state.position.coords.latitude : null}</Text>
        <Text>Long: {this.state.position.coords ? this.state.position.coords.longitude : null}</Text>
        <AppCamera heading={this.state.heading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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

AppRegistry.registerComponent('PublicArt', () => PublicArt);

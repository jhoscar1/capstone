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
import Camera from 'react-native-camera';
import * as firebase from 'firebase';
import ReactNativeHeading from 'react-native-heading'
import global from './secrets';

const firebaseConfig = {
  apiKey: global.apiKey,
  authDomain: global.authDomain,
  databaseURL: global.databaseURL,
  storageBucket: global.storageBucket
};
const firebaseApp = firebase.initializeApp(firebaseConfig)
import AppCamera from './app/Camera';

export default class PublicArt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headingIsSupported: false,
      heading: ''
    }
  }

  componentDidMount() {
    ReactNativeHeading.start(1)
    .then(didStart => {
      this.setState({'headingIsSupported': didStart})
    })

    DeviceEventEmitter.addListener('headingUpdated', data => {
      this.setState({'heading': data.heading})
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <AppCamera heading={this.state.heading}/>
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

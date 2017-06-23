import React, { Component } from 'react';
import Camera from 'react-native-camera';
import {Text, Dimensions, StyleSheet} from 'react-native';

export default class AppCamera extends Component {
    render() {
        return (
            <Camera
            ref={(cam) => {
                this.camera = cam;
            }}
            style={styles.preview}
            >
                <Text>Heading: {this.props.heading}</Text>
                <Text>Hello this is on a cam</Text>
            </Camera>
        )
    }
}

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  }
});
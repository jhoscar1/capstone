import React, { Component } from 'react';
import Camera from 'react-native-camera';
import {Text, Dimensions, StyleSheet} from 'react-native';
import PointOfInterest from './PointOfInterest';

export default class AppCamera extends Component {
    render() {
        return (
            <Camera
            ref={(cam) => {
                this.camera = cam;
            }}
            style={styles.preview}
            >
                { this.props.points.map(point => {
                    return <PointOfInterest navigation={this.props.navigation} key={point.id} point={point} />
                }) }
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
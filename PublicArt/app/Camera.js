import React, { Component } from 'react';
import Camera from 'react-native-camera';
import {Text, Dimensions, StyleSheet} from 'react-native';
import PointOfInterest from './PointOfInterest';

export default class AppCamera extends Component {
    render() {
        console.log('THIS.PROPS.POINTS',this.props.points)
        return (
            <Camera
            ref={(cam) => {
                this.camera = cam;
            }}
            style={styles.preview}
            >
                { this.props.points.length
                    ?this.props.points.map(point => {
                    return <PointOfInterest navigation={this.props.navigation} key={point.id} point={point} />
                    })
                    :null
                 }
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

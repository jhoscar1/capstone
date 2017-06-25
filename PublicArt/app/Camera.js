import React, { Component } from 'react';
import Camera from 'react-native-camera';
import {Text, Dimensions, StyleSheet} from 'react-native';
import firebaseApp from '../firebase'

export default class AppCamera extends Component {
    constructor(props) {
        super(props);
    }

    getDistanceInMeters(x1, x2, y1, y2) {
        // haversine
        let R = 6378.137 // radius of eath in KM
        let dLat = x2 * Math.PI / 180 - x1 * Math.PI / 180;
        let dLng = y2 * Math.PI / 180 - y1 * Math.PI / 180;
        let a = Math.sin(dLat/2) * Math.sin(dLng/2) + Math.cos(x1 * Math.PI / 180) * Math.cos(x2 * Math.PI / 180)
                * Math.sin(dLng/2) * Math.sin(dLng/2);
        let c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        let d = R * c;
        return d * 1000; // Meters
    }

    // this returns the relative direction of the POI - for example, if user is facing south
    // but the attraction is due north, then this will return 180
    getDirection(x1, x2, y1, y2, userDir) {
        // converts the differences btwn lat's and lng's into radians
        let dLat = (x2-x1) * (Math.PI / 180);
        let dLng = (y2-y1) * (Math.PI / 180);
        // convert current lcoation lat and lng to radians
        x1 = x1 * (Math.PI / 180);
        y1 = y1 * (Math.PI / 180);
        let y = Math.sin(dLng) * Math.cos(y2);
        let x = Math.cos(x1) * Math.sin(x2) - Math.sin(x1) * Math.cos(x2) * Math.cos(dLng)
        let brng = Math.atan2(y, x) * (180 / Math.PI)
        if (brng < 0) brng = 360-Math.abs(brng);
        return brng - userDir;
    }

    render() {
        /* gets all pois and their lats and lngs */
        let relPosition =[];
        this.props.pois.forEach(poi => {
            let x1 = +poi.lat;
            let y1 = +poi.lng;
            let x2 = +this.props.position.coords.latitude;
            let y2 = +this.props.position.coords.longitude;
            let relativePos = {
              distance: this.getDistanceInMeters(x1, x2, y1, y2),
              dir: this.getDirection(x1, x2, y1, y2, this.props.heading)
            }
            relPosition.push(relativePos)
          })

        return (
            <Camera
            ref={(cam) => {
                this.camera = cam;
            }}
            style={styles.preview}
            >
                <Text>Heading: {this.props.heading}</Text>
                {
                    (relPosition.length) ? <Text> First POI distance: {relPosition[0].distance} and direction: {relPosition[0].dir} </Text>
                    : null
                }
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
import React, { Component } from 'react';
import Camera from 'react-native-camera';
import {Text, Dimensions, StyleSheet} from 'react-native';
import firebaseApp from '../firebase'

export default class AppCamera extends Component {
    constructor(props) {
        super(props);
    }

    getDistanceInMeters(long1, long2, lat1, lat2) {
        // haversine
        let R = 6371 // radius of eath in KM
        let dLat = (lat2 - lat1) * (Math.PI / 180);
        let dLng = (long2 - long1) * (Math.PI / 180);
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180)
                * Math.sin(dLng / 2) * Math.sin(dLng / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;
        return d * 1000; // Meters
    }

    // this returns the relative direction of the POI - for example, if user is facing south
    // but the attraction is due north, then this will return 180
    getDirection(long1, long2, lat1, lat2) {
        // // converts the differences btwn lat's and lng's into radians
        // let dLat = (lat2 - lat1) * (Math.PI / 180);
        // let dLng = (long2 - long1) * (Math.PI / 180);
        // // convert current lcoation lat and lng to radians
        // long1 = long1 * (Math.PI / 180);
        // lat1 = lat1 * (Math.PI / 180);
        // let y = Math.sin(dLng) * Math.cos(lat2);
        // let x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng)
        // let brng = Math.atan2(y, x) * (180 / Math.PI)
        // // if (brng < 0) brng = 360 - Math.abs(brng);
        // // return brng - userDir;
        // return brng;

        let theta = Math.atan2(lat2 - lat1, long2 - long1);
        if (theta < 0){
          theta += (2 * (Math.PI))
        }
        theta =  theta * (180 / Math.PI);
        return theta;
      }

        ///VERY DUMB MATH//

   convertToOrientation (userDirection, thetaDirection) {
     const absDiff = Math.abs(thetaDirection - userDirection); //is abs diff > 180?
     let relDir = absDiff;

     let left;
     let otherWayAround;
     if (absDiff > 180) { //is the difference greater than 180?
       otherWayAround = true;
     }
     else {
       otherWayAround = false;
     }

     if ((userDirection > thetaDirection) && (!otherWayAround) || (userDirection < thetaDirection) && (otherWayAround)) { //is the object to the left or the right?
       left = true;
     }
     else {
       left = false;
     }

     if (otherWayAround) {
       if (left) {
         relDir = 360 - thetaDirection + userDirection;
       }
       else {
         relDir = 360 - userDirection + thetaDirection;
       }
     }

     if (left){
       relDir = -relDir;
     }
     return relDir;
  }


    render() {
        /* gets all pois and their lats and lngs */
        let relPosition =  [];
        this.props.pois.forEach(poi => {
            let lat2 = +poi.lat;
            let long2 = +poi.lng;
            let lat1 = +this.props.position.coords.latitude;
            let long1 = +this.props.position.coords.longitude;
            let relativePos = {
              distance: this.getDistanceInMeters(long1, long2, lat1, lat2),
              dir: this.convertToOrientation(this.props.heading, this.getDirection(long1, long2, lat1, lat2))
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
                    (relPosition.length) ? <Text> First POI distance: {relPosition[0].distance} and direction: {relPosition[0].dir} and name: {this.props.pois[0].name} </Text>
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

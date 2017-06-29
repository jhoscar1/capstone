import React, { Component } from 'react';
import Camera from 'react-native-camera';
import {Dimensions, StyleSheet, View} from 'react-native';
import PointOfInterest from './PointOfInterest';
import utils from '../utils';

export default class AppCamera extends Component {
    constructor(props) {
        super(props);
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
              distance: utils.getDistanceInMeters(long1, long2, lat1, lat2),
              dir: utils.convertToOrientation(this.props.heading, utils.getDirection(long1, long2, lat1, lat2))
            }
            relPosition.push(relativePos)
          })
        console.log(relPosition.length)
        let counter = 1;
        return (
            <View>
                <Camera ref={(cam) => {this.camera = cam}} style={styles.preview} />
                {
                    (relPosition.length) ? relPosition.map((poi, idx) => {
                        return (
                            (poi.distance < 300 && poi.dir < 50 && poi.dir > -50) ?
                            <PointOfInterest dir={poi.dir} num={counter++} navigation={this.props.navigation}
                                            key={idx} tilt={this.props.tilt} point={this.props.pois[idx]} onClick={() => {this.setState({selectedPOI})}} />
                            : null
                        )
                    })
                    : null
                }

            </View>)
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

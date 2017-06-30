import React, { Component } from 'react';
import Camera from 'react-native-camera';
import {Dimensions, StyleSheet, View} from 'react-native';
import PointOfInterest from './PointOfInterest';
import SelectedPointOfInterest from './SelectedPointOfInterest';
import utils from '../utils';

export default class AppCamera extends Component {
    constructor(props) {
        super(props);
        this.handlePress = this.handlePress.bind(this);
        this.state = {
            selectedPOI: {},
            relSelectedPos: {},
            selected: false
        }
    }

    handlePress(POI) {
        if (!this.state.selected) {
            const relativePosition = utils.getRelativePos(POI, this.props.heading, this.props.position.coords)
            this.setState({
                selectedPOI: POI,
                relSelectedPos: relativePosition,
                selected: true
            });
        }
        else {
            this.setState({
                selectedPOI: {},
                relSelectedPos: {},
                selected: false
            })
        }
    }

    render() {
        /* gets all pois and their lats and lngs */
        let relPosition =  [];
        this.props.pois.forEach(poi => {
            let relativePos = utils.getRelativePos(poi, this.props.heading, this.props.position.coords)
            relPosition.push(relativePos)
        })
        console.log(relPosition.length)
        let counter = 1;
        console.log(relPosition.filter(el => {
            return el.distance < 300;
        }));
        return (
            <View>
                <Camera ref={(cam) => {this.camera = cam}} style={styles.preview} />
                    {   Object.keys(this.state.selectedPOI).length ?
                    <SelectedPointOfInterest
                        dir={this.state.relSelectedPos.dir}
                        navigation={this.props.navigation}
                        handlePress={this.handlePress}
                        point={this.state.selectedPOI}
                        left={50 + ((Dimensions.get('window').width / 80) * this.state.relSelectedPos.dir)}
                        top={50*counter + ((Dimensions.get('window').height/300)) + Dimensions.get('window').height/10}
                    />
                    :
                    (relPosition.length) ? relPosition.reverse().map((poi, idx) => {
                        return (
                            (poi.distance < 300 && poi.dir < 50 && poi.dir > -50) ?
                            <PointOfInterest
                                dir={poi.dir}
                                num={counter++}
                                navigation={this.props.navigation}
                                key={idx}
                                tilt={this.props.tilt}
                                point={poi.poi}
                                handlePress={this.handlePress}
                            />
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

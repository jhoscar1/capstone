import React, { Component } from 'react';
import Camera from 'react-native-camera';
import {Text, Dimensions, StyleSheet, View, ActivityIndicator, DeviceEventEmitter} from 'react-native';
import PointOfInterest from './PointOfInterest';
import utils from '../../utils';
import { StackNavigator } from 'react-navigation';
import ReactNativeHeading from 'react-native-heading'
import { Accelerometer } from 'react-native-sensors';
import SelectedPointOfInterest from '../SelectedPointOfInterest';
import PointDetails from '../PointDetails.js'

class AppCamera extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gyro: {},
			headingIsSupported: false,
			heading: '',
			selectedPOI: {},
            relSelectedPos: {},
            selected: false
		}
		this.handlePress = this.handlePress.bind(this);
	}

	componentDidMount() {
		const accelerationObservable = new Accelerometer({
    	updateInterval: 100, // defaults to 100ms
	    });

		// Normal RxJS functions
	  	accelerationObservable
	  	.subscribe(speed => this.setState({gyro: speed}));
	    // get direction of user
	    ReactNativeHeading.start(15)
	    .then(didStart => {
	      this.setState({'headingIsSupported': didStart})
	    })

	    DeviceEventEmitter.addListener('headingUpdated', data => {
	      this.setState({'heading': data.heading})
	    })

	}

	handlePress(POI) {
        if (!this.state.selected) {
            const relativePosition = utils.getRelativePos(POI, this.state.heading, this.props.screenProps.position.coords)
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
        this.props.screenProps.pois.forEach(poi => {
            let relativePos = utils.getRelativePos(poi, this.state.heading, this.props.screenProps.position.coords)
            relPosition.push(relativePos)
        })
		let counter = 1;


		return (
			<View style={styles.container}>
			{
				(this.props.screenProps.position && relPosition.length) ?
					[<Camera  ref={(cam) => {this.camera = cam}} style={styles.preview} key={'cam'} />,			
					
					Object.keys(this.state.selectedPOI).length ?
                    <SelectedPointOfInterest
						key={this.state.selectedPOI.unique_id}
                        dir={this.state.relSelectedPos.dir}
                        dist={this.state.relSelectedPos.distance}
                        navigation={this.props.navigation}
                        handlePress={this.handlePress}
                        point={this.state.selectedPOI}
                        left={50 + ((Dimensions.get('window').width / 80) * this.state.relSelectedPos.dir)}
                        top={50*counter + ((Dimensions.get('window').height/300)) + Dimensions.get('window').height/10}
                    />
                    :
                    (relPosition.length) ? relPosition.map((poi, idx) => {
                        return (
                            (poi.distance < 300 && poi.dir < 50 && poi.dir > -50) ?
                            <PointOfInterest 
                                dir={poi.dir} 
                                dist={poi.distance} 
                                num={counter++} 
                                navigation={this.props.screenProps.navigation}
                                key={idx} 
                                tilt={this.state.gyro} 
                                point={this.props.screenProps.pois[idx]} 
                                onClick={() => {this.setState({selectedPOI})}}
                                handlePress={this.handlePress}
                            />
                            : null
                        )
                    })
                    : null]
				: <View><ActivityIndicator size={'large'} /><Text style={{fontSize: 24, fontWeight: '800'}}>Loading Art Installations...</Text></View>
			}
			</View>
		)
		


	}
}

// Stylesheet
const styles = StyleSheet.create({
  container: {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
  },
  preview: {
	flex: 1,
	justifyContent: 'flex-end',
	alignItems: 'center',
	height: Dimensions.get('window').height,
	width: Dimensions.get('window').width
  },
});

const CameraStack = StackNavigator({
	MainCamera: {
		screen: AppCamera,
		title: "Home"
	},
	CameraDetails: {
		screen: PointDetails,
		path: 'poi/:name',
		title: "Details"
	}
}, {
  headerMode: "float"
})

export default CameraStack;


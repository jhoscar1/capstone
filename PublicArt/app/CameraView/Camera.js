import React, { Component } from 'react';
import Camera from 'react-native-camera';
import {Text, Dimensions, StyleSheet, View, ActivityIndicator, DeviceEventEmitter} from 'react-native';
import PointOfInterest from './PointOfInterest';
import utils from '../../utils';
import { StackNavigator, NavigationActions } from 'react-navigation';
import firebaseApp from '../../firebase';
import ReactNativeHeading from 'react-native-heading'
import { Accelerometer, Gyroscope } from 'react-native-sensors';
import Icon from 'react-native-vector-icons/Ionicons';
import SelectedPointOfInterest from './SelectedPointOfInterest';

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
            const relativePosition = utils.getRelativePos(POI, this.props.heading, this.props.position.coords)
            this.setState({
                selectedPOI: POI,
                relSelectedPos: relativePosition,
                selected: true
            });
            console.log(relativePosition);
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
		console.log(relPosition.length)
		// console.log("CAMERA PROPS: ", this.props)
		let counter = 1;


		return (
			<View style={styles.container}>
			{
				(this.props.screenProps.position && relPosition.length) ?
					[<Camera  ref={(cam) => {this.camera = cam}} style={styles.preview} />,			
					
					Object.keys(this.state.selectedPOI).length ?
                    <SelectedPointOfInterest
                        dir={this.state.relSelectedPos.dir}
                        dist={this.state.relSelectedPos.distance}
                        navigation={this.props.screenProps.navigation}
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
  button: {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: 'rgba(52, 52, 52, 1.0)',
	borderRadius: 10
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
  },
});


export default AppCamera;


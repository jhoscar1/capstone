import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  Image,
  AsyncStorage,
  FlatList,
  Dimensions
} from 'react-native';
import firebaseApp from '../../firebase';
import {StackNavigator} from 'react-navigation';

export default class ListItem extends Component {
	constructor(props) {
		super(props);
		this.mapView = this.mapView.bind(this);
		this.moreInfo = this.moreInfo.bind(this);
	}

	mapView() {
		this.props.navigation.navigate('SinglePOIMap',
			{
				userLocation: this.props.position,
				markers: [this.props.item]
			})
	}

	moreInfo() {
		console.log("More Info! ", this.props.navigation)
		this.props.navigation.navigate('Details', {name: this.props.item.link})
	}

	render() {
		console.log('list item props: ', this.props);
		const viewStyle = {
			flexDirection: 'row',
			justifyContent: 'space-around',
			alignItems: 'center'
		}

		const textStyle = {
			fontSize: 20,
			textAlign: 'center'
		}

		const textContainerStyle = { width: Dimensions.get('window').width - 80 }

		const { navigation } = this.props;
		
		return(
			<View key={this.props.item.unique_id}>
				<View style={viewStyle}>
					<Image source={{uri: `https://www.nycgovparks.org${this.props.item.thumb_path}`}}
	               		    style={{height: 75, width: 75}} />
					<View style={textContainerStyle}>
						<Text style={textStyle}>{this.props.item.name}</Text>
					</View>
				</View>
				<View style={viewStyle}>
					<Button onPress={this.mapView} title='Map View' />
					<Button onPress={() => {navigation.navigate('Details', {name: this.props.item.link})}} title='More Info'/>
					{
						this.props.unfavorite ?
						<Button onPress={navigation.state.params && (() => {this.props.unfavorite(this.props.item)})} title='Un-favorite' />
						:
						null
					}
				</View>
			</View>			
		)
 	}
}




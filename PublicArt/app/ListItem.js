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
import firebaseApp from '../firebase';

export default class ListItem extends Component {
	constructor(props) {
		super(props);
		this.mapView = this.mapView.bind(this);
		this.unfavorite = this.unfavorite.bind(this);
		this.moreInfo = this.moreInfo.bind(this);
	}


	mapView() {

	}

	unfavorite() {

	}

	moreInfo() {

	}

	render() {
		const viewStyle = {
			flexDirection: 'row',
			justifyContent: 'space-around',
			alignItems: 'center'
		}

		const textStyle = {
			fontSize: 20,
			textAlign: 'center'
		}

		const textContainerStyle = {
			width: Dimensions.get('window').width - 80
		}

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
					<Button onPress={this.moreInfo} title='More Info'/>
					<Button onPress={this.unfavorite} title='Un-favorite' />
				</View>
			</View>			
		)
  }


}
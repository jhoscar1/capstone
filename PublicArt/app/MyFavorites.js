import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  Image,
  AsyncStorage
} from 'react-native';
import firebaseApp from '../firebase';

export default class MyFavorites extends Component {
	constructor(props) {
		super(props);
		this.state = {
			favorited: []
		}
	}

	componentDidMount() {
		let faves = [];
		AsyncStorage.getAllKeys()
		.then(allKeys => {
			allKeys.map(key => {
				AsyncStorage.getItem(key)
				.then(val => {
					if (val !== null && val !== 'false'){
						let fbId;
						firebaseApp.database().ref('/').orderByChild('unique_id').equalTo(+key)
						.on('value', item => {
							fbId = +Object.keys(item.val())[0]
						})
						console.log("fbId: ", fbId)
						firebaseApp.database().ref(fbId)
						.on('value', poi => {
							this.setState({favorited: this.state.favorited.concat(poi.val())})
						})
					}
				})
				.catch(console.error.bind(console))
			})
		})
	}

	render() {
		console.log(this.state.favorited.length, " faves saved")
		return (<View>
			{
				(this.state.favorited.length) ? this.state.favorited.map(poi => {
					return (<Text key={poi.unique_id}> {poi.name} </Text>)
				})
				: <Text>You haven't saved any favorites yet!</Text>
			}
			</View>)
	}

	static navigationOptions = (props) => {
    	var navigation = props.navigation
    	return {
        	title: 'My Favorites'
        };
    }

}
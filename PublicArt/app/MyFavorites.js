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
import ListItem from './ListItem'

export default class MyFavorites extends Component {
	constructor(props) {
		super(props);
		this.state = {
			favorited: [],
		}
		this.unfavorite = this.unfavorite.bind(this);
		this.getFavorites = this.getFavorites.bind(this);
	}

	unfavorite(poi) {
		const pointID = String(poi.unique_id)

		// set to false on async storage
		AsyncStorage.setItem(pointID, 'false');

		// get firebase id
		let fbId, itemLikes;
		firebaseApp.database().ref('/').orderByChild('unique_id').equalTo(+pointID)
		.on('value', item => {
			fbId = +Object.keys(item.val())[0];
			itemLikes = item.val()[fbId].likes
		})

		// decrement likes in firebase
		let ref = firebaseApp.database().ref(`${fbId}`);
		ref.update({ likes: itemLikes-1})

		this.getFavorites();
	}

	getFavorites() {
		// let faves = [];
		this.setState({favorited: []})
		AsyncStorage.getAllKeys()
		.then(allKeys => {
			allKeys.map(key => {
				AsyncStorage.getItem(key)
				.then(val => {
					if (val !== null && val !== 'false'){
						let getFbId = () => {
							return new Promise((resolve, reject) => {
								firebaseApp.database().ref('/').orderByChild('unique_id').equalTo(+key)
								.on('value', item => {
									resolve(+Object.keys(item.val())[0])
								})
							})
						}

						getFbId()
						.then((fbId) => {
							firebaseApp.database().ref(fbId)
							.on('value', poi => {
								// faves.push(poi.val());
								this.setState({favorited: this.state.favorited.concat([poi.val()])})
							})
						})

					}
				})
				.catch(console.error.bind(console))
			})
		})
	}

	componentDidMount() {
		this.getFavorites();
	}

	static navigationOptions = (props) => {
    	var navigation = props.navigation
    	return {
        	title: 'My Favorites'
        };
    }

	render() {
		return (<View>
					{
						(this.state.favorited.length) ?
						<FlatList data={this.state.favorited}
							renderItem={({item}) => <ListItem  key={item.unique_id} position={this.props.navigation.state.params.position}
															   item={item} navigation={this.props.navigation} unfavorite={this.unfavorite}/> } />
						: <Text>You haven't saved any favorites yet!</Text>
					}
				</View>)
	}


}
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  Image,
  AsyncStorage,
  FlatList,
  Dimensions,
  AppRegistry
} from 'react-native';
import firebaseApp from '../../firebase';
import ListItem from './ListItem'
import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigator, TabNavigator, NavigationActions} from 'react-navigation';
import PointDetails from '../PointDetails.js'
import MapStack from '../MapView/Mapview.js'

class MyFavorites extends Component {
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
								this.setState({favorited: this.state.favorited.concat([poi.val()])})
							})
						})

					}
				})
				.catch(console.error.bind(console))
			})
		})
		this.props.navigation.setParams({handlePopular: this.onPopularPress})
	}

	componentDidMount() {
		this.getFavorites();
	}

	// static navigationOptions = (props) => {
	// 	const navigation = props.navigation;
	// 	return {
	//     	tabBarLabel: 'Favorites',
	//     	tabBarIcon: ({tintColor}) => (
	// 	    	<Icon name="ios-heart-outline" navigation={navigation} size={26} style={{width: 26, height: 26, /*tintColor: tintColor*/}} />
	// 	    )
	// 	}
    // }

	render() {
		console.log('favorites props: ', this.props)
		return (<View>
					{
						(this.state.favorited.length) ?
						<FlatList data={this.state.favorited}
							keyExtractor={item => String(item.unique_id)}
							renderItem={({item}) => <ListItem 
											position={this.props.screenProps.position}
											item={item} 
											navigation={this.props.navigation} 
											unfavorite={this.unfavorite}/> 
											} 
										/>
						: <Text>You haven't saved any favorites yet!</Text>
					}
				</View>)
	}
}

const FavStack = StackNavigator({
  MyFaves: {
    screen: MyFavorites,
    title: "My Favorites"
  },
  Details: {
    screen: PointDetails,
    path: 'poi/:name',
    title: "Details"
  },
  SinglePOIMap: {
    screen: MapStack,
    title: "Map View"
  }
})

export default FavStack



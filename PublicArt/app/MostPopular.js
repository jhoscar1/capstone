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
import ListItem from './FavoritesView/ListItem'
import { StackNavigator } from 'react-navigation';
import MapStack from './MapView/Mapview.js'
import PointDetails from './PointDetails.js'

class MostPopular extends Component {
	constructor(props) {
		super(props);
		this.state = {
			popular: []
		}
	}

	componentDidMount() {
		firebaseApp.database().ref('/').orderByChild('likes')
		.on('value', snapshot => {
			const resultArr = Object.values(snapshot.val());
			const sortedByPopularity = resultArr.sort((a, b) => {
				return b.likes - a.likes
			})
			this.setState({popular: sortedByPopularity})
		})
	}

	render() {
		return (
			<View>
			{	this.state.popular.length ?
				<FlatList
					data={this.state.popular}
					initialNumToRender={10}
					keyExtractor={item => String(item.unique_id)} 
					renderItem={({item}) => <ListItem 
						item={item}
						position={this.props.screenProps.position}
						navigation={this.props.navigation}
					/>
					}
				/>
				:
				<Text>No one likes any art!!!</Text>
			}
			</View>
		)
	}
}

const PopularStack = StackNavigator({
	MostPop: {
		screen: MostPopular,
		title: "Most Popular"
	},
	PopDetails: {
		screen: PointDetails,
		path: 'poi/:name',
    	title: "Details"
	},
	PopMap: {
		screen: MapStack,
		title: "Map View"
	}
})


export default PopularStack;




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
			console.log(sortedByPopularity);
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

	static navigationOptions = (props) => {
    	var navigation = props.navigation
    	return {
        	title: 'Most Popular'
        };
    }
}

export default MostPopular;
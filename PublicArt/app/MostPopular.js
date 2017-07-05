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
			this.setState({popular: [sortedByPopularity]})
		})
	}

	render() {
		return (
			<View>
			{	this.state.popular.length ?
				<FlatList
					data={this.state.popular}
					renderItem={({item}) => <ListItem key={item.unique_id} item={item} />
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
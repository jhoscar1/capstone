import React from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';
import ListItem from './FavoritesView/ListItem'
import { StackNavigator } from 'react-navigation';
import MapStack from './MapView/Mapview.js'
import PointDetails from './PointDetails.js'

const MostPopular = (props) => {
	return (
		<View>
		{	props.screenProps.allPois.length ?
			<FlatList
				data={props.screenProps.allPois}
				keyExtractor={item => String(item.unique_id)} 
				renderItem={({item}) => <ListItem 
					item={item}
					position={props.screenProps.position}
					navigation={props.navigation}
				/>
				}
			/>
			:
			<Text>No one likes any art!!!</Text>
		}
		</View>
	)
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
}, {
  headerMode: "float"
})


export default PopularStack;




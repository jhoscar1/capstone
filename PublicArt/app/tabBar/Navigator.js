import React from 'react';
import { TabNavigator } from 'react-navigation';
import CameraStack from '../CameraView/Camera'
import MapStack from '../MapView/Mapview'
import FavStack from '../FavoritesView/MyFavorites'
import Icon from 'react-native-vector-icons/Ionicons';
import PopularStack from '../MostPopular.js'

// Routers
const TabBar = TabNavigator({
	Home: {
		screen: CameraStack,
		navigationOptions: (props) => ({
			title: 'I (AR)t NY',
			tabBarLabel: 'Home',
			tabBarIcon: ({tintColor, focused}) => (
			<Icon name="ios-camera-outline" size={26} style={{left: 3, width: 26, height: 26, color: (focused) ? "#3a85ff" : "#3a4454"}} />
		  )
		})
	},
	Map: {
	  screen: MapStack,
		navigationOptions: (props) => ({
			title: 'I (AR)t NY',
			tabBarLabel: 'Map',
			tabBarIcon: ({tintColor, focused}) => (
			<Icon name="ios-map-outline" size={26} style={{left: 3, width: 26, height: 26, color: (focused) ? "#3a85ff" : "#3a4454"}} />
		  )
		})
	},
	Favorites: {
	  screen: FavStack,
	  navigationOptions: (props) => ({
			title: 'I (AR)t NY',
			tabBarLabel: 'Favorites',
			tabBarIcon: ({tintColor, focused}) => (
			<Icon name="ios-heart-outline" size={26} style={{width: 26, height: 26, color: (focused) ? "#3a85ff" : "#3a4454"}} />
		  )
		})
	},
	Popular: {
		screen: PopularStack,
		navigationOptions: (props) => ({
			title: 'I (AR)t NY',
			tabBarLabel: 'Popular',
			tabBarIcon: ({tintColor, focused}) => (
			<Icon name="ios-ribbon-outline" size={26} style={{left: 3, width: 26, height: 26, color: (focused) ? "#3a85ff" : "#3a4454"}} />
		  )
		})

	}
}, {
	lazy: true,
	tabBarOptions: {
		activeTintColor: '#3a85ff',
		inactiveTintColor: '#3a4454',
		activeBackgroundColor: 'white',
		inactiveBackgroundColor: 'white',
		title: "I (AR)t NY"
	}
})

export default TabBar;

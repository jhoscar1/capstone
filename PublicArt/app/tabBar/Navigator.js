import React, { Component } from 'react';
import { StackNavigator, TabNavigator, NavigationActions} from 'react-navigation';
import AppCamera from '../CameraView/Camera'
import Mapview from '../MapView/Mapview'
import FavStack from '../FavoritesView/MyFavorites'
import Icon from 'react-native-vector-icons/Ionicons';

// Routers
const TabBar = TabNavigator({
	Home: {
		screen: AppCamera,
		navigationOptions: (props) => ({
			title: 'I (AR)t NY',
			tabBarLabel: 'Home',
			tabBarIcon: ({tintColor}) => (
			<Icon name="ios-camera-outline" size={26} style={{width: 26, height: 26}} />
		  )
		})
	},
	Map: {
	  screen: Mapview,
		navigationOptions: (props) => ({
			title: 'I (AR)t NY',
			tabBarLabel: 'Map',
			tabBarIcon: ({tintColor}) => (
			<Icon name="ios-map-outline" size={26} style={{width: 26, height: 26}} />
		  )
		})
	},
	Favorites: {
	  screen: FavStack,
	  navigationOptions: (props) => ({
			title: 'I (AR)t NY',
			tabBarLabel: 'Favorites',
			tabBarIcon: ({tintColor}) => (
			<Icon name="ios-heart-outline" size={26} style={{width: 26, height: 26}} />
		  )
		})
	}
}, {
	tabBarOptions: {
		activeTintColor: 'blue',
		inactiveTintColor: 'black',
		activeBackgroundColor: 'white',
		inactiveBackgroundColor: 'white',
		title: "I (AR)t NY"
	}
})

export default TabBar;

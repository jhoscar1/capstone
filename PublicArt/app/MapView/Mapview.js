import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import MapView from 'react-native-maps';
import MapCallout from './MapCallout';
import { StackNavigator } from 'react-navigation';
import PointDetails from '../PointDetails';

class Mapview extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedMarker: false,
    };
    this.markerSelected = this.markerSelected.bind(this)
  }

  markerSelected (markerId) {
    this.setState({
      selectedMarker: markerId
    });
  }

  render() {
    console.log("map props when rendering: ", this.props)
    let region = {};

    const navigation = this.props.navigation

    if (this.props.screenProps.position.coords && this.props.screenProps.allPois.length) {
      let userLocation = this.props.screenProps.position.coords
      let markerArr = (this.props.navigation.state.params) ? this.props.navigation.state.params.markers
                                                           : this.props.screenProps.allPois
        region = {
          latitude: (markerArr.length==1) ? +markerArr[0].lat : +userLocation.latitude,
          longitude: (markerArr.length==1) ? +markerArr[0].lng : +userLocation.longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0021,
        }
        console.log("MARKERS: ", markerArr)
        return (
          <View style={styles.container}>
          <MapView
          style={ styles.map }
            initialRegion={region}>
              <MapView.Marker
                style={ styles.personMarker }
                coordinate={{
                  latitude: this.props.screenProps.position.coords.latitude,
                  longitude: this.props.screenProps.position.coords.longitude
                }}
                image={require('../../PersonIcon.png')}
              />
              {
                markerArr.map((marker, index) => (
                marker.lat > 0 ?
                   <MapView.Marker
                      key={marker.unique_id}
                      coordinate={{
                        latitude: +marker.lat,
                        longitude: +marker.lng}}
                      id={marker.unique_id}
                      onPress={(event) => this.markerSelected(marker.unique_id)}>
                        <MapView.Callout tooltip style={styles.customView}
                          onPress={() => navigation.navigate('Details', { name: marker.link})}>
                          {marker.unique_id === this.state.selectedMarker ?
                          <MapCallout>
                            <Text
                              style={ styles.titleText }
                              >{marker.name}</Text>
                            <Image
                              source={{uri: `https://www.nycgovparks.org${marker.thumb_path}`}}
                              style={styles.placeImage}/>
                            <Text
                              style={ styles.titleText }>Tap for Info</Text>
                          </MapCallout>
                           :
                          null}
                        </MapView.Callout>
                  </MapView.Marker>
                  : null
              ))
            }
            </MapView>
          </View>
        )
      }
      else return null
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  personMarker: {
    zIndex: 1,
    position: 'relative'
  },
  titleText: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  tapText: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: '#0000ff'
  },
  placeImage: {
    height: 75,
    width: 75,
    alignSelf: 'center'
  },
  customView: {
    height: 100,
    width: 140,
  }
});

const MapStack = StackNavigator({
  MainMap: {
    screen: Mapview,
    title: "Map View"
  },
  MapDetails: {
    screen: PointDetails,
    path: 'poi/:name',
    title: "Details"
  }
})

// AppRegistry.registerComponent('MapStack', () => MapStack);

export default MapStack;
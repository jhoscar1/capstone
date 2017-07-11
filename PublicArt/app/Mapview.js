import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  Image
} from 'react-native';
import MapView from 'react-native-maps';
import MapCallout from './MapCallout';
import global from '../secrets';
import utils from '../utils';

class Mapview extends Component {
  constructor(props){
    super(props)
    console.log('MAPPROPS', this.props);
    const userLocation = this.props.navigation.state.params.userLocation.coords ?
    this.props.navigation.state.params.userLocation.coords : this.props.navigation.state.params.userLocation;
    this.state = {
      region: {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0021,
       },
      markers: this.props.navigation.state.params.markers,
      selectedMarker: false
    };
    this.decode = this.decode.bind(this);
    this.plotMap = this.plotMap.bind(this);
  }

  decode(t,e) {
    for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})}


componentDidMount(){
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  const mode = 'walking';
  const origin = [this.props.navigation.state.params.userLocation.latitude, this.props.navigation.state.params.userLocation.longitude]
  const destinationPlace = this.state.markers[getRandomInt(1, this.state.markers.length - 1)];
  // const destination = [destinationPlace.lat, destinationPlace.lng];
  const destination = ['40.704', '-74.013']
  // const otherPlaces = this.state.markers.filter((el) => {
  //   return utils.getDistanceInMeters(origin[1], Number(el.lng), origin[0], Number(el.lat)) < 1000;
  // }).slice(0, 4)

  const anotherPlace = this.state.markers[getRandomInt(1, this.state.markers.length - 1)];
  this.plotMap();
  // const onTheWay = [anotherPlace.lat, anotherPlace.lng]
  // const onTheWay = otherPlaces.map(place => {
  //   return {latitude: place.lat, longitude: place.lng};
  // });
// const onTheWay = [{lat: '40.7129', lng: '-74.0051'}, {lat: '40.7046', lng: '-74.0139'}].toString();
//   // const otherPlace = utils.getDistanceInMeters(origin[0], )
  // const APIKEY = global.GoogleMapsAPIKey;
  // const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${onTheWay}&key=${APIKEY}&mode=${mode}`;
  // console.log('destination-->', destination);
  // console.log('OTHER PLACES', otherPlaces)
  // console.log('ontheway', onTheWay)
  // console.log('URL-->', url)

  // fetch(url)
  // .then(response => response.json())
  // .then(responseJson => {
  //   console.log('RESPONSE==>', responseJson)
  //   if (responseJson.routes.length) {
  //     this.setState({
  //       coords: this.decode(responseJson.routes[0].overview_polyline.points)
  //     });
  //   }
  // }).catch(e => {console.warn(e)});
}

plotMap(){
  const origin = [this.props.navigation.state.params.userLocation.latitude, this.props.navigation.state.params.userLocation.longitude];
  const otherPlaces = this.state.markers.filter((el) => {
    return utils.getDistanceInMeters(origin[1], Number(el.lng), origin[0], Number(el.lat)) < 1000;
  }).slice(0, 4)
  const onTheWay = otherPlaces.map(place => {
    return {latitude: Number(place.lat), longitude: Number(place.lng)};
  }).sort((a, b) => {
    return utils.getDistanceInMeters(origin[1], Number(a.lng), origin[0], Number(a.lat)) < utils.getDistanceInMeters(origin[1], Number(b.lng), origin[0], Number(b.lat))
  })
  const wayThere = onTheWay.slice(0, 2);
  const mode = 'walking';
  const destination = onTheWay[3];
  console.log('THEWAY', onTheWay)
  console.log('destination', destination)
  const APIKEY = global.GoogleMapsAPIKey;
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${wayThere}&key=${APIKEY}&mode=${mode}`;
  fetch(url)
  .then(response => response.json())
  .then(responseJson => {
    console.log('RESPONSE==>', responseJson)
    if (responseJson.routes.length) {
      this.setState({
        coords: this.decode(responseJson.routes[0].overview_polyline.points)
      });
    }
  }).catch(e => {console.warn(e)});
  // this.setState({
  //   coords: this.state.markers.filter((el) => {
  //     return utils.getDistanceInMeters(origin[1], Number(el.lng), origin[0], Number(el.lat)) < 1000;
  //   }).slice(0, 4)
  // });
  // this.setState({
  //   coords: [{latitude: 40.7129, longitude: -74.0051}, {latitude: 40.7046, longitude: -74.0139}]
  // });
  // this.setState({
  //   coords: onTheWay
  // });
}

  render() {
    const navigation = this.props.navigation
    console.log('NAVIGATION==>', navigation)
    console.log('THE STATE==>', this.state)
    return (
      <View style={styles.container}>
      <MapView
      style={ styles.map }
        initialRegion={this.state.region}>
          <MapView.Marker
            style={ styles.personMarker }
            coordinate={{
              latitude: this.state.region.latitude,
              longitude: this.state.region.longitude
            }}
            image={require('../PersonIcon.png')}
          />
          {this.state.markers.map((marker, index) => (
            marker.lat > 0 ?
               <MapView.Marker
                  key={marker.unique_id}
                  coordinate={{
                    latitude: +marker.lat,
                    longitude: +marker.lng}}>
                    <MapView.Callout tooltip style={styles.customView}
                      onPress={() => navigation.navigate('Details', { name: marker.link})}>
                      <MapCallout>
                        <Text
                          style={ styles.titleText }
                          >{marker.name}</Text>
                        <Image
                          source={{uri: `https://www.nycgovparks.org${marker.thumb_path}`}}
                          style={styles.placeImage}
                            />
                          <Text
                            style={ styles.tapText }>Tap to learn more</Text>
                      </MapCallout>
                    </MapView.Callout>
              </MapView.Marker>
              : null
          ))}
          {this.state.coords ?
            <MapView.Polyline
            coordinates={[...this.state.coords]}
            strokeWidth= {5}
            strokeColor={'red'}
            />
          : null}
        </MapView>
      </View>
    );
  }
  }

const styles = StyleSheet.create({
  customView: {
    width: 200,
    height: 100,
  },
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
  }
});

export default Mapview;

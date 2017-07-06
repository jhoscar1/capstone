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
  }

  decode(t,e) {
    for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})}


componentDidMount(){
  const mode = 'walking';
  const origin = {latitude: this.props.navigation.state.params.userLocation.latitude, longitude: this.props.navigation.state.params.userLocation.longitude}
  const destination = 'Empire State Building New York, NY';
  const APIKEY = global.GoogleMapsAPIKey;
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;

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

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

class Mapview extends Component {
  constructor(props){
    super(props)
    // console.log(this.props);
    var userLocation = this.props.navigation.state.params.userLocation.coords
    this.state = {
      region: {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
       },
      markers: this.props.navigation.state.params.markers,
      selectedMarker: false
    };
    // this.selectMarker = this.selectMarker.bind(this);
  }


  render() {
    const navigation = this.props.navigation
    return (
      <View style={styles.container}>
      <MapView
      style={ styles.map }
        initialRegion={this.state.region}>
          <MapView.Marker
            coordinate={{
              latitude: this.state.region.latitude,
              longitude: this.state.region.longitude
            }}
            image={require('../PersonIcon.png')}
          />
          {this.state.markers.map((marker, index) => (
            marker.lat > 0 ?
               <MapView.Marker
                  coordinate={{
                    latitude: +marker.lat,
                    longitude: +marker.lng}}>
                    <MapView.Callout tooltip style={styles.customView}
                      onPress={() => navigation.navigate('Details', { name: marker.link})}>
                      <MapCallout>
                        <Text>{marker.name}</Text>
                        <Image
                          source={{uri: `https://www.nycgovparks.org${marker.thumb_path}`}}
                          style={{height: 75, width: 75}}
                            />
                          <Text>Tap to learn more</Text>
                      </MapCallout>
                    </MapView.Callout>
              </MapView.Marker>
              : null
          ))}
        </MapView>
      </View>
    );
  }
  }
// selectMarker(){
//   console.log('PRESSED')
//   console.log('BEFORESTATAE', this.state)
//   this.setState({
//     selectedMarker: true
//   });
//   console.log('STATE=>', this.state);
// }
// render() {
//   const navigation = this.props.navigation
//   return (
//     <View style={styles.container}>
//     <MapView
//     style={ styles.map }
//       initialRegion={this.state.region}>
//         <MapView.Marker
//           coordinate={{
//             latitude: this.state.region.latitude,
//             longitude: this.state.region.longitude
//           }}
//           image={require('../PersonIcon.png')}
//         />
//         {this.state.markers.map((marker, index) => (
//           marker.lat > 0 ?
//              <MapView.Marker
//                 coordinate={{
//                   latitude: +marker.lat,
//                   longitude: +marker.lng}}
//                   onSelect={this.selectMarker}>
//                   {this.state.selectedMarker ?
//                   <MapView.Callout tooltip style={styles.customView}>
//                     <MapCallout>
//                       <Text>{marker.name}</Text>
//                       <Image
//                         source={{uri: `https://www.nycgovparks.org${marker.thumb_path}`}}
//                         style={{height: 75, width: 75}}
//                           />
//                         <Text></Text>
//                       <Button
//                           style={{color: 'blue'}}
//                           title="Learn More"
//                           onPress={() => navigation.navigate('Details', { name: marker.link})}
//                           />
//                     </MapCallout>
//                   </MapView.Callout>
//                   : null}
//             </MapView.Marker>
//             : null
//         ))}
//       </MapView>
//     </View>
//   );
// }
// }

// title={marker.name}
// imageSourcePath={marker.thumb_path}
// detailsLink={marker.link}
// navigation = {navigation}>

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
});

export default Mapview;

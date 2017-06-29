import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import MapView from 'react-native-maps';

class Mapview extends Component {
  constructor(props){
    super(props)
    console.log(this.props);
    var userLocation = this.props.navigation.state.params.userLocation.coords
    this.state = {
      region: {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0021,
       },
      markers: this.props.navigation.state.params.markers
    }
  }

  // static navigationOptions = (props) => {
  //     console.log('PROPS',props);
  //     var navigation = props.navigation
  //     return {
  //       title: 'I (AR)t NY'
  //       };
  //   }

  render() {
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
            marker.lat > 0
              ? <MapView.Marker
                  coordinate={{
                    latitude: +marker.lat,
                    longitude: +marker.lng}}
                  title={marker.name}
                  key={index}
                />
              : null
          ))}
        </MapView>
      </View>
    );
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
});

export default Mapview;

import React, { Component } from 'react';
import {Animated, View, Text, Button, StyleSheet, TouchableWithoutFeedback, Picker} from 'react-native';

export default class TourMaker extends Component {
  constructor(props) {
    super(props);
    console.log('TOURPROPS', this.props);
    this.state = {
      open: false,
      viewSize: new Animated.Value(400)
    }
    this.onMapPress = this.onMapPress.bind(this);
  }

  onMapPress(){
    const position = this.props.navigation.state.params.userLocation.coords;
    const pointsOfInterest = this.props.navigation.state.params.markers;
    this.props.navigation.navigate('Mapview', {userLocation: position, markers: pointsOfInterest})
  }

  render() {
    const navigation = this.props.navigation
    console.log('STATE =>', this.state)
    return (
      <View>
        <Button
          title="Show me around"
          onPress={() => this.onMapPress()} />
          <Picker
            selectedValue={this.state.tourLength}
            onValueChange={itemValue => this.setState({tourLength: itemValue})}>
            <Picker.Item label="Short" value="short" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="Long" value="long" />
          </Picker>
      </View>
    );
  }
}

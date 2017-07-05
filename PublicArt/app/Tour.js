import React, { Component } from 'react';
import {Animated, View, Text, Button, StyleSheet, TouchableWithoutFeedback, Picker} from 'react-native';

export default class TourMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      viewSize: new Animated.Value(400)
    }
  }

  onMapPress(){
    this.props.navigation.navigate('Mapview', {userLocation: this.state.position, markers: this.state.allPois})
  }

  render() {
    const navigation = this.props.navigation
    console.log('STATE =>', this.state)
    return (
      <View>
        <Button
          title="Show me around"
          onPress={() => navigation.navigate('Mapview')} />
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

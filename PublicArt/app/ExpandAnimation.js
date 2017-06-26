import React from 'react';
import { Animated, Text, View } from 'react-native';

class ExpandView extends React.Component {
  constructor(){
    super()
    this.state = {
    sizeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }
  this.onPress = this.onPress.bind(this);
  }


  onPress() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: '100%',                   // Animate to opacity: 1 (opaque)
        duration: 15000,              // Make it take a while
      }
    ).start();                        // Starts the animation
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          //...this.props.style,
          maxWidth: fadeAnim,         // Bind maxWidth to animated value
        }}
        onPress={this.onPress}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
export default ExpandView

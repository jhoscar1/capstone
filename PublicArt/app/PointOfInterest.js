import React, { Component } from 'react';
import {View, Text, Button, StyleSheet, Animated, TouchableHighlight} from 'react-native';
import HTMLView from 'react-native-htmlview';
import PointDetails from './PointDetails';
import ExpandView from './ExpandAnimation';

class PointOfInterest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sizeAnim: new Animated.Value(0),  // Initial value for size: 0
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
        const navigation = this.props.navigation
        const unescapedDescription = `<p>Description: ${this.props.point.description}</p>`
        return (
            <Animated.View                 // Special animatable View
        style={{
          //...this.props.style,
          maxWidth: this.state.fadeAnim,         // Bind maxWidth to animated value
        }}
        onPress={this._onPressButton}>
                <Text style={styles.text}>Name: {this.props.point.name}</Text>
                <HTMLView
                    stylesheet={htmlViewStyles}
                    value={unescapedDescription}
                />
                <Button
                    style={{color: 'blue', fontSize: 12}}
                    title="Learn More"
                    onPress={() => navigation.navigate('Details', { name: this.props.point.link})}
                />
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, .8)',
        borderRadius: 1,
        maxWidth: '33%'
    },
    text: {
        fontSize: 10
    }
})

const htmlViewStyles = StyleSheet.create({
        p: {
        fontSize: 10
    }
})
export default PointOfInterest;

import React, { Component } from 'react';
import {View, Text, Button, StyleSheet, Animated, TouchableHighlight} from 'react-native';
import HTMLView from 'react-native-htmlview';
import PointDetails from './PointDetails';
import ExpandView from './ExpandAnimation';

class PointOfInterest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sizeAnim: new Animated.Value(150),
            expandedFlag: false  // Initial value for card height and width
        }
  this.onPress = this.onPress.bind(this);
    }

    onPress() {
        if(!this.state.expandedFlag){
            Animated.timing(                  // Animate over time
            this.state.sizeAnim,            // The animated value to drive
            {
                toValue: 300,                   // Animate to value
                duration: 1000,              // Make it take a bit
            }
            ).start()
            this.setState({expandedFlag: true})

            console.log('HERE')                      // Starts the animation
        } else {
            Animated.timing(                  // Animate over time
            this.state.sizeAnim,            // The animated value to drive
            {
                toValue: 150,                   // Animate to value
                duration: 1000,              // Make it take a bit
            }
            ).start()
            this.setState({expandedFlag: false})
            //this.expandedFlag = false
        }
    }

    render() {
        const navigation = this.props.navigation
        const unescapedDescription = `<p>Description: ${this.props.point.description}</p>`
        return (
            <Animated.View                 // Special animatable View
        style={{
          //...styles,
          width: this.state.sizeAnim,         // Bind width / height to animated value
          height: this.state.sizeAnim
        }}>
                <Text style={styles.text}>Name: {this.props.point.name}</Text>
                <HTMLView
                    stylesheet={htmlViewStyles}
                    value={unescapedDescription}
                />
                <Button
                    onPress={this.onPress}
                    title="Expand"
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
        maxWidth: '100%'
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

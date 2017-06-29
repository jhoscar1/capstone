import React, { Component } from 'react';
import {Animated, View, Text, Button, StyleSheet, Image, TouchableWithoutFeedback, Dimensions} from 'react-native';

class SelectedPointOfInterest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            viewSize: new Animated.Value(50)
        }
    }

    componentDidMount() {
        console.log('mounted');
        Animated.timing(this.state.viewSize,
            {
                toValue: 200,
                duation: 1000
            }).start()
    }

    render() {

        const cardStyle = {
            borderRadius: 5,
            padding: 15,
            marginTop: 10,
            marginBottom: 15,
            position: 'absolute',
            left: this.props.left,
            top: 50*this.props.num + ((h/300) * tilt) + h/10,
            backgroundColor: '#F5FCFF',
            flexDirection: 'row'
        }

        return (
            <TouchableWithoutFeedback onPress={() => this.props.handlePress(this.props.point)} >
                <Animated.View style={{ ...cardStyle, height: this.state.viewSize}}>
                    <Image
                        source={{uri: `https://www.nycgovparks.org${this.props.point.thumb_path}`}}
                        style={{height: 75, width: 75}}
                    />
                    <View>
                        <Text style={styles.text}>{this.props.point.name}</Text>
                            <View>
                                <Button
                                    style={{color: 'blue'}}
                                    title="Learn More"
                                    onPress={() => navigation.navigate('Details', { name: this.props.point.link})}
                                />
                            </View>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        position: 'relative',
        fontSize: 16,
        fontWeight: "800",
        backgroundColor: 'transparent',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginLeft: 5
    }
})

export default SelectedPointOfInterest;
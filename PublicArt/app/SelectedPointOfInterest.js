import React, { Component } from 'react';
import {Animated, View, Text, Button, StyleSheet, Image, TouchableWithoutFeedback, Dimensions} from 'react-native';

class SelectedPointOfInterest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width: new Animated.Value(250),
            height: new Animated.Value(125),
            left: new Animated.Value(this.props.left),
            top: new Animated.Value(this.props.top)
        }
    }

    componentDidMount() {
        // Animated.timing(this.state.viewSize,
        //     {
        //         toValue: 200,
        //         duation: 1000
        //     }).start()
        
        Animated.timing(this.state.left, {
            toValue: Dimensions.get('screen').width / 6,
            duration: 1000
        }).start();

        Animated.timing(this.state.top, {
            toValue: Dimensions.get('screen').height / 8,
            duration: 1000
        }).start();

        Animated.timing(this.state.width, {
            toValue: Dimensions.get('screen').width / 1.5,
            duration: 1000
        }).start();

        Animated.timing(this.state.height, {
            toValue: Dimensions.get('screen').height / 5,
            duration: 1000
        }).start();
    }

    componentWillUnmount() {
        Animated.timing(this.state.left, {
            toValue: this.props.left,
            duration: 1000
        }).start();

        Animated.timing(this.state.top, {
            toValue: this.props.top,
            duration: 1000
        }).start();

        Animated.timing(this.state.width, {
            toValue: Dimensions.get('screen').width / 1.5,
            duration: 1000
        }).start();

        Animated.timing(this.state.height, {
            toValue: Dimensions.get('screen').height / 4,
            duration: 1000
        }).start();
    }

    render() {
        const {navigation} = this.props;
        const cardStyle = {
            borderRadius: 5,
            padding: 15,
            marginTop: 10,
            marginBottom: 15,
            position: 'absolute',
            left: this.state.left,
            top: this.state.top,
            backgroundColor: '#F5FCFF',
            flexDirection: 'row'
        }

        return (
            <TouchableWithoutFeedback onPress={() => this.props.handlePress(this.props.point)} >
                <Animated.View style={{ ...cardStyle, height: this.state.height, width: this.state.width}}>
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
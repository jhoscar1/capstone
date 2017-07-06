import React, { Component } from 'react';
import {Animated, View, Text, Button, StyleSheet, Image, TouchableWithoutFeedback, Dimensions} from 'react-native';

class SelectedPointOfInterest extends Component {
    constructor(props) {
        super(props)
        this.size = this.props.dist / 10

        this.state = {
            width: new Animated.Value(this.props.point.name.length * (35 - Math.floor(this.size)) + 25),
            height: new Animated.Value(55-this.size),
            left: new Animated.Value(this.props.left),
            top: new Animated.Value(this.props.top),
            fontSize: 35 - Math.floor(this.size),
            showFull: false
        }
    }

    componentDidMount() {
        Animated.parallel([
            Animated.timing(this.state.left, {
                toValue: Dimensions.get('screen').width / 6 - 25,
                duration: 1000
            }),
            Animated.timing(this.state.top, {
                toValue: Dimensions.get('screen').height / 8,
                duration: 1000
            }),
            Animated.timing(this.state.width, {
                toValue: Dimensions.get('screen').width / 1.5 + 75,
                duration: 1000
            }),
            Animated.timing(this.state.height, {
                toValue: Dimensions.get('screen').height / 5,
                duration: 1000
            })
        ]).start(() => this.setState({showFull: true}))
        this.setState({fontSize: 16});
    }

    animateOnUnmount(POI) {
        Animated.parallel([
            Animated.timing(this.state.left, {
                toValue: this.props.left,
                duration: 1000
            }),
            Animated.timing(this.state.top, {
                toValue: this.props.top,
                duration: 1000
            }),
            Animated.timing(this.state.width, {
                toValue: this.props.point.name.length * (35 - Math.floor(this.size)) + 100,
                duration: 1000
            })
        ])
        .start(() => this.props.handlePress(POI));
    }

    render() {
        console.log(this.props)
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

        const textStyle = {
            position: 'relative',
            fontWeight: "800",
            backgroundColor: 'transparent',
            flexWrap: 'wrap',
            fontSize: this.state.fontSize,
            marginLeft: 5
        }
        return (
            <TouchableWithoutFeedback onPress={() => this.animateOnUnmount(this.props.point)} >
                <Animated.View style={{ ...cardStyle, height: this.state.height, width: this.state.width}}>
                    {this.state.showFull ? 
                    <Image
                        source={{uri: `https://www.nycgovparks.org${this.props.point.thumb_path}`}}
                        style={{height: 75, width: 75}}
                    />
                    :
                    null
                    }
                    <View>
                        <Text style={textStyle}>{this.props.point.name} <Text style={{textAlign: 'right', fontSize: 8}}> {Math.floor(this.props.dist)}m</Text></Text>
                        { this.state.showFull ? 
                            <View>
                                <Button
                                    style={{color: 'blue'}}
                                    title="Learn More"
                                    onPress={() => navigation.navigate('Details', { name: this.props.point.link})}
                                />
                            </View>
                            :
                            null
                        }
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        )
    }
}

export default SelectedPointOfInterest;
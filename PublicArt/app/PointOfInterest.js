import React, { Component } from 'react';
import {Animated, AsyncStorage, View, Text, Button, StyleSheet, Image, TouchableWithoutFeedback, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebaseApp from '../firebase';
//import * as Firebase from 'firebase';

const PointOfInterest = (props) => {
    const navigation = props.navigation

    // 0 == face up
    // 50 == straight up and down
    // 100 == face down
    let tilt = (props.tilt.z + 1) * 50
    let h = Dimensions.get('window').height
    let size = props.dist / 10
    const cardStyle = {
        borderRadius: 5,
        padding: 15,
        marginTop: 10,
        marginBottom: 15,
        position: 'absolute',
        left: 50 + ((Dimensions.get('window').width / 80) * props.dir),
        top: 50*props.num + ((h/300) * tilt) + h/10,
        backgroundColor: '#F5FCFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 55-size,
        maxWidth: props.point.name.length * (35 - Math.floor(size))
    }
    const textStyle = {
        position: 'relative',
        fontWeight: "800",
        backgroundColor: 'transparent',
        flexWrap: 'wrap',
        fontSize: 35 - Math.floor(size),
        marginLeft: 5
    }

    return (
        <TouchableWithoutFeedback onPress={() => props.handlePress(props.point)} >
            <Animated.View style={{ ...cardStyle }}>
                <View>
                    <Text style={textStyle}>{props.point.name} <Text style={{textAlign: 'right', fontSize: 8}}>{Math.floor(props.dist)}m</Text> </Text>
                </View>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
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
    },
    upvote: {
        marginLeft: 5
    },
    likes: {
        marginLeft: 185
    }
})

export default PointOfInterest;
import React, { Component } from 'react';
import {View, WebView} from 'react-native';

const PointDetails = (props) => {
    return (
        <View>
            <WebView
                source={{uri: `https://www.nycgovparks.org${props.link}`}}
            />
        </View>
    )
}

export default PointDetails;
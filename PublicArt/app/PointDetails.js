import React, { Component } from 'react';
import {View, Text, WebView, StyleSheet, Dimensions} from 'react-native';

const PointDetails = (props) => {
    return (
            <WebView
                style={styles.webView}
                source={{uri: `https://www.nycgovparks.org${props.navigation.state.params.name}`}}
            />
    )
}

const styles = StyleSheet.create({
    webView: {
        width: Dimensions.get('window').width
    }
})

export default PointDetails;
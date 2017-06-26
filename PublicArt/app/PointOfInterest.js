import React, { Component } from 'react';
import {View, Text, Button, StyleSheet, Dimensions} from 'react-native';
import HTMLView from 'react-native-htmlview';
import PointDetails from './PointDetails';

class PointOfInterest extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const navigate = this.props.navigation
        console.log(this.props);
        const unescapedDescription = `<p>Description: ${this.props.point.description}</p>`
        return (
            <View style={styles.container}>
                <Text>Name: {this.props.point.name}</Text>
                <HTMLView
                    value={unescapedDescription}
                />
                <Button
                    style={{color: 'blue'}}
                    title="Learn More"
                    onPress={() => navigate('PointDetails', { link: this.props.point.link})}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, .8)',
        borderRadius: 1
    },
    webView: {
        width: Dimensions.get('window').width
    }
})

export default PointOfInterest;
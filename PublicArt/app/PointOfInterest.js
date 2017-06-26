import React, { Component } from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import HTMLView from 'react-native-htmlview';
import PointDetails from './PointDetails';

class PointOfInterest extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const navigation = this.props.navigation
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
                    onPress={() => navigation.navigate('Details', { name: this.props.point.link})}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, .8)',
        borderRadius: 1
    }
})

export default PointOfInterest;
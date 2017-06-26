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
        const unescapedDescription = `<p>Description: ${this.props.point.description}</p>`
        return (
            <View style={styles.container}>
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
            </View>
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
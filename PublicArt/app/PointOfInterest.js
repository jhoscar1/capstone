import React, { Component } from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import HTMLView from 'react-native-htmlview';
import PointDetails from './PointDetails';

class PointOfInterest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
    componentDidMount() {
        console.log("poi mounted!")
    }

    componentWillUnmount() {
        console.log("poi is about to unmount!")
    }

    render() {
        console.log('rendering ', this.props.point.name)
        const navigation = this.props.navigation
        const unescapedDescription = `<p>Description: ${this.props.point.descrip}</p>`
        const containerStyle = {
            backgroundColor: 'rgba(255, 255, 255, .8)',
            borderRadius: 5,
            padding: 5,
            maxHeight: '19%',
            maxWidth: 300,
            position: 'absolute',
            left: this.props.dir,
            top: 50*this.props.counter
        }
        return (
            <View style={containerStyle}>
                <Image 
                    source={{uri: `https://www.nycgovparks.org${this.props.point.thumb_path}`}}
                />
                <Text style={styles.text}>{this.props.point.name}</Text>
                {this.state.open ?
                    <View>
                        <HTMLView
                            stylesheet={htmlViewStyles}
                            value={unescapedDescription}
                        />
                        <Button
                            style={{color: 'blue'}}
                            title="Learn More"
                            onPress={() => navigation.navigate('Details', { name: this.props.point.link})}
                        />
                        <Text onPress={() => this.setState({open: !this.state.open})}>Minimize</Text>
                    </View>
                :
                    <Text onPress={() => this.setState({open: !this.state.open})}>Expand</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, .8)',
        borderRadius: 5,
        padding: 5,
        maxHeight: '19%',
        maxWidth: 300,
        position: 'absolute',
        paddingBottom: 200
    },
    text: {
        fontSize: 16,
        fontWeight: "800"
    }
})

const htmlViewStyles = StyleSheet.create({
        p: {
        fontSize: 10
    }
})
export default PointOfInterest;
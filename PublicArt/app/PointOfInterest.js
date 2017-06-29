import React, { Component } from 'react';
import {Animated, View, Text, Button, StyleSheet, Image, TouchableWithoutFeedback, Dimensions} from 'react-native';

class PointOfInterest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            viewSize: new Animated.Value(200)
        }
        this.selectPOI = this.selectPOI.bind(this);
    }

    selectPOI() {
        if (this.state.open) {
            Animated.timing(this.state.viewSize,
                            {toValue: 200,
                             duation: 1000}).start()
        } else {
            Animated.timing(this.state.viewSize,
                            {toValue: Dimensions.get('window').width-30,
                             duation: 1000}).start()
        }
        this.setState({open: !this.state.open});
    }

    render() {
        console.log('rendering ', this.props.point.name)
        const navigation = this.props.navigation
        const unescapedDescription = `<p>Description: ${this.props.point.descrip}</p>`

        // 0 == face up
        // 50 == straight up and down
        // 100 == face down
        let tilt = (this.props.tilt.z + 1) * 50
        let h = Dimensions.get('window').height
        const cardStyle = {
            borderRadius: 5,
            padding: 15,
            marginTop: 10,
            marginBottom: 15,
            position: 'absolute',
            left: 50 + ((Dimensions.get('window').width / 80) * this.props.dir),
            top: 50*this.props.num + ((h/300) * tilt) + h/10,
            backgroundColor: '#F5FCFF',
            flexDirection: 'row'
        }
        return (
            <TouchableWithoutFeedback onPress={this.selectPOI} >
                <View style={cardStyle}>
                    {this.state.open ? <Image
                        source={{uri: `https://www.nycgovparks.org${this.props.point.thumb_path}`}}
                        style={{height: 75, width: 75}}
                        />
                        :
                        null
                    }
                    <View>
                        <Text style={styles.text}>{this.props.point.name}</Text>
                        {this.state.open ?
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
                </View>
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

const htmlViewStyles = StyleSheet.create({
        p: {
        fontSize: 10
    }
})
export default PointOfInterest;
import React, { Component } from 'react';
import {Animated, View, Text, StyleSheet, Image, TouchableWithoutFeedback, Dimensions, AsyncStorage} from 'react-native';
import firebaseApp from '../firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'react-native-button'

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
            showFull: false,
            upvoted: false,
            itemLikes: 'default',
            firebaseId: 'default'
        }
        this.selectPOI = this.selectPOI.bind(this);
        this.selectUpvote = this.selectUpvote.bind(this)
    }

    componentDidMount() {
        this.selectPOI();
        Animated.parallel([
            Animated.timing(this.state.left, {
                toValue: Dimensions.get('screen').width / 6 - 35,
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
                toValue: Dimensions.get('screen').height / 5 - 10,
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
                toValue: this.props.point.name.length * 24,
                duration: 1000
            })
        ])
        .start(() => this.props.handlePress(POI));
    }

    selectPOI() {
        const pointID = String(this.props.point.unique_id)
        // set local state with # of likes and firebase ID of the selected item
        firebaseApp.database().ref('/').orderByChild('unique_id').equalTo(+pointID)
        .on('value', item => {
            let itemVal;
            let firebaseId;
            let key;
            itemVal = item.val();
            key = +Object.keys(itemVal)[0];
            this.setState({itemLikes: itemVal[key].likes});
            this.setState({firebaseId: key})
        })

        // set the state of the like icon based on user's asyncStorage
        AsyncStorage.getItem(pointID)
        .then(value => {
            if (value !== null && value !== 'false'){
                this.setState({upvoted: true})
            }
        })
        .catch(console.error.bind(console))

        this.setState({open: !this.state.open});
    }

    selectUpvote(){
        const pointID = String(this.props.point.unique_id)
        // when the user clicks the like icon we
        // set upvoted state and increment / decrement likes for item in DB
        AsyncStorage.setItem(pointID, String(!this.state.upvoted))
        .then(() => {
            this.setState({upvoted: !this.state.upvoted})
            let ref = firebaseApp.database().ref(`${this.state.firebaseId}`);
            let itemLikes = this.state.itemLikes
            this.state.upvoted
                ? ref.update({
                    likes: itemLikes + 1,
                  })
                : ref.update({
                    likes: itemLikes - 1,
                  })
        });
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

        const textStyle = {
            position: 'relative',
            fontWeight: "800",
            backgroundColor: 'transparent',
            flexWrap: 'wrap',
            fontSize: this.state.fontSize,
            marginRight: 15,
            alignSelf: 'flex-end'
        }
        const likes ={
            marginLeft: Dimensions.get('screen').width / 2.1,
        }
        return (
            <TouchableWithoutFeedback onPress={() => this.animateOnUnmount(this.props.point)} >
                <Animated.View style={{ ...cardStyle, height: this.state.height, width: this.state.width}}>
                    {this.state.showFull ? 
                    <Image
                        source={{uri: `https://www.nycgovparks.org${this.props.point.thumb_path}`}}
                        style={{height: 75, width: 75, marginRight: 3}}
                    />
                    :
                    null
                    }
                    <View>
                        <Text style={textStyle}>{this.props.point.name} <Text style={{textAlign: 'right', fontSize: 8}}> {Math.floor(this.props.dist)}m</Text></Text>
                        { this.state.showFull ? 
                            <View>
                                <View>
                                    <Button
                                        style={{color: "#3a4454", maxWidth: Dimensions.get('screen').width / 1.75, marginTop: 5}}
                                        onPress={() => navigation.navigate('CameraDetails', { name: this.props.point.link})}
                                    >Learn More</Button>
                                </View>
                                <View style={{flexDirection: 'row', marginTop: 15}}>
                                    <Text style={likes}>{this.state.itemLikes}</Text>
                                    <Icon
                                        name={this.state.upvoted ? 'ios-heart' : 'ios-heart-outline'}
                                        size={25}
                                        style={styles.upvote}
                                        color={this.state.upvoted ? "#3a85ff" : "#3a4454" }
                                        onPress={this.selectUpvote}>
                                    </Icon>
                                </View>
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

const styles = StyleSheet.create({
    upvote: {
        marginLeft: 5,
        alignItems: "flex-end"
    },
    // likes: {
    //     marginLeft: 185
    // }
})

export default SelectedPointOfInterest;
import React, { Component } from 'react';
import {Animated, AsyncStorage, View, Text, Button, StyleSheet, Image, TouchableWithoutFeedback, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebaseApp from '../firebase';
//import * as Firebase from 'firebase';

class PointOfInterest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            viewSize: new Animated.Value(200),
            upvoted: false,
            itemLikes: 'default',
            firebaseId: 'default'
        }
        this.selectPOI = this.selectPOI.bind(this);
        this.selectUpvote = this.selectUpvote.bind(this)
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

        if (this.state.open) {
            Animated.timing(this.state.viewSize,
                            {toValue: 200,
                             duation: 1000}).start()
        } else {
            Animated.timing(this.state.viewSize,
                            {toValue: Dimensions.get('window').width-30,
                             duation: 1000}).start()

            // set the state of the like icon based on user's asyncStorage
            try {
                AsyncStorage.getItem(pointID)
                .then(value => {
                    if (value !== null && value !== 'false'){
                        this.setState({upvoted: true})
                    }
                })
            } catch (error) {
                console.error(error);
            }
        }
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
                                <Text style={styles.upvote}>{this.state.itemLikes}</Text>
                                <Icon
                                    name={this.state.upvoted ? 'ios-thumbs-up' : 'ios-thumbs-up-outline'}
                                    size={15}
                                    style={styles.upvote}
                                    color={this.state.upvoted ? '#4F8EF7' : '#000000' }
                                    onPress={this.selectUpvote}>
                                </Icon>
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
    },
    upvote: {
        marginLeft: 150
    }
})

const htmlViewStyles = StyleSheet.create({
        p: {
        fontSize: 10
    }
})
export default PointOfInterest;

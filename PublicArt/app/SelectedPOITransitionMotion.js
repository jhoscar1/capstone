import React, { Component } from 'react';
import {TransitionMotion, spring} from 'react-motion'
import {Animated, View, Text, Button, StyleSheet, Image, TouchableWithoutFeedback, Dimensions} from 'react-native';

export default class SelectedPointOfInterest extends Component {
	constructor(props) {
		super(props)
		this.state = {
			width: 250,
			height: 125,
			left: this.props.left,
			top: this.props.left
		}
	}

	willLeave() {
		return {
			width: 250,
			height: 125,
			left: this.props.left,
			top: this.props.left
		}
	}

	render() {
        const {navigation} = this.props;
        const cardStyle = {
            borderRadius: 5,
            padding: 15,
            marginTop: 10,
            marginBottom: 15,
            position: 'absolute',
            backgroundColor: '#F5FCFF',
            flexDirection: 'row'
        }
		return (
			<TransitionMotion
				willLeave={this.willLeave}
				styles={[{
					key: this.props.point.unique_id,
					style: this.state
				}]}
			>
			{
				interpolatedStyles => 
				<View>
					{
						interpolatedStyles.map(config => {
							<TouchableWithoutFeedback key={config.key} onPress={() => this.props.handlePress(this.props.point)} >
								<Animated.View style={{ 
									...cardStyle, 
									...config.style
									}}
								>
									<Image
										source={{uri: `https://www.nycgovparks.org${this.props.point.thumb_path}`}}
										style={{height: 75, width: 75}}
									/>
									<View>
										<Text style={styles.text}>{this.props.point.name}</Text>
											<View>
												<Button
													style={{color: 'blue'}}
													title="Learn More"
													onPress={() => navigation.navigate('Details', { name: this.props.point.link})}
												/>
											</View>
									</View>
								</Animated.View>
							</TouchableWithoutFeedback>
						})
					}
				</View>
			}
			</TransitionMotion>
		)
	}

}
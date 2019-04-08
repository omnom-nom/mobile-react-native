//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Input, Button } from 'react-native-elements';
import LinearGradient from 'expo';
import { connect } from 'react-redux';
import * as actions from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

// create a component
class MainScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Button
                    buttonStyle={{
                        width: SCREEN_WIDTH * 0.6,
                        borderRadius: 100,
                    }}
                    title="SIGN OUT"
                    ViewComponent={LinearGradient}
                    linearGradientProps={{
                        colors: ['red', 'pink'],
                        start: { x: 0, y: 0 },
                        end: { x: 1, y: 1 },
                    }}
                    onPress={() => this.props.signout(this.props.navigation.navigate)}
                />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default connect(null, actions)(MainScreen);
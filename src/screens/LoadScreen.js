import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class LoadScreen extends Component {
    componentDidMount = () => {
        this.props.check_session(this.props.navigation.navigate)
    }

    render() {
        console.log("loading ...");
        
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    log = (messsage) => {
        console.log("[LoadScreen] " + message);

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default connect(null, actions)(LoadScreen);

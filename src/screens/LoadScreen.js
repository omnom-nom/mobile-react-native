import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { style } from '../cmn/AppConfig'
import { moderateScale, width, verticalScale, height } from '../cmn/Scaling';


class LoadScreen extends Component {
    componentDidMount = () => {
        this.props.check_session(this.props.navigation.navigate)
    }

    render() {
        this.log("loading ...");
        return (
            <View style={styles.container}>
                {/* <ActivityIndicator size="large" color="#0000ff" /> */}
                <LottieView
                    source={require('../../assets/circle_loading.json')}
                    autoPlay
                    loop
                    style={{
                        width: moderateScale(200),
                        height: moderateScale(200),
                    }}
                />
            </View>
        );
    }

    log = (messsage) => {
        console.log("[LoadScreen] " + messsage);
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

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { style } from '../cmn/AppConfig'
import { moderateScale, width, verticalScale, height } from '../cmn/Scaling';

// create a component
class LoadingComponent extends Component {
    render() {
        return (
            <View style={styles.container}>
                <LottieView
                    source={require('../../assets/loading/circle_loading_basic.json')}
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
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

//make this component available to the app
export default LoadingComponent;

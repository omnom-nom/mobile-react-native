import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { style } from '../cmn/AppConfig'
import { moderateScale, width, verticalScale, height } from '../cmn/Scaling';
import { iOSColors } from 'react-native-typography';
import _ from 'lodash';

// create a component
class LoadingComponent extends Component {
    renderMessage = (message) => {
        if (_.isUndefined(message) || _.isEmpty(message)) {
            return null
        }
        return (
            <View style={{ width: width * 0.9, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={style.fontStyle({ color: iOSColors.purple, size: 17 })}>
                    {_.upperFirst(message)}
                </Text>
            </View >
        )
    }
    render() {
        return (
            <View style={styles.container}>
                {this.renderMessage(this.props.message)}
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

//import liraries
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { moderateScale, width, verticalScale, height } from '../cmn/Scaling';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import { style, colors } from '../cmn/AppConfig'

// create a component
class NotFoundComponent extends Component {
    render() {
        animSource = this.props.animSource || require(`../../assets/dog.json`)
        size= this.props.size || 300
        return (
            <View style={{
                justifyContent: "center",
                alignItems: 'center'
            }}>
                <LottieView
                    source={animSource}
                    autoPlay
                    loop
                    style={{
                        width: moderateScale(size),
                        height: moderateScale(size),
                    }}
                />
                <Text style={style.fontStyle({ size: 17, color: materialColors.blackSecondary, fontWeight: '500', })}>
                    {this.props.message}
                </Text>
            </View>
        )
    }
}

// define your styles
const styles = {
    headerStyle: {
        ...material.subheading,
        width,
        color: materialColors.blackSecondary,
        fontFamily: style.font,
        marginLeft: moderateScale(15),
        textDecorationLine: 'underline',
    },
};

//make this component available to the app
export default NotFoundComponent;

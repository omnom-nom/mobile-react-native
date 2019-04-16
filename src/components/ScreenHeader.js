//import liraries
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import { moderateScale, width, verticalScale, height } from '../cmn/Scaling';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import { style, colors, loggerConfig } from '../cmn/AppConfig'
import _ from 'lodash'

// create a component
class ScreenHeader extends Component {
    render() {
        const { back } = this.props
        let backButton = null
        if (!_.isUndefined(back) && back.show) {
            backButton = <Icon
                name='chevron-left'
                size={moderateScale(35)}
                color={colors.eerieBlack}
                onPress={() => back.navigate()}
                containerStyle={{
                    position: 'absolute',
                    borderWidth: 0,
                    left: moderateScale(10)
                }}
            />
        }
        return (
            <View style={{
                borderWidth: 0,
                width,
                flexDirection: 'row',
                justifyContent: '',
                alignItems: 'center',
                marginTop: height * 0.03,
                paddingVertical: moderateScale(15)
            }}>
                <Text style={{
                    ...styles.headerStyle,
                    fontSize: moderateScale(this.props.size),
                }}>
                    {this.props.header}
                </Text>
                {backButton}
            </View>
        );
    }
}

const styles = {
    headerStyle: {
        ...systemWeights.bold,
        color: colors.eerieBlack,
        fontFamily: style.font,
        textAlign: 'center',
        width,
        borderWidth: 0
    },
};

//make this component available to the app
export default ScreenHeader;

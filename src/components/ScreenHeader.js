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
                    left: 0,
                    borderWidth: 0
                }}
                underlayColor={'transparent'}
            />
        }
        return (
            <View style={{
                borderWidth: 0,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: height * 0.03,
                paddingVertical: moderateScale(15),
                marginHorizontal: moderateScale(15),
                width: width * 0.9,
                ...this.props.containerStyle
            }}>
                {backButton}
                <Text style={{
                    ...styles.headerStyle,
                    ...this.props.headerStyle,
                    fontSize: moderateScale(this.props.size),
                }}>
                    {this.props.header}
                </Text>
            </View>
        );
    }
}

const styles = {
    headerStyle: {
        fontWeight: 'bold',
        color: colors.caribbreanGreen,
        fontFamily: style.font,
        textAlign: 'center',
        borderWidth: 0,
        marginLeft: moderateScale(20),
    },
};

//make this component available to the app
export default ScreenHeader;

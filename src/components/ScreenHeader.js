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
        const { back, icon } = this.props
        const icon_props = icon || {}
        let backButton = null
        if (!_.isUndefined(back) && back.show) {
            backButton = <Icon
                name={icon_props.name}
                size={moderateScale(icon.size)}
                color={style.secondaryColor}
                onPress={() => back.navigate()}
                containerStyle={{
                    position: 'absolute',
                    left: icon.right ? null : 0,
                    right: icon.right ? 0 : null,
                    paddingHorizontal: moderateScale(10),
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
                width: width * 1,
                ...this.props.containerStyle
            }}>
                <View style={{
                    borderWidth: 0,
                    width: width
                }}>
                    <Text style={{
                        ...styles.headerStyle,
                        ...this.props.headerStyle,
                        fontSize: moderateScale(this.props.size),
                    }}>
                        {_.upperCase(this.props.header)}
                    </Text>
                </View>
                {backButton}
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

ScreenHeader.defaultProps = {
    icon: {
        right: false,
        name: 'chevron-left',
        size: 35
    }
}
//make this component available to the app
export default ScreenHeader;

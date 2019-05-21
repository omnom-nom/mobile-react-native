
//import liraries
//import liraries
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Platform, Image, Animated } from 'react-native';
import { Icon, ListItem, Button } from 'react-native-elements';
import { Logger } from 'aws-amplify'
import { moderateScale, width, verticalScale, height } from '../../../cmn/Scaling';
import { iOSColors } from 'react-native-typography'
import { style, colors, loggerConfig } from '../../../cmn/AppConfig'
import { DishOrderTypeEnum } from '../enums';
import _ from 'lodash'
import { Haptic } from 'expo'

class MenuHeader extends Component {
    button = (type) => {
        return (
            <Button
                buttonStyle={styles.orderButtonStyle(this.props.currMenu, type)}
                titleStyle={styles.orderButtonTextStyle(this.props.currMenu, type)}
                title={type}
                onPress={() => {
                    Haptic.impact(Haptic.ImpactFeedbackStyle.Medium)
                    this.props.setCurrMenu(type)
                }}
            />
        )
    }

    headerIcon = (name, location) => {
        loc = location || {}
        return (
            <View
                style={{
                    position: 'absolute',
                    height: height * 0.17,
                    justifyContent: 'center',
                    right: loc.right,
                    left: loc.left,
                    top: loc.top
                }}
            >
                <Icon
                    name={name}
                    type="material-community"
                    size={height * 0.17}
                    color={`rgba(246, 249, 252, 0.2)`}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={{
                width: width * 0.98,
                height: height * 0.2,
                backgroundColor: '#3ECF8E',
                borderRadius: moderateScale(10),
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: moderateScale(10),
                ...style.shadow({ color: colors.eerieBlack, size: 2, opacity: 0.4 })
            }}>
                {this.headerIcon('pizza', { right: 0 })}
                {this.headerIcon('bowl', { top: height * 0.05, left: -width * 0.1 })}

                <View style={{
                    position: 'absolute',
                    top: moderateScale(15),
                    left: moderateScale(10)
                }}>
                    <Icon
                        name={this.props.backIconName}
                        type="material-community"
                        size={moderateScale(30)}
                        color='#F6F9FC'
                        onPress={() => this.props.onBackPress()}
                        underlayColor='transparent'
                    />
                </View>
                <View style={{ marginTop: moderateScale(15) }}>
                    <Text style={style.fontStyle({ color: '#F6F9FC', size: 25, fontWeight: '500', })}>
                        {this.props.name}
                    </Text>
                </View>
                <View style={{
                    width: width * 0.97,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly'
                }}>
                    {this.button(_.upperCase(DishOrderTypeEnum.ON_DEMAND))}
                    {this.button(_.upperCase(DishOrderTypeEnum.PRE_ORDER))}
                </View>
            </View>
        )
    }
}


// define your styles
const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: style.backgroundColor(),
        paddingTop: moderateScale(20),
        paddingHorizontal: width * 0.01,
    },
    orderButtonStyle: (currType, type) => {
        base = {
            backgroundColor: 'transparent',
            marginBottom: moderateScale(5),
            borderRadius: 0
        }
        if (currType === type) {
            base = {
                ...base,
                borderBottomWidth: moderateScale(2),
                borderBottomColor: iOSColors.white,
            }
        }
        return base
    },
    orderButtonTextStyle: (currType, type) => {
        base = style.fontStyle({ color: iOSColors.lightGray, size: 17, fontWeight: '500' })
        if (currType === type) {
            base = style.fontStyle({ color: iOSColors.white, size: 17, fontWeight: '500' })
        }
        return base
    }
};

export default MenuHeader
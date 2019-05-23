
//import liraries
//import liraries
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Platform, Image, Animated } from 'react-native';
import { Icon, ListItem, Button } from 'react-native-elements';
import { Logger } from 'aws-amplify'
import { moderateScale, width, verticalScale, height } from '../../../cmn/Scaling';
import { iOSColors } from 'react-native-typography'
import { style, colors, loggerConfig } from '../../../cmn/AppConfig'
import _ from 'lodash'
import { Haptic } from 'expo'

class MenuHeader extends Component {
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
                    color={`rgba(251, 183, 0, 0.2)`}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={{
                width,
                height: height * 0.1,
                flexDirection: 'row',
                marginBottom: moderateScale(20),
            }}>
                {this.headerIcon('pizza', { right: 0 })}
                {/* {this.headerIcon('bowl', { left: -width * 0.1 })} */}

                <View style={{
                    width: width * 0.15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 0,
                }}>
                    <Icon
                        name={this.props.backIconName}
                        type="material-community"
                        size={moderateScale(30)}
                        onPress={() => this.props.onBackPress()}
                        underlayColor='transparent'
                    />
                </View>
                <View style={{
                    width: "auto",
                    paddingRight: moderateScale(50),
                    borderBottomWidth: moderateScale(2),
                    justifyContent: 'center',
                }}>
                    <Text style={style.fontStyle({ size: 40, fontWeight: '800', })}>
                        {_.startCase(_.lowerCase(this.props.name))}
                    </Text>
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
    }
};

export default MenuHeader
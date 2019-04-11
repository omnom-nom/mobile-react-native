//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Button, Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import { moderateScale, width, verticalScale, height } from '../../../cmn/Scaling';
import { style } from '../../../cmn/AppConfig'


// create a component
class CustomerTypeScreen extends Component {

    onSelect = (type) => {
        this.props.customerTypeSelection(type, this.props.navigation.navigate)
    }

    render() {
        return (
            <View style={styles.container}>
                <Icon
                    name="arrow-left"
                    size={width * 0.1}
                    style={{
                        left: width * 0.1,
                        marginBottom: height * 0.05
                    }}
                    onPress={() => this.props.navigation.navigate('login')}
                />
                <Text style={styles.headerStyle}>
                    What are you signing up as ?
                </Text>
                <View style={{
                    flexDirection: 'row',
                    width: width,
                    justifyContent: 'space-evenly',
                    marginTop: height * 0.1
                }}>
                    <TouchableOpacity onPress={() => this.onSelect("cook")}>
                        <Image style={styles.imagestyle} source={require('../../../../assets/chef_hat.png')} />
                        <Text style={styles.selectionTextStyle}>
                            Cook
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.onSelect("customer")}>
                        <Image style={styles.imagestyle} source={require('../../../../assets/fork.png')} />
                        <Text style={styles.selectionTextStyle}>
                            Customer
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    log = (message) => {
        console.log("[CustomerTypeScreen] " + message);
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingTop: verticalScale(50)
    },
    headerStyle: {
        ...material.headline,
        ...systemWeights.bold,
        color: materialColors.blackPrimary,
        width: width * 0.9,
        marginLeft: width * 0.1,
        fontFamily: style.font
    },
    imagestyle: {
        height: width * 0.3,
        width: width * 0.3
    },
    selectionTextStyle: {
        ...systemWeights.semibold,
        fontSize: style.subheading,
        color: materialColors.blackSecondary,
        // width: width * 0.9,
        // marginLeft: width * 0.11,
        fontFamily: style.font,
        textAlign: 'center',
        padding: 10
    }
});

export default connect(null, actions)(CustomerTypeScreen);

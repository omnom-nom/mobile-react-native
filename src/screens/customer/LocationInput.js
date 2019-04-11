//import liraries
import React, { Component } from 'react';
import { View, Text, Animated, Keyboard, FlatList, TouchableOpacity } from 'react-native';
import { moderateScale, width, verticalScale, height } from '../../cmn/Scaling';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import { style } from '../../cmn/AppConfig'
import { Input, ListItem, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class LocationInput extends Component {
    state = {
        location: "",
        autocomplete_addresses: null
    }

    constructor(props) {
        super(props)
        this.expand = new Animated.Value(0)
        this.expand.addListener(({ value }) => this._value = value);
    }

    componentWillMount = () => {
        Animated.spring(
            this.expand, {
                toValue: 1,
            }).start()
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.hasOwnProperty('delivery_address')) {
            this.setState({ location: nextProps.delivery_address })
        }
        if (nextProps.hasOwnProperty('delivery_autocomplete_addresses')) {
            this.setState({ autocomplete_addresses: nextProps.delivery_autocomplete_addresses })
        }
    }

    renderAddressList = () => {
        const keyExtractor = (item, index) => item["place_id"]
        const renderItem = ({ item }) => (
            <TouchableOpacity onPress={() => {
                this.props.selectAddress(item["place_id"])
                this.props.createSessionTokenForGooglePlaceApi()
                // TODO: select and move to next screen
            }}
            >
                <ListItem
                    title={item["description"]}
                    titleStyle={{
                        // fontSize: style.subheading,,
                        fontSize: moderateScale(15),
                        fontFamily: style.font
                    }}
                    style={{
                        borderWidth: 0,
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}
                    leftIcon={
                        <Icon
                            name='location-on'
                            size={moderateScale(25)}
                            color={iOSColors.yellow}
                        />
                    }
                />
            </TouchableOpacity>
        )
        return (
            <FlatList
                keyExtractor={keyExtractor}
                data={this.state.autocomplete_addresses}
                renderItem={renderItem}
            />
        )
    }

    render() {
        const top = this.expand.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [height, height - this.props.style.height, 0]
        });
        const containerHeight = this.expand.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [0, this.props.style.height, height]
        });
        const containerTopLeftRadius = this.expand.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [this.props.style.borderTopLeftRadius, this.props.style.borderTopLeftRadius, 0]
        });
        const containerTopRightRadius = this.expand.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [this.props.style.borderTopRightRadius, this.props.style.borderTopRightRadius, 0]
        });
        const containerPaddingTop = this.expand.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [height * 0.01, height * 0.01, height * 0.03]
        });
        const cancelButtonLeft = this.expand.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [width, width, 0]
        });

        let addressList = null
        if (this.expand._value == 2) {
            addressList = this.renderAddressList()
        }

        return (
            <Animated.View style={{
                ...this.props.style,
                top: top,
                height: containerHeight,
                borderTopLeftRadius: containerTopLeftRadius,
                borderTopRightRadius: containerTopRightRadius,
                borderWidth: 1,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 8,
                },
                shadowOpacity: 0.44,
                shadowRadius: 10.32,
                elevation: 16,
                paddingTop: containerPaddingTop,
            }}>
                <View style={{
                    width,
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    paddingHorizontal: width * 0.07,
                }}>
                    <Text style={{
                        ...styles.subHeaderStyle,
                    }}>
                        Hi, Kashish
                    </Text>
                    <Animated.Text style={{
                        ...styles.subHeaderStyle,
                        marginTop: this.props.style.height * 0.1,
                        left: cancelButtonLeft
                    }}
                        onPress={() => {
                            Keyboard.dismiss()
                            Animated.spring(
                                this.expand, {
                                    toValue: 1,
                                }).start()
                            this.setState({ autocomplete_addresses: [] })
                        }}
                    >
                        Cancel
                    </Animated.Text>
                </View>
                <Text style={{
                    ...styles.headerStyle,
                }}>
                    What's your delivery address?
                </Text>
                <Input
                    clearButtonMode="while-editing"
                    containerStyle={{
                        marginTop: this.props.style.height * 0.05,
                        borderWidth: 0.5,
                        width: width * 0.9,
                        left: width * 0.05,
                        height: height * 0.07,
                        borderRadius: moderateScale(5),
                        borderColor: iOSColors.midGray,
                        paddingHorizontal: 0,
                        shadowColor: 'rgba(0,0,0, .2)', // IOS
                        shadowOffset: { height: 1, width: 0 }, // IOS
                        shadowOpacity: 1, // IOS
                        shadowRadius: 1, //IOS
                        backgroundColor: iOSColors.white,
                        elevation: 2,
                        justifyContent: 'center'
                    }}
                    inputContainerStyle={{
                        borderBottomWidth: 0
                    }}
                    inputStyle={{
                        fontFamily: style.font,
                        fontWeight: '100',
                    }}
                    leftIconContainerStyle={{
                        marginRight: width * 0.05
                    }}
                    placeholder='Delivery Address'
                    leftIcon={
                        <Icon
                            name='search'
                            size={moderateScale(15)}
                            color={iOSColors.yellow}
                        />
                    }
                    value={this.state.location}
                    onFocus={() => {
                        Animated.spring(
                            this.expand, {
                                toValue: 2,
                            }).start()
                    }}
                    onChangeText={(text) => {
                        this.props.updateCustomerDeliveryLocation(text)
                        if (this.expand._value == 2) {
                            this.props.autocompleteAddress(text)
                        }
                    }}
                    selectionColor="#fbb700"
                />
                {addressList}
            </Animated.View>
        );
    }
}

// define your styles
const styles = {
    textStyle: {
        borderWidth: 1,
        width: width * 0.9,
        marginLeft: width * 0.05,
        height: height * 0.05
    },
    headerStyle: {
        fontSize: style.subheading,
        ...systemWeights.bold,
        color: materialColors.blackPrimary,
        width: width * 0.9,
        marginLeft: width * 0.07,
        fontFamily: style.font
    },
    subHeaderStyle: {
        fontSize: style.subheading,
        ...systemWeights.light,
        color: materialColors.blackSecondary,
        fontFamily: style.font
    }
};

mapStateToProps = ({ customer_info }) => {
    if (customer_info === undefined) {
        return {
            delivery_address: ""
        }
    }
    return {
        delivery_address: customer_info["customer_delivery_address"],
        delivery_autocomplete_addresses: customer_info["customer_delivery_autocomplete_addresses"]
    }
}

export default connect(mapStateToProps, actions)(LocationInput);
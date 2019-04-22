//import liraries
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { Button, Icon, Image } from 'react-native-elements';
import { Logger } from 'aws-amplify'
import { moderateScale, width, verticalScale, height } from '../../cmn/Scaling';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import { style, colors, loggerConfig, infoAbsent, numberAbsent } from '../../cmn/AppConfig'
import ScreenHeader from '../../components/ScreenHeader';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import _ from 'lodash'
import NotFoundComponent from '../../components/NotFoundComponent';

// create a component
const color = colors.caribbreanGreen
const logger = new Logger("[CartScreen]", loggerConfig.level)
const itemHeight = height * 0.15
class CartScreen extends Component {

    state = {
        items: [],
        subTotal: 0,
        taxAndFees: 0,
        delivery: 0,
        total: 0
    }

    componentWillMount = () => {
        this.setState({
            items: this.props.items,
            subTotal: this.props.subTotal,
            taxAndFees: this.props.taxAndFees,
            delivery: this.props.delivery,
            total: this.props.total
        })
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            items: nextProps.items,
            subTotal: nextProps.subTotal,
            taxAndFees: nextProps.taxAndFees,
            delivery: nextProps.delivery,
            total: nextProps.total
        })
    }

    checkout = () => {
        this.props.navigation.navigate("checkout")
    }

    addMoreItemToCart = (item) => {
        this.props.addToCart(item)
    }

    removeItemCount = (item) => {
        this.props.removeFromCart(item)
    }

    deleteItemfromCart = (item) => {
        this.props.deleteFromCart(item)
    }

    renderCartItem = (item) => {
        return (
            <View key={item.id} style={styles.cartItemContainerStyle}>
                <View
                    style={{
                        ...styles.cartItemImageStyle,
                        ...style.shadow()
                    }}
                >
                    <Image
                        style={styles.cartItemImageStyle}
                        source={{
                            uri: item.images[0]
                        }}
                    />
                </View>

                <View style={styles.cartItemInfoStyle}>
                    <View style={{
                        flexDirection: 'row',
                        width: width * 0.6 - styles.cartItemInfoStyle.paddingHorizontal * 2,
                        justifyContent: 'space-between'
                    }}>
                        <Text style={{
                            fontFamily: style.font,
                            fontSize: moderateScale(15),
                            fontWeight: 'bold'
                        }}>
                            {item.name}
                        </Text>
                        <Icon
                            name='close'
                            type="material-community"
                            size={moderateScale(20)}
                            color={colors.caribbreanGreen}
                            onPress={() => this.deleteItemfromCart(item)}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        width: width * 0.6 - styles.cartItemInfoStyle.paddingHorizontal * 2,
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>

                            <Icon
                                name='plus-box'
                                type="material-community"
                                size={moderateScale(30)}
                                color={colors.caribbreanGreen}
                                onPress={() => this.addMoreItemToCart(item)}
                            />
                            <Text style={{
                                fontFamily: style.font,
                                fontSize: moderateScale(15),
                                margin: moderateScale(10)
                            }}>{item.count}</Text>
                            <Icon
                                name='minus-box'
                                type="material-community"
                                size={moderateScale(30)}
                                color={colors.caribbreanGreen}
                                onPress={() => this.removeItemCount(item)}
                            />
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    renderSummaryItem = (type, amount) => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: moderateScale(10),
                }}
            >
                <Text
                    style={{
                        fontFamily: style.font,
                        fontSize: moderateScale(15),
                        fontWeight: '600'
                    }}
                >{type}</Text>
                <Text
                    style={{
                        fontFamily: style.font,
                        fontSize: moderateScale(15),
                        fontWeight: '100'
                    }}
                >$ {amount}</Text>
            </View>
        )
    }

    renderSummary = () => {
        return (
            <View style={styles.summaryContainerStyle}>
                {this.renderSummaryItem("Subtotal", this.state.subTotal)}
                {this.renderSummaryItem("Tax and Fees", this.state.taxAndFees)}
                {this.renderSummaryItem("Delivery", this.state.delivery)}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: moderateScale(10),
                        paddingTop: moderateScale(10),
                        borderTopWidth: 2,
                        borderTopColor: colors.caribbreanGreen,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: style.font,
                            fontSize: moderateScale(15),
                            fontWeight: '600'
                        }}
                    >Total</Text>
                    <Text
                        style={{
                            fontFamily: style.font,
                            fontSize: moderateScale(15),
                            fontWeight: '100'
                        }}
                    >$ {this.state.total}</Text>
                </View>
            </View>
        )
    }

    renderCartItemsList = () => {
        return this.state.items.map((i) => {
            return this.renderCartItem(i)
        })
    }

    renderCheckoutButton = () => {
        if (this.state.total <= 0) {
            return null
        }
        return (
            <Button
                containerStyle={styles.checkoutButtonContainerStyle}
                buttonStyle={styles.checkoutButtonStyle}
                titleStyle={styles.checkoutButtonTitleStyle}
                title="Checkout"
                onPress={() => this.checkout()}
            />
        )
    }

    renderAddMoreItemsButtom = () => {
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text
                    style={{
                        fontFamily: style.font,
                        color: colors.radicalRed,
                        fontSize: moderateScale(15)
                    }}
                    onPress={() => {
                        this.props.currentCook(this.state.items[0].cook)
                        this.props.navigation.navigate("cook")
                    }}
                > Add more items
                </Text>
            </View>
        )
    }

    renderItemsComponent = () => {
        if (_.isEmpty(this.state.items)) {
            return null
        }
        return (
            <ScrollView>
                {this.renderCartItemsList()}
                {this.renderAddMoreItemsButtom()}
                {this.renderSummary()}
                {this.renderCheckoutButton()}
            </ScrollView>
        )
    }

    renderNotingComponent = () => {
        if (!_.isEmpty(this.state.items)) {
            return null
        }
        return (
            <NotFoundComponent message="No items in the cart" />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ScreenHeader header="Cart" size={25} />
                {this.renderItemsComponent()}
                {this.renderNotingComponent()}
            </View>
        );
    }
}

// define your styles
const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: style.backgroundColor(),
    },
    checkoutButtonStyle: {
        width: width * 0.6,
        borderRadius: 100,
        backgroundColor: color
    },
    checkoutButtonContainerStyle: {
        width,
        justifyContent: 'center',
        alignItems: 'center',
        ...style.shadow()
    },
    checkoutButtonTitleStyle: {
        fontFamily: style.font
    },
    cartItemContainerStyle: {
        height: itemHeight,
        width: width * 0.9,
        margin: width * 0.05,
        // backgroundColor: iOSColors.white,
        flexDirection: 'row',
        borderRadius: moderateScale(20),
        marginBottom: moderateScale(20),
        // ...style.shadow()
    },
    cartItemImageStyle: {
        height: itemHeight,
        width: width * 0.3,
        borderRadius: moderateScale(20),
        // ...style.shadow()
    },
    cartItemInfoStyle: {
        height: itemHeight,
        width: width * 0.6,
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(5),
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    summaryContainerStyle: {
        width: width * 0.9,
        // height: height * 0.3,
        margin: width * 0.05,
        backgroundColor: iOSColors.white,
        borderRadius: moderateScale(20),
        marginBottom: moderateScale(20),
        padding: moderateScale(20),
        ...style.shadow()
    }
};

mapStateToProps = ({ order_info }) => {
    const items = infoAbsent(order_info) || infoAbsent(order_info.items) ? [] : [...order_info.items.values()]
    const subTotal = infoAbsent(order_info) || numberAbsent(order_info.subTotal) ? 0 : order_info.subTotal
    const taxAndFees = infoAbsent(order_info) || numberAbsent(order_info.taxAndFees) ? 0 : order_info.taxAndFees
    const delivery = infoAbsent(order_info) || numberAbsent(order_info.delivery) ? 0 : order_info.delivery
    const total = infoAbsent(order_info) || numberAbsent(order_info.total) ? 0 : order_info.total
    return {
        items,
        subTotal,
        taxAndFees,
        delivery,
        total
    }
}

export default connect(mapStateToProps, actions)(CartScreen);

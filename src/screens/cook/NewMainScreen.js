//import liraries
import React, { Component } from 'react';
import { View, Text, Switch, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Haptic } from 'expo';
import { Icon, Image, Button, ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Logger } from 'aws-amplify'
import { loggerConfig, colors, infoAbsent } from '../../cmn/AppConfig'
import { moderateScale, width, verticalScale, height } from '../../cmn/Scaling';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import { style } from '../../cmn/AppConfig'
import _ from 'lodash'

class DashboardButton extends Component {
    render() {
        w = width * 0.3
        h = height * 0.25
        iconStyle = this.props.iconStyle || {}
        iconColorOpacity = iconStyle.iconColorOpacity || 0.1
        return (
            <TouchableOpacity
                style={{
                    width: w,
                    height: h,
                    ...style.shadow({ color: colors.eerieBlack, size: 2, opacity: 0.4 }),
                    backgroundColor: '#6772E5',
                    borderRadius: moderateScale(10),
                    alignItems: 'center',
                    paddingVertical: moderateScale(20),
                    justifyContent: 'space-between',
                    ...this.props.style
                }}
                onPress={(this.props.onPress)}
            >
                <View
                    style={{
                        position: 'absolute',
                        height: h,
                        justifyContent: 'center',
                        left: w / 4,
                    }}
                >
                    <Icon
                        name={this.props.iconName}
                        type="material-community"
                        size={h / 1.3}
                        color={`rgba(246, 249, 252, ${iconColorOpacity})`}
                    />
                </View>
                <Text style={style.fontStyle({ color: '#F6F9FC', fontWeight: '500', letterSpacing: 1, size: 15 })}>
                    {_.upperCase(this.props.title)}
                </Text>
                {this.props.components}
            </TouchableOpacity>
        )
    }
}



class NewMainScreen extends Component {

    state = {
        name: "Kashish Tayal",
        status: true,
        review: 3.5,
        earnings: 40,
        newOrders: 0,
        ongoingOrders: 1,
        acceptedOrders: 1,
        dishes: 2
    }

    componentWillMount = () => {
        this.setState({ newOrders: this.props.newOrders })
    }
    componentWillReceiveProps = (nextProps) => {
        this.setState({ newOrders: nextProps.newOrders })
    }

    getSubComponentHeader = (title) => {
        if (_.isEmpty(title)) {
            return null
        }
        return (
            <View style={{
                width: width * 0.3,
                marginBottom: moderateScale(10),
                marginLeft: moderateScale(10),
                borderBottomWidth: moderateScale(2),
                borderBottomColor: '#6B7C93',
            }}>
                <Text style={style.fontStyle({ size: 15, fontWeight: '500', color: '#6B7C93' })}>
                    {_.upperCase(title)}
                </Text>
            </View>
        )
    }

    renderSubComponent = (title, components) => {
        return (
            <View style={{
                marginVertical: moderateScale(15),
            }}>
                {this.getSubComponentHeader(title)}
                {components}
            </View>
        )
    }
    dashboardButtonAmount = (value) => {
        return (
            <Text style={style.fontStyle({ color: '#F6F9FC', fontWeight: '300', letterSpacing: 1, size: 40 })}>
                {value}
            </Text>
        )
    }

    rowOfButtons = (...buttons) => {
        return (
            <View style={{
                width,
                flexDirection: 'row',
                justifyContent: 'space-evenly'
            }}>
                {buttons}
            </View>
        )
    }

    render() {
        onPress = (navigateTo) => {
            return (
                () => {
                    Haptic.impact(Haptic.ImpactFeedbackStyle.Light)
                    this.props.navigation.navigate(navigateTo)
                }
            )
        }
        return (
            <View style={styles.container}>
                <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: width * 0.025,
                    width,
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <View style={{
                        height: height * 0.25,
                        width: width * 0.6,
                    }}>
                        <Text style={style.fontStyle({ size: 35, fontWeight: '600', color: style.secondaryColor })}>
                            omnom
                        </Text>
                        <View>
                            <Text style={style.fontStyle({ size: 25, fontWeight: '400', color: colors.eerieBlack })}>
                                Hi {this.state.name}
                            </Text>
                            <Text style={style.fontStyle({ size: 15, fontWeight: 'bold', color: '#6B7C93' })}>
                                {this.state.status ? "Available" : "Not Available"}
                            </Text>
                        </View>
                    </View>
                    <DashboardButton onPress={onPress('earnings')} iconStyle={{ iconColorOpacity: 0.15 }} style={{ backgroundColor: '#3ECF8E' }} iconName='cash-multiple' title='Earnings' components={this.dashboardButtonAmount(this.state.earnings)} />
                </View>
                {this.renderSubComponent('order',
                    this.rowOfButtons(
                        <DashboardButton onPress={onPress('new_orders')} key='New' iconName='basket' title='New' components={this.dashboardButtonAmount(this.state.newOrders)} />,
                        <DashboardButton onPress={onPress('accepted_orders')} key='Accepted' iconName='rocket' title='Accepted' components={this.dashboardButtonAmount(this.state.acceptedOrders)} />,
                        <DashboardButton onPress={onPress('ongoing_orders')} key='Ongoing' iconName='check-all' title='Ongoing' components={this.dashboardButtonAmount(this.state.ongoingOrders)} />
                    )
                )}
                {this.renderSubComponent('',
                    this.rowOfButtons(
                        <DashboardButton onPress={onPress('menu')} key='Menu' iconStyle={{ iconColorOpacity: 0.3 }} style={{ backgroundColor: '#3ECF8E' }} iconName='carrot' title='Menu' components={this.dashboardButtonAmount(this.state.dishes)} />,
                        <DashboardButton onPress={onPress('review')} key='Reviews' iconStyle={{ iconColorOpacity: 0.3 }} style={{ backgroundColor: '#3ECF8E' }} iconName='star' title='Reviews' components={this.dashboardButtonAmount(this.state.review)} />
                    )
                )}
            </View >
        )
    }
}

const styles = {
    container: {
        flex: 1,
        paddingTop: moderateScale(50),
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
};

mapStateToProps = ({ cook_orders }) => {
    logger = new Logger("[NewMainScreen]", loggerConfig.level)
    if (_.isUndefined(cook_orders)) {
        return {
            newOrders: 0
        }
    }
    const { today, tomorrow } = cook_orders
    let numToday = _.isUndefined(today) ? 0 : today.length
    let numTomorrow = _.isUndefined(tomorrow) ? 0 : tomorrow.length
    return {
        newOrders: numToday + numTomorrow
    }
}

export default connect(mapStateToProps, actions)(NewMainScreen);
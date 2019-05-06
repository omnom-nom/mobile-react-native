//import liraries
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { Icon, ListItem, Button } from 'react-native-elements';
import { Logger } from 'aws-amplify'
import { moderateScale, width, verticalScale, height } from '../../cmn/Scaling';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import { style, colors, loggerConfig } from '../../cmn/AppConfig'
import NotFoundComponent from '../../components/NotFoundComponent';
import ScreenHeader from '../../components/ScreenHeader';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import _ from 'lodash'

// this component will show new requests for today and for future
logger = new Logger("[NewOrdersScreen]", loggerConfig.level)

class NewOrdersScreen extends Component {
    state = {
        today: [],
        tomorrow: []
    }

    componentWillMount = () => {
        this.setState({ today: this.props.today, tomorrow: this.props.tomorrow })
    }
    componentWillReceiveProps = (nextProps) => {
        this.setState({ today: nextProps.today, tomorrow: nextProps.tomorrow })
    }

    accept = (order) => {

    }

    decline = (order) => {

    }
    renderOrder = (order) => {
        return (
            <View key={order.orderNumber} style={styles.orderContainerStyle}>
                <View style={{
                    flexDirection: 'row',
                    marginBottom: moderateScale(10),
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <View>
                        <Text style={{
                            fontFamily: style.font,
                            fontSize: moderateScale(18),
                            fontWeight: 'bold'
                        }}>
                            {order.dish}
                        </Text>
                        <Text style={{
                            fontFamily: style.font,
                            fontSize: moderateScale(13),
                        }}>
                            Order Number: {order.orderNumber}
                        </Text>
                    </View>
                    <Text style={{
                        fontFamily: style.font,
                        fontSize: moderateScale(16),
                        fontWeight: 'bold'
                    }}>
                        {order.time}
                    </Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly'
                }}>
                    <Button
                        // containerStyle={style.shadow()}
                        buttonStyle={{
                            width: width * 0.5 - moderateScale(22),
                            backgroundColor: style.secondaryColor
                        }}
                        titleStyle={{
                            fontFamily: style.font
                        }}
                        title="Accept"
                        onPress={() => this.accept(order)}
                    />
                    <Button
                        // containerStyle={style.shadow()}
                        buttonStyle={{
                            width: width * 0.5 - moderateScale(22),
                            backgroundColor: colors.radicalRed
                        }}
                        titleStyle={{
                            fontFamily: style.font
                        }}
                        title="Decline"
                        onPress={() => this.decline(order)}
                    />
                </View>
            </View>
        )
    }
    renderSectionHeader = (title) => {
        return (
            <View style={{
                borderBottomColor: iOSColors.lightGray,
                borderBottomWidth: 0.5,
                width,
                paddingHorizontal: moderateScale(20),
                paddingVertical: moderateScale(5)
            }}>
                <Text style={style.fontStyle({ size: 20, fontWeight: 'bold' })}>
                    {title}
                </Text>
            </View>
        )
    }
    renderTodaySection = () => {
        if (_.isEmpty(this.state.today)) {
            return null
        }
        return (
            <View style={{
                borderBottomWidth: 10,
                borderBottomColor: iOSColors.lightGray
            }}>
                {this.renderSectionHeader('Today')}
                {this.state.today.map((o) => {
                    return this.renderOrder(o)
                })}
            </View>
        )
    }

    renderTomorrowSection = () => {
        if (_.isEmpty(this.state.tomorrow)) {
            return null
        }
        return (
            <View style={{
                paddingTop: moderateScale(10)
            }}>
                {this.renderSectionHeader('Tomorrow')}
                {this.state.tomorrow.map((o) => {
                    return this.renderOrder(o)
                })}
            </View>
        )
    }
    renderNotingComponent = () => {
        if (_.isEmpty(this.state.tomorrow) && _.isEmpty(this.state.today)) {
            return (
                <NotFoundComponent message="No new requests" />
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScreenHeader
                    header="REQUESTS"
                    size={20}
                    headerStyle={{ fontWeight: 'normal', }}
                    back={{
                        show: true,
                        navigate: () => {
                            this.props.navigation.goBack()
                        }
                    }}
                />
                <ScrollView>
                    {this.renderTodaySection()}
                    {this.renderTomorrowSection()}
                    {this.renderNotingComponent()}
                </ScrollView>
            </View>
        );
    }
}

// define your styles
const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        // paddingTop: moderateScale(35),
    },
    orderContainerStyle: {
        borderBottomColor: iOSColors.lightGray,
        borderBottomWidth: 0.5,
        width,
        padding: moderateScale(20)
    }
};

mapStateToProps = ({ cook_orders }) => {
    if (_.isUndefined(cook_orders)) {
        return {
            today: [],
            tomorrow: []
        }
    }
    const { requests } = cook_orders
    let today = _.isUndefined(requests) || _.isUndefined(requests.today) ? [] : requests.today
    let tomorrow = _.isUndefined(requests) || _.isUndefined(requests.tomorrow) ? [] : requests.tomorrow
    return {
        today: today,
        tomorrow: tomorrow
    }
}


export default connect(mapStateToProps, actions)(NewOrdersScreen);

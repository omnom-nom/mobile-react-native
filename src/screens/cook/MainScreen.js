//import liraries
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { Logger } from 'aws-amplify'
import { moderateScale, width, verticalScale, height } from '../../cmn/Scaling';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import { style, colors, loggerConfig } from '../../cmn/AppConfig'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import StarRating from 'react-native-star-rating';
import _ from 'lodash'

// create a component
class MainScreen extends Component {
    state = {
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
    renderReviews = () => {
        return this.renderTile("Reviews",
            () => this.props.navigation.navigate('review'),
            <StarRating
                key={"starratings"}
                disabled={true}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                maxStars={5}
                rating={this.state.review}
                fullStarColor={colors.scarlet}
                starSize={moderateScale(25)}
            />,
            this.renderTileText("ratingtext", this.state.review)
        )
    }
    renderTotalMoney = () => {
        return this.renderTile("Total Earnings",
            () => this.props.navigation.navigate('earnings'),
            this.renderTileIcon("earningsIcon", "cash-multiple", colors.alienArmpit),
            this.renderTileText("earningsText", `${this.state.earnings} $`)
        )
    }
    renderNewOrders = () => {
        return this.renderTile("New Requests",
            () => {
                this.props.navigation.navigate('new_orders')
                this.props.newRequests()
            },
            this.renderTileIcon("newordersicon", "basket", colors.robinsEggBlue),
            this.renderTileText("neworderstext", this.state.newOrders)
        )
    }
    renderOngoingOrders = () => {
        return this.renderTile("Ongoing Orders",
            () => this.props.navigation.navigate('ongoing_orders'),
            this.renderTileIcon("ongoingordersicon", "rocket", colors.robinsEggBlue),
            this.renderTileText("ongoingorderstext", this.state.ongoingOrders)
        )
    }
    renderAcceptedOrders = () => {
        return this.renderTile("Accepted Orders",
            () => this.props.navigation.navigate('accepted_orders'),
            this.renderTileIcon("acceptedordersicon", "check-all", colors.robinsEggBlue),
            this.renderTileText("acceptedorderstext", this.state.acceptedOrders)
        )
    }
    renderTodaysMenu = () => {
        return this.renderTile("Dishes on your menu",
            () => this.props.navigation.navigate('menu'),
            <View key="menuicon" style={{ flexDirection: 'row' }}>
                {this.renderTileIcon("menuicon1", "carrot", iOSColors.orange)}
                {this.renderTileIcon("menuicon2", "bowl", iOSColors.green)}
            </View>,
            this.renderTileText("menucount", `${this.state.dishes}`),
        )
    }

    renderTileText = (key, text) => {
        return (
            <Text
                key={key}
                style={
                    style.fontStyle({
                        color: iOSColors.black, // style.secondaryColor,
                        size: 25,
                        fontWeight: '300'
                    })
                }>
                {text}
            </Text>
        )
    }
    renderTileIcon = (iconkey, name, color = colors.scarlet) => {
        return (
            <Icon
                key={iconkey}
                name={name}
                type="material-community"
                size={moderateScale(40)}
                color={color}
            // containerStyle={style.shadow(colors.radicalRed)}
            />
        )
    }
    renderTile = (tilename, callback, ...components) => {
        return <TouchableOpacity
            onPress={() => callback()}
            key={tilename}
            style={styles.tileContainerStyle}>
            <Text style={style.fontStyle({ size: 14, fontWeight: '500', color: iOSColors.gray })}
            >
                {_.upperCase(tilename)}
            </Text>
            {components}
        </TouchableOpacity>
    }
    renderRow = (...components) => {
        return (
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
                {components}
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    marginBottom: moderateScale(10),
                }}>
                    <Text style={styles.titleStyle}>omnom</Text>
                </View>
                <ScrollView>
                    {this.renderRow(
                        this.renderTotalMoney(),
                        this.renderNewOrders(),
                        this.renderOngoingOrders(),
                        this.renderAcceptedOrders(),
                        this.renderTodaysMenu(),
                        this.renderReviews(),
                    )}
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
        backgroundColor: iOSColors.white,
        paddingTop: moderateScale(25),
    },
    titleStyle: {
        fontSize: moderateScale(35),
        color: colors.caribbreanGreen
    },
    tileContainerStyle: {
        borderWidth: 0.5,
        borderColor: iOSColors.lightGray,
        width: width * 0.5,
        height: height * 0.25,
        padding: width * 0.05,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
    }
};

mapStateToProps = ({ cook_orders }) => {
    logger = new Logger("[MainScreen]", loggerConfig.level)
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

export default connect(mapStateToProps, actions)(MainScreen);

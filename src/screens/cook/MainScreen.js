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
        newOrders: 2,
        ongoingOrders: 1,
        acceptedOrders: 1,
        numberOfDishToday: 2
    }
    renderReviews = () => {
        return this.renderTile("Reviews",
            <StarRating
                key={"starratings"}
                disabled={true}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                maxStars={5}
                rating={this.state.review}
                fullStarColor={colors.radicalRed}
                starSize={moderateScale(25)}
            />,
            this.renderTileText("ratingtext", this.state.review)
        )
    }
    renderTotalMoney = () => {
        return this.renderTile("Total Earnings",
            this.renderTileIcon("earningsIcon", "cash-multiple"),
            this.renderTileText("earningsText", `${this.state.earnings} $`)
        )
    }
    renderNewOrders = () => {
        return this.renderTile("New Requests",
            this.renderTileIcon("newordersicon", "food"),
            this.renderTileText("neworderstext", this.state.newOrders)
        )
    }
    renderOngoingOrders = () => {
        return this.renderTile("Ongoing Orders",
            this.renderTileIcon("ongoingordersicon", "run-fast"),
            this.renderTileText("ongoingorderstext", this.state.ongoingOrders)
        )
    }
    renderAcceptedOrders = () => {
        return this.renderTile("Accepted Orders",
            this.renderTileIcon("acceptedordersicon", "check-all"),
            this.renderTileText("acceptedorderstext", this.state.acceptedOrders)
        )
    }
    renderTodaysMenu = () => {
        return this.renderTile("Today's Dishes",
            this.renderTileIcon("todaysmenuicon", "check-all"),
            this.renderTileText("todaysmenutext", this.state.numberOfDishToday)
        )
    }

    renderTileText = (key, text) => {
        return (
            <Text
                key={key}
                style={{
                    fontFamily: style.font,
                    color: colors.caribbreanGreen,
                    fontSize: moderateScale(40)
                }}>
                {text}
            </Text>
        )
    }
    renderTileIcon = (iconkey, name) => {
        return (
            <Icon
                key={iconkey}
                name={name}
                type="material-community"
                size={moderateScale(40)}
                color={colors.radicalRed}
                containerStyle={style.shadow(colors.radicalRed)}
            />
        )
    }
    renderTile = (tilename, ...components) => {
        return <TouchableOpacity
            key={tilename}
            style={styles.tileContainerStyle}>
            <Text style={{
                fontFamily: style.font,
                color: colors.caribbreanGreen,
                fontSize: moderateScale(13)
            }}>
                {_.upperCase(tilename)}
                {/* {tilename} */}
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
        height: width * 0.5,
        padding: width * 0.05,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
    }
};

//make this component available to the app
export default MainScreen;

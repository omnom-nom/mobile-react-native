//import liraries
import React, { Component } from 'react';
import { View, Text, ScrollView, Keyboard, FlatList, TouchableOpacity } from 'react-native';
import { Haptic } from 'expo';
import { Icon, Image } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Logger } from 'aws-amplify'
import { loggerConfig, colors, infoAbsent } from '../../cmn/AppConfig'
import TabBarIcon from '../../components/TabBarIcon';
import { moderateScale, width, verticalScale, height } from '../../cmn/Scaling';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import { style } from '../../cmn/AppConfig'
import CooksList from '../../components/CooksList';
import _ from 'lodash'
import NotFoundComponent from '../../components/NotFoundComponent';


const logger = new Logger("[MenuScreen]", loggerConfig.level)
const IMAGES = {
    "all": require('../../../assets/cuisines/all.png'),
    "indian": require('../../../assets/cuisines/indian.png'),
    "chinese": require('../../../assets/cuisines/chinese.png'),
    "italian": require('../../../assets/cuisines/italian.png'),
}

class MenuScreen extends Component {

    state = {
        current_cuisine: "all",
    }

    renderCuisineSelector = (cuisines) => {
        return (
            <View style={{
                width,
                marginVertical: moderateScale(20),
            }}>
                <Text style={{
                    ...styles.headerStyle
                }}>Pick a cuisines</Text>
                <FlatList
                    horizontal
                    keyExtractor={(item) => item}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        const type = _.toLower(item)
                        const backgroundColor = this.state.current_cuisine === type ? iOSColors.white : null
                        const fontColor = this.state.current_cuisine === type ? colors.mountainMedow : iOSColors.gray
                        return (
                            <TouchableOpacity style={{
                                marginHorizontal: moderateScale(10),
                                marginTop: moderateScale(5),
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                                onPress={() => {
                                    Haptic.impact(Haptic.ImpactFeedbackStyle.Light)
                                    this.setState({
                                        current_cuisine: type
                                    })
                                }}
                            >
                                <View
                                    style={{
                                        ...styles.cuisineButtonContainerStyle,
                                        backgroundColor
                                    }}
                                >
                                    <Image
                                        source={IMAGES[type]}
                                        style={{
                                            width: moderateScale(40),
                                            height: moderateScale(40),
                                        }} />
                                </View>
                                <Text
                                    style={{
                                        fontFamily: style.font,
                                        margin: moderateScale(5),
                                        fontSize: moderateScale(10),
                                        color: fontColor,
                                        fontWeight: '600'
                                    }}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )
                    }}
                    data={cuisines}
                />
            </View>
        )
    }

    renderDilveryAddress = () => {
        const color = colors.caribbreanGreen
        return (
            <TouchableOpacity
                onPress={() => {
                    Haptic.impact(Haptic.ImpactFeedbackStyle.Light)
                    this.props.navigation.navigate("delivery_location")
                }}
                style={styles.deliveryAddressContainerStyle}
            >
                <Icon
                    name='location-on'
                    size={moderateScale(15)}
                    color={color}
                />
                <Text
                    style={{
                        fontFamily: style.font,
                        margin: moderateScale(5),
                        fontSize: moderateScale(12),
                        color,
                        fontWeight: '600',
                        textAlign: 'center'
                    }}
                >
                    {this.getAddressString()}
                </Text>
            </TouchableOpacity>
        )
    }

    render() {
        const cuisines = this.getCuisines()
        const merchants = this.getMerchants(this.state.current_cuisine)
        let view = <NotFoundComponent message="No cooks in your region, please try again later" />
        if (!_.isEmpty(merchants)) {
            view = <ScrollView style={{
                width,
                top: moderateScale(40)
            }}>
                {this.renderCuisineSelector(cuisines)}
                <Text style={styles.headerStyle}>Cooks around you</Text>
                <CooksList merchants={merchants} />
            </ScrollView>
        }
        return (
            <View style={styles.container}>
                {this.renderDilveryAddress()}
                {view}
            </View>
        );
    }
    getCuisines = () => {
        return _.concat("ALL", _.uniq(_.transform(this.props.merchants, function (result, n) {
            result.push(_.toUpper(n["cuisine"]))
        }, [])))
    }

    getMerchants = (current_cuisine) => {
        return _.filter(this.props.merchants, function (m) {
            if (current_cuisine === 'all') {
                return true
            }
            return _.isEqual(_.lowerCase(m["cuisine"]), current_cuisine)
        })
    }

    getAddressString = () => {
        const components = _.remove(
            [
                this.props.delivery_address["street_number"],
                this.props.delivery_address["street_name"],
                this.props.delivery_address["city"]
            ],
            function (n) {
                return !_.isNull(n) && !_.isUndefined(n) && !_.isEmpty(n);
            })
        return _.join(components, ", ")
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: style.backgroundColor,
        paddingTop: height * 0.05,
    },
    headerStyle: {
        ...material.subheading,
        width,
        color: materialColors.blackSecondary,
        // color: colors.eerieBlack,
        fontFamily: style.font,
        marginLeft: moderateScale(15),
        // textDecorationLine: 'underline',
    },
    deliveryAddressContainerStyle: {
        position: 'absolute',
        top: height * 0.05,
        flexDirection: 'row',
        ...style.shadow,
        borderRadius: moderateScale(20),
        backgroundColor: iOSColors.white,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: moderateScale(10),
        marginBottom: moderateScale(10),
    },
    cuisineButtonContainerStyle: {
        ...style.shadow,
        width: moderateScale(50),
        height: moderateScale(50),
        borderRadius: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center'
    }
};

mapStateToProps = ({ order_info, merchant_info }) => {
    let delivery_address = {
        street_number: "1323",
        street_name: "Steelhead Cmn",
        city: "Fremont",
        postal_code: "94536"
    }
    let merchants = []
    if (!infoAbsent(order_info)) {
        delivery_address = order_info["delivery_address"]
    }
    if (!infoAbsent(merchant_info)) {
        merchants = merchant_info.merchants
    }
    return {
        delivery_address,
        merchants
    }
}


export default connect(mapStateToProps, actions)(MenuScreen);
//import liraries
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Platform, ScrollView, ImageBackground } from 'react-native';
import { Icon, ListItem, Image, Badge } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import { Logger } from 'aws-amplify'
import { moderateScale, width, verticalScale, height } from '../../cmn/Scaling';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import { style, colors, loggerConfig, infoAbsent } from '../../cmn/AppConfig'
import ScreenHeader from '../../components/ScreenHeader';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { LinearGradient } from 'expo';
import _ from 'lodash'

const logger = new Logger("[CookScreen]", loggerConfig.level)
const imageHeight = height * 0.3
const sectionBackgroundColor = style.backgroundColor
class CookScreen extends Component {
    state = {
        merchant: {}
    }
    componentWillMount = () => {
        this.setState({ merchant: this.props.merchant })
    }
    componentWillReceiveProps = (nextProps) => {
        this.setState({ merchant: nextProps.merchant })
    }

    renderMerchantImages = () => {
        return (
            <View
                style={{
                    position: 'absolute',
                    height: imageHeight
                }}
            >
                <FlatList
                    pagingEnabled
                    horizontal
                    data={this.state.merchant.images}
                    keyExtractor={(item) => item}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.imageViewStyle}>
                                <ImageBackground
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        alignSelf: 'stretch',//TODO: Importate para que la imagen abarque toda la pantalla
                                        backgroundColor: 'transparent',
                                    }}
                                    source={{ uri: item }}
                                >
                                    {/* <LinearGradient
                                    colors={['transparent', '#FFF']}
                                    style={styles.contentContainer}
                                ></LinearGradient> */}
                                </ImageBackground>
                            </View>
                        )
                    }}
                />
            </View>
        )
    }

    renderMerchantHeaders = () => {
        const { merchant } = this.state
        return (
            <View style={styles.merchantSummaryContainerStyle} >
                {this.merchantReviewHeader()}
                <View style={{ ...styles.merchantSummaryHeaderContainerStyle }} >
                    <Text style={styles.merchantSummaryHeaderTextStyle}>
                        {merchant.cuisine}
                    </Text>
                </View>

                <View style={{ ...styles.merchantSummaryHeaderContainerStyle, borderRightWidth: 0 }} >
                    <Text style={{ ...styles.merchantSummaryHeaderTextStyle, fontSize: moderateScale(12) }}>
                        {"$$$"}
                    </Text>
                </View>
            </View>
        )
    }

    merchantReviewHeader = () => {
        const { merchant } = this.state
        if (infoAbsent(merchant) || merchant.reviews.total == 0) {
            return (
                <View style={styles.merchantSummaryHeaderContainerStyle} >
                    <Text style={styles.merchantSummaryHeaderTextStyle}>
                        No reviews
                    </Text>
                </View>
            )
        }
        return (
            <View style={styles.merchantSummaryHeaderContainerStyle} >
                <Text style={styles.merchantSummaryHeaderTextStyle}>
                    {merchant.reviews.rating}
                </Text>
                <StarRating
                    disabled={true}
                    emptyStar={'ios-star-outline'}
                    fullStar={'ios-star'}
                    halfStar={'ios-star-half'}
                    iconSet={'Ionicons'}
                    maxStars={5}
                    rating={merchant.reviews.rating}
                    fullStarColor={colors.radicalRed}
                    starSize={moderateScale(15)}
                />
            </View>
        )
    }

    renderMerchantInfo = () => {
        const { merchant } = this.state
        return (
            <View
                style={{
                    width,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: moderateScale(30),
                    // backgroundColor: sectionBackgroundColor,
                    paddingVertical: moderateScale(20),
                    paddingTop: imageHeight,
                    ...styles.borderBottomStyle
                    // ...style.shadow()
                }}
            >
                <Text
                    style={{
                        fontFamily: style.font,
                        fontWeight: '600',
                        fontSize: moderateScale(30)
                    }}
                >
                    {merchant.name}
                </Text>
                {this.renderMerchantHeaders()}
                <Text style={{
                    fontFamily: style.font,
                    fontSize: moderateScale(13),
                    textAlign: 'justify'
                }}>
                    {merchant.short_description}
                </Text>
            </View>
        )
    }

    renderItemsList = () => {
        return (
            <View style={{
                // marginTop: moderateScale(15),
                paddingTop: moderateScale(20),
                paddingHorizontal: width * 0.05,
            }}>
                <Text style={{
                    fontFamily: style.font,
                    fontSize: moderateScale(20),
                    fontWeight: 'bold'
                }}>
                    Menu
                </Text>
                <FlatList
                    style={{
                        marginTop: moderateScale(10),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    data={this.state.merchant.items}
                    renderItem={({ item }) => {
                        return (
                            <ListItem
                                title={item.name}
                                titleStyle={{
                                    fontFamily: style.font,
                                    fontSize: moderateScale(15)
                                }}
                                containerStyle={{
                                    width: width * 0.9,
                                    backgroundColor: 'transparent',
                                    borderBottomWidth: 1
                                }}
                                rightIcon={<Icon
                                    name='chevron-right'
                                    size={moderateScale(30)}
                                    color={colors.eerieBlack}
                                />}
                                onPress={() => {
                                    this.props.currentDish(item)
                                    this.props.navigation.navigate("dish")
                                }}
                            />
                        )
                    }}
                />
            </View>
        )
    }

    renderReviews = () => {
        const { merchant } = this.state
        return (
            <View style={{
                paddingVertical: moderateScale(20),
                paddingHorizontal: width * 0.05,
                ...styles.borderBottomStyle
            }}>
                <Text style={{
                    fontFamily: style.font,
                    fontSize: moderateScale(20),
                    fontWeight: 'bold'
                }}>
                    Reviews
                </Text>
                <View style={{
                    width: width * 0.9,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <StarRating
                        disabled={true}
                        emptyStar={'ios-star-outline'}
                        fullStar={'ios-star'}
                        halfStar={'ios-star-half'}
                        iconSet={'Ionicons'}
                        maxStars={5}
                        rating={merchant.reviews.rating}
                        fullStarColor={colors.radicalRed}
                        starSize={moderateScale(15)}
                    />
                    <View style={{
                        width: width * 0.7,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={{
                            fontFamily: style.font,
                            fontSize: moderateScale(13),
                            color: iOSColors.gray
                        }}>
                            {this.getRatingSubtitle()}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    getRatingSubtitle = () => {
        const { merchant } = this.state
        if (infoAbsent(merchant.reviews) || merchant.reviews.total == 0) {
            return "No reviews"
        }
        return `${merchant.reviews.rating}  ( ${merchant.reviews.total} ratings )`
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{
                    position: 'absolute',
                    height: height - moderateScale(50),
                    width,
                }}>
                    {this.renderMerchantImages()}
                    {this.renderMerchantInfo()}
                    {this.renderReviews()}
                    {this.renderItemsList()}
                </ScrollView>
                <ScreenHeader size={20} back={{
                    show: true,
                    navigate: () => {
                        this.props.navigation.navigate("food")
                    }
                }} />
            </View>
        );
    }
}

// define your styles
const styles = {
    container: {
        flex: 1,
        backgroundColor: style.backgroundColor
    },
    imageViewStyle: {
        height: imageHeight,
        width: width,
    },
    contentContainer: {
        flex: 1,
        overflow: 'visible',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    merchantSummaryContainerStyle: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: colors.caribbreanGreen,
        marginTop: moderateScale(10),
        marginBottom: moderateScale(20),
    },
    merchantSummaryHeaderContainerStyle: {
        flexDirection: 'row',
        borderRightColor: colors.caribbreanGreen,
        borderRightWidth: 2,
        marginTop: moderateScale(10),
        width: width * 0.3,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    merchantSummaryHeaderTextStyle: {
        // ...systemWeights.bold,
        fontFamily: style.font,
        fontSize: moderateScale(15),
    },
    borderBottomStyle: {
        borderBottomWidth: 5,
        borderBottomColor: iOSColors.lightGray
    }
};

mapStateToProps = ({ merchant_info }) => {
    let merchant = {}
    if (!infoAbsent(merchant_info) && !infoAbsent(merchant_info.merchant_current)) {
        merchant = merchant_info.merchant_current
    }
    return {
        merchant
    }
}


export default connect(mapStateToProps, actions)(CookScreen);

//import liraries
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { Icon, ListItem, Image } from 'react-native-elements';
import { Logger } from 'aws-amplify'
import { moderateScale, width, verticalScale, height } from '../../cmn/Scaling';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import { style, colors, loggerConfig, infoAbsent } from '../../cmn/AppConfig'
import ScreenHeader from '../../components/ScreenHeader';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Haptic } from 'expo';
import _ from 'lodash'

const logger = new Logger("[DishScreenNewNewNew]", loggerConfig.level)
class DishScreenNewNewNew extends Component {
    state = {
        dish: {}
    }
    componentWillMount = () => {
        this.setState({ dish: this.props.dish, dish_order_count: this.props.dish_order_count })
    }
    componentWillReceiveProps = (nextProps) => {
        this.setState({ dish: nextProps.dish, dish_order_count: nextProps.dish_order_count })
    }

    renderTags = () => {
        return (
            this.state.dish.tags.map((tag, index) => {
                let marginLeft = moderateScale(5)
                let seperator = seperator = <Icon
                    name='checkbox-blank-circle'
                    type="material-community"
                    size={moderateScale(5)}
                    color={colors.caribbreanGreen}
                    containerStyle={{
                        marginLeft: moderateScale(10)
                    }}
                />
                if (index === 0) {
                    marginLeft = 0

                }
                if (index === this.state.dish.tags.length - 1) {
                    seperator = null
                }
                return (
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: moderateScale(5),
                    }}>
                        <Text style={{
                            fontFamily: style.font,
                            fontSize: moderateScale(12),
                            color: colors.caribbreanGreen
                        }}>
                            {_.capitalize(tag)}
                        </Text>
                        {seperator}
                    </View>
                )
            })
        )
    }

    addMoreItemToCart = (item) => {
        Haptic.impact(Haptic.ImpactFeedbackStyle.Light)
        this.props.addToCart(item)
    }

    removeItemCount = (item) => {
        Haptic.impact(Haptic.ImpactFeedbackStyle.Light)
        this.props.removeFromCart(item)
    }

    renderImages({ item, index }, parallaxProps) {
        return (
            <View style={{
                ...style.shadow()
            }}>
                <ParallaxImage
                    source={{ uri: item }}
                    containerStyle={{
                        width: width * 0.8,
                        height: height * 0.3,
                        borderRadius: moderateScale(20)
                    }}
                    style={{
                        borderRadius: moderateScale(20)
                    }}
                    parallaxFactor={0}
                    {...parallaxProps}
                />
            </View>
        );
    }

    render = () => {
        const { dish } = this.state
        return (
            <View style={styles.container}>
                <ScreenHeader
                    header={dish.name}
                    size={20}
                    back={{
                        show: true,
                        navigate: () => {
                            this.props.navigation.navigate("cook")
                        }
                    }}
                    containerStyle={{
                        borderBottomWidth: 1,
                        borderBottomColor: iOSColors.lightGray,
                    }}
                />
                <ScrollView style={{
                    marginTop: moderateScale(20)
                }}>
                    <Carousel
                        itemWidth={width * 0.8}
                        sliderWidth={width}
                        itemHeight={height * 0.3}
                        sliderHeight={height * 0.3}
                        data={dish.images}
                        renderItem={this.renderImages}
                        hasParallaxImages={true}
                    />
                    <View style={{
                        width,
                        paddingHorizontal: moderateScale(20),
                        borderWidth: 0
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            flexWrap: "wrap",
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 0,
                            marginVertical: moderateScale(15)
                        }}>
                            {this.renderTags()}
                        </View>
                        <View style={{
                            justifyContent: 'center',
                            borderWidth: 0,
                            marginVertical: moderateScale(5)
                        }}>
                            <Text style={{
                                fontFamily: style.font,
                                fontSize: moderateScale(13),
                                textAlign: 'justify',
                                color: colors.eerieBlack
                            }}>
                                {dish.description}
                            </Text>
                        </View>
                        <View style={{
                            justifyContent: 'center',
                            borderWidth: 0
                        }}>
                            <Text style={{
                                fontFamily: style.font,
                                fontSize: moderateScale(15),
                                textAlign: 'justify',
                                fontWeight: 'bold',
                                paddingVertical: moderateScale(5)
                            }}>
                                Content
                            </Text>
                            {this.getContent()}
                        </View>
                        <View style={{
                            marginVertical: moderateScale(10),
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <View style={{
                                width: width * 0.8,
                                marginVertical: moderateScale(10),
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderRadius: moderateScale(100),
                                paddingHorizontal: moderateScale(20),
                                paddingVertical: moderateScale(10),
                                backgroundColor: style.backgroundColor(0.09),
                            }}>
                                <Icon
                                    name='plus'
                                    type="material-community"
                                    size={moderateScale(30)}
                                    color={colors.caribbreanGreen}
                                    onPress={() => this.addMoreItemToCart(dish)}
                                    underlayColor="transparent"
                                />
                                <Text style={{
                                    fontFamily: style.font,
                                    fontSize: moderateScale(20)
                                }}>
                                    {1}
                                </Text>
                                <Icon
                                    name='minus'
                                    type="material-community"
                                    size={moderateScale(30)}
                                    color={colors.caribbreanGreen}
                                    onPress={() => this.removeItemCount(dish)}
                                    underlayColor="transparent"
                                />
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </View>
        )
    }

    getContent = () => {
        return this.state.dish.content.map((c) => {
            return (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text style={{
                        fontFamily: style.font,
                        fontSize: moderateScale(13),
                        color: colors.caribbreanGreen
                    }}>
                        {c.count} {" x "}
                    </Text>
                    <View style={{
                        width: width * 0.7
                    }}>
                        <Text style={{
                            fontFamily: style.font,
                            fontSize: moderateScale(13)
                        }}>
                            {c.name}
                        </Text>
                    </View>
                </View>
            )
        })
    }
}

// define your styles
const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: style.backgroundColor(),
    },
};

mapStateToProps = ({ dish_info, order_info }) => {
    let dish = {}
    let dish_order_count = 0
    if (!infoAbsent(dish_info) && !infoAbsent(dish_info.dish_current)) {
        dish = dish_info.dish_current
    }
    // if (!infoAbsent(order_info) && !infoAbsent(order_info.items) && order_info.items.get()) {
    //     dish = dish_info.dish_current
    // }
    return {
        dish,
        dish_order_count
    }
}
export default connect(mapStateToProps, actions)(DishScreenNewNewNew);

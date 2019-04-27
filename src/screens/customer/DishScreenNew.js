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

const logger = new Logger("[DishScreenNew]", loggerConfig.level)
class DishScreenNew extends Component {
    state = {
        dish: {},
        dish_order_count: 0
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
                    color={style.secondaryColor}
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
                            fontSize: moderateScale(14),
                            color: style.secondaryColor
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
                                backgroundColor: style.backgroundColor(0.1),
                            }}>
                                <Icon
                                    name='plus'
                                    type="material-community"
                                    size={moderateScale(30)}
                                    color={style.secondaryColor}
                                    onPress={() => this.addMoreItemToCart(dish)}
                                    underlayColor="transparent"
                                />
                                <Text style={{
                                    fontFamily: style.font,
                                    fontSize: moderateScale(20)
                                }}>
                                    {this.state.dish_order_count}
                                </Text>
                                <Icon
                                    name='minus'
                                    type="material-community"
                                    size={moderateScale(30)}
                                    color={style.secondaryColor}
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
                    justifyContent: 'space-between',
                    paddingVertical: moderateScale(5)
                }}>
                    <Text style={{
                        fontFamily: style.font,
                        fontSize: moderateScale(13),
                        color: style.secondaryColor
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
    const items = infoAbsent(order_info) || infoAbsent(order_info.items) ? [] : [...order_info.items.values()]
    if (!infoAbsent(dish_info) && !infoAbsent(dish_info.dish_current)) {
        dish = dish_info.dish_current
        const item = _.find(items, { id: dish.id });
        if (!_.isUndefined(item)) {
            dish_order_count = item.count
        }
    }

    return {
        dish,
        dish_order_count
    }
}
export default connect(mapStateToProps, actions)(DishScreenNew);

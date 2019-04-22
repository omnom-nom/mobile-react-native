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
import { Haptic } from 'expo';
import _ from 'lodash'

const logger = new Logger("[DishScreen]", loggerConfig.level)
class DishScreen extends Component {
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
                if (index == 0) {
                    marginLeft = 0
                }
                return (
                    <View style={{
                        backgroundColor: iOSColors.white,
                        marginHorizontal: moderateScale(5),
                    }}>
                        <Text style={{
                            fontFamily: style.font,
                            fontSize: moderateScale(12),
                            color: colors.caribbreanGreen
                        }}>
                            {tag}
                        </Text>
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

    render = () => {
        const { dish } = this.state
        return (
            <View style={styles.container}>

                <View style={{
                    position: 'absolute',
                    height: height * 0.5
                }}>
                    <FlatList
                        pagingEnabled
                        horizontal
                        data={dish.images}
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <View style={{
                                }}>
                                    <Image
                                        style={{
                                            height: height * 0.5,
                                            width,
                                            ...style.shadow(5)
                                        }}
                                        source={{ uri: item }}
                                    />
                                </View>
                            )
                        }}
                    />
                </View>
                <ScreenHeader size={20} back={{
                    show: true,
                    navigate: () => {
                        this.props.navigation.navigate("cook")
                    }
                }} />
                <View style={{
                    position: 'absolute',
                    height: height * 0.5,
                    bottom: 0,
                    width: width * 0.95,
                    borderTopLeftRadius: moderateScale(20),
                    borderTopRightRadius: moderateScale(20),
                    backgroundColor: iOSColors.white,
                    borderRadius: 1,
                    ...style.shadow(),
                    alignItems: 'center',
                }}>
                    <ScrollView
                        style={{
                            width: width * 0.95,
                            paddingHorizontal: moderateScale(20),
                            borderWidth: 0
                        }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={{
                            flexDirection: 'row',
                            marginVertical: moderateScale(15),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 0
                        }}>
                            <View style={{
                                borderWidth: 0,
                                width: width * 0.7,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    fontFamily: style.font,
                                    fontSize: moderateScale(20),
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                }}>
                                    {dish.name}
                                </Text>
                            </View>
                            <View style={{
                                borderWidth: 0,
                                width: width * 0.1
                            }}>
                                <Text style={{
                                    fontFamily: style.font,
                                    fontSize: moderateScale(15),
                                    color: colors.caribbreanGreen
                                }}>
                                    {dish.price} $
                            </Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            flexWrap: "wrap",
                            alignItems: 'center',
                            borderWidth: 0
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
                                textAlign: 'justify'
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
                    </ScrollView>
                </View>
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
export default connect(mapStateToProps, actions)(DishScreen);

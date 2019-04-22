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
                        padding: moderateScale(5),
                        // borderWidth: 1,
                        // borderColor: colors.caribbreanGreen,
                        backgroundColor: iOSColors.white,
                        marginHorizontal: moderateScale(5),
                        // borderRadius: moderateScale(20),
                        marginLeft,
                        // ...style.shadow()
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
        this.props.addToCart(item)
    }

    removeItemCount = (item) => {
        this.props.removeFromCart(item)
    }


    render1 = () => {
        const { dish } = this.state
        return (
            <View
                style={styles.container}
            >
                <ScreenHeader header={dish.name} size={20} back={{
                    show: true,
                    navigate: () => {
                        this.props.navigation.navigate("cook")
                    }
                }} />
                <View style={{
                    flexDirection: 'row',
                    marginVertical: moderateScale(10)
                }}>
                    {this.renderTags()}
                </View>
                <View style={{
                    marginVertical: moderateScale(15)
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
                    height: height * 0.35
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
                                    marginHorizontal: width * 0.01,
                                    marginBottom: moderateScale(10),
                                    borderRadius: moderateScale(20),
                                }}>
                                    <Image
                                        style={{
                                            height: height * 0.3,
                                            width: width * 0.98 - moderateScale(20),
                                            borderRadius: moderateScale(10),
                                            ...style.shadow(5)
                                        }}
                                        source={{ uri: item }}
                                    />
                                </View>
                            )
                        }}
                    />
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: width,
                }}>

                    <Icon
                        name='plus-box'
                        type="material-community"
                        size={moderateScale(50)}
                        color={colors.caribbreanGreen}
                        onPress={() => this.addMoreItemToCart(dish)}
                    />
                    <Icon
                        name='minus-box' x
                        type="material-community"
                        size={moderateScale(50)}
                        color={colors.caribbreanGreen}
                        onPress={() => this.removeItemCount(dish)}
                    />
                </View>
            </View>
        )
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
                    paddingHorizontal: moderateScale(20)
                }}>
                    <ScrollView
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
                            justifyContent: 'center',
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
                            alignItems: 'center'
                        }}>
                            <View style={{
                                width: moderateScale(120),
                                marginVertical: moderateScale(10),
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <Icon
                                    name='plus-box'
                                    type="material-community"
                                    size={moderateScale(50)}
                                    color={colors.caribbreanGreen}
                                    onPress={() => this.addMoreItemToCart(dish)}
                                />
                                <Icon
                                    name='minus-box' x
                                    type="material-community"
                                    size={moderateScale(50)}
                                    color={colors.caribbreanGreen}
                                    onPress={() => this.removeItemCount(dish)}
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
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: style.backgroundColor,
        // paddingHorizontal: moderateScale(15),
        // paddingTop: height * 0.05
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

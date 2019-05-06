//import liraries
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Platform, ScrollView, Animated } from 'react-native';
import { Icon, ListItem, Button } from 'react-native-elements';
import { Logger } from 'aws-amplify'
import { moderateScale, width, verticalScale, height } from '../../cmn/Scaling';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import { style, colors, loggerConfig } from '../../cmn/AppConfig'
import ScreenHeader from '../../components/ScreenHeader';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { DishOrderTypeEnum } from './enums'
import _ from 'lodash'

// create a component
class CookMenuScreen extends Component {
    state = {
        showingAddButtons: false,
        currMenu: DishOrderTypeEnum.ON_DEMAND,
        onDemand: [],
        preOrder: []
    }

    componentWillMount = () => {
        this.setState({ onDemand: this.props.onDemand, preOrder: this.props.preOrder })
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({ onDemand: nextProps.onDemand, preOrder: nextProps.preOrder })
    }

    constructor(props) {
        super(props)
        add = new Animated.Value(0)
        this.add = add
    }

    addButtonPress = () => {
        console.log(this.state.showingAddButtons);
        this.setState(
            { showingAddButtons: !this.state.showingAddButtons },
            () => {
                Animated.spring(
                    this.add,
                    {
                        toValue: this.state.showingAddButtons ? 1 : 0,
                        // speed: 1000,
                    }

                ).start()
            }
        )
    }

    renderHeaderButton = (type, title) => {
        return (
            <Button
                buttonStyle={styles.orderButtonStyle(this.state.currMenu, type)}
                titleStyle={styles.orderButtonTextStyle(this.state.currMenu, type)}
                title={title}
                onPress={() => this.setState({ currMenu: type })}
            />
        )
    }

    renderSectionHeaders = () => {
        return (
            <View style={{
                flexDirection: 'row',
            }}>
                {this.renderHeaderButton(DishOrderTypeEnum.ON_DEMAND, 'On Demand')}
                {this.renderHeaderButton(DishOrderTypeEnum.PRE_ORDER, 'Pre Order')}
            </View>
        )
    }

    renderMenuItem = ({ item }) => {
        return (
            <View style={{
                borderBottomColor: iOSColors.lightGray,
                borderBottomWidth: 0.5,
                padding: moderateScale(10)
            }}>
                <Text style={style.fontStyle({ fontWeight: 'bold', size: 17 })}>
                    {item.name}
                </Text>
            </View>
        )
    }

    renderMenuItems = (items) => {
        logger.debug(items)
        if (_.isEmpty(items)) {
            return (
                <Text style={style.fontStyle()}>
                    No dishes in this menu
                    </Text>
            )
        }
        return (
            <FlatList
                style={{
                    width
                }}
                keyExtractor={(item) => item.id}
                data={items}
                renderItem={this.renderMenuItem}
            />
        )
    }

    renderButton = (title, onPress) => {
        const positionX = this.add.interpolate({
            inputRange: [0, 1],
            outputRange: [width, 0]
        });
        return (
            <Animated.View style={{
                marginHorizontal: moderateScale(5),
                justifyContent: 'center',
                transform: [{
                    translateX: positionX,
                }],
            }}>
                <TouchableOpacity style={{
                    borderRadius: moderateScale(20),
                    backgroundColor: style.secondaryColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: moderateScale(40),
                    paddingHorizontal: moderateScale(10)
                }}
                    onPress={() => {
                        this.addButtonPress()
                        onPress()
                    }}
                >
                    <Text
                        style={style.fontStyle({ size: 14, color: iOSColors.white })}
                    >{title}</Text>
                </TouchableOpacity>
            </Animated.View>
        )
    }
    render() {
        logger.debug("dishes", this.state)
        return (
            <View style={styles.container}>
                <ScreenHeader
                    header="Menu"
                    headerStyle={{ fontWeight: 'normal', }}
                    size={20}
                    back={{
                        show: true,
                        navigate: () => {
                            this.props.navigation.navigate('main')
                        }
                    }}
                />
                {this.renderSectionHeaders()}
                {this.renderMenuItems(this.state.onDemand)}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    bottom: moderateScale(10),
                    width: width * 0.9
                }}>
                    {this.renderButton("New Dish", () => { this.props.navigation.navigate('new_dish') })}
                    {this.renderButton("From History", () => { this.props.navigation.navigate('all_dishes') })}
                    <Icon
                        name='add-circle-outline'
                        size={moderateScale(50)}
                        color={colors.radicalRed}
                        onPress={() => this.addButtonPress()}
                    />
                </View>
            </View>
        );
    }
}

// define your styles
const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: style.backgroundColor(),
    },
    orderButtonStyle: (currType, type) => {
        base = {
            marginVertical: moderateScale(10),
            width: width * 0.5,
            borderColor: iOSColors.lightGray,
            borderWidth: 0.5,
            borderRadius: 0,
            backgroundColor: iOSColors.white
        }
        if (currType === type) {
            base = {
                ...base,
                borderWidth: 0.5,
                backgroundColor: style.secondaryColor,
                borderColor: style.secondaryColor,
            }
        }
        return base
    },
    orderButtonTextStyle: (currType, type) => {
        base = style.fontStyle({ color: iOSColors.black, size: 15, fontWeight: 'normal' })
        if (currType === type) {
            base = style.fontStyle({ color: iOSColors.white, size: 15, fontWeight: 'normal' })
        }
        return base
    }
};

mapStateToProps = ({ cook_dishes }) => {
    logger = new Logger("[CookMenuScreen]", loggerConfig.level)
    logger.debug(cook_dishes)
    const onDemand = _.isUndefined(cook_dishes) || _.isUndefined(cook_dishes.onDemand) ? [{
        "content": [
            {
                "amount": 1,
                "name": "Paneer butter masala",
            },
            {
                "amount": 1,
                "name": "Rice ",
            },
        ],
        "description": "Paneer butter Masala made using cottage cheese.",
        "id": "002b86fe-24aa-4639-b41f-37c32ed02031",
        "name": "Paneer butter masala",
        "orderType": "OnDemand",
    }] : cook_dishes.onDemand
    const preOrder = _.isUndefined(cook_dishes) || _.isUndefined(cook_dishes.preOrder) ? [] : cook_dishes.preOrder
    return {
        onDemand,
        preOrder
    }
}

export default connect(mapStateToProps, actions)(CookMenuScreen);
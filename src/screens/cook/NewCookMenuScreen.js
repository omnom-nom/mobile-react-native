//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Icon } from 'react-native-elements';
import { Logger } from 'aws-amplify'
import { moderateScale, width } from '../../cmn/Scaling';
import { iOSColors } from 'react-native-typography'
import { style, colors, loggerConfig } from '../../cmn/AppConfig'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { DishOrderTypeEnum, foodColor, FoodTypeEnum, spiceColor, spiceImage, SpiceLevelTypeEnum, StatusTypeEnum } from './enums';
import _ from 'lodash'
import MenuHeader from './components/MenuHeader';
import MenuList from './components/MenuList';
import { Haptic } from 'expo'

class NewCookMenuScreen extends Component {
    state = {
        showingAddButtons: false,
        currMenu: _.upperCase(DishOrderTypeEnum.ON_DEMAND),
        onDemand: [],
        preOrder: []
    }

    constructor(props) {
        super(props)
        add = new Animated.Value(0)
        this.add = add
    }

    componentWillMount = () => {
        this.setState({ onDemand: this.props.onDemand, preOrder: this.props.preOrder })
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({ onDemand: nextProps.onDemand, preOrder: nextProps.preOrder })
    }

    renderMenu = (currMenu) => {
        const items = currMenu === _.upperCase(DishOrderTypeEnum.ON_DEMAND) ? this.state.onDemand : this.state.preOrder
        return <MenuList
            items={items}
            navigation={this.props.navigation}
            leftSwipe={(item) => {
                swipeComponent = [
                    {
                        backgroundColor: colors.scarlet,
                        text: 'Remove',
                        type: 'delete',
                        onPress: () => {
                            Haptic.impact(Haptic.ImpactFeedbackStyle.Medium)
                            this.props.flipDishStatus(item.id, StatusTypeEnum.INACTIVE)
                        }
                    }
                ]
                return swipeComponent
            }}
        />
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
                    }

                ).start()
            }
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
                    borderRadius: moderateScale(10),
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
        return (
            <View style={styles.container}>
                <MenuHeader
                    setCurrMenu={(type) => this.setState({ currMenu: type })}
                    currMenu={this.state.currMenu}
                    onBackPress={() => this.props.navigation.navigate('main')}
                    name="MENU"
                />
                {this.renderMenu(this.state.currMenu)}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    bottom: moderateScale(10),
                    width: width * 0.9,
                    ...style.shadow()
                }}>
                    {this.renderButton("New Dish", () => { this.props.navigation.navigate('new_dish') })}
                    {this.renderButton("From History", () => { this.props.navigation.navigate('all_dishes') })}
                    <Icon
                        name={this.state.showingAddButtons ? 'close' : 'add'}
                        size={moderateScale(40)}
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
        paddingTop: moderateScale(20),
        paddingHorizontal: width * 0.01,
    }
};

mapStateToProps = ({ cook_dishes }) => {
    logger = new Logger("[NewCookMenuScreen]", loggerConfig.level)
    const onDemand = cook_dishes.active.onDemand.toIndexedSeq().toArray()
    const preOrder = cook_dishes.active.preOrder.toIndexedSeq().toArray()
    return {
        onDemand,
        preOrder
    }
}

export default connect(mapStateToProps, actions)(NewCookMenuScreen);
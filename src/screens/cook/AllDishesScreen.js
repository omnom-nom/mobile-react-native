//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Logger } from 'aws-amplify'
import { moderateScale, width } from '../../cmn/Scaling';
import { iOSColors } from 'react-native-typography'
import { style, colors, loggerConfig } from '../../cmn/AppConfig'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { DishOrderTypeEnum, StatusTypeEnum } from './enums';
import _ from 'lodash'
import MenuHeader from './components/MenuHeader';
import MenuList from './components/MenuList';

class AllDishesScreen extends Component {
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
            swipe={{
                onPress: (item) => {
                    this.props.flipDishStatus(item.id, StatusTypeEnum.ACTIVE)
                },
                type: 'primary',
                color: colors.caribbreanGreen,
                text: 'Add to menu'
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
                    onBackPress={() => this.props.navigation.goBack()}
                    name="HISTORY"
                    backIconName={"close"}
                />
                {this.renderMenu(this.state.currMenu)}
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
    logger = new Logger("[AllDishScreen]", loggerConfig.level)
    const onDemand = cook_dishes.inactive.onDemand.toIndexedSeq().toArray()
    const preOrder = cook_dishes.inactive.preOrder.toIndexedSeq().toArray()
    return {
        onDemand,
        preOrder
    }
}

export default connect(mapStateToProps, actions)(AllDishesScreen);

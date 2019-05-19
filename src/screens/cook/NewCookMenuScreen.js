//import liraries
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Platform, Image, Animated } from 'react-native';
import { Icon, ListItem, Button } from 'react-native-elements';
import { Logger } from 'aws-amplify'
import { moderateScale, width, verticalScale, height } from '../../cmn/Scaling';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import { style, colors, loggerConfig } from '../../cmn/AppConfig'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { DishOrderTypeEnum, foodColor, FoodTypeEnum, spiceColor, spiceImage, SpiceLevelTypeEnum } from './enums';
import _ from 'lodash'
import { Haptic } from 'expo'

class MenuHeader extends Component {
    button = (type) => {
        return (
            <Button
                buttonStyle={styles.orderButtonStyle(this.props.currMenu, type)}
                titleStyle={styles.orderButtonTextStyle(this.props.currMenu, type)}
                title={type}
                onPress={() => {
                    Haptic.impact(Haptic.ImpactFeedbackStyle.Medium)
                    this.props.setCurrMenu(type)
                }}
            />
        )
    }

    headerIcon = (name, location) => {
        loc = location || {}
        return (
            <View
                style={{
                    position: 'absolute',
                    height: height * 0.17,
                    justifyContent: 'center',
                    right: loc.right,
                    left: loc.left,
                    top: loc.top
                }}
            >
                <Icon
                    name={name}
                    type="material-community"
                    size={height * 0.17}
                    color={`rgba(246, 249, 252, 0.2)`}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={{
                width: width * 0.98,
                height: height * 0.2,
                backgroundColor: '#3ECF8E',
                borderRadius: moderateScale(10),
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: moderateScale(10),
                ...style.shadow({ color: colors.eerieBlack, size: 2, opacity: 0.4 })
            }}>
                {this.headerIcon('pizza', { right: 0 })}
                {this.headerIcon('bowl', { top: height * 0.05, left: -width * 0.1 })}

                <View style={{
                    position: 'absolute',
                    top: moderateScale(15),
                    left: moderateScale(10)
                }}>
                    <Icon
                        name={'arrow-left'}
                        type="material-community"
                        size={moderateScale(30)}
                        color='#F6F9FC'
                        onPress={() => this.props.onBackPress()}
                        underlayColor='transparent'
                    />
                </View>
                <View style={{ marginTop: moderateScale(15) }}>
                    <Text style={style.fontStyle({ color: '#F6F9FC', size: 25, fontWeight: '500', })}>
                        MENU
                    </Text>
                </View>
                <View style={{
                    width: width * 0.97,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly'
                }}>
                    {this.button(_.upperCase(DishOrderTypeEnum.ON_DEMAND))}
                    {this.button(_.upperCase(DishOrderTypeEnum.PRE_ORDER))}
                </View>
            </View>
        )
    }
}

class NewCookMenuScreen extends Component {
    state = {
        showingAddButtons: false,
        currMenu: _.upperCase(DishOrderTypeEnum.ON_DEMAND),
        onDemand: [{
            "content": [
                {
                    "count": 1,
                    "name": "Dosa",
                },
                {
                    "count": 1,
                    "name": "Chutney",
                },
            ],
            "description": "Masala dosa made of rice batter filled with potato masala.",
            "id": "9b546cf9-7731-4d86-b2fc-26523d79c26c",
            "images": [
                "file:///var/mobile/Containers/Data/Application/21FF11B2-2779-48FC-83FA-2A4710BFD8F5/Library/Caches/ExponentExperienceData/%2540anonymous%252Fmobile-react-native-4c8a23ec-7cfa-4b04-affe-debbe0c3275e/ImagePicker/0DB2E711-046C-4C54-A40B-63CC3E97D645.jpg",
            ],
            "name": "Masala dosa",
            "price": 5,
            "spice": SpiceLevelTypeEnum.MILD,
            "foodType": FoodTypeEnum.NON_VEGETARIAN
        }],
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

    renderMenu = () => {
        return this.state.currMenu === _.upperCase(DishOrderTypeEnum.ON_DEMAND) ?
            this.renderMenuItems(this.state.onDemand) :
            this.renderMenuItems(this.state.preOrder)
    }

    renderContent = (contents) => {
        if (_.isEmpty(contents)) {
            return null
        }
        let contentsView = []
        for (var key in contents) {
            if (contents.hasOwnProperty(key)) {
                contentsView.push(
                    <View
                        key={key}
                        style={{
                            width: width * 0.4,
                            flexDirection: 'row',
                        }}>
                        <Text style={style.fontStyle({ color: colors.caribbreanGreen, fontWeight: 'bold' })}> {`${contents[key]}  x `}</Text>
                        <Text style={style.fontStyle()}> {key}</Text>
                    </View>
                )
            }
        }
        return contentsView
    }

    renderMenuItem = ({ item }) => {
        return (
            <TouchableOpacity
                key={item.id}
                onPress={() => {
                    this.props.navigation.navigate('preview', {
                        dish: item
                    })
                }}
                style={{
                    width: width * 0.95,
                    borderBottomColor: iOSColors.lightGray,
                    borderBottomWidth: 0.5,
                    padding: moderateScale(10),
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                <Image
                    style={{
                        width: width * 0.3,
                        height: width * 0.3,
                        borderRadius: moderateScale(10)
                    }}
                    source={{ uri: item.images[0] }}
                />
                <View style={{
                    width: width * 0.4
                }}>
                    <View>
                        <Text style={style.fontStyle({ fontWeight: 'bold', size: 18 })}>
                            {item.name}
                        </Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            <Text style={style.fontStyle({ fontWeight: 'bold', color: foodColor(item.foodType), size: 10 })}>
                                {_.startCase(item.foodType)}
                            </Text>
                            <Text style={style.fontStyle({ fontWeight: 'bold', size: 10 })}>
                                {` . `}
                            </Text>
                            {spiceImage(item.spice)}
                        </View>
                    </View>
                    <View>
                        {this.renderContent(item.content)}
                    </View>
                </View>
                <Text style={style.fontStyle({ fontWeight: 'bold', size: 17, color: style.secondaryColor })}>
                    {item.price} $
                </Text>
            </TouchableOpacity>
        )
    }

    renderMenuItems = (items) => {
        if (_.isEmpty(items)) {
            return (
                <Text style={style.fontStyle()}>
                    No dishes in this menu
                </Text>
            )
        }
        return (
            <FlatList
                keyExtractor={(item) => item.id}
                data={items}
                renderItem={this.renderMenuItem}
            />
        )
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
                />
                {this.renderMenu()}
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
    },
    orderButtonStyle: (currType, type) => {
        base = {
            backgroundColor: 'transparent',
            marginBottom: moderateScale(5),
            borderRadius: 0
        }
        if (currType === type) {
            base = {
                ...base,
                borderBottomWidth: moderateScale(2),
                borderBottomColor: iOSColors.white,
            }
        }
        return base
    },
    orderButtonTextStyle: (currType, type) => {
        base = style.fontStyle({ color: iOSColors.lightGray, size: 17, fontWeight: '500' })
        if (currType === type) {
            base = style.fontStyle({ color: iOSColors.white, size: 17, fontWeight: '500' })
        }
        return base
    }
};

mapStateToProps = ({ cook_dishes }) => {
    logger = new Logger("[NewCookMenuScreen]", loggerConfig.level)
    const onDemand = _.isUndefined(cook_dishes) || _.isUndefined(cook_dishes.onDemand) ? [] : cook_dishes.onDemand.toIndexedSeq().toArray()
    const preOrder = _.isUndefined(cook_dishes) || _.isUndefined(cook_dishes.preOrder) ? [] : cook_dishes.preOrder.toIndexedSeq().toArray()
    return {
        onDemand,
        preOrder
    }
}

export default connect(mapStateToProps, actions)(NewCookMenuScreen);
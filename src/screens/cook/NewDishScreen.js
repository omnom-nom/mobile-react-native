//import liraries
import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Icon, Button, Tooltip } from 'react-native-elements';
import { Logger } from 'aws-amplify'
import { TextInputMask } from 'react-native-masked-text';
import { moderateScale, width, verticalScale, height } from '../../cmn/Scaling';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import { style, colors, loggerConfig } from '../../cmn/AppConfig'
import ScreenHeader from '../../components/ScreenHeader';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { DishOrderTypeEnum } from './enums';
import _ from 'lodash'

// create a component

//  name, description, content, tags [nuts, gluten-free, vegan], photos 
class NewDishScreen extends Component {
    state = {
        name: "",
        description: "",
        contents: new Map(),
        orderType: DishOrderTypeEnum.ON_DEMAND,
        contentCount: 0,
        price: 0,
        error: [],
        nameChars: 0,
        descriptionChars: 0
    }

    renderInfoItem = (name, inputComponent, args) => {
        args = args || {
            row: true,
            titleCharLeftComponent: null,
            toolTipMessage: '',
        }
        return (
            <View style={styles.infoItemContainerStyle(args.row)}>
                <View style={{
                    width: width * 0.35,
                    justifyContent: 'center',
                }}>
                    <Text style={styles.formTitleTextStyle}>
                        {name}
                    </Text>
                    {args.titleCharLeftComponent}
                    {this.renderToolTip(args.toolTipMessage)}
                </View>
                {inputComponent}
            </View>
        )
    }

    error_component = (errors) => {
        if (!_.isEmpty(errors)) {
            errcomponent = errors.map((message) => {
                return <Text key={message} style={style.fontStyle({ color: colors.scarlet })}>{message}</Text>
            })
            return (
                <View>
                    {errcomponent}
                </View>
            )
        }
    }

    changeContents = (fn) => {
        contents = this.state.contents
        fn(contents)
        this.setState({ contents })
    }

    renderContentItem = (key, { name, amount }) => {
        return (
            <View
                key={key}
                style={{
                    width: width * 0.95,
                    borderWidth: 0,
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent: 'space-between'
                }}>
                <Icon
                    name='remove-circle'
                    size={moderateScale(25)}
                    color={colors.radicalRed}
                    onPress={() => {
                        this.changeContents((c) => contents.delete(key))
                    }}
                />
                <TextInput
                    style={styles.textInputStyle({
                        width: width * 0.6,
                        marginVertical: moderateScale(5),
                        paddingVertical: moderateScale(5),
                    })}
                    onChangeText={(text) => {
                        this.changeContents((contents) => {
                            contents.set(key, {
                                name: text,
                                amount: contents.get(key).amount
                            })
                        })
                    }}
                />
                <View style={{
                    width: width * 0.25,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: 'space-between',
                    backgroundColor: iOSColors.lightGray,
                    paddingVertical: moderateScale(3),
                    borderRadius: moderateScale(10),
                    paddingHorizontal: moderateScale(3)
                }}>
                    <Icon
                        name='add'
                        size={moderateScale(25)}
                        onPress={() => {
                            this.changeContents((contents) => {
                                curr = contents.get(key)
                                contents.set(key, {
                                    name: curr.name,
                                    amount: curr.amount + 1
                                })
                            })
                        }}
                    />
                    <Text style={style.fontStyle({ fontWeight: 'bold', size: 15 })}>{amount}</Text>
                    <Icon
                        name='remove'
                        size={moderateScale(25)}
                        onPress={() => {
                            this.changeContents((contents) => {
                                curr = contents.get(key)
                                contents.set(key, {
                                    name: curr.name,
                                    amount: Math.max(0, curr.amount - 1)
                                })
                            })
                        }}
                    />
                </View>
            </View>
        )
    }

    addContent = () => {
        contentCount = this.state.contentCount + 1
        contents = this.state.contents
        contents.set(contentCount, {
            name: "",
            amount: 1
        })
        this.setState({
            contentCount,
            contents
        })
    }

    renderContentsSection = () => {
        contents = []
        this.state.contents.forEach((value, key, map) => {
            contents.push(this.renderContentItem(key, value))
        })
        return (
            <View style={{
                alignItems: 'flex-start',
                width: width * 0.95,
                borderWidth: 0
            }}>
                {contents}
                <Icon
                    name='add-circle'
                    size={moderateScale(30)}
                    color={colors.radicalRed}
                    onPress={() => this.addContent()}
                />
            </View>
        )
    }

    saveDish = () => {
        let error = []
        if (_.isEmpty(this.state.name)) {
            error.push("Please provide a name of your dish")
        }
        if (_.isEmpty(this.state.description)) {
            error.push("Please provide a description of your dish")
        }
        if (!_.isEmpty(error)) {
            this.setState({ error })
            return
        }
        this.props.addNewDish({
            name: this.state.name,
            description: this.state.description,
            content: [...this.state.contents.values()],
            orderType: this.state.orderType,
            price: this.state.price
        })
    }

    getOrderTypeButtonStyle = (type) => {
        base = {
            marginVertical: moderateScale(10),
            width: width * 0.28,
            borderRadius: moderateScale(10),
            borderColor: iOSColors.black,
            borderWidth: 1,
            backgroundColor: iOSColors.white
        }
        if (this.state.orderType === type) {
            base = {
                ...base,
                borderWidth: 0,
                backgroundColor: style.secondaryColor
            }
        }
        return base
    }

    renderOrderType = () => {
        return (
            <View style={{
                width: width * 0.6,
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <Button
                    buttonStyle={styles.orderButtonStyle(this.state.orderType, DishOrderTypeEnum.ON_DEMAND)}
                    titleStyle={styles.orderButtonTextStyle(this.state.orderType, DishOrderTypeEnum.ON_DEMAND)}
                    title="On Demand"
                    onPress={() => this.setState({ orderType: DishOrderTypeEnum.ON_DEMAND })}
                />
                <Button
                    buttonStyle={styles.orderButtonStyle(this.state.orderType, DishOrderTypeEnum.PRE_ORDER)}
                    titleStyle={styles.orderButtonTextStyle(this.state.orderType, DishOrderTypeEnum.PRE_ORDER)}
                    title="Pre Order"
                    onPress={() => this.setState({ orderType: DishOrderTypeEnum.PRE_ORDER })}
                />
            </View>
        )
    }

    renderToolTip = (message) => {
        if (_.isEmpty(message)) {
            return null
        }
        return (
            <Tooltip
                backgroundColor={iOSColors.midGray}
                height={height * 0.2}
                width={width * 0.8}
                popover={
                    <Text style={style.fontStyle(20)}>{message}</Text>
                }
            >
                <Text style={style.fontStyle({ color: colors.scarlet })}>what's this?</Text>
            </Tooltip>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ScreenHeader
                    icon={{
                        name: 'close',
                        right: true,
                        size: 30
                    }}
                    header="ADD A NEW DISH"
                    headerStyle={{ fontWeight: 'normal', }}
                    size={20}
                    back={{
                        show: true,
                        navigate: () => {
                            this.props.navigation.goBack()
                        }
                    }}
                />
                <KeyboardAvoidingView
                    keyboardVerticalOffset={height * 0.05}
                    behavior="padding"
                    enabled
                    style={{
                        marginTop: moderateScale(20),
                        alignItems: 'center',
                        width,
                        flex: 1
                    }}
                >
                    <ScrollView contentContainerStyle={{
                        alignItems: "center",
                        justifyContent: 'center'
                    }}>
                        {this.renderInfoItem("Name", <TextInput
                            maxLength={30}
                            style={styles.textInputStyle()}
                            placeholder="Dish Name"
                            onChangeText={(name) => this.setState({ name, nameChars: name.length })}
                            selectionColor={style.secondaryColor}
                        />, {
                                titleCharLeftComponent: <Text style={styles.charLeftTextStyle}>{`( ${this.state.nameChars} / 30)`}</Text>,
                            })}
                        { this.renderInfoItem(
                            "Order Type",
                            this.renderOrderType(),
                            {
                                toolTipMessage: "Please select order type On-Demand if you can prepare this dish quickly, select Pre-Order if you need time to prepare this dish. With On-Demand you will have to prepare the dish as soon as you accept the order."
                            }
                        )}
                        {this.renderInfoItem("Price", <TextInput
                            style={styles.textInputStyle()}
                            placeholder="PRICE in $"
                            value={"$ " + this.state.price}
                            onChangeText={(price) => this.setState({ price: _.trim(price, '$ ') })}
                            selectionColor={style.secondaryColor}
                            keyboardType={'numeric'}
                        />)}
                        {this.renderInfoItem("Description", <TextInput
                            style={styles.textInputStyle({
                                width: width * 0.95,
                                marginVertical: moderateScale(5),
                                height: height * 0.2,
                                paddingTop: moderateScale(10),
                            })}
                            maxLength={250}
                            multiline={true}
                            numberOfLines={5}
                            placeholder="Please provide a description of your dish"
                            onChangeText={(description) => this.setState({ description, descriptionChars: description.length })}
                            selectionColor={style.secondaryColor}
                        />, { 
                            row: false ,
                            titleCharLeftComponent: <Text style={styles.charLeftTextStyle}>{`( ${this.state.descriptionChars} / 250)`}</Text>,
                        })}  
                        {this.renderInfoItem("Content", this.renderContentsSection(), { row: false })}

                        <Button
                            buttonStyle={{
                                marginVertical: moderateScale(10),
                                width: width * 0.6,
                                borderRadius: moderateScale(10),
                                backgroundColor: style.secondaryColor
                            }}
                            titleStyle={style.fontStyle({ color: iOSColors.white, size: 17 })}
                            title="SAVE"
                            onPress={this.saveDish}
                        />
                        {this.error_component(this.state.error)}
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

// define your styles
const styles = {
    container: {
        flex: 1,
        backgroundColor: style.backgroundColor(),
    },
    infoItemContainerStyle: (isRow = true) => {
        return {
            flexDirection: isRow ? 'row' : 'column',
            borderColor: iOSColors.lightGray,
            alignItems: isRow ? 'center' : 'flex-start',
            width: width * 0.95,
            marginBottom: height * 0.02,
            borderRadius: moderateScale(10)
        }
    },
    formTitleTextStyle: {
        ...style.fontStyle({
            size: width * 0.04,
            fontWeight: 'bold'
        }),
        // width: width * 0.3,
        borderWidth: 0,
        paddingVertical: moderateScale(5),
    },
    textInputStyle: (inStyle) => {
        style_prop = inStyle || {
            width: width * 0.6
        }
        return {
            ...style.fontStyle({ size: 15 }),
            backgroundColor: iOSColors.lightGray,
            paddingHorizontal: moderateScale(15),
            borderRadius: moderateScale(10),
            paddingVertical: moderateScale(10),
            ...style_prop,
        }
    },
    orderButtonStyle: (currType, type) => {
        base = {
            marginVertical: moderateScale(10),
            width: width * 0.28,
            borderRadius: moderateScale(10),
            borderColor: iOSColors.black,
            borderWidth: 1,
            backgroundColor: iOSColors.white
        }
        if (currType === type) {
            base = {
                ...base,
                borderWidth: 0,
                backgroundColor: style.secondaryColor
            }
        }
        return base
    },
    orderButtonTextStyle: (currType, type) => {
        base = style.fontStyle({ color: iOSColors.black, size: 13 })
        if (currType === type) {
            base = style.fontStyle({ color: iOSColors.white, size: 13 })
        }
        return base
    },
    charLeftTextStyle: {
        ...style.fontStyle({ fontWeight: 'bold' })
    }
};

export default connect(null, actions)(NewDishScreen);

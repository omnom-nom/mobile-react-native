//import liraries
import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Icon, Button, Tooltip } from 'react-native-elements';
import { Logger } from 'aws-amplify'
import { ImagePicker, Permissions } from 'expo';
import { moderateScale, width, verticalScale, height } from '../../cmn/Scaling';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import { style, colors, loggerConfig } from '../../cmn/AppConfig'
import ScreenHeader from '../../components/ScreenHeader';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { DishOrderTypeEnum, SpiceLevelTypeEnum, spiceColor, FoodTypeEnum, foodColor } from './enums';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import StarRating from 'react-native-star-rating';
import _ from 'lodash'

// TODO: spice level, cuisine, tags [nuts, gluten-free, vegan]
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
        descriptionChars: 0,
        images: [],
        spiceLevel: SpiceLevelTypeEnum.MILD,
        foodType: FoodTypeEnum.VEGETARIAN
    }

    renderInfoItem = (name, inputComponent, args) => {
        args = {
            row: true,
            subTitleComponent: null,
            ...args
        }
        return (
            <View style={styles.infoItemContainerStyle(args.row)}>
                <View style={{
                    width: args.row ? width * 0.35 : width * 0.9,
                    justifyContent: 'center',
                }}>
                    <Text style={styles.formTitleTextStyle}>
                        {name}
                    </Text>
                    {args.subTitleComponent}
                </View>
                {inputComponent}
            </View>
        )
    }

    error_component = () => {
        return <Text style={{
            ...style.fontStyle({ color: colors.scarlet }),
            width: width * 0.9,
            textAlign: 'center'
        }}>{this.state.error}</Text>
    }

    changeContents = (fn) => {
        contents = this.state.contents
        fn(contents)
        this.setState({ contents })
    }

    renderContentItem = (key, { name, count }) => {
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
                    size={moderateScale(30)}
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
                                count: contents.get(key).count
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
                                    count: curr.count + 1
                                })
                            })
                        }}
                    />
                    <Text style={style.fontStyle({ fontWeight: 'bold', size: 15 })}>{count}</Text>
                    <Icon
                        name='remove'
                        size={moderateScale(25)}
                        onPress={() => {
                            this.changeContents((contents) => {
                                curr = contents.get(key)
                                contents.set(key, {
                                    name: curr.name,
                                    count: Math.max(0, curr.count - 1)
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
            count: 1
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
                marginTop: moderateScale(10),
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
        let missing = []
        if (_.isEmpty(this.state.name)) {
            missing.push("name")
        }
        if (_.isEmpty(this.state.description)) {
            missing.push("description")
        }
        if (_.isEmpty(this.state.images)) {
            missing.push("some photos")
        }

        if (this.validatePrice()) {
            missing.push("price")
        }

        if (!_.isEmpty(missing)) {
            let error = _.template('Please provide a <%= missing_items %> of your dish')
            missing_items = missing[0]
            if (missing.length > 1) {
                missing_first_part = _.slice(missing, 0, missing.length - 1)
                missing_items = _.join(missing_first_part, ', ') + ' & ' + missing[missing.length - 1]
            }
            error_message = error({ missing_items })
            this.setState({ error: error_message })
            return
        }
        contents = _.filter([...this.state.contents.values()], (c) => !_.isEmpty(c.name))
        this.props.addNewDish({
            name: this.state.name,
            description: this.state.description,
            content: contents,
            orderType: this.state.orderType,
            price: parseFloat(this.state.price),
            images: this.state.images,
            spiceLevel: this.state.spiceLevel,
            foodType: this.state.foodType
        }, this.props.navigation.goBack)
    }

    validatePrice = () => {
        return _.isEmpty(this.state.price) ||
            (this.state.price.match(new RegExp('\\.', 'g')) || []).length > 1 ||
            this.state.price === '0' ||
            _.isNaN(parseFloat(this.state.price))
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

    renderImages = ({ item, index }, parallaxProps) => {
        return (
            <View style={{
                ...style.shadow(),
                padding: moderateScale(10)
            }}>
                <ParallaxImage
                    source={{ uri: item }}
                    containerStyle={{
                        width: width * 0.8,
                        height: height * 0.3,
                        borderRadius: moderateScale(20)
                    }}
                    style={{ borderRadius: moderateScale(20) }}
                    parallaxFactor={0}
                    {...parallaxProps}
                />
                <Icon
                    name='close-circle-outline'
                    type="material-community"
                    size={moderateScale(30)}
                    color={colors.radicalRed}
                    onPress={() => {
                        images = this.state.images
                        _.pullAt(images, [index])
                        this.setState({ images })
                    }}
                    containerStyle={{ position: 'absolute' }}
                />
            </View>
        );
    }

    renderSpiceButtonGroup = () => {
        return (
            <View style={{
                width: width * 0.6,
                flexDirection: 'row',
                justifyContent: 'space-evenly'
            }}>
                {this.renderSpiceButton(SpiceLevelTypeEnum.MILD)}
                {this.renderSpiceButton(SpiceLevelTypeEnum.MEDIUM)}
                {this.renderSpiceButton(SpiceLevelTypeEnum.SPICY)}
            </View>
        )
    }

    renderSpiceButton = (title, color) => {
        color = spiceColor(title)
        backgroundColor = this.state.spiceLevel === title ? color : iOSColors.white
        titleColor = this.state.spiceLevel === title ? iOSColors.white : color
        return (
            <Button
                buttonStyle={{
                    width: width * 0.19,
                    borderWidth: 0.5,
                    borderColor: color,
                    borderRadius: moderateScale(10),
                    backgroundColor
                }}
                title={title}
                titleStyle={style.fontStyle({ color: titleColor, size: 11 })}
                onPress={() => this.setState({ spiceLevel: title })}
            />
        )
    }

    renderFoodTypeButtonGroup = () => {
        return (
            <View style={{
                ...styles.infoItemContainerStyle(true),
                justifyContent: 'space-between'
            }}>
                {this.renderFoodTypeButton(FoodTypeEnum.VEGETARIAN)}
                {this.renderFoodTypeButton(FoodTypeEnum.NON_VEGETARIAN)}
            </View>
        )
    }

    renderFoodTypeButton = (title, color) => {
        color = foodColor(title)
        backgroundColor = this.state.foodType === title ? color : iOSColors.white
        titleColor = this.state.foodType === title ? iOSColors.white : color
        return (
            <Button
                buttonStyle={{
                    width: width * 0.45,
                    borderWidth: 0.5,
                    borderColor: color,
                    borderRadius: moderateScale(10),
                    backgroundColor
                }}
                title={_.startCase(title)}
                titleStyle={style.fontStyle({ color: titleColor })}
                onPress={() => this.setState({ foodType: title })}
            />
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
                    header="add a new dish"
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
                                subTitleComponent: <Text style={styles.charLeftTextStyle}>{`( ${this.state.nameChars} / 30)`}</Text>,
                            })}
                        {this.renderInfoItem("Spice Level", this.renderSpiceButtonGroup())}
                        {this.renderInfoItem(
                            "Order Type",
                            this.renderOrderType(),
                            {
                                subTitleComponent: this.renderToolTip("Please select order type On-Demand if you can prepare this dish quickly, select Pre-Order if you need time to prepare this dish. With On-Demand you will have to prepare the dish as soon as you accept the order.")
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
                                row: false,
                                subTitleComponent: <Text style={styles.charLeftTextStyle}>{`( ${this.state.descriptionChars} / 250)`}</Text>,
                            })}
                        {this.renderFoodTypeButtonGroup()}
                        {this.renderInfoItem("Content", this.renderContentsSection(), {
                            row: false,
                            subTitleComponent: <Text style={style.fontStyle({ color: iOSColors.gray, fontWeight: '600' })}>List all the items you will provide with this dish</Text>,
                        })}
                        {this.renderInfoItem("Photos",
                            _.isEmpty(this.state.images) ? null : <Carousel
                                itemWidth={width * 0.8}
                                sliderWidth={width * 0.95}
                                itemHeight={height * 0.3}
                                sliderHeight={height * 0.3}
                                data={this.state.images}
                                renderItem={this.renderImages}
                                hasParallaxImages={true}
                            />, {
                                row: false,
                            })}
                        <View style={{
                            flexDirection: 'row',
                            width: width * 0.5,
                            justifyContent: 'space-between'
                        }}>
                            {this.getPhotoSelectionButtons('CAMERA', 'camera', ImagePicker.launchCameraAsync)}
                            {this.getPhotoSelectionButtons('FOLDER', 'folder', ImagePicker.launchImageLibraryAsync)}
                        </View>
                        <Button
                            buttonStyle={{
                                marginTop: moderateScale(50),
                                marginBottom: moderateScale(20),
                                width: width * 0.6,
                                borderRadius: moderateScale(10),
                                backgroundColor: style.secondaryColor
                            }}
                            titleStyle={style.fontStyle({ color: iOSColors.white, size: 17 })}
                            title="SAVE"
                            onPress={this.saveDish}
                        />
                        {this.error_component()}
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }

    getPhotoSelectionButtons = (title, name, fn) => {
        return <View>
            <Icon
                name={name}
                type="material-community"
                size={moderateScale(30)}
                color={iOSColors.gray}
                onPress={() => this.getPhotos(fn)}
            />
            <Text style={style.fontStyle({ color: iOSColors.gray })}>{title}</Text>
        </View>
    }

    getPhotos = async (fn) => {
        await this.askPermissionsAsync();
        let result = await fn({
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (!result.cancelled) {
            images = this.state.images
            images.push(result.uri)
            this.setState({ images });
        }
    }
    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    };
}

// define your styles
const styles = {
    container: {
        flex: 1,
        backgroundColor: style.backgroundColor(),
    },
    infoItemContainerStyle: (isRow) => {
        return {
            flexDirection: isRow ? 'row' : 'column',
            borderColor: iOSColors.lightGray,
            alignItems: isRow ? 'center' : 'flex-start',
            width: width * 0.95,
            marginVertical: moderateScale(10),
            borderRadius: moderateScale(10)
        }
    },
    formTitleTextStyle: {
        ...style.fontStyle({
            size: 17,
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

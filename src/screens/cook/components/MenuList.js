import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, TouchableHighlight, Image, Animated } from 'react-native';
import { Icon, ListItem, Button } from 'react-native-elements';
import { Logger } from 'aws-amplify'
import { moderateScale, width, verticalScale, height } from '../../../cmn/Scaling';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import { style, colors, loggerConfig } from '../../../cmn/AppConfig'
import { foodColor, FoodTypeEnum, spiceColor, spiceImage, SpiceLevelTypeEnum } from '../enums';
import _ from 'lodash'
import { Haptic } from 'expo'
import Swipeout from 'react-native-swipeout';


class MenuList extends Component {
    state = {
        listScroll: true,
        scrollingItem: ""
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
            <Swipeout
                key={item.id}
                right={this.props.rightSwipe(item)}
                buttonWidth={width * 0.3}
                close={this.state.scrollingItem !== item.id}
                style={{
                    backgroundColor: 'transparent',
                }}
                scroll={(enabled) => this.setState({ listScroll: enabled })}
                onOpen={() => {
                    this.setState({ scrollingItem: item.id, listScroll: false })
                }}
                sensitivity={10}
            >
                <View

                    style={{
                        width: width * 0.95,
                        borderBottomColor: iOSColors.lightGray,
                        borderBottomWidth: 0.5,
                        padding: moderateScale(10),
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }} >
                    <Image
                        style={{
                            width: width * 0.3,
                            height: width * 0.3,
                            borderRadius: moderateScale(10)
                        }}
                        source={{ uri: item.images[0] }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            Haptic.impact(Haptic.ImpactFeedbackStyle.Medium)
                            this.props.navigation.navigate('preview', {
                                dish: item
                            })
                        }}
                        style={{
                            width: width * 0.4
                        }}>
                        <View>
                            <Text style={style.fontStyle({ fontWeight: 'bold', size: 18, textAlign: 'left' })}>
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
                                <Text style={style.fontStyle({ fontWeight: 'bold', size: 10, color: iOSColors.blue })}>
                                    {` . ${item.price} mins`}
                                </Text>
                            </View>
                        </View>
                        <View>
                            {this.renderContent(item.content)}
                        </View>
                    </TouchableOpacity>
                    <Text style={style.fontStyle({ fontWeight: 'bold', size: 17, color: style.secondaryColor })}>
                        {item.price} $
                </Text>
                </View>
            </Swipeout >
        )
    }
    render() {
        const { items } = this.props
        if (_.isEmpty(items)) {
            return (
                <Text style={style.fontStyle()}>
                    No dishes in this menu
                </Text>
            )
        }
        return (
            <TouchableHighlight
                activeOpacity={1}
                underlayColor={"transparent"}
                onPress={() => this.setState({ scrollingItem: "" })}
            >
                <FlatList
                    scrollEnabled={this.state.listScroll}
                    keyExtractor={(item) => item.id}
                    data={items}
                    renderItem={this.renderMenuItem}
                />
            </TouchableHighlight>
        )
    }
}

// define your styles
const styles = {
}

//make this component available to the app
export default MenuList;

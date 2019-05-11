//import liraries
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { Icon, ListItem, Image } from 'react-native-elements';
import { Logger } from 'aws-amplify'
import { moderateScale, width, verticalScale, height } from '../cmn/Scaling';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import { style, colors, loggerConfig, infoAbsent } from '../cmn/AppConfig'
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Haptic } from 'expo';
import _ from 'lodash'

// create a component
const fontSize = 16
const fontWeight = '500'
class DishComponent extends Component {

    renderTags = () => {
        const { dish } = this.props
        if (_.isEmpty(dish.tags)) {
            return null
        }
        return (
            dish.tags.map((tag, index) => {
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
                if (index === dish.tags.length - 1) {
                    seperator = null
                }
                return (
                    <View
                        key={tag}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: moderateScale(5),
                        }}>
                        <Text style={style.fontStyle({ size: 14, color: style.secondaryColor })}>
                            {_.capitalize(tag)}
                        </Text>
                        {seperator}
                    </View>
                )
            })
        )
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

    getContent = (dish) => {
        if (_.isEmpty(dish.content)) {
            return null
        }
        return dish.content.map((c) => {
            return (
                <View
                    key={c.name}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: moderateScale(5)
                    }}>
                    <Text style={style.fontStyle({ ...styles.sectionTextStyle, color: style.secondaryColor })} >
                        {c.count} {" x "}
                    </Text>
                    <View style={{
                        width: width * 0.7
                    }}>
                        <Text style={style.fontStyle(styles.sectionTextStyle)} >
                            {c.name}
                        </Text>
                    </View>
                </View>
            )
        })
    }

    render() {
        const { dish } = this.props
        if (_.isEmpty(dish.images)) {
            return null
        }
        return (
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
                        {this.renderHeader('Description')}
                        <Text style={style.fontStyle(styles.sectionTextStyle)}>
                            {dish.description}
                        </Text>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        borderWidth: 0
                    }}>
                        {this.renderHeader('Content')}
                        {this.getContent(dish)}
                    </View>

                </View>
            </ScrollView>
        );
    }

    renderHeader = (name) => {
        return (
            <Text style={{
                ...style.fontStyle(styles.sectionHeaderStyle),
                paddingVertical: moderateScale(5)
            }}>
                {name}
            </Text>
        )
    }
}
const styles = {
    sectionTextStyle: {
        size: 15,
    },
    sectionHeaderStyle: {
        size: 17,
        fontWeight: 'bold'
    }
}

//make this component available to the app
export default DishComponent;

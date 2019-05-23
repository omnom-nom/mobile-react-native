//import liraries
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { Icon, ListItem, Image } from 'react-native-elements';
import { Logger } from 'aws-amplify'
import { moderateScale, width, verticalScale, height } from '../cmn/Scaling';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import { style, colors, loggerConfig, infoAbsent } from '../cmn/AppConfig'
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { foodColor, spiceImage } from '../screens/cook/enums'
import { Haptic } from 'expo';
import _ from 'lodash'
import { S3Image } from 'aws-amplify-react-native'


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
                        width: width * 0.995,
                        height: height * 0.4,
                        borderRadius: moderateScale(5)
                    }}
                    parallaxFactor={0}
                    {...parallaxProps}
                />
            </View>
        );
    }

    getContent = (contents) => {
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
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: moderateScale(5)
                        }}>
                        <Text style={style.fontStyle({ ...styles.sectionTextStyle, color: style.secondaryColor })} >
                            {contents[key]} {" x "}
                        </Text>
                        <View style={{
                            width: width * 0.7
                        }}>
                            <Text style={style.fontStyle(styles.sectionTextStyle)} >
                                {key}
                            </Text>
                        </View>
                    </View>
                )
            }
        }
        return contentsView
    }

    render() {
        const { dish } = this.props
        if (_.isEmpty(dish.images)) {
            return null
        }
        return (
            <ScrollView style={{top: moderateScale(20)}}>
                <Carousel
                    itemWidth={width * 0.995}
                    sliderWidth={width}
                    itemHeight={height * 0.4}
                    sliderHeight={height * 0.4}
                    data={dish.images}
                    renderItem={this.renderImages}
                    hasParallaxImages={true}
                />
                <View style={{
                    width,
                    paddingHorizontal: moderateScale(10),
                    paddingVertical: moderateScale(20),
                }}>
                    <View style={{
                        position: 'absolute',
                        right: moderateScale(10),
                        top: -moderateScale(50),
                        backgroundColor: iOSColors.white,
                        borderRadius: width,
                        height: moderateScale(100),
                        width: moderateScale(100),
                        ...style.shadow({ opacity: 0.1 }),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={style.fontStyle({ size: 35, fontWeight: 'bold', color: colors.caribbreanGreen })}>
                            {dish.price} $
                        </Text>
                    </View>
                    <View style={{ width: width * 0.7 }}>
                        <Text style={style.fontStyle({ size: 35, fontWeight: 'bold', letterSpacing: -1, textAlign: 'left' })}>
                            {dish.name}
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        marginVertical: moderateScale(2.5)
                    }}>
                        <Text style={style.fontStyle({ fontWeight: 'bold', color: foodColor(dish.foodType), size: 20 })}>
                            {_.startCase(dish.foodType)}
                        </Text>
                        <Text style={style.fontStyle({ fontWeight: 'bold', size: 20 })}>
                            {` . `}
                        </Text>
                        {spiceImage(dish.spice, 20)}
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        marginVertical: moderateScale(2.5)
                    }}>
                        {this.renderHeader('Description')}
                        <Text style={style.fontStyle(styles.sectionTextStyle)}>
                            {dish.description}
                        </Text>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        marginVertical: moderateScale(2.5)
                    }}>
                        {this.renderHeader('Content')}
                        {this.getContent(dish.content)}
                    </View>

                </View>
            </ScrollView >
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
        fontWeight: '500'
    },
    sectionHeaderStyle: {
        size: 18,
        fontWeight: 'bold'
    }
}

//make this component available to the app
export default DishComponent;

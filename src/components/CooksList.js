import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Platform } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import { moderateScale, width, verticalScale, height } from '../cmn/Scaling';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import { style, colors } from '../cmn/AppConfig'
import { connect } from 'react-redux';
import * as actions from '../actions';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

// create a component
const ratingColor = style.secondaryColor
const ratingSize = moderateScale(10)
const imageHeight = height * 0.2

class CooksList extends Component {
    renderImages({ item, index }, parallaxProps) {
        return (
            <View style={{
                ...style.shadow()
            }}>
                <ParallaxImage
                    source={{ uri: item }}
                    containerStyle={{
                        height: height * 0.3,
                        borderRadius: moderateScale(20),
                        marginBottom: moderateScale(10)
                    }}
                    parallaxFactor={0}
                    {...parallaxProps}
                />
            </View>
        );
    }
    renderItem = ({ item }) => {
        return (
            <View style={styles.itemsContainerStyle}>
                {/* <FlatList
                    pagingEnabled
                    horizontal
                    data={item["images"]}
                    keyExtractor={(item) => item}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.imageViewStyle}>
                                <Image
                                    style={{
                                        height: imageHeight,
                                        borderRadius: moderateScale(10),
                                    }}
                                    source={{ uri: item }}
                                />
                            </View>
                        )
                    }}
                /> */}
                {/* <View style={{}}> */}
                <Carousel
                    itemWidth={width * 0.95}
                    sliderWidth={width}
                    data={item["images"]}
                    renderItem={this.renderImages}
                    hasParallaxImages={true}
                />
                {/* </View> */}
                <TouchableOpacity
                    onPress={() => {
                        this.props.currentCook(item.id)
                        this.props.navigate("cook")
                    }}
                    style={{
                        paddingHorizontal: width * 0.05,
                        paddingBottom: moderateScale(10),
                    }}
                >
                    <Text style={style.fontStyle({ size: 20, fontWeight: "800" })}>{item["name"]}</Text>
                    <Text style={style.fontStyle({ size: 13, fontWeight: "600", color: iOSColors.lightGray })}>{item["cuisine"]}</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={styles.ratingStyle}>{item["reviews"]["rating"]}</Text>
                        <Icon
                            name='star'
                            size={ratingSize}
                            color={ratingColor}
                        />
                        <Text style={{
                            ...styles.ratingStyle,
                            marginLeft: moderateScale(5),
                        }}>{item["reviews"]["total"]} ratings</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { merchants } = this.props
        const keyExtractor = (item, index) => item["id"]
        const renderItem = this.renderItem
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={keyExtractor}
                data={merchants}
                renderItem={renderItem}
            />
        )
    }
}

// define your styles
const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerStyle: {
        ...material.subheading,
        ...systemWeights.bold,
        color: materialColors.blackPrimary,
        width,
        fontFamily: style.font,
        textAlign: 'center'
    },
    ratingStyle: style.fontStyle({ size: ratingSize, fontWeight: '600', color: ratingColor }),
    imageViewStyle: {
        height: imageHeight + 10,
        width: width * 0.5 - moderateScale(10),
        marginLeft: moderateScale(5),
        marginRight: moderateScale(5),
        borderRadius: moderateScale(10),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: moderateScale(2) },
        shadowOpacity: 0.5,
        shadowRadius: moderateScale(2),
        elevation: moderateScale(2),
    },
    itemsContainerStyle: {
        justifyContent: 'center',
        alignContent: 'center',
        borderBottomWidth: 0.2,
        borderBottomColor: iOSColors.gray,
        paddingVertical: moderateScale(10),
    }
};


export default connect(null, actions)(CooksList);
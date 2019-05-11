//import liraries
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { Icon, ListItem, Image } from 'react-native-elements';
import { Logger } from 'aws-amplify'
import { moderateScale, width, verticalScale, height } from '../../cmn/Scaling';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import { style, colors, loggerConfig, infoAbsent } from '../../cmn/AppConfig'
import ScreenHeader from '../../components/ScreenHeader';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { Haptic } from 'expo';
import _ from 'lodash'
import DishComponent from '../../components/DishComponent';

const logger = new Logger("[DishScreenNew]", loggerConfig.level)
class DishScreenNew extends Component {
    state = {
        dish: {},
        dish_order_count: 0
    }
    componentWillMount = () => {
        this.setState({ dish: this.props.dish, dish_order_count: this.props.dish_order_count })
    }
    componentWillReceiveProps = (nextProps) => {
        this.setState({ dish: nextProps.dish, dish_order_count: nextProps.dish_order_count })
    }

    addMoreItemToCart = (item) => {
        Haptic.impact(Haptic.ImpactFeedbackStyle.Light)
        this.props.addToCart(item)
    }

    removeItemCount = (item) => {
        Haptic.impact(Haptic.ImpactFeedbackStyle.Light)
        this.props.removeFromCart(item)
    }

    render = () => {
        const { dish } = this.state
        return (
            <View style={styles.container}>
                <ScreenHeader
                    header={dish.name}
                    size={20}
                    back={{
                        show: true,
                        navigate: () => {
                            this.props.navigation.navigate("cook")
                        }
                    }}
                    containerStyle={{
                        borderBottomWidth: 1,
                        borderBottomColor: iOSColors.lightGray,
                    }}
                />
                <DishComponent dish={dish} />
                <View style={{
                    marginVertical: moderateScale(10),
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        width: width * 0.8,
                        marginVertical: moderateScale(5),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderRadius: moderateScale(100),
                        paddingHorizontal: moderateScale(20),
                        paddingVertical: moderateScale(10),
                        backgroundColor: style.backgroundColor(0.1),
                    }}>
                        <Icon
                            name='plus'
                            type="material-community"
                            size={moderateScale(30)}
                            color={style.secondaryColor}
                            onPress={() => this.addMoreItemToCart(dish)}
                            underlayColor="transparent"
                        />
                        <Text style={{
                            fontFamily: style.font,
                            fontSize: moderateScale(20)
                        }}>
                            {this.state.dish_order_count}
                        </Text>
                        <Icon
                            name='minus'
                            type="material-community"
                            size={moderateScale(30)}
                            color={style.secondaryColor}
                            onPress={() => this.removeItemCount(dish)}
                            underlayColor="transparent"
                        />
                    </View>
                </View>
            </View>
        )
    }

}

// define your styles
const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: style.backgroundColor(),
    },
};

mapStateToProps = ({ dish_info, order_info }) => {
    let dish = {}
    let dish_order_count = 0
    const items = infoAbsent(order_info) || infoAbsent(order_info.items) ? [] : [...order_info.items.values()]
    if (!infoAbsent(dish_info) && !infoAbsent(dish_info.dish_current)) {
        dish = dish_info.dish_current
        const item = _.find(items, { id: dish.id });
        if (!_.isUndefined(item)) {
            dish_order_count = item.count
        }
    }

    return {
        dish,
        dish_order_count
    }
}
export default connect(mapStateToProps, actions)(DishScreenNew);

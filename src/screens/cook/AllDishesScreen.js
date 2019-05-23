//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Overlay, Button } from 'react-native-elements'
import { Logger } from 'aws-amplify'
import { moderateScale, width, height } from '../../cmn/Scaling';
import { iOSColors } from 'react-native-typography'
import { style, colors, loggerConfig } from '../../cmn/AppConfig'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { StatusTypeEnum } from './enums';
import _ from 'lodash'
import MenuHeader from './components/MenuHeader';
import MenuList from './components/MenuList';
import { Haptic } from 'expo'

class AllDishesScreen extends Component {
    state = {
        showingAddButtons: false,
        menu: [],
        modalVisible: false,
        deleteDish: null
    }

    constructor(props) {
        super(props)
        add = new Animated.Value(0)
        this.add = add
    }

    componentWillMount = () => {
        this.setState({ menu: this.props.menu })
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({ menu: nextProps.menu })
    }

    renderMenu = () => {
        return <MenuList
            items={this.state.menu}
            navigation={this.props.navigation}
            leftSwipe={(item) => {
                swipeComponent = [
                    {
                        backgroundColor: colors.caribbreanGreen,
                        text: 'Add to menu',
                        type: 'primary',
                        onPress: () => {
                            Haptic.impact(Haptic.ImpactFeedbackStyle.Medium)
                            this.props.flipDishStatus(item.id, StatusTypeEnum.ACTIVE)
                        }
                    },
                    {
                        backgroundColor: colors.scarlet,
                        text: 'Delete',
                        type: 'delete',
                        onPress: () => {
                            Haptic.impact(Haptic.ImpactFeedbackStyle.Medium)
                            this.setState({ modalVisible: true, deleteDish: item })
                        }
                    }
                ]
                return swipeComponent
            }
            }
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
    renderDeleteItemModal = () => {
        return (
            <Overlay
                isVisible={this.state.modalVisible}
                windowBackgroundColor="rgba(255, 255, 255, .8)"
                width="auto"
                height="auto"
                containerStyle={{
                    ...style.shadow({ opacity: 0.9 }),
                }}
            >
                <View style={{
                    padding: moderateScale(10),
                    justifyContent: 'space-between',
                    height: height * 0.2,
                    width: width * 0.8
                }}>
                    <Text style={style.fontStyle({ size: 17, fontWeight: '500' })}>
                        Are you sure you want to delete this dish?
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Button
                            buttonStyle={{
                                width: width * 0.3,
                                backgroundColor: colors.scarlet
                            }}
                            title={'Yes'}
                            onPress={() => {
                                this.props.deleteTheDish(this.state.deleteDish)
                                this.setState({ modalVisible: false, deleteDish: null })
                            }}
                        />
                        <Button
                            buttonStyle={{
                                width: width * 0.3,
                                backgroundColor: colors.caribbreanGreen
                            }}
                            title={'No'}
                            onPress={() => {
                                this.setState({ modalVisible: false, deleteDish: null })
                            }}
                        />
                    </View>
                </View>
            </Overlay>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <MenuHeader
                    onBackPress={() => this.props.navigation.goBack()}
                    name="HISTORY"
                    backIconName={"close"}
                />
                {this.renderMenu()}
                {this.renderDeleteItemModal()}
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
};

mapStateToProps = ({ cook_dishes }) => {
    logger = new Logger("[AllDishScreen]", loggerConfig.level)
    const menu = cook_dishes.inactive.menu.toIndexedSeq().toArray()
    return {
        menu
    }
}

export default connect(mapStateToProps, actions)(AllDishesScreen);

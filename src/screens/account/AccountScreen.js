//import liraries
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { Logger } from 'aws-amplify'
import { moderateScale, width, verticalScale, height } from '../../cmn/Scaling';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import { style, colors, loggerConfig } from '../../cmn/AppConfig'
import ScreenHeader from '../../components/ScreenHeader';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import _ from 'lodash'


const logger = new Logger("[AccountScreen]", loggerConfig.level)
class AccountScreen extends Component {
    state = {
        customer_info: null
    }

    componentWillMount = () => {
        this.setState({
            customer_info: this.props.customer_info,
        })
    }

    renderItem = (item) => {
        return (
            <ListItem
                title={item.title}
                titleStyle={styles.itemTitleStyle}
                subtitle={item.subtitle}
                subtitleStyle={styles.itemSubtitleStyle}
                containerStyle={{
                    paddingHorizontal: moderateScale(20),
                    borderBottomWidth: 0.5,
                    backgroundColor: 'rgba(0,0,0,0)'
                }}
                rightIcon={<Icon
                    name='chevron-right'
                    size={moderateScale(30)}
                    color={colors.eerieBlack}
                />}
                onPress={() => {
                    if (_.hasIn(item, 'onPress')) {
                        item.onPress()
                    }
                }}
            />
        )
    }
    render() {
        logger.debug(this.state)
        return (
            <View style={styles.container}>
                <ScrollView>
                    <ScreenHeader header="Account" size={25} />
                    {this.renderItem({
                        title: this.state.customer_info.name,
                        onPress: () => {
                            this.props.navigation.navigate("acc_info")
                        },
                        subtitle: "update your personal information"
                    })}

                    {this.renderItem({
                        title: "Logout",
                        onPress: () => {
                            this.props.signout(this.props.navigation.navigate)
                        }
                    })}
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: style.backgroundColor()
    },
    itemTitleStyle: {
        fontFamily: style.font
    },
    itemSubtitleStyle: {
        fontFamily: style.font,
        fontSize: moderateScale(10),
        color: style.secondaryColor
    }
};

mapStateToProps = ({ customer_info }) => {
    logger.debug(customer_info)
    if (_.isUndefined(customer_info) || _.isEmpty(customer_info) || _.isNull(customer_info)) {
        return {
            customer_info: {
                name: "",
                phone: "",
                email: ""
            }
        }
    }
    return {
        customer_info
    }
}
export default connect(mapStateToProps, actions)(AccountScreen);

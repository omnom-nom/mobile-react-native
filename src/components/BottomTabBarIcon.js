//import liraries
import React, { Component } from 'react';
import { Badge, Icon, withBadge } from 'react-native-elements'
import { moderateScale, width, verticalScale, height } from '../cmn/Scaling';
import { loggerConfig, colors, infoAbsent, style } from '../cmn/AppConfig'
import { Logger } from 'aws-amplify'
import { connect } from 'react-redux';
import * as actions from '../actions';
import _ from 'lodash'


const logger = new Logger("[BottomTabBarIcon]", loggerConfig.level)
class BottomTabBarIcon extends Component {
    state = {
        count: 0
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({ count: nextProps.count })
    }

    render() {
        let BadgedIcon = Icon
        if (this.state.count > 0) {
            BadgedIcon = withBadge(this.state.count, {
                badgeStyle: {
                    backgroundColor: colors.radicalRed,
                },
                textStyle: {
                    fontFamily: style.font
                }
            })(Icon)
        }
        return (
            <BadgedIcon
                name="cart-outline"
                type="material-community"
                size={moderateScale(20)}
                color={this.props.color}
            />
        );
    }
}

mapStateToProps = ({ order_info }) => {
    const items = infoAbsent(order_info) || infoAbsent(order_info.items) ? new Map() : order_info.items
    const count = getTotalCount(items)
    return {
        count
    }
}

getTotalCount = (items) => {
    let count = 0
    items.forEach((v, k, map) => {
        count += _.toNumber(v.count)
    });
    return count
}

export default connect(mapStateToProps, actions)(BottomTabBarIcon);

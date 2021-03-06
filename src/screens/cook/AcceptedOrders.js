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

// this screen will show all the accepted orders
// it will show the following:
// Maybe in form of a calendar
// 1. orders for today
// 2. future orders 

class AcceptedOrdersScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ScreenHeader header="AcceptedOrdersScreen" size={25} />
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
    },
};

//make this component available to the app
export default AcceptedOrdersScreen;

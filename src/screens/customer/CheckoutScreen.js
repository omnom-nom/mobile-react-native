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

// create a component
class CheckoutScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ScreenHeader header="Checkout" size={20} back={{
                    show: true,
                    navigate: () => {
                        this.props.navigation.navigate("cart")
                    }
                }} />
            </View>
        );
    }
}

// define your styles
const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: style.backgroundColor,
    },
};

//make this component available to the app
export default CheckoutScreen;

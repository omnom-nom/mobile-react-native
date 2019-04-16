//import liraries
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Platform } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import { moderateScale, width, verticalScale, height } from '../../cmn/Scaling';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import { style, colors } from '../../cmn/AppConfig'
import ScreenHeader from '../../components/ScreenHeader';

// create a component
class PersonalInformationScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <ScreenHeader header="Personal Information" size={20} back={{
                    show: true,
                    navigate: () => {
                        this.props.navigation.navigate("account")
                    }
                }}/>
            </View>
        );
    }
}

// define your styles
const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
    },
};

//make this component available to the app
export default PersonalInformationScreen;

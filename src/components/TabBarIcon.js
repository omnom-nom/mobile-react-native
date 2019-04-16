//import liraries
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { moderateScale, width, verticalScale, height } from '../cmn/Scaling';


// create a component
class TabBarIcon extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Icon
                    name='menu'
                    type='ionicons'
                    onPress={this.props.onPress}
                    size={moderateScale(30)}
                />
            </View>
        );
    }
}

// define your styles
const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: height * 0.05,
        left: moderateScale(10),
    },
};

//make this component available to the app
export default TabBarIcon;

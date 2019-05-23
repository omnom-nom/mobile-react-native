//import liraries
import React, { Component } from 'react';
import { View } from 'react-native';
import { Logger } from 'aws-amplify'
import { iOSColors } from 'react-native-typography'
import { Icon } from 'react-native-elements';
import { style, loggerConfig } from '../../cmn/AppConfig'
import ScreenHeader from '../../components/ScreenHeader';
import _ from 'lodash'
import DishComponent from '../../components/DishComponent';
import { moderateScale } from '../../cmn/Scaling';


const logger = new Logger("[DishPreviewScreen]", loggerConfig.level)
class DishPreviewScreen extends Component {
    render = () => {
        const { dish } = this.props.navigation.state.params
        return (
            <View style={styles.container}>
                <DishComponent dish={dish} />
                <Icon
                    name={'arrow-back'}
                    size={moderateScale(30)}
                    // color={iOSColors.white}
                    onPress={() => this.props.navigation.goBack()}
                    containerStyle={{
                        position: 'absolute',
                        top: moderateScale(30),
                        left: moderateScale(10),
                    }}
                    underlayColor={'transparent'}
                />
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
export default DishPreviewScreen;

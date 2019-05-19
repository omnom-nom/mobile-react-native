//import liraries
import React, { Component } from 'react';
import { View } from 'react-native';
import { Logger } from 'aws-amplify'
import { iOSColors } from 'react-native-typography'
import { style, loggerConfig } from '../../cmn/AppConfig'
import ScreenHeader from '../../components/ScreenHeader';
import _ from 'lodash'
import DishComponent from '../../components/DishComponent';

const logger = new Logger("[DishPreviewScreen]", loggerConfig.level)
class DishPreviewScreen extends Component {
    render = () => {
        const { dish } = this.props.navigation.state.params
        return (
            <View style={styles.container}>
                <ScreenHeader
                    icon={{
                        name: 'close',
                        right: true,
                        size: 30
                    }}
                    header={dish.name}
                    headerStyle={{ fontWeight: 'normal', }}
                    size={20}
                    back={{
                        show: true,
                        navigate: () => {
                            this.props.navigation.goBack()
                        }
                    }}
                    containerStyle={{
                        borderBottomWidth: 1,
                        borderBottomColor: iOSColors.lightGray,
                    }}
                />
                <DishComponent dish={dish} />
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

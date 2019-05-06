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
class AllDishesScreen extends Component {
    state = {
        dishes: []
    }

    componentWillMount = () => {
        this.setState({ dishes: this.props.dishes })
    }
    componentWillReceiveProps = (nextProps) => {
        this.setState({ dishes: nextProps.dishes })
    }
    render() {
        return (
            <View style={styles.container}>
                <ScreenHeader
                    icon={{
                        name: 'close',
                        right: true,
                        size: 30
                    }}
                    header="all dishes"
                    headerStyle={{ fontWeight: 'normal', }}
                    size={20}
                    back={{
                        show: true,
                        navigate: () => {
                            this.props.navigation.goBack()
                        }
                    }}
                />
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

mapStateToProps = ({ cook_dishes }) => {
    logger = new Logger("[AllDishScreen]", loggerConfig.level)
    logger.debug(cook_dishes)
    const dishes = _.isUndefined(cook_dishes) ? [] : cook_dishes.dishes
    return {
        dishes
    }
}

export default connect(mapStateToProps, actions)(AllDishesScreen);

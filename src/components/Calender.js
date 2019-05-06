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
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

// this component will show new requests for today and for future
class Calender extends Component {
    state = {
        selected: ""
    }
    onDayPress = (day) => {
        console.log(day);

        this.setState({
            selected: day.dateString
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Calendar
                    style={{
                        width,
                        height: 200
                    }}
                    theme={{
                        selectedDayBackgroundColor: style.secondaryColor,
                        todayTextColor: style.secondaryColor,
                        dayTextColor: iOSColors.black,
                        textDisabledColor: '#d9e1e8',
                        arrowColor: style.secondaryColor,
                        monthTextColor: style.secondaryColor,
                        textDayFontFamily: style.font,
                        textMonthFontFamily: style.font,
                        textDayHeaderFontFamily: style.font,
                        textMonthFontWeight: 'bold',
                        textDayFontSize: moderateScale(13),
                        textMonthFontSize: moderateScale(15),
                        textDayHeaderFontSize: moderateScale(13)
                    }}
                    markedDates={{ [this.state.selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' } }}
                    onDayPress={this.onDayPress}
                    dayComponent={({ date, state }) => {
                        textColor = iOSColors.black
                        if (state === 'disabled') textColor = iOSColors.lightGray
                        if (state === 'today') textColor = style.secondaryColor
                        if (date.dateString === this.state.selected) textColor = iOSColors.white
                        containerColor = date.dateString === this.state.selected ? style.secondaryColor : iOSColors.white
                        if (state === 'today') containerColor = iOSColors.white
                        return (
                            <TouchableOpacity
                                onPress={() => this.onDayPress(date)}
                                style={{
                                    backgroundColor: containerColor,
                                    width: moderateScale(23),
                                    height: moderateScale(23),
                                    borderRadius: moderateScale(23),
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                <Text style={{
                                    textAlign: 'center',
                                    color: textColor
                                }}>
                                    {date.day}
                                </Text>
                            </TouchableOpacity>);
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
        paddingTop: moderateScale(35),
    },
};

//make this component available to the app
export default Calender;

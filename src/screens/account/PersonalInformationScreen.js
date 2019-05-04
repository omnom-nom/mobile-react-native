//import liraries
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text';
import * as EmailValidator from 'email-validator';
import { moderateScale, width, verticalScale, height } from '../../cmn/Scaling';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import { style, colors, loggerConfig, infoAbsent } from '../../cmn/AppConfig'
import ScreenHeader from '../../components/ScreenHeader';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Logger } from 'aws-amplify'
import _ from 'lodash'


const color = style.secondaryColor
const logger = new Logger("[PersonalInformationScreen]", loggerConfig.level)
class PersonalInformationScreen extends Component {
    state = {
        name: "",
        phone_number: "",
        email: "",
        name_error: "",
        phone_number_error: "",
        email_error: "",
        phoneNumberFormat: "",
    }

    componentWillMount = () => {
        this.setState({
            name: this.props.customer_info.name,
            phoneNumberFormat: this.props.customer_info.phone,
            email: this.props.customer_info.email
        })
    }

    any_errors = () => {
        let name_error = ""
        let phone_number_error = ""
        let email_error = ""
        let error = false
        if (this.state.name == "") {
            name_error = "Please provide your name"
            error = true
        }
        if (this.state.phone_number == "") {
            phone_number_error = "Please provide your phone number"
            error = true
        }
        if (this.state.email == "") {
            email_error = "Please provide your email"
            error = true
        }

        if (!EmailValidator.validate(this.state.email)) {
            email_error = "Please provide valid email"
            error = true
        }

        this.setState({
            name_error,
            phone_number_error,
            email_error
        })
        return error
    }

    error_component = (message) => {
        if (message !== "") {
            return <Text style={styles.formFieldsErrors}>{message}</Text>
        }
    }

    renderInfoItem = (name, inputComponent) => {
        return (
            <View style={styles.infoItemContainerStyle}>
                <Text style={styles.formTitleTextStyle}>
                    {name}
                </Text>
                {inputComponent}
            </View>
        )
    }

    renderPersonalInfoForm = () => {
        return (
            <View style={styles.formContainerStyle}>
                {this.renderInfoItem("Name", <TextInput
                    style={styles.textInputStyle}
                    onChangeText={(name) => this.setState({ name })}
                    selectionColor={color}
                    value={this.state.name}
                />)}
                {this.error_component(this.state.name_error)}

                {this.renderInfoItem("Phone", <TextInputMask
                    style={styles.textInputStyle}
                    value={this.state.phoneNumberFormat}
                    onChangeText={(phoneNumberFormat) => {
                        let phoneNumber = phoneNumberFormat.toString().replace(/\D+/g, '');
                        this.setState({ phoneNumberFormat: phoneNumberFormat, phone_number: phoneNumber })
                    }}
                    type={'cel-phone'}
                    maxLength={this.state.phoneNumberFormat.toString().startsWith("1") ? 18 : 16}
                    options={
                        this.state.phone_number.startsWith("1") ?
                            {
                                dddMask: '9 (999) 999 - '
                            } : {
                                dddMask: '(999) 999 - '
                            }
                    }
                    selectionColor={color}
                />)}
                {this.error_component(this.state.phone_number_error)}

                {this.renderInfoItem("Email", <TextInput
                    style={styles.textInputStyle}
                    onChangeText={(email) => this.setState({ email: email.toLowerCase() })}
                    textContentType="emailAddress"
                    autoComplete="email"
                    keyboardType="email-address"
                    autoCorrect={false}
                    selectionColor={color}
                    autoCapitalize="none"
                    value={this.state.email}
                    editable={false}
                />)}
                {this.error_component(this.state.email_error)}

                <Button
                    buttonStyle={{
                        marginTop: 20,
                        width: width * 0.6,
                        borderRadius: 100,
                        backgroundColor: color
                    }}
                    containerStyle={{
                        ...style.shadow()
                    }}
                    titleStyle={{
                        fontFamily: style.font
                    }}
                    title="Update"
                // onPress={() => this.signup()}
                />

            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ScreenHeader header="Personal Information" size={20} back={{
                    show: true,
                    navigate: () => {
                        this.props.navigation.navigate("account")
                    }
                }} />
                {this.renderPersonalInfoForm()}
            </View>
        );
    }
}

// define your styles
const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: style.backgroundColor()
    },
    textInputStyle: {
        borderRadius: moderateScale(20),
        // borderBottomWidth: 1,
        width: width * 0.6,
        // padding: 20,
        fontSize: width * 0.04,
        fontFamily: style.font,
        // backgroundColor: iOSColors.white,
    },
    formFieldsErrors: {
        fontSize: moderateScale(10),
        color: iOSColors.pink,
        fontFamily: style.font,
        marginBottom: height * 0.02,
    },
    infoItemContainerStyle: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: iOSColors.lightGray,
        alignItems: 'center',
        marginHorizontal: moderateScale(20),
        width: width - 2 * moderateScale(20),
        paddingVertical: moderateScale(20),
        marginBottom: height * 0.02,
    },
    formContainerStyle: {
        width,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: height * 0.05,
        // backgroundColor: iOSColors.white,
        paddingVertical: moderateScale(20),
        // ...style.shadow()
    },
    formTitleTextStyle: {
        fontSize: width * 0.04,
        fontFamily: style.font,
        fontWeight: 'bold',
        width: width * 0.2
    }
};


mapStateToProps = ({ customer_info }) => {
    if (infoAbsent(customer_info)) {
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
export default connect(mapStateToProps, actions)(PersonalInformationScreen);
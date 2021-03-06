import React, { Component } from 'react';
import { View, TextInput, Dimensions, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text';
import * as EmailValidator from 'email-validator';
import LinearGradient from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import { moderateScale, width, verticalScale, height } from '../../../cmn/Scaling';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { style } from '../../../cmn/AppConfig'
import _ from 'lodash'
import LoadingComponent from '../../../components/LoadingComponent';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class SignupScreen extends Component {
    state = {
        name: "",
        phone_number: "",
        email: "",
        password: "",
        confirm_password: "",
        name_error: "",
        phone_number_error: "",
        email_error: "",
        password_error: "",
        confirm_password_error: "",
        phoneNumberFormat: "",
    }

    componentWillUnmount = () => {
        this.props.resetSignupErrors()
    }

    reset_state = () => {
        this.setState({
            name: "",
            phone_number: "",
            email: "",
            password: "",
            confirm_password: "",
            name_error: "",
            phone_number_error: "",
            email_error: "",
            password_error: "",
            confirm_password_error: ""
        })
    }

    signup = () => {
        console.log('signup');
        if (this.any_errors()) {
            return
        }
        let phone = this.state.phone_number.toString()
        // if (phone.startsWith("1")) {
        //     phone = "+" + phone
        // } else {
        //     phone = "+1" + phone
        // }
        this.props.signup({
            name: this.state.name,
            phone_number: phone,
            email: this.state.email,
            password: this.state.password
        }, this.props.navigation.navigate)
    }

    any_errors = () => {
        let name_error = ""
        let phone_number_error = ""
        let email_error = ""
        let password_error = ""
        let confirm_password_error = ""
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

        if (this.state.password == "") {
            password_error = "Please provide your email"
            error = true
        }
        if (this.state.confirm_password == "") {
            confirm_password_error = "Please provide your email"
            error = true
        }
        if (this.state.confirm_password != this.state.password) {
            console.log("passwords are not the same");
            confirm_password_error = "This should be the same as your password"
            error = true
        }
        this.setState({
            name_error,
            phone_number_error,
            email_error,
            password_error,
            confirm_password_error
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

    render() {
        if (this.props.signing_up) {
            return <LoadingComponent />
        }
        return (
            <View style={styles.container}>
                <Icon
                    name="arrow-left"
                    size={SCREEN_WIDTH * 0.1}
                    style={{
                        position: 'absolute',
                        top: verticalScale(50),
                        left: SCREEN_WIDTH * 0.1
                    }}
                    onPress={() => this.props.navigation.goBack()}
                />
                <View
                    style={{
                        width: SCREEN_WIDTH * 0.8,
                        height: SCREEN_WIDTH * 0.8,
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                    }}
                >
                    {this.renderInfoItem("Name", <TextInput
                        style={styles.textInputStyle}
                        placeholder="NAME"
                        onChangeText={(name) => this.setState({ name })}
                        selectionColor={style.color}
                        autoCapitalize="characters"
                    />)}
                    {this.error_component(this.state.name_error)}
                    {this.renderInfoItem("PHONE", <TextInputMask
                        style={styles.textInputStyle}
                        placeholder="PHONE NUMBER"
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
                        selectionColor={style.color}
                    />)}
                    {this.error_component(this.state.phone_number_error)}

                    {this.renderInfoItem("EMAIL", <TextInput
                        style={styles.textInputStyle}
                        placeholder="EMAIL ADDRESS"
                        onChangeText={(email) => this.setState({ email: email.toLowerCase() })}
                        textContentType="emailAddress"
                        autoComplete="email"
                        keyboardType="email-address"
                        autoCorrect={false}
                        selectionColor={style.color}
                        autoCapitalize="none"
                    />)}
                    {this.error_component(this.state.email_error)}
                    {this.renderInfoItem("PASSWORD", <TextInput
                        style={styles.textInputStyle}
                        placeholder="PASSWORD"
                        onChangeText={(password) => this.setState({ password })}
                        secureTextEntry={true}
                        selectionColor={style.color}
                    />)}
                    {this.error_component(this.state.password_error)}
                    {this.renderInfoItem("CONFIRM PASSWORD", <TextInput
                        style={styles.textInputStyle}
                        placeholder="CONFIRM PASSWORD"
                        onChangeText={(confirm_password) => this.setState({ confirm_password })}
                        secureTextEntry={true}
                        selectionColor={style.color}
                    />)}
                    {this.error_component(this.state.confirm_password_error)}

                    <Text
                        style={{
                            color: iOSColors.pink,
                            fontFamily: style.font
                        }}
                    >
                        {this.props.signup_error}
                    </Text>

                    <Button
                        buttonStyle={{
                            marginTop: 20,
                            width: SCREEN_WIDTH * 0.6,
                            borderRadius: 100,
                        }}
                        titleStyle={{
                            fontFamily: style.font
                        }}
                        title="SIGN UP"
                        ViewComponent={LinearGradient}
                        linearGradientProps={{
                            colors: [style.color, style.color],
                            start: { x: 0, y: 0 },
                            end: { x: 1, y: 1 },
                        }}
                        onPress={() => this.signup()}
                    />
                </View>
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
    },
    textInputStyle: {
        borderRadius: moderateScale(20),
        width: width * 0.6,
        ...style.fontStyle({ size: 15 })
    },
    formFieldsErrors: {
        ...systemWeights.light,
        ...material.body1,
        color: iOSColors.pink,
        fontFamily: style.font,
        marginBottom: SCREEN_HEIGHT * 0.02,
    },
    infoItemContainerStyle: {
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: iOSColors.lightGray,
        alignItems: 'center',
        width: width - 2 * moderateScale(20),
        padding: moderateScale(10),
        marginBottom: height * 0.02,
        borderRadius: moderateScale(10)
    },
    formTitleTextStyle: {
        fontSize: width * 0.035,
        fontFamily: style.font,
        fontWeight: 'bold',
        width: width * 0.25
    }
};

mapStateToProps = ({ auth }) => {
    return {
        signup_error: _.isUndefined(auth) ? "" : auth.signup_error,
        signing_up: _.isUndefined(auth) ? "" : auth.signing_up,
    }
}
export default connect(mapStateToProps, actions)(SignupScreen);
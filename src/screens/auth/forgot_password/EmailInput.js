//import liraries
import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import * as EmailValidator from 'email-validator';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { style } from '../../../cmn/AppConfig'
import LinearGradient from 'expo';
import { moderateScale, width, verticalScale, height } from '../../../cmn/Scaling';

// create a component
class EmailInput extends Component {
    state = {
        email: "",
        email_error: "",
    }

    componentWillUnmount = () => {
        this.props.resetForgotPasswordErrors()
    }

    error_component = (message) => {
        if (message !== "") {
            return <Text style={styles.formFieldsErrors}>{message}</Text>
        }
    }
    request_reset = () => {
        if (this.state.email === "") {
            this.setState({ email_error: "Please provide an email" })
            return
        }
        if (!EmailValidator.validate(this.state.email)) {
            this.setState({ email_error: "Please provide a valid email" })
            return
        }
        this.props.forgot_password(this.state.email.toLowerCase(), this.props.navigation.navigate)
    }
    render() {
        let err = null
        if (this.props.forgot_password_error !== "") {
            err = <Text style={styles.errorCodeStyle}> {this.props.forgot_password_error} </Text>
        }
        return (
            <View style={styles.container}>
                <Icon
                    name="arrow-left"
                    size={width * 0.1}
                    style={{
                        left: width * 0.1,
                        marginBottom: height * 0.05
                    }}
                    onPress={() => this.props.navigation.navigate('login')}
                />
                <View style={{
                    marginBottom: verticalScale(40),
                }}>
                    {/* <Text style={styles.headerStyle}>
                        What's the your email?
                    </Text>
                    <Text style={styles.subHeaderStyle}>
                        We'll send you reset code to {this.state.email}
                    </Text> */}

                    <Text style={styles.headerStyle}>
                        Forgot your password?
                    </Text>
                    <Text style={styles.subHeaderStyle}>
                        Enter your email to reset your password.
                    </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="EMAIL ADDRESS"
                        onChangeText={(email) => this.setState({ email: email.toLowerCase() })}
                        textContentType="emailAddress"
                        autoComplete="email"
                        keyboardType="email-address"
                        autoCorrect={false}
                        selectionColor={style.color}
                        autoCapitalize="none"
                    />
                    {this.error_component(this.state.email_error)}
                    <Button
                        buttonStyle={{
                            marginTop: 20,
                            width: width * 0.6,
                            borderRadius: 100,
                        }}
                        titleStyle={{
                            fontFamily: style.font
                        }}
                        title="NEXT"
                        ViewComponent={LinearGradient}
                        linearGradientProps={{
                            colors: [style.color, style.color],
                            start: { x: 0, y: 0 },
                            end: { x: 1, y: 1 },
                        }}
                        onPress={() => this.request_reset()}
                    />
                    {err}
                </View>
            </View>
        );
    }
}

// define your styles
const styles = {
    container: {
        flex: 1,
        // justifyContent: 'space-around',
        // alignItems: 'center',
        paddingTop: verticalScale(50)
    },
    codeContainerStyle: {
        // top: verticalScale(20),
    },
    codeInputStyle: {
        ...systemWeights.semibold,
        fontSize: moderateScale(20),
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 4,
        fontFamily: style.font
    },
    errorCodeStyle: {
        ...systemWeights.light,
        ...material.body1,
        color: iOSColors.pink,
        fontFamily: style.font
    },
    headerStyle: {
        ...material.headline,
        ...systemWeights.bold,
        color: materialColors.blackPrimary,
        width: width * 0.9,
        marginLeft: width * 0.1,
        fontFamily: style.font
    },
    subHeaderStyle: {
        fontSize: style.subheading,
        ...systemWeights.light,
        color: materialColors.blackSecondary,
        width: width * 0.9,
        marginLeft: width * 0.11,
        fontFamily: style.font
    },
    subButtonStyle: {
        ...material.body1,
        ...systemWeights.light,
        color: iOSColors.purple,
        fontFamily: style.font
    },
    textInputStyle: {
        borderBottomWidth: 1,
        width: width * 0.8,
        height: height * 0.05,
        paddingHorizontal: 10,
        ...style.fontStyle({ size: 15 }),
        marginBottom: height * 0.02,
    },
    formFieldsErrors: {
        ...material.body1,
        ...systemWeights.light,
        color: iOSColors.pink,
        fontFamily: style.font,
        marginBottom: height * 0.02,
    },
};

mapStateToProps = ({ auth }) => {
    let forgot_password_error = ""
    if (auth != undefined) {
        forgot_password_error = auth.forgot_password_error
    }
    return {
        forgot_password_error
    }
}
export default connect(mapStateToProps, actions)(EmailInput);
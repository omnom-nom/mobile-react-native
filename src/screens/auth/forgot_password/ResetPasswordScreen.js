//import liraries
import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'expo'
import CodeInput from 'react-native-confirmation-code-input';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { style } from '../../../cmn/AppConfig'
import { moderateScale, width, verticalScale, height } from '../../../cmn/Scaling';


class ResetPasswordScreen extends Component {

    state = {
        password: "",
        confirm_password: "",
        password_error: "",
        confirm_password_error: "",
        code: "",
        code_error: "",
    }

    reset_password = () => {
        console.log('[ResetPasswordScreen] resetting password');
        if (this.any_errors()) {
            return
        }
        this.props.reset_password(
            this.props.navigation.getParam('email', ""),
            this.state.password,
            this.state.code,
            this.props.navigation.navigate
        )
    }

    any_errors = () => {
        let password_error = ""
        let confirm_password_error = ""
        let code_error = ""
        let error = false

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
        if (this.state.code == "") {
            code_error = "Please provide the code"
            error = true
        }
        this.setState({
            password_error,
            confirm_password_error,
            code_error
        })
        return error
    }
    error_component = (message) => {
        if (message !== "") {
            return <Text style={styles.formFieldsErrors}>{message}</Text>
        }
    }
    render() {
        const { navigation } = this.props;
        const email = navigation.getParam('email', "");
        let err = null
        if (this.props.reset_password_error !== "") {
            console.log(this.props.reset_password_error);
            err = <Text style={styles.errorCodeStyle}> {this.props.reset_password_error} </Text>
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
                    onPress={() => this.props.navigation.navigate('forgot_password_email_input')}
                />
                <View style={{
                    marginBottom: verticalScale(20)
                }}>
                    <Text style={styles.headerStyle}>
                        What's the code?
                    </Text>
                    <Text style={styles.subHeaderStyle}>
                        Enter the code sent to {email.toLowerCase()}
                    </Text>
                </View>
                <View style={{
                    height: moderateScale(70),
                    borderWidth: 0,
                }}>
                    <CodeInput
                        codeLength={6}
                        ref="codeInputRef1"
                        activeColor='rgba(251, 183, 0, 1)'
                        inactiveColor='rgba(251, 183, 0, 1.3)'
                        autoFocus={true}
                        ignoreCase={true}
                        inputPosition='center'
                        size={moderateScale(40)}
                        onFulfill={(code) => this.setState({ code })}
                        containerStyle={styles.codeContainerStyle}
                        codeInputStyle={styles.codeInputStyle}
                        keyboardType='numeric'
                    />
                </View>
                {this.error_component(this.state.code_error)}
                <View style={{
                    marginTop: height * 0.05,
                    alignItems: 'center',
                }}>
                    <View style={{
                        marginBottom: verticalScale(40)
                    }}>
                        <Text style={styles.subHeaderStyle}>
                            Please provide a new password
                    </Text>
                    </View>
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="PASSWORD"
                        onChangeText={(password) => this.setState({ password })}
                        secureTextEntry={true}
                        selectionColor={style.color}
                    />
                    {this.error_component(this.state.password_error)}
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="CONFIRM PASSWORD"
                        onChangeText={(confirm_password) => this.setState({ confirm_password })}
                        secureTextEntry={true}
                        selectionColor={style.color}
                    />
                    {this.error_component(this.state.confirm_password_error)}
                    <Button
                        buttonStyle={{
                            width: width * 0.6,
                            borderRadius: 100,
                            marginTop: height * 0.1
                        }}
                        titleStyle={{
                            fontFamily: style.font
                        }}
                        title="RESET"
                        ViewComponent={LinearGradient}
                        linearGradientProps={{
                            colors: [style.color, style.color],
                            start: { x: 0, y: 0 },
                            end: { x: 1, y: 1 },
                        }}
                        onPress={() => this.reset_password()}
                    />
                    {err}
                </View>
            </View>

        );
    }

    log = (message) => {
        console.log("[ResetPasswordScreen] " + message);
    }
}

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
    textInputStyle: {
        borderBottomWidth: 1,
        width: width * 0.8,
        height: height * 0.05,
        padding: 10,
        fontSize: width * 0.04,
        fontFamily: style.font,
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
    let reset_password_error = ""
    if (auth != undefined) {
        reset_password_error = auth.reset_password_error
    }
    return {
        reset_password_error
    }
}
export default connect(mapStateToProps, actions)(ResetPasswordScreen);
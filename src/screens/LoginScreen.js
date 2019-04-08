import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions } from 'react-native';
import { Input, Button, Image } from 'react-native-elements';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import LinearGradient from 'expo';
import { connect } from 'react-redux';
import * as actions from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class LoginScreen extends Component {
    state = {
        email_error: "",
        password_error: "",
        email: "",
        password: ""
    }

    signin = () => {
        if (!this.check()) {
            return
        }
        this.props.signin({
            email: this.state.email,
            password: this.state.password
        }, this.props.navigation.navigate)
    }

    check = () => {
        let email_error = ""
        let password_error = ""
        let failed = false
        if (this.state.email === "") {
            email_error = "Email required"
            failed = true
        }
        if (this.state.password === "") {
            password_error = "Password required"
            failed = true
        }
        this.setState({
            email_error,
            password_error
        })
        if (failed) {
            return false
        }
        return true
    }

    error_component = (message) => {
        if (message !== "") {
            return <Text style={styles.formFieldsErrors}>{message}</Text>
        }
    }

    render() {
        console.log(this.state);

        return (
            <View style={styles.container}>
                <Image style={styles.imagestyle} source={require('../../assets/logo.png')} />
                <View
                    style={{
                        position: 'absolute',
                        top: SCREEN_HEIGHT * 0.4,
                        width: SCREEN_WIDTH * 0.8,
                        height: SCREEN_WIDTH * 0.8,
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                    }}
                >
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="EMAIL"
                        onChangeText={(email) => this.setState({ email })}
                        textContentType="emailAddress"
                        autoComplete="email"
                        keyboardType="email-address"
                    />
                    {this.error_component(this.state.email_error)}

                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="PASSWORD"
                        onChangeText={(password) => this.setState({ password })}
                        secureTextEntry
                    />
                    {this.error_component(this.state.password_error)}

                    <Text
                        style={{
                            color: 'red'
                        }}
                    >
                        {this.props.auth.signin_error}
                    </Text>
                    <Button
                        buttonStyle={{
                            width: SCREEN_WIDTH * 0.6,
                            borderRadius: 100,
                        }}
                        titleStyle={{
                            fontFamily: 'Futura'
                        }}
                        title="SIGN IN"
                        ViewComponent={LinearGradient}
                        linearGradientProps={{
                            colors: ['#fbb700', '#fbb700'],
                            start: { x: 0, y: 0 },
                            end: { x: 1, y: 1 },
                        }}
                        onPress={() => this.signin()}
                    />
                    <View>
                        <Button
                            title='Create new account'
                            type="clear"
                            titleStyle={{
                                color: iOSColors.blue,
                                fontFamily: 'Futura'
                            }}
                            onPress={() => this.props.navigation.navigate('signup_customer_type')}
                        />
                        <Button
                            title='Forgot password'
                            type="clear"
                            titleStyle={{
                                color: iOSColors.blue,
                                fontFamily: 'Futura'
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    textInputStyle: {
        borderBottomWidth: 1,
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_HEIGHT * 0.05,
        padding: 5,
        fontSize: SCREEN_WIDTH * 0.04,
        marginBottom: SCREEN_HEIGHT * 0.02,
        fontFamily: 'Futura'
    },
    imagestyle: {
        top: SCREEN_HEIGHT * 0.1,
        width: SCREEN_WIDTH * 0.5,
        height: SCREEN_HEIGHT * 0.1
    },
    formFieldsErrors: {
        ...systemWeights.light,
        ...material.body1,
        color: iOSColors.pink,
        fontFamily: 'Futura',
        marginBottom: SCREEN_HEIGHT * 0.02,
    }
};

mapStateToProps = ({ auth }) => {
    auth_data = {
        signin_error: "",
    }
    if (auth != undefined) {
        auth_data = auth
    }
    return {
        auth: auth_data
    }
}
export default connect(mapStateToProps, actions)(LoginScreen);

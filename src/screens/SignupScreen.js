import React, { Component } from 'react';
import { View, TextInput, Dimensions, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import LinearGradient from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import * as actions from '../actions';

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
        confirm_password_error: ""
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
            console.log("empty fields");
            return
        }
        this.props.signup({
            name: this.state.name,
            phone_number: this.state.phone_number,
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
        if (this.state.password == "") {
            password_error = "Please provide your email"
            error = true
        }
        if (this.state.confirm_password == "") {
            confirm_password_error = "Please provide your email"
            error = true
        }
        if (this.state.confirm_password != this.state.password) {
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

    render() {
        return (
            <View style={styles.container}>
                <Icon
                    name="arrow-left"
                    size={SCREEN_WIDTH * 0.1}
                    style={{
                        position: 'absolute',
                        top: SCREEN_HEIGHT * 0.1,
                        left: SCREEN_WIDTH * 0.1
                    }}
                    onPress={() => this.props.navigation.navigate('login')}
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
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="NAME"
                        onChangeText={(name) => this.setState({ name })}
                        errorMessage={this.state.name_error}
                    />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="PHONE NUMBER"
                        onChangeText={(phone_number) => this.setState({ phone_number })}
                        errorMessage={this.state.phone_number_error}
                        textContentType="telephoneNumber"
                        autoComplete="tel"
                        keyboardType="phone-pad"
                    />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="EMAIL"
                        onChangeText={(email) => this.setState({ email })}
                        errorMessage={this.state.email_error}
                        textContentType="emailAddress"
                        autoComplete="email"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="PASSWORD"
                        onChangeText={(password) => this.setState({ password })}
                        errorMessage={this.state.password_error}
                        secureTextEntry={true}
                        secureTextEntry
                    />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="CONFIRM PASSWORD"
                        onChangeText={(confirm_password) => this.setState({ confirm_password })}
                        errorMessage={this.state.confirm_password_error}
                        secureTextEntry={true}
                        secureTextEntry
                    />
                    <Button
                        buttonStyle={{
                            width: SCREEN_WIDTH * 0.6,
                            borderRadius: 100,
                        }}
                        title="SIGN IN"
                        ViewComponent={LinearGradient}
                        linearGradientProps={{
                            colors: ['red', 'pink'],
                            start: { x: 0, y: 0 },
                            end: { x: 1, y: 1 },
                        }}
                        onPress={() => this.signup()}
                    />
                    <Text
                        style={{
                            color: 'red'
                        }}
                    >
                        {this.props.auth.signup_error}
                    </Text>
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
        borderBottomWidth: 1,
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_HEIGHT * 0.05,
        padding: 10,
        fontSize: SCREEN_WIDTH * 0.04,
        marginBottom: SCREEN_HEIGHT * 0.02,
    }
};

mapStateToProps = ({ auth }) => {
    auth_data = {
        signup_error: "",
    }
    if (auth != undefined) {
        auth_data = auth
    }
    return {
        auth: auth_data
    }
}
export default connect(mapStateToProps, actions)(SignupScreen);
import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions } from 'react-native';
import { Input, Button } from 'react-native-elements';
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
        let email_error = ""
        let password_error = ""
        let failed = false
        if (this.state.email == "") {
            email_error = "Email required"
            failed = true
        }
        if (this.state.password == "") {
            password_error = "Password required"
            failed = true
        }
        console.log(email_error);
        console.log(password_error);

        this.setState({
            email_error,
            password_error
        })

        console.log(this.state);
        if (failed) {
            console.log("Failed");
            return
        }
        console.log(this.state);
        this.props.signin({
            email: this.state.email,
            password: this.state.password
        }, this.props.navigation.navigate)
    }
    render() {
        return (
            <View style={styles.container}>
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
                        placeholder="EMAIL"
                        onChangeText={(email) => this.setState({ email })}
                        textContentType="emailAddress"
                        autoComplete="email"
                        keyboardType="email-address"
                        errorMessage={this.state.email_error}
                    />
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder="PASSWORD"
                        onChangeText={(password) => this.setState({ password })}
                        secureTextEntry
                        errorMessage={this.state.password_error}
                    />
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
                        title="SIGN IN"
                        ViewComponent={LinearGradient}
                        linearGradientProps={{
                            colors: ['red', 'pink'],
                            start: { x: 0, y: 0 },
                            end: { x: 1, y: 1 },
                        }}
                        onPress={() => this.signin()}
                    />
                    <Button
                        title='create an account'
                        type="clear"
                        titleStyle={{
                            color: 'red',
                        }}
                        onPress={() => this.props.navigation.navigate('signup')}
                    />
                </View>
            </View>
        );
    }
}

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
        padding: 5,
        fontSize: SCREEN_WIDTH * 0.04,
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

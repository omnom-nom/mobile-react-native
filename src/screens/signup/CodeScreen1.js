import React, { Component } from 'react';
import { View, TextInput, Dimensions, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import LinearGradient from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { style } from '../../components/AppConfig'
import * as actions from '../../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
class CodeScreen extends Component {
    state = {
        code: "",
        code_error: ""
    }

    submit_code = () => {
        if (this.code == "") {
            this.setState({ code_error: "Please check your messages for code" })
            return
        }
        this.props.submit_code({
            email: this.props.email,
            confirmationCode: this.state.code
        }, this.props.navigation.navigate)
    }

    componentWillReceiveProps = (nextProps) => {
        console.log("CodeScreen");
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
                    <Input
                        placeholder="CODE"
                        onChangeText={(code) => this.setState({ code })}
                        errorMessage={this.state.name_error}
                    />
                    <Button
                        buttonStyle={{
                            width: SCREEN_WIDTH * 0.6,
                            borderRadius: 100,
                        }}
                        title="SUBMIT CODE"
                        ViewComponent={LinearGradient}
                        linearGradientProps={{
                            colors: ['red', 'pink'],
                            start: { x: 0, y: 0 },
                            end: { x: 1, y: 1 },
                        }}
                        onPress={() => this.submit_code()}
                    />
                    <Text
                        style={{
                            color: 'red'
                        }}
                    >
                        {this.props.code_error}
                    </Text>
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
};

mapStateToProps = ({ auth }) => {
    let email = ""
    let code_error = ""
    if (auth != undefined) {
        email = auth.email
        code_error = auth.code_error
    }
    return {
        email,
        code_error
    }
}
export default connect(mapStateToProps, actions)(CodeScreen);
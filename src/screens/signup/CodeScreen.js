//import liraries
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import CodeInput from 'react-native-confirmation-code-input';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { moderateScale, width, verticalScale, height } from '../../components/scaling';


class CodeScreen extends Component {
    submit_code = (code) => {
        this.props.submit_code({
            email: this.props.email,
            confirmationCode: code
        }, this.props.navigation.navigate)
    }

    render() {
        let err = null

        if (this.props.code_error == true) {
            console.log(this.props.code_error);
            err = <Text style={styles.errorCodeStyle}> Please provide correct code </Text>
        }
        return (
            <View style={styles.container}>
                <View style={{
                    marginBottom: verticalScale(40)
                }}>
                    <Text style={styles.headerStyle}>
                        What's the code?
                    </Text>
                    <Text style={styles.subHeaderStyle}>
                        Enter the code sent to {this.props.email}
                    </Text>
                </View>
                <View style={{
                    height: moderateScale(100),
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
                        onFulfill={(code) => this.submit_code(code)}
                        containerStyle={styles.codeContainerStyle}
                        codeInputStyle={styles.codeInputStyle}
                        keyboardType='numeric'
                    />
                </View>
                {err}
            </View>

        );
    }

    log = (message) => {
        console.log("[CodeScreen] " + message);
    }
}

const styles = {
    container: {
        flex: 1,
        // justifyContent: 'space-around',
        alignItems: 'center',
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
        fontFamily: 'Futura'
    },
    errorCodeStyle: {
        ...systemWeights.light,
        ...material.body1,
        color: iOSColors.pink,
        fontFamily: 'Futura'
    },
    headerStyle: {
        ...material.headline,
        ...systemWeights.bold,
        color: materialColors.blackPrimary,
        width: width * 0.9,
        marginLeft: width * 0.1,
        fontFamily: 'Futura'
    },
    subHeaderStyle: {
        ...systemWeights.semibold,
        ...material.subheading,
        color: materialColors.blackSecondary,
        width: width * 0.9,
        marginLeft: width * 0.11,
        fontFamily: 'Futura'
    }
};

mapStateToProps = ({ auth }) => {
    console.log(auth);

    let email = ""
    let code_error = false
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
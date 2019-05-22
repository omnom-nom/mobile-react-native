//import liraries
import React, { Component } from 'react';
import { Overlay } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import { moderateScale, width, verticalScale, height } from '../cmn/Scaling';
import { style } from '../cmn/AppConfig'

// create a component
class LoadingOverlay extends Component {
    render() {
        return (
            <Overlay
                isVisible={this.props.visible}
                windowBackgroundColor="rgba(255, 255, 255, .8)"
                width="auto"
                height="auto"
                containerStyle={{
                    ...style.shadow({ opacity: 0.9 }),
                }}
            >
                <LottieView
                    source={require('../../assets/loading/circle_loading_basic.json')}
                    autoPlay
                    loop
                    style={{
                        width: moderateScale(200),
                        height: moderateScale(200),
                    }}
                />
            </Overlay>
        );
    }
}


//make this component available to the app
export default LoadingOverlay;

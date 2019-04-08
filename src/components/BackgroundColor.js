//import liraries
import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class BackgroundColor extends Component {
    static defaultProps = {
        topColor: '#1d0770',
        bottomColor: '#efeaff'
    }
    render() {
        const {topColor, bottomColor} = this.props
        return (
            <LinearGradient
                start={[0, 0]}
                end={[1.5, 1.5]}
                // colors={['#43134c', '#33318e']}
                // colors={['#c1136c', '#e8e2ff']}
                colors={[topColor, bottomColor]}
                style={{
                    position: 'absolute',
                    width: SCREEN_WIDTH,
                    height: SCREEN_HEIGHT,
                }}
            />
        );
    }
}
export default BackgroundColor;

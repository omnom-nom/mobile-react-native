//import liraries
import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import { material, systemWeights, materialColors, iOSColors } from 'react-native-typography'
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import TabBarIcon from '../../components/TabBarIcon';
import { style } from '../../cmn/AppConfig'
import { moderateScale, width, verticalScale, height } from '../../cmn/Scaling';
import { MapView, Location, Permissions, Constants } from 'expo'
import LocationInput from './LocationInput';


const map_height = height * 0.8
const extra_map_height = moderateScale(30)

class LocationScreen extends Component {
    state = {
        locationResult: null,
        location: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0, longitudeDelta: 0 },
        init: false,
    };

    constructor(props) {
        super(props)
        this.dragging = new Animated.Value(0)
        this.dragging.addListener(({ value }) => this._value = value);
    }

    componentDidMount = async () => {
        await this.getLocationAsync();
        await this.props.createSessionTokenForGooglePlaceApi()
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.customer_delivery_address_coordinates !== undefined) {
            this.setState({ location: nextProps.customer_delivery_address_coordinates })
        }
    }

    handleMapRegionChange = location => {
        Animated.spring(
            this.dragging, {
                toValue: 1,
            }).start()
    };

    handleMapRegionChangeComplete = region => {
        const val = this.dragging._value
        if (val > 0) {
            this.props.customerCurrentLocationCoordinate(region)
        }
        Animated.spring(
            this.dragging, {
                toValue: 0,
            }).start(() => {
            })
    };

    getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                locationResult: 'Permission to access location was denied',
                location,
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        const loc = { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
        await this.props.customerCurrentLocationCoordinate(loc)
        this.setState({ location: loc});
    };

    map_view = () => {
        return (
            <MapView.Animated
                ref={component => this.map = component}
                provider={MapView.PROVIDER_GOOGLE}
                style={styles.mapContainerStyle}
                region={{
                    latitude: this.state.location.latitude,
                    longitude: this.state.location.longitude,
                    latitudeDelta: this.state.location.latitudeDelta,
                    longitudeDelta: this.state.location.longitudeDelta
                }}
                showsUserLocation
                onRegionChange={this.handleMapRegionChange}
                onRegionChangeComplete={this.handleMapRegionChangeComplete}
            >
            </MapView.Animated>
        )
    }

    input_view = () => {
        return (
            <View style={styles.inputContainerStyle}>

            </View>
        )
    }

    map_pin = () => {
        const pin_top = this.dragging.interpolate({
            inputRange: [0, 1],
            outputRange: [-moderateScale(12), -moderateScale(20)]
        });
        const shadow_size = this.dragging.interpolate({
            inputRange: [0, 1],
            outputRange: [moderateScale(8), moderateScale(5)]
        });
        return (
            <Animated.View style={{
                position: 'absolute',
                left: width * 0.5 - moderateScale(1),
                top: map_height * 0.5 - moderateScale(2),
                borderWidth: 1,
                alignItems: 'center',
            }}>
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: moderateScale(20),
                        backgroundColor: iOSColors.black,
                        borderRadius: 100,
                        width: shadow_size,
                        height: shadow_size
                    }}
                />
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: pin_top
                    }}
                >
                    <Icon
                        name='map-pin'
                        type='font-awesome'
                        onPress={this.props.onPress}
                        size={moderateScale(30)}
                        color={iOSColors.pink}
                    />
                </Animated.View>
            </Animated.View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.map_view()}
                <Icon
                    containerStyle={{
                        position: 'absolute',
                        top: map_height - moderateScale(45),
                        right: moderateScale(20)
                    }}
                    name='gps-fixed'
                    onPress={this.set_map_to_current_location}
                    size={moderateScale(30)}
                    color={iOSColors.blue}
                />
                {this.map_pin()}
                <LocationInput style={styles.inputContainerStyle} navigate={this.props.navigation.navigate}/>
            </View>
        );
    }

    set_map_to_current_location = async () => {
        let location = await Location.getCurrentPositionAsync({});
        const loc = { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
        this.props.customerCurrentLocationCoordinate(loc)
        this.setState({ location: loc });
    }
}

// define your styles
const styles = {
    container: {
        width: width,
        height: height,
    },
    headerStyle: {
        ...material.headline,
        ...systemWeights.bold,
        color: materialColors.blackPrimary,
        width: width * 0.9,
        marginLeft: width * 0.1,
        fontFamily: style.font
    },
    mapContainerStyle: {
        position: 'absolute',
        width: width,
        height: map_height + extra_map_height,
        top: 0,
    },
    inputContainerStyle: {
        position: 'absolute',
        width: width,
        height: height - map_height,
        borderTopLeftRadius: moderateScale(30),
        borderTopRightRadius: moderateScale(30),
        borderWidth: 0,
        borderColor: 'white',
        backgroundColor: 'white',
        bottom: 0
    }
};

export default connect(null, actions)(LocationScreen);
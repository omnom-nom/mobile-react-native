import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import LoadingComponent from '../components/LoadingComponent';


class LoadScreen extends Component {
    componentDidMount = () => {
        this.props.check_session(this.props.navigation.navigate)
    }

    render() {
        return (
            <LoadingComponent />
        );
    }
}

export default connect(null, actions)(LoadScreen);

//This is a very elegant way to change the state to Logout of the application and for
//redirecting the user to the main page whenever he is logs out of the app

import React from 'react';
import { Redirect } from 'react-router-dom';

import * as actionCreators from '../../../store/actions/actionCreators';
import { connect } from 'react-redux';

class Logout extends React.Component {
    componentDidMount () { 
        this.props.onLogout();
    };

    render () {
        return (<Redirect to='/' />);
    }
}

const mapDispatchToProps = dispach => { 
    return { 
        onLogout: () => dispach(actionCreators.logOut())
    }
}

export default connect( null , mapDispatchToProps )(Logout);
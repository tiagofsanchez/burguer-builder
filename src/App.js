import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurguerBuilder/BurguerBuilder';
import CheckOut from './containers/CheckOut/CheckOut';
import Orders from './components/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

import * as actionCreators from './store/actions/actionCreators';
import { connect } from 'react-redux'


class App extends Component {
  
  componentDidMount () {
    this.props.onCheckAuth()
  }
  
  render() {
   
    return (
      <div >
        <Layout>
          <Route path='/checkout' component={CheckOut} />
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/orders' exact component={Orders} />
          <Route path='/auth' exact component={Auth} />
          <Route path='/logout' exact component={Logout} />
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProsp = dispatch => { 
  return { 
    onCheckAuth: () => dispatch (actionCreators.authCheckState())
  }
}

export default connect(null , mapDispatchToProsp )(App);

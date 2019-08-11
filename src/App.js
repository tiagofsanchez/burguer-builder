import React, { Component } from 'react';
import { Route , Switch , withRouter , Redirect } from 'react-router-dom';

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
   
    const { isAuth } = this.props;

    let routes = (
    
        <Switch>
        <Route path='/' exact component={BurgerBuilder} />
        <Route path='/auth' exact component={Auth} />
        <Redirect to='/'/>
        </Switch>
     
    )

    if (isAuth) {
      routes = (
        <Switch>
          <Route path='/checkout' component={CheckOut} />
          <Route path='/orders' exact component={Orders} />
          <Route path='/logout' exact component={Logout} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/'/>
        </Switch>

      )
    }

    return (
      <div >
        <Layout>
        {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => { 
  return { 
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProsp = dispatch => { 
  return { 
    onCheckAuth: () => dispatch (actionCreators.authCheckState())
  }
}

export default withRouter (connect(mapStateToProps , mapDispatchToProsp )(App));

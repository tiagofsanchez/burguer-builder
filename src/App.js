import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurguerBuilder/BurguerBuilder';
import CheckOut from './containers/CheckOut/CheckOut';
import Orders from './components/Orders/Orders';
import Auth from './containers/Auth/Auth';


class App extends Component {
  
  render() {
   
    return (
      <div >
        <Layout>
          <Route path='/checkout' component={CheckOut} />
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/orders' exact component={Orders} />
          <Route path='/auth' exact component={Auth} />
        </Layout>
      </div>
    );
  }
}

export default App;

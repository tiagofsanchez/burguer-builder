import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurguerBuilder/BurguerBuilder';
import CheckOut from './containers/CheckOut/CheckOut';


class App extends Component {
  
  render() {
   
    return (
      <div >
        <Layout>
          <Route path='/checkout' exact component={CheckOut} />
          <Route path='/' exact component={BurgerBuilder} />
        </Layout>
      </div>
    );
  }
}

export default App;

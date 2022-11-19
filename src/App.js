import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

// lazy loading orders' page (i.e checkout component)
const asyncOrders = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/' exact component={BurgerBuilder} />
            <Route path='/orders' component={asyncOrders} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;

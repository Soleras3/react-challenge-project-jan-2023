import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Main, Login, OrderForm, ViewOrders} from '../components';
import GuardedRoute from './guardedRoute';

const AppRouter = (props) => {
  const auth = useSelector((state) => state.auth);
  const hasAuth = auth.token ? true : false;

  return (
    <Router>
      <Route path="/" exact component={Main} />
      <Route path="/login" exact component={Login} />
      <GuardedRoute path="/order" exact component={OrderForm} hasAuth={hasAuth} />
      <GuardedRoute path="/view-orders" exact component={ViewOrders} hasAuth={hasAuth} />
    </Router>
  );
}

export default AppRouter;

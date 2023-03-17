import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const GuardedRoute = ({ component: Component, hasAuth, ...rest }) => (
	<Route {...rest} render={(props) => (
		hasAuth === true
			? <Component {...props} />
			: <Redirect to='/login' />
	)} />
)

export default GuardedRoute;

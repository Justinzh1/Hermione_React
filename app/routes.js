import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Main from './components/Main';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import Login from './components/Account/Login';
import Signup from './components/Account/Signup';
import Profile from './components/Account/Profile';
import Forgot from './components/Account/Forgot';
import Reset from './components/Account/Reset';

import Dashboard from './components/Dashboard/Dashboard';
import NewDashboard from './components/Dash/Dashboard';

export default function getRoutes(store) {
  const ensureAuthenticated = (nextState, replace) => {
    if (!store.getState().auth.token) {
      replace('/login');
    }
  };
  const skipIfAuthenticated = (nextState, replace) => {
    if (store.getState().auth.token) {
      replace('/');
    }
  };
  const clearMessages = () => {
    store.dispatch({
      type: 'CLEAR_MESSAGES'
    });
  };
  const isHome = () => {
    store.dispatch({
      type: 'HOME_TRUE'
    })
  }
  return (
    <Route path="/" component={App} home={true}>
      <IndexRoute component={Main} onLeave={clearMessages} home={true}/>
      <Route path="/contact" component={Contact} onLeave={clearMessages} home={false}/>
      <Route path="/login" component={Login} onEnter={skipIfAuthenticated} onLeave={clearMessages} home={false}/>
      <Route path="/signup" component={Signup} onEnter={skipIfAuthenticated} onLeave={clearMessages} home={false}/>
      <Route path="/account" component={Profile} onEnter={ensureAuthenticated} onLeave={clearMessages} home={false}/>
      <Route path="/forgot" component={Forgot} onEnter={skipIfAuthenticated} onLeave={clearMessages} home={false}/>
      <Route path='/reset/:token' component={Reset} onEnter={skipIfAuthenticated} onLeave={clearMessages} home={false}/>
      <Route path="/dashboard" onEnter={ensureAuthenticated} component={NewDashboard} onLeave={clearMessages} home={false}/>
      <Route path="*" component={NotFound} onLeave={clearMessages} home={false}/>
    </Route>
  );
}

import React, { Component } from 'react';
import { Navigate } from 'react-router-dom'
import LoginForm from './login-form/loginForm';
import './login.css';

class Login extends Component {
  state = { isLoggedIn: false };

  handleLogin(isLoggedIn) {
    this.setState({ isLoggedIn: isLoggedIn });
  }

  render() {
    return (
      <div className="main-body">
        {this.state.isLoggedIn && (<Navigate to="/view-orders" replace={true} />)}
        <h1 className="text-center">Login Screen</h1>
        <div className="d-flex justify-content-center mt-5">
          <LoginForm onLogin={(isLoggedIn) => this.handleLogin(isLoggedIn)}/>
        </div>
      </div>
    )
  }
}

export default Login;
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { login } from '../../actions/auth';
import { facebookLogin, twitterLogin, googleLogin, vkLogin, githubLogin } from '../../actions/oauth';
import {Button} from 'react-bootstrap/lib';
import Messages from '../Messages';
import Clearbar from '../Clearbar';

import {
  TextField,
} from 'material-ui';

const LoginContainer = {
  paddingTop: '120px'
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleLogin(event) {
    event.preventDefault();
    this.props.dispatch(login(this.state.email, this.state.password));
  }

  handleFacebook() {
    this.props.dispatch(facebookLogin())
  }

  handleTwitter() {
    this.props.dispatch(twitterLogin())
  }

  handleGoogle() {
    this.props.dispatch(googleLogin())
  }

  handleVk() {
    this.props.dispatch(vkLogin())
  }

  handleGithub() {
    this.props.dispatch(githubLogin())
  }

  updateForm(key, event, value) {
    var entry = {}
    entry[key] = value;
    this.setState(entry);
  }


  render() {
    return (
      <div className="container" style={LoginContainer}>
        <Messages messages={this.props.messages}/>
        <form onSubmit={this.handleLogin.bind(this)}>
          <h4>Log In</h4>
          <div>
            <TextField
              hintText="email"
              floatingLabelText="email"
              onChange={(e,v) => this.updateForm("email", e, v)}
            />
          </div>
          <div>
            <TextField
              hintText="password"
              floatingLabelText="password"
              type="password"
              onChange={(e,v) => this.updateForm("password", e, v)}
            />
            </div>
          <p><Link to="/forgot">Forgot your password?</Link></p>
          <Button type="submit">Log in</Button>
        </form>
        <hr/>
        <Button onClick={this.handleGoogle.bind(this)}>Sign in with Google</Button>
        <br/>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Login);

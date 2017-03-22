import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { signup } from '../../actions/auth';
import { facebookLogin, twitterLogin, googleLogin, vkLogin, githubLogin } from '../../actions/oauth';
import {Button} from 'react-bootstrap/lib';
import Messages from '../Messages';
import {
  TextField,
} from 'material-ui';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', password: '' };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSignup(event) {
    event.preventDefault();
    this.props.dispatch(signup(this.state.name, this.state.email, this.state.password));
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
      <div className="container">
        <Messages messages={this.props.messages}/>
        <form onSubmit={this.handleSignup.bind(this)}>
          <h4>Create an account</h4>
          <div> 
            <TextField
              hintText="name"
              floatingLabelText="name"
              onChange={(e,v) => this.updateForm("name", e, v)}
            />
          </div>
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
          <p className="help-text">By signing up, you agree to the <Link to="/">Terms of Service</Link>.</p>
          <Button type="submit">Create an account</Button>
        </form>
        <hr/>
        <Button onClick={this.handleGoogle.bind(this)}>Sign in with Google</Button>
        <br/>
        <p>Already have an account? <Link to="/login">Log in</Link></p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Signup);

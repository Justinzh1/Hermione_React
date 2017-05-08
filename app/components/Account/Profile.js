import React from 'react';
import { connect } from 'react-redux'
import { updateProfile, changePassword, deleteAccount } from '../../actions/auth';
import { link, unlink } from '../../actions/oauth';
import {Button, Input} from 'react-bootstrap/lib';
import Messages from '../Messages';

const ProfileRow = {
  border: "1px solid #EEEEEE",
  marginTop: '32px',
  padding: '32px'
}

const ProfileContainer = {
  paddingBottom: '32px'
}

const ProfileInput = {
  border: '1px solid #EEEEEE',
  paddingLeft: '10px',
  paddingRight: '10px',
  width: 'auto',
  minWidth: '400px',
  maxWidth: '600px'
}

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.user.email,
      name: props.user.name,
      gender: props.user.gender,
      location: props.user.location,
      website: props.user.website,
      gravatar: props.user.gravatar,
      password: '',
      confirm: ''
    };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleProfileUpdate(event) {
    event.preventDefault();
    this.props.dispatch(updateProfile(this.state, this.props.token));
  }

  handleChangePassword(event) {
    event.preventDefault();
    this.props.dispatch(changePassword(this.state.password, this.state.confirm, this.props.token));
  }

  handleDeleteAccount(event) {
    event.preventDefault();
    this.props.dispatch(deleteAccount(this.props.token));
  }

  handleLink(provider) {
    this.props.dispatch(link(provider))
  }

  handleUnlink(provider) {
    this.props.dispatch(unlink(provider));
  }

  render() {
    const googleLinkedAccount = this.props.user.google ? (
      <a href="#" role="button" className="text-alert" onClick={this.handleUnlink.bind(this, 'google')}>Unlink your Google account</a>
    ) : (
      <a href="#" role="button" onClick={this.handleLink.bind(this, 'google')}>Link your Google account</a>
    );
    return (
      <div className="container" style={ProfileContainer}>
        <Messages messages={this.props.messages}/>
        <div style={ProfileRow}>
          <h4>Profile Information</h4>
          <form className="form-group" onSubmit={this.handleProfileUpdate.bind(this)}>
            <div>
              <label htmlFor="inputEmail">Email</label>
              <input style={ProfileInput} className="form-control" type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange.bind(this)}/>
            </div>

            <div>
              <label htmlFor="Name">Name</label>
              <input style={ProfileInput} className="form-control" type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange.bind(this)}/>
            </div>

            <Button type="submit">Update Profile</Button>
          </form>
        </div>

        <div style={ProfileRow}>
          <h4>Change Password</h4>
          <form className="form-group" onSubmit={this.handleChangePassword.bind(this)}>
            <div>
              <label htmlFor="password">New Password</label>
              <input style={ProfileInput} className="form-control" type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange.bind(this)}/>
            </div>
            <div>
              <label htmlFor="confirm">Confirm Password</label>
              <input style={ProfileInput} className="form-control" type="password" name="confirm" id="confirm" value={this.state.confirm} onChange={this.handleChange.bind(this)}/>
            </div>
            <Button type="submit">Change Password</Button>
          </form>
        </div>

        <div style={ProfileRow}>
          <h4>Linked Accounts</h4>
          <p>{googleLinkedAccount}</p>
        </div>

        <div style={ProfileRow}>
          <h4>Delete Account</h4>
          <form onSubmit={this.handleDeleteAccount.bind(this)}>
            <p>You can delete your account, but keep in mind this action is irreversible.</p>
            <Button type="submit">Delete my account</Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Profile);

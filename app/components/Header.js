import React from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux'
import { logout } from '../actions/auth';

class Header extends React.Component {
  handleLogout(event) {
    event.preventDefault();
    this.props.dispatch(logout());
  }

  render() {
    const rightNav = this.props.token ? (
      <ul className="list-inline float-right center">
          <li>
            <img className="avatar" src={this.props.user.picture || this.props.user.gravatar}/>
            {' '}{this.props.user.name || this.props.user.email || this.props.user.id}{' '}
          </li>
          <li><Link to="/account">My Account</Link></li>
          <li><a href="#" onClick={this.handleLogout.bind(this)}>Logout</a></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
      </ul>
    ) : (
      <ul className="list-inline nav-right">
          <li><Link to="/login">Log in</Link></li>
          <li><Link to="/signup">Sign up</Link></li>
      </ul>
    );
    return (
      <div className="container navbar">
        <ul className="list-inline">
          <li className="logo"><IndexLink to="/">Hermione</IndexLink></li>
        </ul>
        {rightNav}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(Header);

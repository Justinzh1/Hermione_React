import React from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux'
import { logout } from '../actions/auth';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationHome from 'material-ui/svg-icons/action/home';

class Login extends React.Component {
	render() {
		<FlatButton {...this.props} label="Login" />
	};
}

var Logged = (props) => (
	<IconMenu
	    {...props}
	    iconButtonElement={
	      <IconButton><MoreVertIcon /></IconButton>
	    }
	    targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
	    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
	  >
  	</IconMenu>
);

class LoggedIn extends React.Component {
	constructor(props) {
		super(props);
	}

	handleLogout(event) {
	    event.preventDefault();
	    this.props.dispatch(logout());
	}

	render() {
  var color = (this.props.home) ? "white" : "#646464" ;
		return (
			<IconMenu
		    	iconButtonElement={
					<IconButton>
			      		<MoreVertIcon color={color}/>
		      		</IconButton>
			    }
			    targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
			    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
		  	>
		  		<Link to="/account">
					<MenuItem primaryText="Profile" />
				</Link>
				<Link to="/dashboard">
					<MenuItem primaryText="Dashboard" />
				</Link>
				<Link to="#">
					<MenuItem
						primaryText="Sign Out"
						onClick={this.handleLogout.bind(this)}
					/>
				</Link>
			</IconMenu>
		)
	}
}

Logged.muiName = 'IconMenu';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
class Navbar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			logged: false,
			clicked: false
		}
	}

	clickMenu() {
		var flip = !this.state.clicked;
		console.log("Clicked Menu! this.state.clicked = " + this.state.clicked);
		this.setState({clicked : flip});
	}

	closeMenu() {
		this.setState({clicked: false});
	}

	render() {
    var appbarColor = global.window.location.href == (global.window.location.origin + '/');
    var style = (appbarColor) ? {color : "white" } : {color : "#646464"};
		var logged = <LoggedIn home={this.props.home}/>
		var signin = (<FlatButton label="Login" href="/login" style={style}/>)
		var rightComponent = (this.props.token) ? logged : signin;
    var Navbar = (appbarColor) ?
      (<AppBar
        className="appbar"
        title={<a style={style} href="/"> HERMIONE </a>}
        style={{backgroundColor: "rgba(0,0,0,0)", boxShadow: 'none', zIndex: 1, position: 'absolute', padding: '10px 35px'}}
        iconElementRight={rightComponent}
        iconElementLeft={<div></div>}
        titleStyle={{fontFamily: "open sans", fontWeight: "600", fontSize: "32px", color: "white"}}
      />) :
      (<AppBar
        className="appbar"
        title={<a style={style} href="/"> HERMIONE </a>}
        style={{backgroundColor: "#EEEEEE", boxShadow: 'none', zIndex: 1, padding: '10px 35px'}}
        iconElementRight={rightComponent}
        iconElementLeft={<div></div>}
        titleStyle={{fontFamily: "open sans", fontWeight: "600", fontSize: "22px", color: "#646464"}}
      />)
		return (
			<div>
				{Navbar}
	  	</div>
		)
	}
}


const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(Navbar);

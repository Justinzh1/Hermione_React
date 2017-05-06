import React from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux'
import { logout } from '../actions/auth';
import actions from '../actions/index';

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

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.auth.logout())
  }
}

const black = {
  color: 'rgba(0, 0, 0, 0.87)'
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
	    this.props.logout();
	}

	render() {
  var color = (this.props.home) ? "white" : "white" ;
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
				<MenuItem
					primaryText={<a href="" style={black}> Sign Out </a>}
					onClick={this.handleLogout.bind(this)}
				/>
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
    var appbarColor = (global.window) ? global.window.location.href == (global.window.location.origin + '/') : false;
    var style = (appbarColor) ? {color : "white" } : {color : "white"};
		var logged = <LoggedIn reload={() => this.render()} logout={() => this.props.logout()} home={this.props.home}/>
		var signin = (<FlatButton label="Login" href="/login" style={style}/>)
		var rightComponent = (this.props.token) ? logged : signin;
    var Navbar = (appbarColor) ?
      (<AppBar
        className="appbar"
        title={<a style={style} className="navlink" href="/"> HERMIONE </a>}
        style={{backgroundColor: "rgba(0,0,0,0)", boxShadow: 'none', zIndex: 1, position: 'absolute', padding: '10px 35px'}}
        iconElementRight={rightComponent}
        iconElementLeft={<div></div>}
        titleStyle={{fontFamily: "open sans", fontWeight: "600", fontSize: "32px", color: "white"}}
      />) :
      (<AppBar
        className="appbar"
        title={<a style={style} className="navlink" href="/"> HERMIONE </a>}
        style={{backgroundColor: "#003262", boxShadow: 'none', zIndex: 1, padding: '10px 35px'}}
        iconElementRight={rightComponent}
        iconElementLeft={<div></div>}
        titleStyle={{fontFamily: "open sans", fontWeight: "600", fontSize: "22px", color: "white"}}
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

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

class LoggedInItems extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false
		}
	}

	getStyle() {
		return (this.props.visible) ? {
		  display: 'inline-block',
		  position: 'absolute',
		  right: "50px",
		  zIndex: 50,
		  opacity: 1,
		  marginTop:'16px',
		  width: '110px'
		} :
		{
		  display: 'none',
		  position: 'absolute',
		  right: "50px",
		  zIndex: 50,
		  opacity: 0.3,
		  marginTop:'16px',
		  width: '110px'
		} 
	}

	handleLogout(event) {
	    event.preventDefault();
	    this.props.dispatch(logout());
	  }

	render() {
		const style = this.getStyle();
		return (
			<div>
				<Paper style={style}>
					<Menu>
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
					</Menu>
   				 </Paper>
			</div>
		);
	}
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

class LoginItems extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clicked: false
		}
	}

	getDropdown() {
		this.setState = {clicked: !this.props.clicked};
		console.log("Dropping down");
		this.props.clickMenu();
	}

	render() {
		return (
			<IconMenu
		    	iconButtonElement={
					<IconButton>
			      		<MoreVertIcon color="white" onClick={() => this.getDropdown()}/>
		      		</IconButton>
			    }
			    targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
			    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
			  >
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
		var logged = (<LoginItems clickMenu={() => this.clickMenu()} />);
		var signin = (<FlatButton label="Login" href="/login"/>)
		var rightComponent = (this.props.token) ? logged : signin;
		return (
			<div>
				<LoggedInItems visible={this.state.clicked} tabIndex="0" onBlur={() => this.closeMenu}/>
				<AppBar
				className="appbar"
			    title="HERMIONE"
			    style={{backgroundColor: "#003262", zIndex: 1}}
			    iconElementRight={rightComponent}
			    iconElementLeft={<IconButton href="/"><NavigationHome /></IconButton>}
			    titleStyle={{fontFamily: "lato", fontWeight: "300", fontSize: "20px"}}
			  	/>
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
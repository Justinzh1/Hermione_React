
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const ChildrenContainer = {
  minHeight: 'calc(100vh - 115px)'
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
	      <div>
	        <Navbar home={this.props.home}/>
          <div style={ChildrenContainer}>
	           {this.props.children}
          </div>
	        <Footer/>
	      </div>
	   </MuiThemeProvider>
    );
  }
}

export default App;

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
	      <div>
	        <Navbar/>
	        {this.props.children}
	        <Footer/>
	      </div>
	   </MuiThemeProvider>
    );
  }
}

export default App;

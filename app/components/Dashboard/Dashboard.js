import React from 'react';
import { connect } from 'react-redux'
import Messages from '../Messages';
import ClassList from './ClassList';

import RaisedButton from 'material-ui/RaisedButton';

const mapStateToProps = (state) => {
  return {	
    messages: state.messages
  };
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [
        { title: "EE16A", color: "#EEEEEE", inverse: "#90CAF9" },
        { title: "CS160", color: "#EEEEEE" , inverse: "#FFE082"},
        { title: "CS61A", color: "#EEEEEE", inverse: "#A5D6A7" }
      ]
    }
  }
  render() {
      return (
        <div className='container'>
      	   <h1> Dashboard </h1> 
           <ClassList courses={this.state.courses}/> 
	      </div>
      );
  }
}

export default connect(mapStateToProps)(Dashboard);

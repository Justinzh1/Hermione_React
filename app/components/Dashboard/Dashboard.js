import React from 'react';
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import actions from '../../actions/index';

import Messages from '../Messages';
import ClassList from './ClassList';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const mapStateToProps = (state) => {
  console.log(state.auth.user);
  return {  
    messages: state.messages,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserCourses: () => dispatch(actions.course.getUserCourses())
  }
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      courses: [
        { title: "EE16A", color: "#EEEEEE", inverse: "#90CAF9" },
        { title: "CS160", color: "#EEEEEE" , inverse: "#FFE082"},
        { title: "CS61A", color: "#EEEEEE", inverse: "#A5D6A7" }
      ]
    }
  }

  componentDidMount() {
    this.props.getUserCourses();
  }

  render() {
      return (
        <div className='sidebar'>
           <ClassList courses={this.state.courses}/> 

        </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
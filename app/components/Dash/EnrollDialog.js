import React from 'react';
import { connect } from 'react-redux'
import Messages from '../Messages';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import actions from '../../actions/index';

import {
  Snackbar
} from 'material-ui';

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    user: state.auth.user,
    courses: state.course.courses
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    enrollInCourse: (c) => dispatch(actions.course.enrollInClass(c)),
    clearMessages: () => dispatch(actions.course.clearMessages()),
    getUserCourses: () => dispatch(actions.course.getUserCourses())
  }
}

var styles = {
  container: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: 'calc(100vh + 290px)',
    zIndex: 6
  },
  module: {
    margin: '0 auto',
    marginTop: '150px',
    width: '600px',
    heigth: 'auto',
    padding: '20px 60px',
    backgroundColor: 'white'
  },
  title: {
    fontFamily: 'roboto',
    fontSize: '36px',
    fontWeight: '600',
    textTransform: 'uppercase',
    color: 'black',
    marginBottom: '30px'
  },
  moduleContainer: {
    margin: '0 auto',
    width: '350px',
    textAlign: 'center'
  },
  icon: {
    height: '60px',
    width: '60px',
    marginBottom: '10px',
    marginTop: '30px'
  },
  text: {
    fontSize: '14px',
    marginBottom: '5px'
  },
  input: {
    marginTop: '5px',
    padding: '5px 10px'
  }
}

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snack: false,
      code: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({snack: true})
    if (nextProps.message) {
      this.setState({
        snackbar: true
      })
    }
  }

  handleClickOutside() {
    this.props.close();
  }

  handleSubmit() {
    this.props.enrollInCourse(this.state.code);
    setTimeout(() => {
      console.log("Worked");
      this.props.getClasses();
    }, 2000);
  }

  updateForm(e,v) {
    this.setState({ code: e.target.value });
  }

  render() {
    return (
      <div style={styles.module}>
          <div style={styles.moduleContainer}>
            <img style={styles.icon} src="/images/plus_square.png"/>
            <h1 style={styles.title}> Enroll </h1>
            <p style={styles.text}> Enroll in a class by entering the class code below. </p>
            <input style={styles.input} onChange={(e,v) => this.updateForm(e,v)}></input>
            <br />
            <img style={styles.icon} src="/images/go.png" onClick={() => this.handleSubmit()}/>
          </div>
      </div>
    );
  }
}

Dialog = onClickOutside(Dialog);

class EnrollDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbar: false
    }
  }

  handleRequestClose() {
    console.log("Closing snackbar");
    this.props.clearMessages();
    this.setState({
      snackbar: false,
    });
  }


  render() {
    var module = (this.props.active) ?
      (<div style={styles.container}>
        <Dialog
          enrollInCourse={(c) => this.props.enrollInCourse(c)}
          getClasses={() => this.props.getUserCourses()}
          />
      </div>) :
      (<div></div>);

    return (
      <div>
        <Snackbar
          open={this.state.snackbar}
          message={this.props.message || "No Message"}
          onRequestClose={() => this.handleRequestClose()}
        />
        {module}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnrollDialog);

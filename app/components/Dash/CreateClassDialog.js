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
    user: state.auth.user,
    message: state.course.message
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewCourse: (input) => dispatch(actions.course.createCourse(input)),
    clearMessages: () => dispatch(actions.course.clearMessages())
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
    height: 'auto',
    padding: '20px 60px',
    overflow: 'scroll',
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
    marginBottom: '0px',
    lineHeight: '1.25em'
  },
  input: {
    width: '200px',
    marginTop: '5px',
    padding: '5px 10px',
    display: 'inline-block'
  },
  label: {
    textTransform: 'uppercase',
    color: 'black',
    fontFamily: 'roboto',
    fontSize: '16px',
    fontWeight: '600',
    display:'inline-block',
    marginRight: '20px'
  },
  row: {
    marginTop: '30px'
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '350px',
    textAlign: 'right'
  }
}

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: '',
      description: '',
      professors: [],
      videos: [],
      code: '',
      year: '',
      students: 0,
      week: 0,
      date: ''
    }
  }

  updateForm(key, event, value) {
    var entry = {}
    entry[key] = event.target.value;
    this.setState(entry);
  }

  handleSubmit() {
    this.props.createNewCourse(this.state);
  }

  handleClickOutside() {
    this.props.close();
  }

  render() {
    return (
      <div style={styles.module}>
          <div style={styles.moduleContainer}>
            <img style={styles.icon} src="/images/plus_square.png"/>
            <h1 style={styles.title}> Class </h1>
            <p style={styles.text}> Create in a class by fillowing out the information below. </p>
            <div style={styles.inputContainer}>
              <div style={styles.row}>
                <p style={styles.label}>class name</p>
                <input style={styles.input} onChange={(e,v) => this.updateForm("title", e, v)}></input>
              </div>
              <div style={styles.row}>
                <p style={styles.label}>description</p>
                <input style={styles.input} onChange={(e,v) => this.updateForm("description", e, v)}></input>
              </div>
              <div style={styles.row}>
                <p style={styles.label}>class code</p>
                <input style={styles.input} onChange={(e,v) => this.updateForm("code", e, v)}></input>
              </div>
              <div style={styles.row}>
                <p style={styles.label}>professors</p>
                <input style={styles.input} onChange={(e,v) => this.updateForm("professors", e, v)}></input>
              </div>
              <div style={styles.row}>
                <p style={styles.label}>year</p>
                <input style={styles.input} onChange={(e,v) => this.updateForm("year", e, v)}></input>
              </div>
            </div>
            <br />
            <img style={styles.icon} src="/images/go.png" onClick={() => this.handleSubmit()}/>
          </div>
      </div>
    );
  }
}

Dialog = onClickOutside(Dialog);

class CreateClassDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      snackbar: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      this.setState({
        snackbar: true
      })
    }
  }

  handleRequestClose() {
    this.setState({
      snackbar: false,
    });
    this.props.clearMessages();
  }

  render() {
    var module = (this.props.active) ?
      (<div style={styles.container}>
        <Dialog
          createNewCourse={(c) => this.props.createNewCourse(c)}
          close={() => this.props.close()}
          active={this.state.dialog}
          />
      </div>) :
      (<div></div>);

    return (
      <div>
        <Snackbar
          open={this.state.snackbar}
          message={this.props.message || "No Message"}
          autoHideDuration={4000}
          onRequestClose={() => this.handleRequestClose()}
        />
        {module}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateClassDialog);

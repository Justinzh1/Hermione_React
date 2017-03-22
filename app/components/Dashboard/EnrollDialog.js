import React from 'react';
import { connect } from 'react-redux'
import Messages from '../Messages';
import actions from '../../actions/index';

import {
  IconButton,
  RaisedButton,
  Dialog, 
  FlatButton,
  TextField,
  MenuItem
} from 'material-ui';

import {
  Button, 
  ButtonToolbar, 
  DropdownButton,
  FormControl
} from 'react-bootstrap/lib';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const mapStateToProps = (state) => {
  return {  
    messages: state.messages,
    user: state.auth.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    enrollInCourse: (c) => dispatch(actions.course.enrollInClass(c))
  }
}

class EnrollDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      code: ''
    }
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
    this.props.closeDialog("enroll");
  }

  updateForm(e,v) {
    this.setState({code: v});
  }

  handleSubmit() {
    console.log("handleSubmit " + this.state.code);
    this.props.enrollInCourse(this.state.code);
  }

  handleChange(key, e) {
    this.setState({ code: e.target.value });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={() => this.handleClose()}
      />,
      <FlatButton
        label="Enroll"
        primary={true}
        keyboardFocused={false}
        onTouchTap={() => this.handleSubmit()}
      />
    ];

    return (
      <div>
        <Dialog
          title="Enroll in a Class"
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={() => this.handleClose()}
        >
          <form>
            <TextField
              hintText="asdf"
              floatingLabelText="Class Code"
              onChange={(e,v) => this.updateForm(e, v)}
            />
          </form>
        </Dialog>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnrollDialog);
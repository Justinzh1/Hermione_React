import React from 'react';
import { connect } from 'react-redux'
import Messages from '../Messages';

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
    messages: state.messages
  };
};


class EnrollDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open
    }
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
    this.props.closeDialog("enroll");
  }

  handleSubmit() {

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
        onTouchTap={this.submit}
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
            <FormControl 
              type="text" 
              placeholder="Class Code"
              bsClass="enroll-form-control"
              value={this.state.value}
              onChange={(e) => this.handleChange(e)}
            />
          </form>
        </Dialog>
      </div>
    )
  }
}

export default connect(mapStateToProps)(EnrollDialog);
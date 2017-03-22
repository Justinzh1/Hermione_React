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
  MenuItem,
  DatePicker,
  List,
  ListItem,
  Divider,
  Chip,
  Avatar,
  Subheader
} from 'material-ui';

import {
  Button, 
  ButtonToolbar, 
  DropdownButton,
  FormControl,
} from 'react-bootstrap/lib';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const mapStateToProps = (state) => {
  return {  
    messages: state.messages,
    user: state.auth.user,
    input: state.input
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewCourse: (input) => dispatch(actions.course.createCourse(input))
  }
}

const title={
  fontSize: "28px"
}

const titlecontainer={
  height: "80px"
}

class CreateDialog extends React.Component {
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

  handleOpen() {
    this.props.openDialog();
  }

  handleClose() {
    this.props.closeDialog();
  }

  updateForm(key, event, value) {
    var entry = {}
    entry[key] = value;
    this.setState(entry);
  }

  handleSubmit() {
    this.props.createNewCourse(this.state);
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={() => this.handleClose()}
      />,
      <FlatButton
        label="Create"
        primary={true}
        keyboardFocused={false}
        onTouchTap={() => this.handleSubmit()}
      />
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={() => this.handleClose()}
        >
          <div className="form-left">
            <form>
              <h3> Create a Class </h3>
              <TextField
                hintText="Title"
                floatingLabelText="Title"
                onChange={(e,v) => this.updateForm("title", e, v)}
              /><br />
              <TextField
                hintText="Description"
                floatingLabelText="Description"
                onChange={(e,v) => this.updateForm("description", e, v)}
              /><br />
              <TextField
                hintText="Professors"
                floatingLabelText="Professors"
              /><br />
              <TextField
                hintText="Class Code"
                floatingLabelText="Class Code"
                onChange={(e,v) => this.updateForm("code", e, v)}
              /><br />
              <TextField
                hintText="Year"
                floatingLabelText="Year (ex. sp17)"
                onChange={(e,v) => this.updateForm("year", e, v)}
              /><br />
              <div>
                <DatePicker 
                  hintText="Start date" 
                  container="inline" 
                  mode="landscape"
                  onChange={(e,v) => this.updateForm("date", e, v)}
                />
              </div>
            </form>
          </div>
          <div className="form-right">
          </div>
        </Dialog>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDialog);
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
    messages: state.messages
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewCourse: () => dispatch(actions.course.createCourse())
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
      week: 0
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
    this.props.createNewCourse();
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
              /><br />
              <TextField
                hintText="Professors"
                floatingLabelText="Professors"
              /><br />
              <TextField
                hintText="Class Code"
                floatingLabelText="Class Code"
              /><br />
              <TextField
                hintText="Year"
                floatingLabelText="Year (ex. sp17)"
              /><br />
              <div>
                <DatePicker hintText="Landscape Inline Dialog" container="inline" mode="landscape" />
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
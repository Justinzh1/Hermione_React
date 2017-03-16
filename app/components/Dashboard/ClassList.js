import React from 'react';
import { connect } from 'react-redux'
import Messages from '../Messages';

import {
  Card,
  CardActions, 
  CardHeader, 
  CardMedia, 
  CardTitle, 
  CardText, 
  IconMenu, 
  MenuItem, 
  IconButton,
  RaisedButton,
  Dialog, 
  FlatButton,
  TextField
} from 'material-ui';

import {
  Button, 
  ButtonToolbar, 
  DropdownButton,
  FormControl
} from 'react-bootstrap/lib';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import CreateDialog from './CreateDialog';
import EnrollDialog from './EnrollDialog';

const mapStateToProps = (state) => {
  return {  
    messages: state.messages
  };
};

const listStyle= {
}

const cardStyle={
  width: '25%',
  height: "140px",
  minWidth: "225px",
  display: "inline-block",
  marginRight: "20px",
  marginBottom: "15px"
}

const cardHeaderStyle={
  fontSize: "20px",
  fontFamily: "roboto"
}

class ClassInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="left-right-container align-center">
        <div className="sub-container inline align-center">
          <i className="material-icons">timeline</i>
          <p className="sub-info"> Week 1 </p>
        </div>
        <div className="divider"></div>
        <div className="sub-container inline align-center">
          <i className="material-icons">date_range</i>
          <p className="sub-info"> SP17 </p>
        </div>
        <div className="divider"></div>
        <div className="sub-container inline align-center">
          <i className="material-icons">face</i>
          <p className="sub-info"> 214 </p>
        </div>        
      </div>
    )
  }
}

class ClassCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: this.props.course.color,
      inverse: this.props.course.inverse,
      active: 0,
      enroll: false,
      create: false,
      code: ''
    }
  }

  activate(x) {
    this.setState({active : x});
    this.props.setActiveCourse(x);
  }

  handleEnroll() {
    this.setState({enroll: true});
  }

  handleCreate() {
    console.log("Opening create");
    this.setState({create: true});
  }

  handleClose() {
    this.setState({enroll: false, create: false});
  }

  handleChange(e, value) {
    this.setState({ code: value });
  }

  handleSubmit() {
    var code = this.state.code;
    console.log("code : " + code);
  }

  render() {
    const selectStyle = {
      position: 'relative',
      display: 'inline-block',
      float: "right"
    }
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

    var course = this.props.courses[this.state.active];
    const popup = (
      <div>
        <Dialog
          title="Enroll in a Class"
          actions={actions}
          modal={false}
          open={this.state.enroll}
          onRequestClose={() => this.handleClose()}
        >
          <form>
            <TextField
              hintText="Class Code"
              floatingLabelText="Class Code"
              onChange={(e,v) => this.handleChange(e, v)}
            />
          </form>
        </Dialog>
      </div>
    );

    return (
      <Card 
        style={Object.assign(cardStyle, { backgroundColor: this.props.bg })}
      >
        <div className="select-class" style={selectStyle}>
          {popup}
          <CreateDialog open={this.state.create} openDialog={() => this.handleCreate()} closeDialog={() => this.handleClose()}/>
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >
            {this.props.courses.map((c, index) => (
              <MenuItem 
                primaryText={c.title} 
                key={index} 
                onClick={() => this.activate(index)}
              />
            ))}
            <MenuItem primaryText="Enroll" onTouchTap={() => this.handleEnroll()} />
            <MenuItem primaryText="Create" onTouchTap={() => this.handleCreate()} />
          </IconMenu> 
        </div>
        <CardHeader 
          title={course.title}
          titleStyle={cardHeaderStyle}
          titleColor={"black"}
        />
        <ClassInfo />
      </Card>
    )
  }
}

class ClassList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: 0
    }
  }

  getActiveCourse() {
    return this.props.courses[this.state.active];
  }

  setActiveCourse(x) {
    this.setState({active: x});
  }

  render() {
    const child = { width: `30px`, height: `100%`, backgroundColor: `green`}

    return (
      <div>
        <ClassCard
          updateActive={this.updateActive}
          course={this.getActiveCourse()}
          courses={this.props.courses}
          setActiveCourse={(x) => this.setActiveCourse(x)}
          />
        <p> Active card is {this.state.active} </p>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ClassList);
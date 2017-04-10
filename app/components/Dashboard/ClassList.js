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

const cardStyle={
  width: '100%',
  height: "auto",
  display: "inline-block",
  position: "relative",
  zIndex: 10
}

const cardHeaderStyle={
  fontSize: "20px",
  fontFamily: "roboto",
  margin: 0,
  padding: 0,
  paddingLeft: '12px'
}

const subtitleStyle={
  fontFamily: "roboto",
  fontSize: '12px',
  lineHeight: "1.25em",
  width: "100%",
  paddingLeft: '12px'
}

const colStyle={
  border: "1px solid #eee",
  borderTop: "2px solid #eee",
  width: '33.3333333%',
}

const ClassInfoStyle = {
}

class ClassInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="left-right-container align-center">
        <div style={ClassInfoStyle} className="row">
          <div style={colStyle} className="col col-md-4">
            <div className="sub-container inline align-center">
              <i className="material-icons">timeline</i>
              <p className="sub-info"> Week 1 </p>
            </div>
          </div>

          <div style={colStyle} className="col col-md-4">
            <div className="sub-container inline align-center">
              <i className="material-icons">date_range</i>
              <p className="sub-info"> SP17 </p>
            </div>
          </div>

          <div style={colStyle} className="col col-md-4">
            <div className="sub-container inline align-center">
              <i className="material-icons">face</i>
              <p className="sub-info"> 214 </p>
            </div>       
          </div>
        </div> 
      </div>
    )
  }
}

class ClassCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.setState({create: true});
  }

  handleClose() {
    this.setState({enroll: false, create: false});
  }

  handleChange(e, value) {
    this.setState({ code: value });
  }

  render() {
    const selectStyle = {
      position: 'relative',
      display: 'inline-block',
      float: "right",
      top:"8px"
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
        onTouchTap={() => this.handleEnroll()}
      />
    ];

    var course = this.props.courses[this.state.active];
    const enrollDialog = (
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

    var titleHeader = (course) ?
    (<div>
      <CardHeader 
        title={course.title}
        titleStyle={cardHeaderStyle}
        titleColor={"black"}
        subtitle={course.description}
        subtitleStyle={subtitleStyle}
      />
      
    </div>
    ) :
    (<CardHeader 
      titleStyle={cardHeaderStyle}
      titleColor={"black"}
    />)

    return (
      <Card 
        style={Object.assign(cardStyle, {})}

      >
        <div className="select-class" style={selectStyle}>


          <EnrollDialog
            open={this.state.enroll}
            openDialog={() => this.handleEnroll()}
            closeDialog={() => this.handleClose()}
          />

          <CreateDialog 
            open={this.state.create} 
            openDialog={() => this.handleCreate()}
            closeDialog={() => this.handleClose()}
          />

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
        {titleHeader}
        <div>
        </div>
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
    this.props.setActiveCourse(x);
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
      </div>
    );
  }
}

export default connect(mapStateToProps)(ClassList);
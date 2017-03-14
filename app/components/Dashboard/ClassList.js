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
  RaisedButton
} from 'material-ui';

import {
  Button, 
  ButtonToolbar, 
  DropdownButton
} from 'react-bootstrap/lib';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

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
      active: 0
    }
  }

  clickSelected() {
    var isActive = this.props.id;
    this.setState({active: isActive});
  }

  render() {
    const selectStyle = {
      position: 'relative',
      display: 'inline-block',
      float: "right"
    }
    var color = (this.props.id == this.state.active) ? this.state.inverse : this.state.color;
    return (
      <Card 
        style={Object.assign(cardStyle, { backgroundColor: this.props.bg })}
        onClick={() => this.clickSelected()}
        >
        <div className="select-class" style={selectStyle}>
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >
            <MenuItem primaryText="Enroll" />
          </IconMenu>
        </div>
        <CardHeader 
          title={this.props.course.title}
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

  render() {
    const child = { width: `30px`, height: `100%`, backgroundColor: `green`}

    return (
      <div>
        <ClassCard
          updateActive={this.updateActive}
          course={this.getActiveCourse()}
          courses={this.props.courses}
          />
        <p> Active card is {this.state.active} </p>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ClassList);
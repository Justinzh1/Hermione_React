import React from 'react';
import { connect } from 'react-redux'
import Messages from '../Messages';

import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import HorizontalScroll from 'react-scroll-horizontal';

const mapStateToProps = (state) => {
  return {	
    messages: state.messages
  };
};

const listStyle= {
}

const cardStyle={
  width: '25%',
  height: "120px",
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
    this.props.updateActive(isActive);
  }

  render() {
    var color = (this.props.id == this.state.active) ? this.state.inverse : this.state.color;
    return (
      <Card 
        style={Object.assign(cardStyle, { backgroundColor: this.props.bg })}
        onClick={() => this.clickSelected()}
        >
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
    this.updateActive = this.updateActive.bind(this);
  }

  updateColor(course, id) {
    var color = (this.state.active == id) ? course.inverse : course.color;
    return color
  }

  updateActive(active) {
    console.log("Active " + active);
    this.setState({ active: active });
  }

  render() {

    var card = (c, x) => {
      var color = this.updateColor(c,x);

      return (
        <ClassCard 
          course={c} 
          key={x}
          val={x}
          updateActive={this.updateActive}
          active={this.state.active}
          />
      )
    }

    const child = { width: `30px`, height: `100%`, backgroundColor: `green`}

    return (
      <div>
        {this.props.courses.map((key, index) => {
          var color = (this.state.active == index) ? key.inverse : key.color;
          return (
            <ClassCard 
            course={key} 
            key={index}
            id={index}
            updateActive={this.updateActive}
            bg={color}
            />
          )
        })}
        <p> Active card is {this.state.active} </p>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ClassList);

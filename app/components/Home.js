import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Grid, Row, Jumbotron, Col, Button} from 'react-bootstrap/lib';

class StudentButton extends React.Component {
  render() {
    return (
      <div className="button student">
        Students
      </div>
    )
  }
}

class ProfessorButton extends React.Component {
  render() {
    return (
      <div className="button professor">
        Professors
      </div>
    )
  }
}

class ClassListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={"class-list-item " + this.props.bg} >
        <p> {this.props.name} </p>
      </div>
    )
  }
}

class ClassList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      classes: ['EE16A', 'CS160'],
      colors: ['lawrence', 'laplane', 'rosegarden', 'goldengate']
    }
  }
  render() {
    var classes = [];
    var x = 0;
    let colors = this.state.colors;
    for (let c of this.state.classes) {
      classes.push(<ClassListItem name={c} bg={colors[x]}/>);
      x = (x + 1) % 4;
    }
    return (
      <div className="class-list-container">
        <h1> Currently we support the following classes </h1>
        {classes}
      </div>
    )
  }
}


class Home extends React.Component {
  render() {
    return (
      <div>
        <Messages messages={this.props.messages}/>
        <div className="video-bg">
          <div className="video-container">
            <div className="video-bg-container">
              <video className="video-bg-file" loop autoPlay>
                <source src="images/pencil_down.mp4" type="video/mp4" />
                Your browser does not support the video tag. 
              </video>
            </div>
            
            <Grid bsClass="info">
              <Row className="show-grid">
                <Col md={6}>
                  <div className="video-header">
                    <h1> HERMIONE </h1> 
                    <p className="video-subtitle"> A Computer Vision Project</p>  
                  </div>
                </Col>
              </Row>
              <Row className="show-grid">
                <Col md={6}>
                  <div className="video-header">
                     <p> Hermione is currently available to Students and Professors.</p>
                     <StudentButton />
                     <ProfessorButton />
                  </div>
                </Col>
              </Row>
              <Row className="show-grid">
                <Col md={4}>
                  <div className="video-header">
                    <p> Contact us at <u>me@hermione.io</u></p>
                  </div>
                </Col>
              </Row>
            </Grid>

          </div>
        </div>

        <div className="sponsors-container">
          <image className="sponsor" src="images/cal.jpg" id="cal"/>
          <image className="sponsor" src="images/asuc.png" id="asuc"/>
          <image className="sponsor" src="images/octo.png" id="octo"/>
        </div>

        <div className="info-container">

          <div className="info-col" id="about">
            <div className="info-header">
              <h1> <span className="underline"> About </span> </h1>
            </div>
            <div className="info-content">
              <p> Hermione is a UC Berkeley, ASUC sponsored project designed to streamline the lecture capturing process. Using computer vision and natural language processing, we provide a quick, effective way to record and transcribe lectures. </p>
            </div>
          </div>

          <div className="info-col" id="about">
            <div className="info-header">
              <h1> <span className="underline"> Mission </span> </h1>
            </div>
            <div className="info-content">
              <p> Our goal is to provide cheap and efficient ways to record lectures. Due to growing demands for certain classes and limited classroom space, recording lectures allows more students take the classes they are interested in. </p>
            </div>
          </div>

          <div className="info-col" id="about">
            <div className="info-header">
              <h1> <span className="underline"> Contact </span> </h1>
            </div>
            <div className="info-content">
              <p> If you are interested in learning more about Hermione or are looking to use our service in a class feel free to contact us at hello@hermione.io </p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Home);
  
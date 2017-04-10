import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Grid, Row, Jumbotron, Col, Button} from 'react-bootstrap/lib';

const ContactText = {
  paddingTop: 0,
  paddingLeft: 0
}

const SponsorHeader = {
  backgroundColor: '#EEE',
  margin: 0,
  padding: "40px",
  paddingTop: "60px",
  textAlign: 'left'
}

const SponsorHText = {
  margin: 0
}

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
          <div style={SponsorHeader}>
            <h1 style={SponsorHText}> IN COLLABORATION WITH </h1>
            <p> UC Berkeley, The Associated Students of University California Berkeley, and ASUC Office of the Chief Technology Officer </p>
          </div>
          <image className="sponsor" src="images/cal.jpg" id="cal"/>
          <image className="sponsor" src="images/asuc.png" id="asuc"/>
          <image className="sponsor" src="images/octo.png" id="octo"/>
        </div>


        <div className="points">
          <div className="row point-container row-point">
              <div className="col col-sm-3 point-item">
                  <h1>About</h1>
                  <p> Hermione is a UC Berkeley, ASUC sponsored project designed to streamline the lecture capturing process. Using computer vision and natural language processing, we provide a quick, effective way to record and transcribe lectures. </p>
              </div>
              <div className="col col-sm-3 point-item">
                  <h1>Mission</h1>
                  <p> Our goal is to provide cheap and efficient ways to record lectures. Due to growing demands for certain classes and limited classroom space, recording lectures allows more students take the classes they are interested in. </p>
              </div>
              <div className="col col-sm-3 point-item">
                  <h1>Contact</h1>
                  <p>Our work is viewe by thousands of students and the software gets hundreds of thousands
                  of unqiue vistis and millions of API hits a year</p>
              </div>
          </div>
          <div className="row info-point">
            <div className="container" style={ContactText}>
              <p> If you are interested in learning more about Hermione or are looking to use our service in a class feel free to contact us at <a href="mailto:me@hermione.io">me@hermione.io</a></p>
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
  
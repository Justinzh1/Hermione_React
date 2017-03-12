import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

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
            <div className="top-container">
              <div className="video-header-container">
                <div className="video-header">
                  <h1> Hermione streamlines the lecture recording process </h1>
                  <p> A Computer Vision Project</p>
                </div>
              </div>

              <div className="button-container">
                <div className="button-info">
                  <p> Hermione is currently available to Students and Professors. Enhance your learning at your own pace and <u>get started</u> today! </p>
                </div>
                <StudentButton />
                <ProfessorButton />
              </div>
              <ClassList />

              <div className="contact-container">
                <p> Interested in using our service? </p>
                <p> Contact us at <u>me@hermione.io</u></p>
              </div>
            </div>

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
  
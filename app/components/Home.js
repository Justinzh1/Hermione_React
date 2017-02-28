import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';

class StudentButton extends React.Component {
  render() {
    return (
      <div className="button">
        Students
      </div>
    )
  }
}

class ProfessorButton extends React.Component {
  render() {
    return (
      <div className="button">
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
      <div className="class-list-item">
        <p> {this.props.name} </p>
      </div>
    )
  }
}

class ClassList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: ['EE16A', 'CS160']
    }
  }
  render() {
    var classes = [];
    for (let c of this.state.classes) {
      classes.push(<ClassListItem name={c} />);
    }
    return (
      <div className="class-list-container">
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
              <ClassList />
            </div>
          </div>
          <div className="button-container">
            <div className="button-info">
              <p> Hermione is currently available to Students and Professors. Enhance your learning at your own pace and <u>get started</u> today! </p>
            </div>
            <StudentButton />
            <ProfessorButton />
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
  
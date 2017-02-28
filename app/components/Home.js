import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';

class StudentButton extends React.Component {
  render() {
    return (
      <div className="button">
        Get Started
      </div>
    )
  }
}

class ProfessorButton extends React.Component {
  render() {
    return (
      <div className="button">
        Get Started
      </div>
    )
  }
}


class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <Messages messages={this.props.messages}/>
        <div className="video-bg">
          <div className="video-container">
            <div className="title students float-left">
              <h1> Students </h1>
              <p> Watch lectures </p>
              <p> Search concepts </p>
              <p> Get ahead </p>
              <StudentButton />
            </div>
            <div className="chevron">
              <div className="video-bg-container">
                <video className="video-bg-file" loop autoPlay>
                  <source src="images/pencil_down.mp4" type="video/mp4" />
                  Your browser does not support the video tag. 
                </video>
              </div>
            </div>
            <div className="chevron-blank"></div>
            <div className="title professors float-right">
              <h1> Professors </h1>
              <p> Manage classes </p>
              <p> Post videos </p>
              <p> Computer Vision </p>
              <ProfessorButton />
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
  
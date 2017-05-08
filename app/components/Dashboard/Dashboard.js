import React from 'react';
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import actions from '../../actions/index';

import Messages from '../Messages';
import ClassList from './ClassList';
import VideoList from './VideoList';
import VideoPlayer from './VideoPlayer';
import VideoTopics from './VideoTopics';

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    user: state.auth.user,
    courses: state.course.courses
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserCourses: () => dispatch(actions.course.getUserCourses())
  }
}

const parentStyle = {
}

const sidebarStyle = {
  overflow: 'hidden',
  border: "1.5px #eee solid",
  paddingRight: '0',
  marginRight: '0'
}

const sidebarStyleScaled = {
  overflow: 'hidden',
  display: 'inline-block',
  margin: '0 auto',
  width: '350px',
  border: "1.5px #eee solid",
  paddingRight: '0',
  marginRight: '0'
}

const videoContainerStyle = {
  height: "427px",
  display: "inline-block",
  verticalAlign: "top",
  backgroundColor: "black",
  textAlign: "center",
  float: "right",
  padding: '0'
}

const scaledVideoContainer = {
  textAlign: 'center',
  backgroundColor: 'black',
  margin: '0 auto',
  padding: '0'
}

const NoPadding = {
padding: '0'
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);

    super(props);
    this.state = {
      active: 0,
      video: -1,
      videoContent: '',
      loaded: false,
      course: '',
      width: '',
      height: '',
      seek: 0
    }
  }

  updateDimensions() {
    if (typeof(global.window) !== 'undefined') {
      var w = global.window,
        width = w.innerWidth,
        height = w.innerHeight;
      this.setState({width : width, height: height});
    }
  }

  componentWillMount() {
    if (this.props.user.enrolled) {
      this.props.getUserCourses();
    }
    this.updateDimensions();
  }

  componentDidMount() {
    global.window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions();
  }

  componentWillUnmount() {
    global.window.removeEventListener("resize", this.updateDimensions);
  }

  getActiveCourse() {
    var course = this.props.courses[this.state.active];
    return course;
  }

  setActiveCourse(x) {
    var course = this.getActiveCourse();
    this.setState({active : x, video: 0, course: course});
  }

  getActiveVideo() {
    var course = this.getActiveCourse();
    this.state.seek = 0;
    if (course) {
      var index = (this.state.video == -1) ? course.videos.length - 1 : this.state.video - 1;
      var video = course.videos[index];
      if (video) {
        return video;
      }
    }
    return null;
  }

  setActiveVideo(x) {
    var video = this.getActiveVideo();
    this.setState({video : x, videoContent : video, seek : 0});
  }

  render() {
    var video = this.getActiveVideo();
    var course = this.getActiveCourse();
    var content;
    if (this.props.courses && video && this.state.width < 980) {
      content = (
        <div>
          <div className="row">
            <div className="col col-md-6" style={NoPadding}>
              <ClassList courses={this.props.courses} setActiveCourse={(x) => this.setActiveCourse(x)}/>
            </div>
            <div className="col col-md-6" style={NoPadding}>
              <VideoTopics timestamps={video.timestamps} o={1}/>
            </div>
          </div>
          <div className="row">
            <VideoPlayer
              video={video}
              orientation={0}
              seek={this.state.seek}
              />
            <div>
            </div>
          </div>
          <div className="row">
            <div style={sidebarStyleScaled}>
              <VideoList
                course={course}
                setActiveVideo={(x) => this.setActiveVideo(x)}
                rerender={() => {
                  this.props.getUserCourses();
                }}
                />
            </div>
          </div>
        </div>
      );
    } else if (this.props.courses && this.state.width >= 980) {
      content = (
        <div className="row">
          <div className='col col-md-3' style={sidebarStyle}>
            <ClassList courses={this.props.courses} setActiveCourse={(x) => this.setActiveCourse(x)}/>
            <VideoList
              course={course}
              setActiveVideo={(x) => this.setActiveVideo(x)}
              rerender={() => {
                console.log("Rerender");
                this.props.getUserCourses();
              }}
              />
          </div>
          <div className="col col-md-9" style={videoContainerStyle}>
            <VideoPlayer
              video={video}
              orientation={1}
              />
          </div>
        </div>
      );
    } else if (this.state.width > 980) {
      content = (
        <div className="row">
          <div className='col col-md-3'>
          </div>
          <div className="col col-md-9" style={videoContainerStyle}>
          </div>
        </div>
      );
    } else {
      content = (
        <div className="row">
          <div className='col col-md-3'>
          </div>
          <div className="col col-md-9" style={videoContainerStyle}>
          </div>
        </div>
      );
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

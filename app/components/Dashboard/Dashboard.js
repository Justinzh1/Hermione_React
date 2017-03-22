import React from 'react';
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import actions from '../../actions/index';

import Messages from '../Messages';
import ClassList from './ClassList';
import VideoList from './VideoList';
import VideoPlayer from './VideoPlayer';

const mapStateToProps = (state) => {
  console.log("COURSES " + JSON.stringify(state.course.courses));
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
  padding: 0,
  paddingLeft: "10px",
  float: "left"
}

const videoContainerStyle = {
  height: "460px",
  display: "inline-block",
  verticalAlign: "top",
  backgroundColor: "black",
  textAlign: "center",
  float: "right"
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      video: 0,
      videoContent: '',
      loaded: false,
      course: ''
    }
  }

  componentDidMount() {
    this.props.getUserCourses();
  }

  getActiveCourse() {
    return this.props.courses[this.state.active];
  }

  setActiveCourse(x) {
    var course = this.getActiveCourse();
    this.setState({active : x, video: 0, course: course});
  }

  getActiveVideo() {
    var course = this.getActiveCourse();
    if (course) {
      var video = course.videos[this.state.video];
      if (video) {
        console.log("video " + video.title);
        return video;
      }
    }
    return null;
  }

  setActiveVideo(x) {
    var video = this.getActiveVideo();
    this.setState({video : x, videoContent: video});
    console.log("active video " + video.title);
  }

  render() {
    var video = this.getActiveVideo();
    var course = this.getActiveCourse();
    var content = (this.props.courses) ?
    (
      <div className="row">
        <div className='col col-md-3' style={sidebarStyle}>
          <ClassList courses={this.props.courses} setActiveCourse={(x) => this.setActiveCourse(x)}/> 
          <VideoList course={course} setActiveVideo={(x) => this.setActiveVideo(x)}/>
        </div>
        <div className="col col-md-9" style={videoContainerStyle}>
          <VideoPlayer video={video}/>
        </div>
      </div>
    ) : 
    (
      <div className="row">
        <div className='col col-md-3' style={sidebarStyle}>
        </div>
        <div className="col col-md-9" style={videoContainerStyle}>
        </div>  
      </div>
    )

    return (
      <div>
        {content}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
import React from 'react';
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import actions from '../../actions/index';
import Messages from '../Messages';
import Radium from 'radium';

import Sidebar from './Sidebar';
import VideoPlayer from './VideoPlayer';

var styles = {
  side: {
    display: 'inline-block',
    width: '30vw',
    minWidth: '200px',
    maxWidth: '700px',
    verticalAlign: 'top',
    '@media (maxWidth: 900px)': {
      display: 'none !important'
    }
  },
  col: {
      margin: '0 !important',
      padding: '0 !important',
  },
  vid: {
    display: 'inline-block',
    width: 'calc(100vw - 28vw)',
    verticalAlign: 'top'
  },
  full: {
    width: '100%'
  }
}

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

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
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

  componentWillReceiveProps(nextProps) {
    console.log("Dashboard receiving props " + JSON.stringify(nextProps.courses));
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
    if (this.props.user && this.props.user.enrolled) {
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
    console.log(x);
    var course = this.props.courses[x];
    this.setState({active : x, course: course});
    
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
    var vid = (this.state.width > 900) ?
      (<div style={styles.vid}>
        <VideoPlayer
          video={video}
          split={false}
          />
      </div>) :
      (<div style={[styles.vid, styles.full]}>
        <VideoPlayer
          video={video}
          split={true}
          />
      </div>);

    var side = (this.state.width > 900) ?
      (<div style={styles.side}>
        <Sidebar
          course={course}
          courses={this.props.courses}
          setActiveCourse={(i) => this.setActiveCourse(i)}
          />
      </div>) :
      (<div></div>);

    return (
      <div>
        <div className="row">
          {side}
          {vid}
        </div>
      </div>
    );
  }
}

Dashboard = Radium(Dashboard);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

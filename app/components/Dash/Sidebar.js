import React from 'react';
import { connect } from 'react-redux'
import Messages from '../Messages';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  Divider,
  Subheader,
  Avatar,
} from 'material-ui';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import SidebarHeader from './SidebarHeader';

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    user: state.auth.user,
  };
};

var styles = {
  container: {
    border: '2px #EEEEEE solid',
    width: '100%',
    height: '100%',
    paddingLeft: '10px',
  },
  subheader: {
    paddingLeft: '20px',
  },
  video: {
    height: '510px',
    overflow: 'scroll',
    width: '100%',
    display: "inline-block",
    marginRight: "20px",
    backgroundColor: "white",
    position: "relative",
    zIndex:5,
    borderTop: '1.5px solid #EEEEEE'
  },
  hideScrollBar: {
    marginLeft: '-20px',
    paddingLeft: '20px'
  },
  list: {
    width: '100%',
    overflow: 'scroll',
    padding: '0',
    margin: '0'
  },
  listItem: {
    border: "1px #EEE solid",
    borderLeft: 0,
    borderRight: 0,
    borderTop: 0,
  },
  time: {
    fontSize: "12px",
    color: "#00B0DA"
  },
  title: {
    fontSize: '16px',
    fontFamily: 'open sans',
    fontWeight: '600'
  },
  listText: {
    fontSize: '14px',
    fontWeight: '400',
    fontFamily: 'open sans',
  }
}

const today = new Date();
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      filtered: [],
      related: []
    }
  }

  setActive(id) {
    this.props.setActiveVideo(id - 1);
    this.setState({active : id});
  }

  getVideos(courseVideos, expanded) {
    var videos = [];
    var icon = (<Avatar icon={<AvPlayArrow />}/>);
    if (courseVideos) {
      courseVideos.map((v, index) => {
        var dnew = new Date(v.date);
        var datestr =  months[dnew.getMonth()] + " " + dnew.getDay() + ", " + dnew.getFullYear();
        var d = v.date ? datestr : today.toLocaleDateString()
        var topics = [];
        v.timestamps.map((s,i) => {
          topics.push(
            <ListItem
              key={i + "-" + i}
              primaryText={<div style={styles.listText}> {s.subject} </div>}
            />
          );
        });
        var item = (
          <ListItem
            color="white"
            leftAvatar={icon}
            primaryText={<div style={styles.title}> {v.title} </div>}
            secondaryText={<p style={styles.time}>{d}</p>}
            key={index}
            id={v.id}
            onClick={() => this.setActive(v.id)}
            style={styles.listItem}
            nestedItems={topics}
            initiallyOpen={expanded}
          />);
        if (!videos.includes(item)) videos.push(item);
      });
      videos.reverse();
      return videos;
    }
    return null;
  }

  filterVideos(str) {
    str = str.toLowerCase();
    const filtered = [];
    const parents = [];
    const related = [];
    this.props.course.videos.map((v, index) => {
      const timestamps = v.timestamps;
      for (var x = 0; x < timestamps.length; x++) {
        var subj = timestamps[x].subject.toLowerCase();
        if (subj.indexOf(str) != -1) {
          if (!filtered.includes(v)) filtered.push(v);
          var parent = timestamps[x].parent.toLowerCase();
          if (!parents.includes(parent))  parents.push(parent);
        }
      }
    });
    this.props.course.videos.map((v, index) => {
      const timestamps = v.timestamps;
      for (var x = 0; x < timestamps.length; x++) {
        var parent = timestamps[x].parent.toLowerCase();
        if (parents.includes(parent) && !filtered.includes(v)) {
          if (!related.includes(v)) related.push(v);
        }
      }
    });
    if (str != '') {
      this.setState({update: true, filtered: filtered, related: related});
    } else {
      this.setState({update: false});
    }
  }

  render() {
    var videos = null;
    var related = null;
    if (this.state.update) {
      videos = this.getVideos(this.state.filtered, true);
      related = this.getVideos(this.state.related, false);
    } else {
      videos = (this.props.course) ? this.getVideos(this.props.course.videos, false) : (<div></div>);
    }

    return (
      <div style={styles.container}>
        <SidebarHeader
          course={this.props.course}
          courses={this.props.courses}
          filterVideos={(str) => this.filterVideos(str)}
          setActiveCourse={(i) => this.props.setActiveCourse(i)}
          />
        <div style={styles.video}>
          <List className="list" style={styles.list}>
            <div style={styles.hideScrollBar}>
              {videos}
              <Subheader style={styles.subheader}> Related </Subheader>
              {related}
            </div>
          </List>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  course: PropTypes.object
}

export default connect(mapStateToProps)(Sidebar);

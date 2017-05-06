import React from 'react';
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import actions from '../../actions/index';


import {
  List,
  ListItem,
  Divider,
  Subheader,
  Avatar,
  TextField,
  Snackbar
} from 'material-ui';

import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionSearch from 'material-ui/svg-icons/action/search';

import Messages from '../Messages';
import ClassList from './ClassList';
import FilterVideos from './FilterVideos';

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    user: state.auth.user
  };
};

const SubheaderStyle = {
  paddingLeft: '20px'
}

const videoStyle={
  width: '100%',
  minWidth: "225px",
  height: "140px",
  display: "inline-block",
  marginRight: "20px",
  marginBottom: "15px",
  backgroundColor: "white",
  position: "relative",
  zIndex:5
}

const hideScrollBar={
  marginLeft: '-20px',
  paddingLeft: '20px'
}

const listStyle={
  width: '100%',
  height: "calc(100vh - 290px)",
  overflow: "scroll"
}

const listItemStyle={
  border: "1px #EEE solid",
  borderLeft: 0,
  borderRight: 0,
  borderTop: 0
}

const timeText={
  fontSize: "12px",
  color: "#00B0DA"
}

const filterStyle={
  paddingLeft: "20px",
}

const filterInputStyle={
  width: "calc(100% - 30px)"
}

const searchIconStyle={
  display: 'inline-block',
  position: 'relative',
  top: "10px",
  marginRight: '6px'
}

const today = new Date();

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


class VideoList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      filtered: [],
      related: [],
      update: false
    }
  }

  setActive(id) {
    console.log("Clicked " + id);
    this.setState({active : id});
    this.props.setActiveVideo(id - 1);
  }

  getVideos(courseVideos, expanded) {
    console.log("Search " + expanded + " State update " + this.state.update);
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
              primaryText={s.subject}
            />
          );
        });
        var item = (
          <ListItem
            color="white"
            leftAvatar={icon}
            primaryText={v.title}
            secondaryText={<p style={timeText}>{d}</p>}
            key={index}
            id={v.id}
            onClick={() => this.setActive(v.id)}
            style={listItemStyle}
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
      var filter = (this.props.course) ?
        (<FilterVideos
          title={this.props.course.title}
          year={this.props.course.year}
          rerender={() => this.props.rerender()}
          filterVideos={(str) => this.filterVideos(str)}
        />) :
        (<FilterVideos
          rerender={() => this.props.rerender()}
          />);

      return (
        <div style={videoStyle}>
          <List style={listStyle}>
            <div style={hideScrollBar}>
              {filter}
              {videos}
              <Subheader style={SubheaderStyle}> Related </Subheader>
              {related}
            </div>
          </List>
        </div>
      );
  }
}

export default connect(mapStateToProps)(VideoList);

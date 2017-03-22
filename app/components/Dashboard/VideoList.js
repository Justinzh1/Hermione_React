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
  TextField
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


class VideoList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: 0
    }
  }

  setActive(id) {
    console.log("Clicked " + id);
    this.setState({active : id});
    this.props.setActiveVideo(id);
  }

  getVideos() {
    var videos = [];
    var icon = (<Avatar icon={<AvPlayArrow />}/>);
    if (this.props.course && this.props.course.videos) {
      this.props.course.videos.map((v, index) => {
        var item = (
          <ListItem
            color="white"
            leftAvatar={icon}
            primaryText={v.title}
            secondaryText={<p style={timeText}>{today.toLocaleDateString()}</p>}
            key={index}
            onClick={() => this.setActive(index)}
            style={listItemStyle}
          />);
        videos.push(item);
      });
      return videos;
    }
    return null;
  }

  render() {
      var videos = this.getVideos();
      videos = (videos) ? videos : (<div></div>);
      return (
        <div style={videoStyle}>
          <List style={listStyle}>
            <div style={hideScrollBar}>
              <FilterVideos />
              {videos}
            </div>
          </List>
        </div>
      );
  }
}

export default connect(mapStateToProps)(VideoList);
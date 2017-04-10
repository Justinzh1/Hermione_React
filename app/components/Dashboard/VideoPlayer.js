import React from 'react';
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import actions from '../../actions/index';
import Messages from '../Messages';

import VideoInfo from './VideoInfo';

const mapStateToProps = (state) => {
  return {  
    messages: state.messages,
    user: state.auth.user
  };
};

const videoHeaderStyle = {
  color: 'white',
  fontStyle: 'lato',
  fontWeight: '100',
  fontSize: '20px'
}

const videoHeader = {
  textAlign: 'left',
  paddingLeft: "20px"
}

const videoContainer = {
  width: '100%',
}

const videoStyle = {
  backgroundColor: 'black'
}

class YouTube extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    var src = "https://www.youtube.com/embed/" + this.props.video + "?autoplay=1";
    return (
      <iframe width="90%" height="420px"
        src={src}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    )
  }
}


class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  _onReady(event) {
    // access to player in all event handlers via event.target 
    event.target.pauseVideo();
  }

  render() {
    var content = (this.props.video) ? (
      <div>
        <div style={videoHeader}>
        </div>
        <div style={{textAlign: 'center'}}>
          <YouTube video={this.props.video.url} style={videoStyle} autoplay={true}/>
        </div>
      </div>
    ) : (<div style={videoHeader}></div>);

    return (
      <div style={videoContainer}>
        <div style={videoStyle}>
          {content}
        </div>
        <VideoInfo video={this.props.video}/>
      </div>
    );
  }
}

export default connect(mapStateToProps)(VideoPlayer);
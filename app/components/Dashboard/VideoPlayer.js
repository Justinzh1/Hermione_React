import React from 'react';
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import actions from '../../actions/index';
import Messages from '../Messages';
import ReactPlayer from 'react-player';

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
  paddingLeft: "10px"
}

const videoContainer = {
  width: '100%',
  textAlign: 'center'
}

const videoStyle = {
  backgroundColor: 'black',
  textAlign: 'center'
}

const Player = {
  height: '420px',
  display: 'inline-block',
}

class YouTube extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    var end = (this.props.seek != 0) ? ("?autoplay=1&start=" + this.props.seek) : '?start=1&autoplay=0';
    var src = "https://www.youtube.com/embed/" + this.props.video + end;
    console.log("src " + src);
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
      url: null,
      playing: true,
      volume: 0.8,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
    }
  }

  onSeekChange(t) {
    this.setState({played : t});
  }

  render() {
    const {
      playing, volume,
      played, loaded, duration,
      playbackRate,
      youtubeConfig,
    } = this.state
    const SEPARATOR = ' · ';
    const url = "https://www.youtube.com/watch?v=";
    var content = (this.props.video) ? (
      <div>
        <div style={videoStyle}>
          <YouTube
            video={this.props.video.url}
            style={videoStyle}
            autoplay={true}
            seek={this.state.played}
          />
        </div>
      </div>
    ) : (<div style={videoHeader}></div>);
    const info = (this.props.orientation) ?
      (<VideoInfo
        video={this.props.video}
        jumpTo={(t) => this.onSeekChange(t)}
        />)
      :
      (<div> </div>);

    return (
      <div style={videoContainer}>
        <div style={videoStyle}>
          {content}
        </div>
        {info}
      </div>
    );
  }
}

export default connect(mapStateToProps)(VideoPlayer);

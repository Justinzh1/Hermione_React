import React from 'react';
import { connect } from 'react-redux'
import Messages from '../Messages';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom'
import screenfull from 'screenfull'

import ReactPlayer from 'react-player'

import PlayerControls from './PlayerControls';
import PlayerInfo from './PlayerInfo';
import KeyConcepts from './KeyConcepts';
import PlayerToggles from './PlayerToggles';

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    user: state.auth.user,
  };
};

var styles = {
  container: {
    backgroundColor: 'black',
    width: '100%',
    height: '400px'
  }
}

const youtubeConfig = {
  preloading: true,
  playerVars: {
    enablejsapi: 1
  }
}

class VideoPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toggled: false,
      infoSwitch: 1,
      ccSwitch: 0,
      boardSwitch: 0,
      timeSwitch: 0,
      url: '',
      playing: true,
      volume: 0.8,
      played: 0,
      loaded: 0,
      duration: 0,
      seeking: 0,
      playbackRate: 1.0,
    }
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.video) {
      this.load(nextProps.video.url);
    }
  }

  /**
    * React player functions  
    */

  load(url) {
    var link = "https://www.youtube.com/watch?v=" + url;
    console.log("loading " + link);
    this.setState({ url : link, loaded : 0, played : 0});
  }

  playPause() {
    this.setState({ playing: !this.state.playing })
  }

  stop(){
    this.setState({ url: null, playing: false })
  }

  setVolume(e) {
    this.setState({ volume: parseFloat(e.target.value) })
  }

  setPlaybackRate(e) {
    console.log(parseFloat(e.target.value))
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }

  onSeekMouseDown(e) {
    this.setState({ seeking: true })
  }

  onSeekChange(e) {
    this.setState({ played: parseFloat(e.target.value) })
  }

  onSeekMouseUp(e) {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }

  onProgress(state) {
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  onClickFullscreen() {
    screenfull.request(findDOMNode(this.player))
  }

  /**
    * Toggle functions 
    */

  flipInfo() {
    var flip = !this.state.infoSwitch;
    this.setState({infoSwitch : flip});
  }

  flipCc() {
    var flip = !this.state.ccSwitch;
    this.setState({ccSwitch : flip});
  }

  flipBoard() {
    var flip = !this.state.boardSwitch;
    this.setState({boardSwitch : flip});
  }

  flipTime() {
    var flip = !this.state.timeSwitch;
    this.setState({timeSwitch : flip});
  }

  render() {

    return (
      <div>
        <div style={styles.container}>
          <ReactPlayer 
            ref={player => { this.player = player }}
            className='react-player'
            width='100%'
            height='100%'
            url={this.state.url}
            playing={this.state.playing}
            playbackRate={this.state.playbackRate}
            volume={this.state.volume}
            onReady={() => console.log('ready')}
            onStart={() => console.log('onStart')}
            onPlay={() => this.setState({ playing: true })}
            onPause={() => this.setState({ playing: false })}
            onBuffer={() => console.log('onBuffer')}
            onEnded={() => this.setState({ playing: false })}
            onError={e => console.log('onError', e)}
            onProgress={this.onProgress}
            onDuration={duration => this.setState({ duration })}
            youtubeConfig={youtubeConfig}
            controls={true}
            />
        </div>
        <PlayerControls
          split={this.props.split}
          flipInfo={() => this.flipInfo()}
          flipCc={() => this.flipCc()}
          flipBoard={() => this.flipBoard()}
          flipTime={() => this.flipTime()}
          />
        <PlayerToggles
          video={this.props.video}
          caption={this.state.ccSwitch}
          timeline={this.state.timeSwitch}
          blackboard={this.state.boardSwitch}
          />
        <PlayerInfo 
          video={this.props.video}
          />
        <KeyConcepts
          timestamps={(this.props.video) ? this.props.video.timestamps : []}
          />
      </div>
    );
  }
}

PlayerControls.propTypes = {
  video: PropTypes.object
}

export default connect(mapStateToProps)(VideoPlayer);

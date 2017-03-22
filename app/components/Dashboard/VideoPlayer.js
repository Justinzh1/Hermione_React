import React from 'react';
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import actions from '../../actions/index';
import Messages from '../Messages';

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

class YouTube extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    var src = "https://www.youtube.com/embed/" + this.props.video;
    return (
      <iframe width="600px" height="400px"
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
          <h3 style={videoHeaderStyle} > {this.props.video.title} </h3>
        </div>
        <YouTube video={this.props.video.url} />
      </div>
    ) : (<div style={videoHeader}></div>);

    return (
      <div>
        {content}
      </div>
    );
  }
}

export default connect(mapStateToProps)(VideoPlayer);
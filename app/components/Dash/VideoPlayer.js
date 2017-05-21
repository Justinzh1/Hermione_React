import React from 'react';
import { connect } from 'react-redux'
import Messages from '../Messages';
import PropTypes from 'prop-types';

import PlayerControls from './PlayerControls';

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

class VideoPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      infoSwitch: 1,
      ccSwitch: 0,
      boardSwitch: 0,
      timeSwitch: 0
    }
  }

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
        </div>
        <PlayerControls
          split={this.props.split}
          flipInfo={() => this.flipInfo()}
          flipCc={() => this.flipCc()}
          flipBoard={() => this.flipBoard()}
          flipTime={() => this.flipTime()}
          />
      </div>
    );
  }
}

PlayerControls.propTypes = {
  video: PropTypes.object
}

export default connect(mapStateToProps)(VideoPlayer);

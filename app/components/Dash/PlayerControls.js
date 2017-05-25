import React from 'react';
import { connect } from 'react-redux'
import Messages from '../Messages';
import PropTypes from 'prop-types';

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    user: state.auth.user,
  };
};

var styles = {
  container: {
    border: '1.5px solid #EEEEEE',
    borderLeft: '0',
    textAlign: 'center'
  },
  buttons: {
    display: 'flex',
    margin: '0 auto',
    flexDirection: 'row',
    width: '300px',
    padding: '10px 30px',
    justifyContent:'space-between',
  },
  icon: {
    width: '30px',
    height: '30px'
  }
}

class PlayerControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.buttons}>
          <img style={styles.icon} src="/images/icon.png" onClick={() => this.props.flipInfo()}/>
          <img style={styles.icon} src="/images/cc.png" onClick={() => this.props.flipCc()}/>
          <img style={styles.icon} src="/images/board.png" onClick={() => this.props.flipBoard()}/>
          <img style={styles.icon} src="/images/time.png" onClick={() => this.props.flipTime()}/>
        </div>
      </div>
    );
  }
}

PlayerControls.propTypes = {
}

export default connect(mapStateToProps)(PlayerControls);

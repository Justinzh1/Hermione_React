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
    padding: '15px 20px',
    borderLeft: 0,
    borderTop: 0,
    borderRight: 0
  },
  title: {
    fontSize: '20px',
    color: 'black',
    fontFamily:'open sans',
    fontWeight:'600',
    margin: 0,
    padding: 0,
    lineHeight: '1.25em'
  },
  concept: {
    padding: '15px',
    backgroundColor:'#EEEEEE',
    display: 'inline-block',
    marginRight: '10px',
    marginTop: '10px'
  },
  text: {
    lineHeight: '1em',
    margin: 0,
    padding: 0,
  }
}

class PlayerToggles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: props.caption,
      timeline: props.timeline,
      blackboard: props.blackboard
    }
  }

  render() {
    var toggle = this.state.caption || this.state.timeline || this.state.blackboard;
    var content = (toggle) ? 
      (<div style={styles.container}>
      </div>) :
      (<div></div>)

    return (
      <div>
        {content}
      </div>
    );
  }
}

PlayerToggles.propTypes = {
  Video: PropTypes.object
}

export default connect(mapStateToProps)(PlayerToggles);

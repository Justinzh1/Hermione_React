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
  date: {
    fontSize: '12px',
    fontWeight: '600',
    color: 'rgb(0, 176, 218)',
    fontFamily: 'open sans',
    margin: 0,
    padding: 0,
    lineHeight: '1.25em'
  },
  desc: {
    lineHeight: '1.25em',
    margin: 0,
    padding: '10px 0'
  }
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

class PlayerInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    var dateobj = (this.props.video) ? new Date(this.props.video.date) : new Date();
    var date = months[dateobj.getMonth()] + " " + dateobj.getDay() + ", " + dateobj.getFullYear();
    var desc = (this.props.video && this.props.video.desc) ? this.props.video.desc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    var title = (this.props.video) ? this.props.video.title : '';
    return (
      <div style={styles.container}>
        <p style={styles.title}> {title} </p>
        <p style={styles.date}> {date} </p>
        <p style={styles.desc}> {desc} </p>
      </div>
    );
  }
}

PlayerInfo.propTypes = {
  video: PropTypes.object
}

export default connect(mapStateToProps)(PlayerInfo);

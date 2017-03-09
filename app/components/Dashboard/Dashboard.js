import React from 'react';
import { connect } from 'react-redux'
import Messages from '../Messages';

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

class Dashboard extends React.Component {
    render() {
        return (
            <h1> Welcome to the Dashboard </h1>
        );
    }
}

export default connect(mapStateToProps)(Dashboard);

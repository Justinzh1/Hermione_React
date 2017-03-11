import React from 'react';
import { connect } from 'react-redux'
import Messages from '../Messages';

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

class EnrollButton extends React.Component {
	constructor(props) {
		super(props);
	}

    render() {
        return (
            <h1></h1>
        );
    }
}

export default connect(mapStateToProps)(EnrollButton);

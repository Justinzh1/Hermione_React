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

class Concept extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleClick() {
    console.log("Clicked " + this.props.title + " " + this.props.time);
  }

  render() {
    return (
      <div 
        style={styles.concept}
        onClick={() => this.handleClick()}
        >
        <p style={styles.text}> {this.props.title} </p>
      </div>
    )
  }
}


class KeyConcepts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    var concepts = [];
    this.props.timestamps.map((t,index) => {
      var concept = (<Concept key={index} title={t.subject} time={t.time} parent={t.parent}/>);
      concepts.push(concept);
    });

    return (
      <div style={styles.container}>
        <p style={styles.title}> Key Concepts </p>
        {concepts}
      </div>
    );
  }
}

KeyConcepts.propTypes = {
  timestamps: PropTypes.array
}

export default connect(mapStateToProps)(KeyConcepts);

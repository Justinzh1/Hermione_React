import React from 'react';
import { connect } from 'react-redux'
import Messages from '../Messages';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import actions from '../../actions/index';

import ReactTooltip from 'react-tooltip';
import {
  DatePicker,
  Snackbar
} from 'material-ui';


const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    user: state.auth.user,
    input: state.input
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createVideo: (video, title, year) => dispatch(actions.course.createVideo(video, title, year)),
    clearMessages: () => dispatch(actions.course.clearMessages())
  }
}

var styles = {
  container: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: 'calc(100vh + 290px)',
    zIndex: 6
  },
  module: {
    margin: '0 auto',
    marginTop: '150px',
    width: '600px',
    height: 'auto',
    padding: '20px 60px',
    overflow: 'scroll',
    backgroundColor: 'white'
  },
  title: {
    fontFamily: 'roboto',
    fontSize: '36px',
    fontWeight: '600',
    textTransform: 'uppercase',
    color: 'black',
    marginBottom: '30px'
  },
  moduleContainer: {
    margin: '0 auto',
    width: '350px',
    textAlign: 'center'
  },
  icon: {
    height: '60px',
    width: '60px',
    marginBottom: '10px',
    marginTop: '30px'
  },
  text: {
    fontSize: '14px',
    marginBottom: '0px',
    lineHeight: '1.25em'
  },
  input: {
    width: '200px',
    marginTop: '5px',
    padding: '5px 10px',
    display: 'inline-block'
  },
  dateInput: {
    width: '200px',
    display:'inline-block'
  },
  dateInner: {
    width: '200px',
    boxShadow: '0',
  },
  label: {
    textTransform: 'uppercase',
    color: 'black',
    fontFamily: 'roboto',
    fontSize: '16px',
    fontWeight: '600',
    display:'inline-block',
    marginRight: '20px'
  },
  row: {
    marginTop: '30px'
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '350px',
    textAlign: 'right'
  }
}

class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snack: false,
      clicked: false,
      open: false,
      date: false,
      video: {
        title: '',
        id: '',
        url: '',
        len: '',
        date: ''
      }
    }
  }

  disableDate() {
    this.setState({date : true});
  }

  enableDate() {
    this.setState({date : false});
  }

  handleClick() {
    var flip = !this.state.clicked;
    this.setState({clicked : flip});
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
  }

  updateForm(key, event, value) {
    var entry = this.state.video;
    if (key != 'url') {
      entry[key] = value;
    } else {
      value = this.youtube_parser(value);
      entry[key] = value;
    }
    this.setState({video : entry});
  }

  handleFilter(e) {
    this.props.filterVideos(e.target.value);
  }

  updateParent() {
    this.props.rerender();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({snack: true})
  }

  handleClickOutside() {
    if (!this.state.date) {
      this.props.close();
    }
  }

  handleSubmit() {
    console.log("Submit " + this.props.title + " " + this.props.year + " " + this.state.video);
    this.props.createVideo(this.state.video, this.props.title, this.props.year);
  }

  handleRequestClose() {
    this.setState({
      snackbar: false,
    });
    this.props.clearMessages();
  }

  render() {
    var suggestedID = "Suggested ID: " + this.props.suggestedID;
    return (
      <div style={styles.module}>
        <ReactTooltip place="left" type="dark" effect="solid" />
          <div style={styles.moduleContainer}>
            <img style={styles.icon} src="/images/plus_square.png"/>
            <h1 style={styles.title}> Video </h1>
            <p style={styles.text}> Create in a class by fillowing out the information below. </p>
            <div style={styles.inputContainer}>
              <div style={styles.row}>
                <p style={styles.label}>video title</p>
                <input style={styles.input} onChange={(e,v) => this.updateForm("title", e, e.target.value)}></input>
              </div>
              <div style={styles.row}>
                <p style={styles.label} data-tip={suggestedID} >video id</p>
                <input style={styles.input} onChange={(e,v) => this.updateForm("id", e, e.target.value)}></input>
              </div>
              <div style={styles.row}>
                <p style={styles.label} data-tip={suggestedID}>url</p>
                <input style={styles.input} onChange={(e,v) => this.updateForm("url", e, e.target.value)}></input>
              </div>
              <div style={styles.row}>
                <p style={styles.label}>length</p>
                <input style={styles.input} onChange={(e,v) => this.updateForm("len", e, e.target.value)}></input>
              </div>
              <div style={styles.row}>
                <p style={styles.label}>date</p>
                <DatePicker
                  id={"picker"}
                  style={styles.dateInput}
                  textFieldStyle={styles.dateInner}
                  hintText=""
                  mode="landscape"
                  onClick={() => this.disableDate()}
                  onChange={(e, d) => {
                    this.updateForm("date", e, d.toLocaleDateString());
                    this.enableDate();
                  }}
                  onDismiss={() => this.enableDate()}
                />
              </div>
            </div>
            <br />
            <img style={styles.icon} src="/images/go.png" onClick={() => this.handleSubmit()}/>
          </div>
      </div>
    );
  }
}

Dialog = onClickOutside(Dialog);

class CreateVideoDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbar: false
    }
  }

  render() {
    var module = (this.props.active) ?
      (<div style={styles.container}>
        <Dialog
          createVideo={(c) => this.props.createVideo(c)}
          close={() => this.props.close()}
          suggestedID={this.props.suggestedID}
          year={this.props.year}
          title={this.props.title}
          />
      </div>) :
      (<div></div>);

    return (
      <div>
        <Snackbar
          open={this.state.snackbar}
          message={this.props.message || "No Message"}
          autoHideDuration={4000}
          onRequestClose={() => this.handleRequestClose()}
        />
        {module}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateVideoDialog);

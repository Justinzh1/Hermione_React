import React from 'react';
import { connect } from 'react-redux'
import actions from '../../actions/index';


import {
  Divider,
  TextField, 
  Subheader,
  Dialog,
  FlatButton,
  Raisedbutton,
  DatePicker,
  Snackbar
} from 'material-ui';

import ActionSearch from 'material-ui/svg-icons/action/search';
import AvPlaylistAdd from 'material-ui/svg-icons/av/playlist-add';

const mapStateToProps = (state) => {
  return {  
    messages: state.messages,
    user: state.auth.user,
    message: state.course.message
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createVideo: (video, title, year) => dispatch(actions.course.createVideo(video, title, year))
  }
}

const FilterContainer = {
  padding: "10px 20px"
}

const SubheaderStyle = {
  paddingLeft: '20px'
}

const searchStyle={
  display: 'inline-block',
  position: 'relative',
  top: "10px",
  marginRight: '6px',
  color: "#EEE",
  left: "16px"
}

const subheaderStyle={
  display: 'inline-block'
}

const searchBarContainer={
  display: 'inline-block'
}

const inputContainer={ 
  display:"inline-block",
  width: "100%",
  left: "16px"
}

const inputStyle={
  outline: 'none',
  width: '100%',
  padding: '5px 10px',
  fontSize: '14px'
}

const dialogBody={
  margin: 0,
  padding: 0,
  paddingLeft: "12px"
}

class FilterVideos extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      snack: false,
      clicked: false,
      open: false,
      video: {
        title: '',
        id: '',
        url: '',
        len: '',
        date: ''
      }
    }
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

  updateForm(key, event, value) {
    var entry = this.state.video;
    entry[key] = value;
    this.setState(entry);
  }

  handleFilter(e) {
    console.log(e.target.value);
    this.props.filterVideos(e.target.value);
  }

  updateParent() {
    this.props.rerender();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({snack: true})
  }


  // TODO
  // componentShouldUpdate after successfully updating/adding video at this stage
  submit() {
    if (this.props.title && this.props.year) {
      this.props.createVideo(this.state.video, this.props.title, this.props.year);
      this.setState({open: false});
    }
  }

  handleSearch() {
    var flip = !this.state.clicked;
    this.setState({clicked : flip});
  }

  handleRequestClose() {
    this.setState({snack : false});
  }

  updateMessage() {
    if (this.props.message) {
      return (
        <Snackbar
          open={this.state.snack}
          message={this.props.message}
          autoHideDuration={3000}
          onRequestClose={() => this.handleRequestClose()}
        />
      )
    }
  }

  render() {
    const message = this.updateMessage();

    var searchBar = (this.state.clicked) ? (
      <div>
        <div style={FilterContainer}> 
          <input 
            style={inputStyle} 
            placeholder={"Filter by"}
            onChange={(e) => this.handleFilter(e)}
          >
          </input>
        </div>
        <Subheader style={SubheaderStyle}> Videos </Subheader>
      </div>
    ) : (
      <div>
        <Subheader style={SubheaderStyle}> Videos </Subheader>
      </div>
    );
      
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={() => this.handleClose()}
      />,
      <FlatButton
        label="Add"
        primary={true}
        onTouchTap={() => this.submit()}
      />,
    ];

    return (
      <div
        style={inputContainer}
        >
        {message}
        <Dialog
          title="Add a new Video"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
          bodyStyle={dialogBody}
        >
          <div className="row">
            <div className="col col-md-6">
              <TextField
                style={inputStyle}
                fullWidth={true}
                hintText="ex. Lecture 1"
                floatingLabelText="Video Title"
                onChange={(e,v) => this.updateForm("title", e, v)}
              />
            </div>
            <div className="col col-md-2">
              <TextField
                style={inputStyle}
                hintText="ex. 1"
                floatingLabelText="Video ID"
                onChange={(e,v) => this.updateForm("id", e, parseInt(v))}
              />
            </div>
          </div>
          <div className="row">
            <div className="col col-md-6">
              <TextField
                style={inputStyle}
                fullWidth={true}
                hintText="ex. 1ak34j"
                floatingLabelText="URL"
                onChange={(e,v) => this.updateForm("url", e, v)}
              />
            </div>
            <div className="col col-md-2">
              <TextField
                style={inputStyle}
                hintText="ex. 61"
                floatingLabelText="Length"
                onChange={(e,v) => this.updateForm("len", e, parseInt(v))}
              />
            </div>
          </div>
          <div className="row" style={{paddingLeft: "12px", paddingTop: "24px", width: "70%"}}>
              <DatePicker 
                style={inputStyle} 
                hintText="Date" 
                mode="landscape" 
                onChange={(e, d) => {
                  console.log("DATE " + d.toLocaleDateString());
                  this.updateForm("date", e, d.toLocaleDateString());
                }}
              />
          </div>
        </Dialog>

        <ActionSearch 
          style={searchStyle}
          hoverColor={"#003262"}
          onClick={() => this.handleSearch()}
        />
        <AvPlaylistAdd
          style={searchStyle}
          hoverColor={"#003262"}
          onClick={() => this.handleOpen()}
        />
        {searchBar}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterVideos);
import React from 'react';
import { connect } from 'react-redux'
import actions from '../../actions/index';


import {
  Divider,
  TextField
} from 'material-ui';

import ActionSearch from 'material-ui/svg-icons/action/search';
import AvPlaylistAdd from 'material-ui/svg-icons/av/playlist-add';

const mapStateToProps = (state) => {
  return {  
    messages: state.messages,
    user: state.auth.user
  };
};

const searchStyle={
  display: 'inline-block',
  position: 'relative',
  top: "10px",
  marginRight: '6px',
  color: "#EEE",
  left: "16px"
}

const inputContainer={ 
  display:"inline-block",
  width: "100%",
  left: "16px"
}

const inputStyle={
  width: "67%",
  marginLeft: '16px'
}

class FilterVideos extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
      return (
        <div
          style={inputContainer}
          >
          <ActionSearch 
            style={searchStyle}
          />
          <AvPlaylistAdd
            style={searchStyle}
          />
          <TextField
            fullWidth={true}
            style={inputStyle}
            hintText="Filter by"
          />
        </div>
      );
  }
}

export default connect(mapStateToProps)(FilterVideos);
import React from 'react';
import { connect } from 'react-redux'
import Messages from '../Messages';
import PropTypes from 'prop-types';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import EnrollDialog from './EnrollDialog';
import CreateClassDialog from './CreateClassDialog';
import CreateVideoDialog from './CreateVideoDialog';

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    user: state.auth.user,
  };
};

var styles = {
  container: {
    width: '100%',
    padding: '24px',
    paddingBottom: '10px'
  },
  header: {
    fontFamily: 'open sans',
    fontSize: '40px',
    fontWeight: '600',
    color: 'black',
    padding: 0,
    margin: 0
  },
  small: {
    fontFamily: 'open sans',
    fontSize: '40px',
    fontWeight: '100',
    color: 'black',
    padding: 0,
    margin: 0
  },
  desc: {
    fontFamily: 'open sans',
    fontWeight: '600',
    color: '#95989A',
    marginTop: '10px',
    lineHeight: '1.25em'
  },
  buttons: {
    borderTop: '1.5px #EEEEEE solid',
    padding: '10px 24px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  icon: {
    width: '50px',
    height: '50px'
  },
  plus: {
    width: '50px',
    height: '50px',
    padding: 0
  },
  search: {
    borderTop: '1.5px #EEEEE solid',
    borderBottom: 'none',
    borderLeft: 'none',
    transition: '500ms',
  },
  input: {
    fontSize: '16px',
    width: '100%',
    border: 'none',
    borderTop: '1.5px #EEEEEE solid',
    borderRight: '1px #EEEEEE solid',
    padding: '5px 15px',
    ':focus': {
      boxShadow: '0 !important',
      outline: '0 !important'
    }
  },
  none: {
    display: 'none',
  }
}

class SidebarHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchSwitch: 0,
      enrollSwitch: 0,
      createClassSwitch: 0,
      createVideoSwitch: 0,
      snack: false
    }
  }

  setActiveCourse(i) {
    this.props.setActiveCourse(i);
  }

  flipSearch() {
    var flip = !this.state.searchSwitch;
    this.setState({searchSwitch : flip});
  }

  flipEnroll() {
    var flip = !this.state.searchSwitch;
    this.setState({enrollSwitch : flip});
  }

  closeDialog() {
    this.setState({enrollSwitch : false, createClassSwitch : false, createVideoSwitch : false, searchSwitch : false});
  }


  flipCreateClass() {
    var flip = !this.state.createClassSwitch;
    this.setState({createClassSwitch : flip});
  }

  flipCreateVideo() {
    var flip = !this.state.createVideoSwitch;
    this.setState({createVideoSwitch : flip});
  }

  handleFilter(e) {
    this.props.filterVideos(e.target.value);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.messages) {
      this.setState({
        searchSwitch: 0,
        enrollSwitch: 0,
        createClassSwitch: 0,
        createVideoSwitch: 0,
        snack: true
      })
    }
  }

  render() {
    var header = (this.props.course) ?
      (<h1 style={styles.header}> {this.props.course.title} <small style={styles.small}> {this.props.course.year} </small></h1>)  :
      (<h1 style={styles.header}> No Course </h1>);

    var desc = (this.props.course) ?
      (<p style={styles.desc}> {this.props.course.description} </p>) :
      (<p style={styles.desc}> Click below to enroll </p>);

    var add = (this.props.user.professor) ?
      (<IconMenu
        iconButtonElement={<IconButton style={{padding: 0}} iconStyle={styles.icon}><img src='images/plus.png'></img></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        >
          <MenuItem onClick={() => this.flipEnroll()} primaryText="Enroll in Class" />
          <MenuItem onClick={() => this.flipCreateClass()} primaryText="Create Class" />
          <MenuItem onClick={() => this.flipCreateVideo()} primaryText="Create Video" />
      </IconMenu>) :
      (<img style={{padding: 0}} style={styles.icon} src='images/plus.png'></img>);

    var classes = [];
    if (this.props.courses) {
      for (var i = 0; i < this.props.courses.length; i++) {
        classes.push(
          (<MenuItem key={i} onClick={() => this.setActiveCourse(i)} primaryText={this.props.courses[i].title} />)
        );
      }
    }

    var select = (this.props.courses) ?
      (<IconMenu
        iconButtonElement={<IconButton style={{padding: 0}} iconStyle={styles.icon}><img src='images/list.png'></img></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        >
          {classes}
      </IconMenu>) :
    (<img style={{padding: 0}} style={styles.icon} src='images/list.png'></img>);

    var search = (this.state.searchSwitch) ?
      (<div style={styles.search}>
        <input
          style={styles.input}
          placeholder={"Filter by"}
          onChange={(e) => this.handleFilter(e)}
          >
        </input>
      </div>) :
      (<div style={styles.none}>
        <input
          style={styles.input}
          placeholder={"Filter by"}
          onChange={(e) => this.handleFilter(e)}
          >
        </input>
      </div>);

    return (
      <div>
        <EnrollDialog flipEnroll={() => this.flipEnroll()} close={() => this.closeDialog()} active={this.state.enrollSwitch} snack={this.state.snack}/>
        <CreateClassDialog flipCreateClass={() => this.flipCreateClass()} close={() => this.closeDialog()} active={this.state.createClassSwitch} snack={this.state.snack}/>
        <CreateVideoDialog flipCreateVideo={() => this.flipCreateVideo()} close={() => this.closeDialog()} active={this.state.createVideoSwitch} snack={this.state.snack}/>
        <div style={styles.container}>
          {header}
          {desc}
        </div>
        <div style={styles.buttons}>
          <div style={styles.icon} onClick={() => this.flipSearch()}>
            <img
              style={styles.icon}
              src='images/search.png'
              >
            </img>
          </div>
          {select}
          {add}
        </div>
        {search}
      </div>
    );
  }
}

SidebarHeader.propTypes = {
  course: PropTypes.object
}

export default connect(mapStateToProps)(SidebarHeader);

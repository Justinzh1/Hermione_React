import React from 'react';
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import Messages from '../Messages';

import VideoTopics from './VideoTopics';

const mapStateToProps = (state) => {
  return {  
    messages: state.messages,
    user: state.auth.user
  };
};

const VideoInfoContainer = {
	margin: '0'
}

const VideoInfoHeaderContainer = {
	border: '1.5px #eee solid',
	borderLeft: '0',
	margin: '0',
	padding: '0'
}

const VideoInfoHeader = {
	fontSize: '20px',
	color: 'black',
	fontWeight: '500',
	margin: '0',
	padding: '15px 0',
	textAlign: 'left'
}

const TitleContainer = {
	border: '1.5px #eee solid',
	borderLeft: '0',
	padding: '0 16px',
	borderRight: '0'
}

const NoPadding = {
	padding: '0'
}

class VideoInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render() {
		if (this.props.video) {
			return (
				<div style={VideoInfoContainer}>
					<div className="row" style={VideoInfoHeaderContainer}>
						<div className="col col-md-8" style={NoPadding}>
							<div style={TitleContainer}>
								<h1 style={VideoInfoHeader}> {this.props.video.title} </h1>
							</div>
						</div>
						<div className="col col-md-4" style={NoPadding}>
							<VideoTopics 
								timestamps={this.props.video.timestamps}
								orientation={0} 
								jumpTo={(t) => this.props.jumpTo(t)}
							/>
						</div>
					</div>
				</div>
			)
		}
		return (
			<div></div>
		)
	}
}

VideoInfo.propTypes = {
	video: React.PropTypes.shape({
		title: React.PropTypes.string.isRequired,
		id: React.PropTypes.number.isRequired,
		link: React.PropTypes.string,
		date: React.PropTypes.string,
		timestamps: React.PropTypes.array,
		length: React.PropTypes.number
	})
}

export default connect(mapStateToProps)(VideoInfo);
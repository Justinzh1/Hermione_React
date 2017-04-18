import React from 'react';
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import Messages from '../Messages';

const mapStateToProps = (state) => {
  return {  
    messages: state.messages,
    user: state.auth.user
  };
};

const TopicsContainer = {
	textAlign: 'left',
	display: 'inline-block',
	borderLeft: '1.5px #eee solid',
	padding: '0 20px'
}

const HeaderText = {
	paddingTop: '16px',
	fontSize: '14px',
	color: 'grey',
	margin: '0'
}

const TopicItemStyle = {
	display: 'inline-block',
	marginRight: '6px',
}

const ItemText = {
	margin: '0',
	fontSize: '18px',
	fontWeight: '400',
	color: 'black'
}

const CurrentText = {
	fontSize: '24px',
	fontWeight: '500',
	margin: 0,
	color: 'black'
}

class TopicItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	handleClick() {
		this.props.jumpTo(this.props.time);
	}

	render() {
		return (
			<div
			 onClick={() => this.handleClick()}
			 style={TopicItemStyle}
			>
				<p style={ItemText}> {this.props.name} </p>
			</div>
		)
	}
}

class VideoTopics extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: 0,
		}
	}

	getHorizontal(topics, current) {
		return (
			<div className="row" style={TopicsContainer}>
				<div className="col col-md-3">
					<p> style={HeaderText}> Current </p>
					{current}
				</div>
				<div className="col col-md-5">
					<p style={HeaderText}> Topics </p>
					{topics}
				</div>
			</div>
		)
	}

	getVertical(topics, current) {
		return (
			<div style={TopicsContainer}>
				<p style={HeaderText}> Current </p>
				{current}
				<p style={HeaderText}> Topics </p>
				{topics}
			</div>
		)
	}

	getCurrentTopic() {
		const currTopic = this.props.timestamps[this.state.active];
		const curr = (
			<div>
				<p style={CurrentText}> {currTopic.subject.toUpperCase()} </p>
			</div>
		)
		return curr;
	}

	jumpTo(t) {
		this.props.jumpTo(t);
	}

	getTopics() {
		const videoTopics = [];
		this.props.timestamps.map((t,i) => {
			var topicEntry = (
				<TopicItem 
					name={t.subject} 
					time={t.time} 
					key={i}
					jumpTo={(t) => this.jumpTo(t)}
				/>
			);
			videoTopics.push(topicEntry);
		});
		return videoTopics;
	}

	render() {
		if (this.props.timestamps.length == 0) {
			return (<div></div>);
		}
		const topics = this.getTopics();
		const current = this.getCurrentTopic();
		return this.props.orientation ? this.getHorizontal(topics,current) : this.getVertical(topics,current);
	}
}

VideoTopics.propTypes = {
	timestamps: React.PropTypes.array
}

export default connect(mapStateToProps)(VideoTopics);
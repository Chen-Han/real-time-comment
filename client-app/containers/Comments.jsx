import React from "react/addons";
import {getCurrentTime} from "YTInterface";
import Comment from "components/Comment";

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var comments = {};

var Comments = React.createClass({
	getInitialState: function () {
		return {currentTime: getCurrentTime()};
	},
	componentDidMount: function () {
		this.interval = setInterval(this.tick, 500);
		// Attach an asynchronous callback to read the data at our posts reference
	},
	componentWillUnmount: function() {
		clearInterval(this.interval);
	},
	tick: function () {
		var currentTime = getCurrentTime();
		var commentsTags = [];
		for (var comment in comments) {
			if (comments.hasOwnProperty(comment)) {
				if ((currentTime - comments[comment].time)>0 && (currentTime - comments[comment].time)<6) {
					commentsTags.push(<Comment key={comments[comment].time} text={comments[comment].text} />);
				}
			}
		}
		this.setState({currentTime: currentTime, comments: commentsTags});
	},
	render: function () {
		return (<div>
			{JSON.stringify(this.state.items)}
			<div className="comment-column">
			<ReactCSSTransitionGroup transitionName="slide">
				{this.state.comments}
			</ReactCSSTransitionGroup>
			</div>
		</div>);
	}
});

export default Comments;

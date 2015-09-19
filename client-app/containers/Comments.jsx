import React from "react/addons";
import {getCurrentTime} from "YTInterface";
import Comment from "components/Comment";
// import "firebase/firebase";
// import "firebase/reactfire.min.js";

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var comments = [{time: 1, text: "LOL1"},
	{time: 2, text: "LOL2"},
	{time: 3, text: "LOL3"},
	{time: 4, text: "LOL4"},
	{time: 5, text: "LOL5"},
	{time: 6, text: "LOL6"},
	{time: 7, text: "LOL7"},
	{time: 8, text: "LOL8"}];

var Comments = React.createClass({
	getInitialState: function() {
		return {secondsElapsed: 0};
	},
	tick: function () {
		var secondsElapsed = this.state.secondsElapsed + 1;
		var commentsTags = [];
		for (var comment of comments) {
			if (secondsElapsed === comment.time) {
				commentsTags.push(<Comment key={comment.time} text={comment.text} />);
			}
		}
		this.setState({secondsElapsed: this.state.secondsElapsed + 1, comments: commentsTags});
	},
	componentDidMount: function() {
		this.interval = setInterval(this.tick, 1000);
	},
	componentWillUnmount: function() {
		clearInterval(this.interval);
	},
	render: function () {
		return (<div>
			<ReactCSSTransitionGroup transitionName="slide">
				{this.state.comments}
			</ReactCSSTransitionGroup>
		</div>);
	}
});

export default Comments;

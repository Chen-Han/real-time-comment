import React from "react/addons";
import {getCurrentTime} from "YTInterface";
import Comment from "components/Comment";

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var comments = {};

function getVideoId(){
	return /www.youtube.com\/watch\?v=(.+)/
	.exec(window.location.href)[1];
}

var ref = new Firebase("https://real-time-comment.firebaseio.com/").child(getVideoId());

var Comments = React.createClass({
	getInitialState: function () {
		return {currentTime: getCurrentTime()};
	},
	componentDidMount: function () {
		this.interval = setInterval(this.tick, 500);
		// Attach an asynchronous callback to read the data at our posts reference
		ref.on("value", function (snapshot) {
			if (!snapshot.val() || snapshot.val()===null) {
				comments = {};
			}
			else {
				comments = snapshot.val();
			}
		}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
		});
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

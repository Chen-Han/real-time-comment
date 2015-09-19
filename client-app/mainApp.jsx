import React from "react";
import {withCurrentTime} from "YTInterface";
import {createCommentsContainer} from "YTDOM";
import "scss/index.scss";
import Comments from "containers/Comments";

var Timer = React.createClass({
	getInitialState: function() {
		return {secondsElapsed: 0};
	},
	tick: function() {
		this.setState({secondsElapsed: this.state.secondsElapsed + 1});
	},
	componentDidMount: function() {
		this.interval = setInterval(this.tick, 1000);
	},
	componentWillUnmount: function() {
		clearInterval(this.interval);
	},
	render: function() {
		return (
			<div>Seconds Elapsed: {this.state.secondsElapsed}</div>
		);
	}
});

// React.render(<Timer />, document.getElementById("container"));
React.render(<Timer />, document.getElementsByClassName("watch-title-container")[0]);

React.render(<Comments />, createCommentsContainer());

withCurrentTime(function(time){
	console.log(time);
});
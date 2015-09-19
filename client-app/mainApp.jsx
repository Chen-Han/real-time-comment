import React from "react";

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

console.log("OMG1");
var ytplayer = document.getElementById("movie_player");
ytplayer.getCurrentTime();
console.log(ytplayer.getCurrentTime());

React.render(<Timer />, document.getElementById("container"));

console.log("OMG");
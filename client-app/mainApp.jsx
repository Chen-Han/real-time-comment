import React from "react";
import {withCurrentTime} from "YTInterface";
import scss from "scss/style.scss"


var Timer = React.createClass({
	getInitialState: function() {
		return {secondsElapsed: 0,comments:[1,2,3,6,4,7,4,5,6,6,10,12,14,10.2,13,12,15,31,21,23,32,14,18,19,21,22,26,28,73,3,5,5,9,757,3,32,0]};
	},
	tick: function() {
		var comments = this.state.comments;
		this.setState({secondsElapsed: this.state.secondsElapsed + 1,comments:this.state.comments});
	},
	componentDidMount: function() {

		this.interval = setInterval(this.tick, 200);
	},
	componentWillUnmount: function() {
		clearInterval(this.interval);
	},
	render: function() {
		var currTime = getCurrTime(); 

		return (
			<ul className="floating-comment-container" id="comments">
							{						
								this.state.comments
								
								.filter(function(i){
									return ((currTime - 1) <= i) && (i<(currTime));
								})

								.map(function(i,index){
									return (
											<li key={index} className="floating-comment float-to-right-end">comment at sec {i}</li>
										);
								})
						}
						</ul>
		);
	}
});

// console.log("OMG1");
// var ytplayer = document.getElementById("movie_player");
// ytplayer.getCurrentTime();
// console.log(ytplayer.getCurrentTime());

// React.render(<Timer />, document.getElementById("container"));
React.render(<Timer/>, document.getElementsByClassName("watch-title-container")[0]);

withCurrentTime(function(time){
	console.log(time);
});


function getCurrTime(variables) {
		    var ret = {};

		    var scriptContent =
		        "document.body.setAttribute('playTime',yt.player.getPlayerByElement(document.getElementById('player-api')).getCurrentTime())"

		    var script = document.createElement('script');
		    script.id = 'tmpScript';
		    script.appendChild(document.createTextNode(scriptContent));
		    (document.body || document.head || document.documentElement).appendChild(script);

		    var e = document.getElementById("tmpScript"); 
		    e.parentNode.removeChild(e);

		    return parseFloat(document.body.getAttribute("playTime"));
		}
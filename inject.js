

var injected = injected || (function(){
	// chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
	// 	var data = {};
	// 	if(methods.hasOwnProperty(request.method)){
	// 		data = methods[request.method]();
	// 	}
	// 	sendResponse({data:data});
	// 	return true;
	// });
	
	function executeWithWindowVariables(scriptFunc){
		var script = document.createElement('script');
		script.appendChild(document.createTextNode('('+ scriptFunc +')();'));
		(document.body || document.head || document.documentElement).appendChild(script);
	}

	/*
		withCurrTime must be injected to a tab via either content_script or 
			`chrome.tabs.executeScript`
		callback is called with currentTime of the video as the first arguement

	*/
	function withCurrTime(callback){
		document.removeEventListener("currTime");
		document.addEventListener("currTime",function(e){
			console.log("Curr time is " + e.detail);
			callback(e.detail);
		});

		executeWithWindowVariables(scriptFunc);
		
		function scriptFunc(){ //the function to execute inside <script> tag
			var player = window.yt.player.getPlayerByElement(document.getElementById("player-api"));

			raiseEvent("currTime",player.getCurrentTime());
			function raiseEvent(eventName,customData){
				document.dispatchEvent(new CustomEvent(eventName,{
					detail:customData
				}));
			}
			
		}
	}
/*
	Even more crazy ideas: 
		comment for netflx
		comment for Facebook video, (pull comment from fb)
		
*/



	/*
		comments: [comment ...]
		comment:{
			"text":String "the video is fun lol"
			"time":number 12.365
		}
		timeContext: number, in seconds, 
			display all comments `currTime` ago on the video

		It requires withCurrTime
	*/

	function displayComments(comments,currTime){
		var toBeDisplayed = comments
		withCurrTime(function(currTime){
			comments.forEach(function(comment,index){
				function (displayable){
					($("#movie_player")).after(displayable);
					setTimeout(function(){
						displayable.remove();
					},5000);
				}(toDisplayable(comment));

			});
		});
	}


	/*

	
	@return a node to be added corresponding to each comment
	*/
	function toDisplayable(comment,currTime){

		return $("<div>",{
			text:comment.text,
			class:"floating-comment " + getAnimationClass(comment)
		}).css(getPos(comment));

		function getAnimationClass(comment,currTime){
			return comment.animation || "";
		}

		function getPos(comment,currTime){
			var pos = {};
			if(Math.random()>0.5){
				return {
					"left":parseInt(Math.floor(Math.random()* 300)) + "px",
					"top":parseInt(Math.floor(Math.random()* 300)) + "px"
				};
			}else{
				return{
					"right":parseInt(Math.floor(Math.random()* 300)) + "px",
					"bottom":parseInt(Math.floor(Math.random()* 300)) + "px"
				};
			}
		}
	}

	displayComments([{
		time:0,
		text:"Hello WOrld!!!",
		animation:"fade-in"
	},{
		time:1,
		text:"yo yo yo",
		animation:"floating-right"
	}]);

	return true;
}());
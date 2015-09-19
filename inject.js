

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
		comments: [comment ...]
		comment:{
			"text":String "the video is fun lol"
			"time":number 12.365
		}
		timeContext: number, in seconds, 
			display all comments `timeContext` ago on the video

		It requires withCurrTime
	*/

	function displayComments(comments,timeContext){
		withCurrTime(function(currTime){
			var p = $("<p>",{text:comments[0].text,class:"floating-comment"});

			$("#movie_player").appendChild(p);
		})
	}
	return true;
}());
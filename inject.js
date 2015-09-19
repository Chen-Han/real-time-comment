

var injected = injected || (function(){

	var tick = 0.2;
	var canceled = false;
	// chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
	// 	var data = {};
	// 	if(methods.hasOwnProperty(request.method)){
	// 		data = methods[request.method]();
	// 	}
	// 	sendResponse({data:data});
	// 	return true;
	// });

	function getCurrTime(variables) {
	    var ret = {};

	    var scriptContent =
	        "document.body.setAttribute('playTime',yt.player.getPlayerByElement(document.getElementById('player-api')).getCurrentTime())"

	    var script = document.createElement('script');
	    script.id = 'tmpScript';
	    script.appendChild(document.createTextNode(scriptContent));
	    (document.body || document.head || document.documentElement).appendChild(script);

	    $("#tmpScript").remove();

	    return parseFloat(document.body.getAttribute("playTime"));
	}
	
	function executeWithWindowVariables(scriptFunc){
		var element = document.getElementById("tmp");
		if(element)element.parentNode.removeChild(element);
		var script = document.createElement('script');
		script.id="tmp";
		script.appendChild(document.createTextNode('('+ scriptFunc +')();'));
		(document.body || document.head || document.documentElement).appendChild(script);
	}

	/*
		withCurrTime must be injected to a tab via either content_script or 
			`chrome.tabs.executeScript`
		callback is called with currentTime of the video as the first arguement

	*/
	function withCurrTime(callback){
		callback(getCurrTime());
		return;
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
		currTime: number, in seconds, 
			display all comments `currTime` ago on the video

		It requires withCurrTime
	*/

	function displayComments(comments,currTime){
			comments.forEach(function(comment,index){
				(function (node){
					($("#movie_player")).after(node);
					setTimeout(function(){
						node.remove();
					},4000);
				})(asNode(comment));
			});
	}


	/*

	
	@return a node to be added corresponding to each comment
	*/
	function asNode(comment,currTime){

		return $("<div>",{
			text:comment.text,
			class:"floating-comment " + getStyleAnimation(comment)
		}).css(getStylePos(comment));

		function getStyleAnimation(comment,currTime){
			return comment.animation || "";
			// function getAnimationProg (commentTime,currTime){
			// 	return (currTime - commentTime)/5;
			// }
			// if(!comment.animation){
			// 	return {};
			// }
			// var animationProg = getAnimationProg(comment.time,currTime);

			// switch(comment.animation){
			// 	case "fade-in":
			// 		var iniOpacity = 0.7;
			// 		var iniScale = 0.5;
			// 		var finalOpacity =1;
			// 		var finalScale = 1;
			// 		var duration = 5; //5s

			// 		var calculatedScale = (finalScale - iniScale) * animationProg;
			// 		return {
			// 			opacity:(finalOpacity -  iniOpacity)  * animationProg,
			// 			"-ms-transform": "scale("+calculatedScale+","+calculatedScale+")", /* IE 9 */
			// 		    "-webkit-transform": "scale("+calculatedScale+","+calculatedScale+")", /* Safari */
			// 		    "transform": "scale("+calculatedScale+","+calculatedScale+")"
			// 		}
			// 	case "floating-right":
			// 		var iniTransformX = 0;
			// 		var finalTransformX = 50;
			// 		var calculatedTransform = Math.floor((finalTransformX - iniTransformX) * animationProg) + "px";
			// 		return {
			// 				"-ms-transform": "translate("+calculatedTransform+",0)", /* IE 9 */
			// 			   	"-webkit-transform": "translate("+calculatedTransform+",0)", /* Safari */
			// 			    "transform": "translate("+calculatedTransform+",0)",
			// 		}
			// 	default:
			// 	return null;
			// }
		}

		function getStylePos(comment,currTime){
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

	function startDisplay(comments){
		canceled = false;
		//display all comments from 1 sec ago and now
		withCurrTime(function(currTime){
			displayComments(comments.filter(function(i){
				return ((currTime-1)< i.time ) && (i.time <= currTime); 
			}));
			
		});
		//continuously display new comments in an interval 
		(function displayAllInTick(){
			withCurrTime(function(currTime){
				displayComments(comments.filter(function(i){
					return ((currTime-tick) < i.time) && (i.time <= currTime);
				}));
				if(!canceled){
					setTimeout(displayAllInTick,tick*1000);
				}
			});
			
		})();
	}

	function clearDisplay(){
		//clear all comments
		$(".floating-comment").remove();
	}
	function pauseDisplay(){
		canceled = true;
	}
	
	startDisplay([{
			   time:18,
               text:"Hello WOrld!!!",
               animation:"fade-in"
       },{
               time:10,
               text:"yo yo yo",
               animation:"floating-right"
       }]); 
	setTimeout(pauseDisplay,18000);
	return true;
}());
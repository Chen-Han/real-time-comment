/*
	Even more crazy ideas: 
		comment for netflx
		comment for Facebook video, (pull comment from fb)
		
*/

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

	/*
		withCurrTime must be injected to a tab via either content_script or 
			`chrome.tabs.executeScript`
		callback is called with currentTime of the video as the first arguement

	*/
	function withCurrTime(callback){
		callback(getCurrTime());

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
	}




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
	/*
		take some comments and start displaying them, 
			we first display all comments that are within 1 sec of curr time
			next, we go display all comments that are within 1 `tick` ago of curr time 

		Notice that comments CAN BE MODIFIED during displaying

	*/
	function startDisplay(comments){
		canceled = false;

		//display all comments from 1 sec ago and now
		var secAgo = 1;
		withCurrTime(function(currTime){
			displayComments(comments.filter(function(i){
				return ((currTime-secAgo)< i.time ) && (i.time <= currTime); 
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
	

	var allComments = [{
			   time:18,
               text:"Hello WOrld!!!",
               animation:"fade-in"
       },{
               time:10,
               text:"yo yo yo",
               animation:"floating-right"
       },{
			   time:10,
               text:"LOOOOOL",
               animation:"fade-in"
       },{
			   time:12,
               text:"Suckkerr!!!",
               animation:"fade-in"
       },{
			   time:20,
               text:"Yo man, so cool!",
               animation:"fade-in"
       }];
	startDisplay(allComments); 
	setTimeout(function(){
		allComments.push({
			time:21,
			text:"new comments pushed to here!!!!",
			animation:"floating-right"
		})
	})
	
	setTimeout(pauseDisplay,18000);

	return true;
}());
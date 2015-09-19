/*
	Even more crazy ideas: 
		comment for netflx
		comment for Facebook video, (pull comment from fb)
		
*/

(function(){


	var realVideo = {
		comments:[]
	};


	var ref = new Firebase("https://real-time-comment.firebaseio.com/").child(getVideoId());

	// Attach an asynchronous callback to read the data at our posts reference
	ref.on("value", function(snapshot) {
	  console.log(snapshot.val());
	  realVideo.comments = snapshot.val();
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});


	renderUI(ref);

	var displayer = new Displayer();

	displayer.startDisplay(realVideo); 
	
	setTimeout(displayer.pauseDisplay,90000);

	// function respondToMessages(){
	// 	chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
	// 		switch(request){
	// 			case GET_CURR_TIME:
	// 			sendResponse( getCurrTime())
	// 			;
	// 		}
	// 	});
	// }
	respondToOffToggle();
	function respondToOffToggle() {
		chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
			switch(request){
				case 'stop_display': 
				displayer.turnOff();
			}
		});
	};
	function renderUI(videoCommentRef){
		var section = $('<section id="commentBox"> <div class="pic-comments"></div> <div class="text-comments"> <div class="form-control"> <input type="text" placeholder="type here" id="textComments"> <button class="btn btn-success submit" id="submitComments">comment</button> </div>      </div> </section>'); 
		$("#watch7-headline").before(section);

		$("#submitComments").on('click',function(){
		  var textComment = $("#textComments").val();
		  $("#textComments").val('');
		  withCurrTime(function(currTime){
		    console.log(videoCommentRef);
		    videoCommentRef.push({
		      time:currTime,
		      text:textComment,
		      animation:"float-to-right-end"
		    },function(err){
		      console.log(err);
		    });
		  });
		})
	}

	function Displayer(tick){
		var tick = tick ||  0.2;
		var canceled = false;
		var that = this;
		/*
			take some comments and start displaying them, 
				we first display all comments that are within 1 sec of curr time
				next, we go display all comments that are within 1 `tick` ago of curr time 

			Notice that comments CAN BE MODIFIED during displaying

		*/
		this. startDisplay = function startDisplay(video){
			
			canceled = false;

			//display all comments from 1 sec ago and now
			var secAgo = 1;
			withCurrTime(function(currTime){
				that.displayComments(_.filter(video.comments,function(i){
					return ((currTime-secAgo)< i.time ) && (i.time <= currTime); 
				}));
				
			});
			//continuously display new comments in an interval 
			(function displayAllInTick(){

				withCurrTime(function(currTime){
					console.log(video.comments);
					that.displayComments(
						_.filter(video.comments,function(i){
						return ((currTime-tick) < i.time) && (i.time <= currTime);
					}));
					if(!canceled){
						setTimeout(displayAllInTick,tick*1000);
					}
				});
				
			})();
		};

		this.turnOff = function turnOff() {
			that.clearDisplay();
			that.pauseDisplay();
		};

		this.clearDisplay = function clearDisplay(){
			//clear all video.comments
			$(".floating-comment").remove();
		};

		this.pauseDisplay = function pauseDisplay(){
			canceled = true;
		};

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

		this.displayComments = function displayComments(comments,currTime){
				comments.forEach(function(comment,index){
					(function (node){
						($(".html5-video-container")).before(node);
						setTimeout(function(){
							node.remove();
						},5000);
					})(asNode(comment));
				});
		};


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

				if(comment.animation=="float-to-right-end"){
					return {
						"top":parseInt(Math.floor(Math.random()* 300)) + "px"
					}
				}
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
	}

	/*
		withCurrTime must be injected to a tab via either content_script	 or 
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

	function getVideoId(){
		return /www.youtube.com\/watch\?v=(.+)/
		.exec(window.location.href)[1];
	}
}());




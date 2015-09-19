var toggle = false;
function run(tab){
	// alert("clicked");
	// var toggle = false;
	chrome.browserAction.onClicked.addListener(function(tab) {
	  toggle = !toggle;
	  if(toggle){
	    chrome.browserAction.setIcon({path: "on.png", tabId:tab.id});
	    injectedMethod(tab,'getPlayerTime');
	  }
	  else{
	    chrome.browserAction.setIcon({path: "off.png", tabId:tab.id});
	    chrome.tabs.sendMessage(tab.id, 'stop_display')
	    chrome.tabs.executeScript(tab.id, {code:"alert()"});
	  }
	});
		// alert("the browser action was clicked!");
}
var tabWithFrameworks = {};

function injectedMethod(tab,method,callback){

	if(!tabWithFrameworks[tab.id]){
		chrome.tabs.executeScript(tab.id,{
			file:"lib/jquery.js"
		});

		chrome.tabs.executeScript(tab.id,{
			file:"lib/firebase.js"
		});
		
		chrome.tabs.executeScript(tab.id,{
			file:"lib/lodash.js"
		});
		

		chrome.tabs.insertCSS(tab.id,{
			file:"lib/bootstrap.css"
		});
		chrome.tabs.insertCSS(tab.id,{
			file:"style.css"
		});

		tabWithFrameworks[tab.id] = true;
	}
	chrome.tabs.executeScript(tab.id,{
		file:"inject.js"
	},callback);	
	// callback({data:"hello"});
}
chrome.browserAction.onClicked.addListener(run);

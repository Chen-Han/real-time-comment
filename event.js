function getBgColors(tab){
	alert("clicked");
	injectedMethod(tab,'getPlayerTime');
	// alert("the browser action was clicked!");
}
var tabWithFrameworks = {};

function injectedMethod(tab,method,callback){

	if(!tabWithFrameworks[tab.id]){
		chrome.tabs.executeScript(tab.id,{
			file:"jquery.js"
		});

		chrome.tabs.executeScript(tab.id,{
			file:"firebase.js"
		});
		
		chrome.tabs.executeScript(tab.id,{
			file:"lodash.js"
		});
		

		chrome.tabs.insertCSS(tab.id,{
			file:"bootstrap.css"
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
chrome.browserAction.onClicked.addListener(getBgColors);

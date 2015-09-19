function getBgColors(tab){
	alert("clicked");
	injectedMethod(tab,'getPlayerTime');
	// alert("the browser action was clicked!");
}
var tabWithFrameworks = {};

function injectedMethod(tab,method,callback){

	if(!tabWithFrameworks[tab.id]){

		chrome.tabs.insertCSS(tab.id,{
			file: "build/main.css"
		});

		tabWithFrameworks[tab.id] = true;
	}
	chrome.tabs.executeScript(tab.id,{
		file:"client-app/firebase/firebase.js"
	}, callback);
	chrome.tabs.executeScript(tab.id,{
		file:"build/main.js"
	}, callback);
	
}
chrome.browserAction.onClicked.addListener(getBgColors);

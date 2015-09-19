function getBgColors(tab){
	alert("clicked");
	injectedMethod(tab,'getPlayerTime');
	// alert("the browser action was clicked!");
}
var tabWithFrameworks = {};

function injectedMethod(tab,method,callback){

	if(!tabWithFrameworks[tab.id]){
		// chrome.tabs.executeScript(tab.id,{
		// 	file:"jquery.js"
		// });

		// chrome.tabs.insertCSS(tab.id,{
		// 	file:"bootstrap.css"
		// });

		tabWithFrameworks[tab.id] = true;
	}
	chrome.tabs.executeScript(tab.id,{
		file:"build/main.js"
	}, callback);
}
chrome.browserAction.onClicked.addListener(getBgColors);

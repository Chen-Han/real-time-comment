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
	
		chrome.tabs.insertCSS(tab.id,{
			file:"style.css"
		});
		chrome.tabs.insertCSS(tab.id,{
			file:""
		});

		tabWithFrameworks[tab.id] = true;
	}
	chrome.tabs.executeScript(tab.id,{
		file:"inject.js"
	},callback);	
	// callback({data:"hello"});
}
chrome.tabs.getCurrent(function(tabs){
	var activeTab = tabs[0];
	console.log(activeTab);
	getBgColors(tabs[0]);
});

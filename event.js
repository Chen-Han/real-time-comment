function run(tab){
	alert("clicked");
	injectedMethod(tab,'getPlayerTime');
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
		chrome.tabs.insertCSS(tab.id,{
			file:"build/main.css"
		});

		tabWithFrameworks[tab.id] = true;
	}
	chrome.tabs.executeScript(tab.id,{
		file:"build/main.js"
	}, callback);
	chrome.tabs.executeScript(tab.id,{
		file:"inject.js"
	}, callback);
}
chrome.browserAction.onClicked.addListener(run);

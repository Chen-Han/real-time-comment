function getBgColors(tab){
	alert("clicked");
	injectedMethod(tab,'getPlayerTime',function(response){
		//response is sent by injected script
		alert("The response data is  " + response.data );
		return true;
	});
	// alert("the browser action was clicked!");
}

function injectedMethod(tab,method,callback){
	chrome.tabs.executeScript(tab.id,{
		file:"inject.js"
	},function(){
		//call back after script executes
		chrome.tabs.sendMessage(tab.id,{
			method:method
		},callback);
		//tell the injected script what to do
	});
	// callback({data:"hello"});
}


chrome.browserAction.onClicked.addListener(getBgColors);

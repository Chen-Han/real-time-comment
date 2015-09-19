function withCurrTime(callback){
	callback(getCurrTime());

	function getCurrTime(variables) {
		var ret = {};

		var scriptContent = "document.body.setAttribute('playTime',yt.player.getPlayerByElement(document.getElementById('player-api')).getCurrentTime())";

		var script = document.createElement('script');
		script.id = 'tmpScript';
		script.appendChild(document.createTextNode(scriptContent));
		(document.body || document.head || document.documentElement).appendChild(script);

		$("#tmpScript").remove();

		return parseFloat(document.body.getAttribute("playTime"));
	}
}

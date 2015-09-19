export function getCurrentTime() {
	var ret = {};

	var scriptContent = "document.body.setAttribute('playTime',yt.player.getPlayerByElement(document.getElementById('player-api')).getCurrentTime())"

	var script = document.createElement('script');
	script.id = 'tmpScript';
	script.appendChild(document.createTextNode(scriptContent));
	(document.body || document.head || document.documentElement).appendChild(script);

	var e = document.getElementById("tmpScript");

	e.parentNode.removeChild(e);

	return parseFloat(document.body.getAttribute("playTime"));
}

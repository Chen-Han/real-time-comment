export function createCommentsContainer() {
	var player = document.getElementsByClassName("html5-video-container")[0];
	var container = document.createElement("div");
	container.id = "realtime-comments-container";
	player.appendChild(container);
	return document.getElementById("realtime-comments-container");
}

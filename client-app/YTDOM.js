export function createCommentsContainer() {
	var player = document.getElementsByClassName("html5-video-container")[0];
	var container = document.createElement("div");
	container.id = "realtime-comments-container";
	player.appendChild(container);
	return document.getElementById("realtime-comments-container");
}

export function createNewCommentContainer() {
	var mainColumn = document.getElementsByClassName("watch-main-col")[0];
	var header = document.getElementById("watch-header");
	var container = document.createElement("div");
	container.id = "realtime-new-comment-container";
	mainColumn.insertBefore(container, header);
	return document.getElementById("realtime-new-comment-container");
}

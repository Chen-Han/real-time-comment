import React from "react/addons";
import {createCommentsContainer, createNewCommentContainer} from "YTDOM";
import "scss/index.scss";
import Comments from "containers/Comments";
import NewComment from "containers/NewComment";

window.renderRealtimeReactComponents = function (comments) {
	React.render(<Comments comments={comments} />, createCommentsContainer());
	React.render(<NewComment />, createNewCommentContainer());
};

import React from "react/addons";
import {createCommentsContainer} from "YTDOM";
import "scss/index.scss";
import Comments from "containers/Comments";

// React.render(<Timer />, document.getElementsByClassName("watch-title-container")[0]);

React.render(<Comments />, createCommentsContainer());

import React from "react/addons";

var NewComment = React.createClass({
	render: function () {
		return (<div id="watch-discussion" className="branded-page-box yt-card scrolldetect">
			<div className="all-comments">
				<a href="/all_comments?v=2a4Uxdy9TQY">
				<strong>All Comments</strong> (14,610)
				</a>
			</div>
			<div id="yt-comments-sb-container">
				<div id="yt-comments-sb-standin" className="hid" style="display: none;">
					<div className="body">
						<div className="thumbnail">
							<a href="/user/zzzzaazzzzz" className="yt-user-photo  yt-uix-sessionlink"><span className="video-thumb  yt-thumb yt-thumb-48 g-hovercard">
							<span className="yt-thumb-square">
							<span className="yt-thumb-clip">
							<img src="https://yt3.ggpht.com/-46Sxzu-Qcck/AAAAAAAAAAI/AAAAAAAAAAA/sy9EkkUj42E/s88-c-k-no/photo.jpg" width="48" height="48" alt="zzzzaazzzzz" />
							<span className="vertical-align"></span>
							</span>
							</span>
							</span>
							</a>
						</div>
						<div className="callout">
							<div className="callout-inner"></div>
							<div className="callout-outer"></div>
						</div>
						<div className="box">
							<span className="share">Add a public comment...</span>
						</div>
					</div>
				</div>
				<div className="yt-simplebox">
					<div className="yt-simplebox-ready body">
						<span className="yt-user-photo yt-simplebox-photo"><span className="video-thumb  yt-thumb yt-thumb-48 g-hovercard">
						<span className="yt-thumb-square">
						<span className="yt-thumb-clip">
						<img src="https://yt3.ggpht.com/-46Sxzu-Qcck/AAAAAAAAAAI/AAAAAAAAAAA/sy9EkkUj42E/s88-c-k-no/photo.jpg" width="48" height="48" alt="zzzzaazzzzz" />
						<span className="vertical-align"></span>
						</span>
						</span>
						</span>
						</span>
						<div className="yt-simplebox-text"></div>
						<div className="yt-simplebox-arrow">
							<div className="yt-simplebox-arrow-inner"></div>
							<div className="yt-simplebox-arrow-outer"></div>
						</div>
						<div className="yt-simplebox-buttons">
							<span className="yt-simplebox-error hid">
							Comment failed to post.
							</span>
							<button className="yt-uix-button yt-uix-button-size-default yt-uix-button-default yt-simplebox-button yt-sb-cancel" type="button"><span className="yt-uix-button-content">Cancel</span></button>
							<button className="yt-uix-button yt-uix-button-size-default yt-uix-button-primary yt-simplebox-button yt-sb-post" type="button" disabled=""><span className="yt-uix-button-content">Post</span></button>
						</div>
					</div>
					<div className="yt-simplebox-working">
						<span title="Loading icon" className="yt-spinner-img  yt-sprite"></span>
					</div>
				</div>
			</div>
		</div>);
	}
});

export default NewComment;

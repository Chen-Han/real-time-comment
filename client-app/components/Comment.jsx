import React from "react/addons";

var Comment = React.createClass({
	render: function () {
		return (
			<div className="comment">
				{this.props.text}
			</div>
		);
	}
});

export default Comment;
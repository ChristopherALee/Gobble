import React from "react";

class Loading extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="loading-screen">
				<section className="loading-sidebar">
					<div className="loading-sidebar-container">
						<div className="loading-header">
							<div className="loading-title" />
							<div className="loading-username" />
						</div>

						<div className="loading-channel-list-container">
							<div className="loading-channel-header" />
							<ul className="loading-channel-list">
								<li className="loading-channel-list-item" />
								<li className="loading-channel-list-item3" />
								<li className="loading-channel-list-item2" />
								<li className="loading-channel-list-item2" />
								<li className="loading-channel-list-item3" />
							</ul>
						</div>

						<div className="loading-channel-list-container">
							<div className="loading-channel-header" />
							<ul className="loading-channel-list">
								<li className="loading-channel-list-item2" />
								<li className="loading-channel-list-item" />
								<li className="loading-channel-list-item3" />
								<li className="loading-channel-list-item2" />
								<li className="loading-channel-list-item" />
								<li className="loading-channel-list-item2" />
								<li className="loading-channel-list-item" />
							</ul>
						</div>
					</div>
				</section>

				<section className="loading-messages">messages</section>
			</div>
		);
	}
}

export default Loading;

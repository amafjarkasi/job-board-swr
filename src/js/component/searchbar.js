import React, { useState } from "react";
import { InputGroup, input, Button, Icon } from "@blueprintjs/core";

export default function SearchBar() {
	const [searchTag, setSearchTag] = useState("");

	function handleClick(e) {
		console.log(e);
	}

	// function searchTag(e) {}

	return (
		<>
			<div className="d-inline-flex mb-4">
				<input
					type="text"
					className="bp3-input mr-2"
					placeholder="Search job tags..."
					onChange={e => setSearchTag(e.target.value)}
					value={searchTag}
				/>
			</div>
			<div className="bp3-button-group">
				<a
					className="bp3-button bp3-icon-search"
					role="button"
					onClick={e => handleClick(searchTag)}
				/>
				<a
					className="bp3-button bp3-icon-trash"
					role="button"
					onClick={e => setSearchTag("")}
				/>
			</div>
		</>
	);
}

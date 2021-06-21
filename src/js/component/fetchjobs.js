import React, { useState } from "react";
import useSWR from "swr";
import { stripHtml } from "string-strip-html";
import { Button, Card, Elevation } from "@blueprintjs/core";
import { OverlayTrigger, Tooltip, Overlay } from "react-bootstrap";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default function FetchJobs() {
	let fetcher;
	const notyf = new Notyf({
		position: {
			x: "right",
			y: "top"
		},
		ripple: "true"
	});
	const [searchTag, setSearchTag] = useState("");
	const [show, setShow] = useState(false);

	const [addTags, setTags] = useState("");
	const { data, error } = useSWR(
		`https://remoteok.io/api?tag=${addTags}`,
		fetcher
	);

	if (error) return <div>Failed to load</div>;
	if (!data) return <div>Loading...</div>;

	function filterTag(e) {
		searchTag != "" && setTags(searchTag);
	}

	function setToast(tagName, content) {
		setSearchTag(tagName);
		notyf.success(content);
		return true;
	}

	function RenderImage(url) {
		return (
			<img
				src={url.logo}
				className="rounded mx-auto d-block pb-2"
				width="50px"
				length="50px"
				alt=""
			/>
		);
	}

	const renderTooltip = props => (
		<Tooltip id="button-tooltip" {...props}>
			Click tag for refining search
		</Tooltip>
	);

	function RenderTags(tags) {
		let counter = 0;

		return tags.alltags.map(tagName => {
			counter++;
			return (
				<>
					{/* setSearchTag(tagName) */}
					<OverlayTrigger
						placement="top"
						delay={{ show: 250, hide: 400 }}
						overlay={renderTooltip}
						key={counter}>
						<a
							role="button"
							onClick={e =>
								setToast(
									tagName,
									"Selected tag added to search bar"
								)
							}>
							<span className="bp3-tag .bp3-round mr-1 mb-1">
								{tagName}
							</span>
						</a>
					</OverlayTrigger>
				</>
			);
		});
	}

	// function ToastNew() {
	// 	return (
	// 		<Toast
	// 			onClose={() => setShow(false)}
	// 			show={show}
	// 			delay={3000}
	// 			autohide>
	// 			<Toast.Header>
	// 				<strong className="mr-auto">Bootstrap</strong>
	// 				<small>11 mins ago</small>
	// 			</Toast.Header>
	// 			<Toast.Body>
	// 				Woohoo, good reading this text in a Toast!
	// 			</Toast.Body>
	// 		</Toast>
	// 	);
	// }

	return (
		<>
			<div className="container">
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
					<button
						type="button"
						className="bp3-button bp3-intent-success bp3-icon-search mr-1"
						onClick={e => {
							filterTag(searchTag);
						}}
					/>
					<button
						type="button"
						className="bp3-button bp3-intent-danger bp3-icon-trash"
						onClick={e => {
							setSearchTag("");
							setTags("");
						}}
					/>
				</div>
				<p className="pb-2">Results: {data.length - 1}</p>
				{data.map((jobs, id) => {
					if (id > 0)
						if (jobs.position && jobs.company)
							return (
								<div key={id}>
									<Card
										className="mb-3"
										interactive={true}
										key={id++}
										elevation={Elevation.TWO}>
										{jobs.company_logo != "" && (
											<RenderImage
												logo={jobs.company_logo}
											/>
										)}

										<h5>
											{jobs.company} | {jobs.position}
										</h5>
										<h6>{jobs.date.substring(0, 10)}</h6>
										<p>
											{jobs.tags.length != 0 && (
												<RenderTags
													alltags={jobs.tags}
												/>
											)}
										</p>
										<p>
											{stripHtml(
												`${jobs.description}`
											).result.slice(0, 200)}
										</p>
										<br />
										<a href={jobs.apply_url} target="_new">
											<Button
												rightIcon="arrow-right"
												intent="success">
												View job
											</Button>
										</a>
									</Card>
								</div>
							);
				})}
			</div>
		</>
	);
}

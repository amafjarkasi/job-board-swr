import React, { useState } from "react";
import useSWR from "swr";
import { stripHtml } from "string-strip-html";
import { Button, Card, Elevation } from "@blueprintjs/core";

export default function FetchJobs() {
	let fetcher;
	const [searchTag, setSearchTag] = useState("");
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

	function RenderTags(tags) {
		let counter = 0;

		return tags.alltags.map(tagName => {
			counter++;
			return (
				<a
					role="button"
					onClick={e => setSearchTag(tagName)}
					key={counter}>
					<span className="bp3-tag .bp3-round mr-1 mb-1">
						{tagName}
					</span>
				</a>
			);
		});
	}

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

				{data.map((jobs, id) => {
					if (id > 0)
						if (jobs.position)
							return (
								<div key={id}>
									<Card
										className="mb-3"
										interactive={true}
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

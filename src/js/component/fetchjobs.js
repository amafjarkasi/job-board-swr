import React, { useState } from "react";
import useSWR from "swr";
import { stripHtml } from "string-strip-html";
import { Button, Card, Elevation } from "@blueprintjs/core";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ScrollToTop from "react-scroll-to-top";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default function FetchJobs() {
	let fetcher;
	const notyf = new Notyf({
		duration: 3500,
		position: {
			x: "right",
			y: "top"
		},
		ripple: "true",
		dismissible: "true"
	});
	const [searchTag, setSearchTag] = useState("");
	const [getLimits, setLimits] = useState(false);

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
		tagName != ""
			? notyf.success(
					`Selected '${tagName}' tag has been added to search`
			  )
			: notyf.success(content);
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
			Click tag to refine search
		</Tooltip>
	);

	function handlePeriodChange(selVal) {
		setLimits(selVal);
	}

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
						key={counter * 2}>
						<a
							role="button"
							onClick={e =>
								setToast(
									tagName,
									"Selected tag has been added to search bar"
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

	return (
		<>
			<div className="container">
				<ScrollToTop smooth color="#c23030" />
				<div className="d-inline-flex mb-3">
					<input
						type="text"
						className="bp3-input mr-2"
						placeholder="Search job tags..."
						onChange={e => setSearchTag(e.target.value)}
						value={searchTag}
					/>
					<div className="bp3-select mr-2">
						<select
							onChange={val =>
								handlePeriodChange(val.target.value)
							}
							disabled>
							<option value="0" selected>
								Display results...
							</option>
							<option value="25">25</option>
							<option value="50">50</option>
							<option value="75">75</option>
							<option value="0">All</option>
						</select>
					</div>
					<div classNameName="bp3-button-group">
						<button
							type="button"
							className="bp3-button bp3-intent-success bp3-icon-search mr-2"
							onClick={e => {
								filterTag(searchTag);
							}}>
							Search
						</button>
						<button
							type="button"
							className="bp3-button bp3-intent-danger bp3-icon-trash"
							onClick={e => {
								setSearchTag("");
								setTags("");
							}}>
							Clear
						</button>
					</div>
				</div>
				<br />

				<br />
				<p className="py-2">Results: {data.length - 1}</p>
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
												Apply for job
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

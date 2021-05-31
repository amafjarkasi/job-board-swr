import React from "react";
import useSWR from "swr";
import { stripHtml } from "string-strip-html";
import { Button, Card, Elevation } from "@blueprintjs/core";

export default function FetchJobs() {
	let fetcher;
	const { data, error } = useSWR("https://remoteok.io/api", fetcher);

	if (error) return <div>Failed to load</div>;
	if (!data) return <div>Loading...</div>;

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
				<span className="bp3-tag .bp3-round mr-1 mb-1" key={counter}>
					{tagName}
				</span>
			);
		});
	}

	return (
		<>
			<div className="container">
				{data.map((jobs, id) => {
					if (id > 0)
						if (jobs.position)
							return (
								<Card
									className="mb-3"
									interactive={true}
									key={id}
									elevation={Elevation.TWO}>
									{jobs.company_logo != "" && (
										<RenderImage logo={jobs.company_logo} />
									)}

									<h5>
										{jobs.company} | {jobs.position}
									</h5>
									<h6>{jobs.date.substring(0, 10)}</h6>
									<p>
										{jobs.tags[0] != "" && (
											<RenderTags alltags={jobs.tags} />
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
							);
				})}
			</div>
		</>
	);
}

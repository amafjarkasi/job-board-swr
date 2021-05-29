import React from "react";
import useSWR from "swr";
import { stripHtml } from "string-strip-html";
import { Button, Card, Elevation } from "@blueprintjs/core";

export default function FetchJobs() {
	let fetcher;
	const { data, error } = useSWR("https://remoteok.io/api", fetcher);

	if (error) return <div>Failed to load</div>;
	if (!data) return <div>Loading...</div>;

	return (
		<>
			{data.map((jobs, id) => {
				if (id > 0)
					if (jobs.position)
						return (
							<div className="container" key={id}>
								<Card
									interactive={true}
									elevation={Elevation.TWO}>
									<h5>
										{jobs.company} | {jobs.position}
									</h5>
									<h6>{jobs.date.substring(0, 10)}</h6>
									<p>
										<span className="bp3-tag .bp3-round">
											{jobs.tags[0] != ""
												? jobs.tags[0]
												: ""}
										</span>
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
		</>
	);
}

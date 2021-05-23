import React from "react";
import useSWR from "swr";
import { stripHtml } from "string-strip-html";

export default function FetchJobs() {
	let fetcher;
	const { data, error } = useSWR("https://remoteok.io/api", fetcher);

	if (error) return <div>Failed to load</div>;
	if (!data) return <div>Loading...</div>;

	return (
		<>
			{data.map((jobs, id) => {
				return (
					<div className="container" key={id}>
						<h2>
							{jobs.company !== "" ? jobs.company : ""}
							{jobs.date}
						</h2>
						<p>
							{jobs.description !== ""
								? stripHtml(`${jobs.description}`).result
								: ""}
						</p>
					</div>
				);
			})}
		</>
	);
}

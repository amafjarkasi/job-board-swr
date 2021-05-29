import React from "react";
import Topbar from "./topbar";
import FetchJobs from "./fetchjobs";

//create your first component
export function Home() {
	return (
		<>
			<Topbar />
			<div className="text-center container-fluid centered mt-5 w-75">
				<FetchJobs />
			</div>
		</>
	);
}

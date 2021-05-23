import React from "react";
import Topbar from "./topbar";
import FetchJobs from "./fetchjobs";

//create your first component
export function Home() {
	return (
		<>
			<Topbar />
			<div className="text-center mt-5">
				<FetchJobs />
				{/* <h1>Hello Rigo!</h1>
				<a href="#" className="btn btn-success">
					If you see this green button... bootstrap is working
				</a>
				<p>
					Made by{" "}
					<a href="http://www.4geeksacademy.com">4Geeks Academy</a>,
					with love!
				</p> */}
			</div>
		</>
	);
}

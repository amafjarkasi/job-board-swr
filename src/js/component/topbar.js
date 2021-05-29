import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Topbar() {
	return (
		<>
			<Navbar bg="dark" variant="dark" sticky="top">
				<Navbar.Brand href="#home">Remote Jobs</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="#">by Amaf Jarkasi</Nav.Link>
				</Nav>
			</Navbar>
		</>
	);
}

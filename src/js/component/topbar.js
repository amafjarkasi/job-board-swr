import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Topbar() {
	return (
		<>
			<Navbar bg="dark" variant="dark" sticky="top">
				<Navbar.Brand href="#home">
					Remote Jobs by Amaf Jarkasi
				</Navbar.Brand>
			</Navbar>
		</>
	);
}

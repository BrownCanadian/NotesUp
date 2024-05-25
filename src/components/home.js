import React from "react";
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";
import Indi_List from "./indi_list.js";
import FirebaseFileUpload from "./FireBaseFileUpload.js";
import NoteListings from "./NoteListings.js";

function Home({ user }) {
	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				console.log("User signed out");
			})
			.catch((error) => {
				console.error("Error during sign out: ", error);
			});
	};

	const noteList = [
		{ title: "Hello", price: 12 },
		{ title: "Bye", price: 12 },
		{ title: "No", price: 100 },
		{ title: "CSC 320 Lecture 1-5", price: 5 },
	];

	return (
		<div>
			<h1>Hello, {user.displayName}</h1>
			<Indi_List />
			<FirebaseFileUpload />
			<NoteListings notes={noteList} />
			<button onClick={handleLogout}>Log Out</button>
		</div>
	);
}

export default Home;

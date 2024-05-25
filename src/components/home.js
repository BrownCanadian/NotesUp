import React, { useEffect, useState } from "react";
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";
import Indi_List from "./indi_list.js";
import FirebaseFileUpload from "./FireBaseFileUpload.js";
import NoteListings from "./NoteListings.js";
import NoteDetails from "./NoteDetails.js";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { notes_main_dir } from "../firebase";
import {
	BrowserRouter as BrowserRouter,
	Route,
	Routes,
} from "react-router-dom";

function Home({ user }) {
	const [data, setData] = useState([]);
	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				console.log("User signed out");
			})
			.catch((error) => {
				console.error("Error during sign out: ", error);
			});
	};

	

	// const noteList = [
	// 	{
	// 		id: 1,
	// 		title: "Hello",
	// 		price: 12,
	// 		course_name: "Course 1",
	// 		description: "This is a note",
	// 		professor: "Prof. A",
	// 		note_preview: "",
	// 		number_of_pages: 10,
	// 		random: 10,
	// 		url : "://example.com"
	// 	},
	// 	{
	// 		id: 2,
	// 		title: "Bye",
	// 		price: 12,
	// 		course_name: "EPHE 155",
	// 		description: "This is a note",
	// 		professor: "Someone Everyone",
	// 		note_preview: "",
	// 		number_of_pages: 20,
	// 		random: 18,
	// 		url : "://example.com"
	// 	},
	// 	{
	// 		id: 3,
	// 		title: "No",
	// 		price: 100,
	// 		course_name: "Course 1",
	// 		description: "This is a note",
	// 		professor: "Prof. A",
	// 		note_preview: "",
	// 		number_of_pages: 10,
	// 		random: 9,
	// 		url : "://example.com"
	// 	},
	// 	{
	// 		id: 4,
	// 		title: "CSC 320 Lecture 1-5",
	// 		price: 5,
	// 		course_name: "CSC320",
	// 		description: "This is a note",
	// 		professor: "Ulrike",
	// 		note_preview: "",
	// 		number_of_pages: 3,
	// 		random: 1,
	// 		url : "://example.com"
	// 	},
	// ];
	const getData = async () => {
		const valRef = collection(notes_main_dir, "notes_main_dir");
		const dataDb = await getDocs(valRef);
		const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
		setData(allData);
		console.log(dataDb);
	};

	useEffect(() => {
		getData();
	}, []);
	console.log("firebase data",data);
	const noteList = data

	return (
		<BrowserRouter>
			<div>
				<Routes>
					<Route
						path="/"
						element={
							<div>
								<h1>Hello, {user.displayName}</h1>
								<Indi_List />
								<FirebaseFileUpload user_id={user.email} />
								<NoteListings notes={noteList} />
							</div>
						}
					/>
					<Route path="/note/:id" element={<NoteDetails notes={noteList} user_id={user.email} />}/>
				</Routes>
				{/* <NoteListings notes={noteList} /> */}
				<button onClick={handleLogout}>Log Out</button>
			</div>
		</BrowserRouter>
	);
}

export default Home;

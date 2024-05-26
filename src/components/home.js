import React, { useEffect, useState } from "react";
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";
import Indi_List from "./indi_list.js";
import FirebaseFileUpload from "./FireBaseFileUpload.js";
import NoteListings from "./NoteListings.js";
import NoteDetails from "./NoteDetails.js";
import { collection, getDocs } from "firebase/firestore";
import { notes_main_dir } from "../firebase";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./Profile.js";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home({ user }) {
	const [data, setData] = useState(null); // Set initial state to null
	const [loading, setLoading] = useState(true); // Add loading state

	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				console.log("User signed out");
			})
			.catch((error) => {
				console.error("Error during sign out: ", error);
			});
	};

	const navigate = useNavigate();

	const handleProfileClick = () => {
		navigate(`/profile/${user.displayName}`); // Replace 'username' with the actual username
	};

	const getData = async () => {
		try {
			const valRef = collection(notes_main_dir, "notes_main_dir");
			const dataDb = await getDocs(valRef);
			const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
			setData(allData);
			console.log(dataDb);
		} catch (error) {
			console.error("Error fetching data: ", error);
		} finally {
			setLoading(false); // Set loading to false after data is fetched
		}
	};

	useEffect(() => {
		getData();
	}, []);

	if (loading) {
		return <div>Loading...</div>; // Show a loading message while data is being fetched
	}

	return (
		// <Router>
		<div>
			<Routes>
				<Route
					path="/"
					element={
						<div>
							<h1>Hello, {user.displayName}</h1>
							<Indi_List />

							<FirebaseFileUpload user_id={user.email} />
							{data && <NoteListings notes={data} user={user} />}
							<button onClick={handleLogout}>Log Out</button>
						</div>
					}
				/>
				<Route
					path="/note/:id"
					element={data && <NoteDetails notes={data} user_id={user.email} />}
				/>
				<Route
					path="/profile/:username"
					element={data && <Profile user={user} data={data} />}
				/>
			</Routes>
		</div>
		// </Router>
	);
}

export default Home;

import React, {useEffect, useState} from "react";
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";
import Indi_List from "./indi_list.js";
import FirebaseFileUpload from "./FireBaseFileUpload.js";
import NoteListings from "./NoteListings.js";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { notes_main_dir } from "../firebase";

function Home({ user }) {
    const [data,setData] = useState([])
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
    const getData = async () =>{
        const valRef = collection(notes_main_dir,'notes_main_dir')
        const dataDb = await getDocs(valRef)
        const allData = dataDb.docs.map(val=>({...val.data(),id:val.id}))
        setData(allData)
        console.log(dataDb)
    }

    useEffect(()=>{
        getData()
}, [])
    console.log(data,"datadata")

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

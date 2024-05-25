import React, { useEffect, useState } from "react";
import { notes_main_dir, notesDB } from "../firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

function FirebaseFileUpload() {
	const [txt, setTxt] = useState("");
	const [note, setNote] = useState("");

	const handleUpload = (e) => {
		console.log(e.target.files[0]);
		const notes = ref(notesDB, `notes_dir/${v4()}`);
		uploadBytes(notes, e.target.files[0]).then((data) => {
			console.log(data, "notes");
			getDownloadURL(data.ref).then((val) => {
				setNote(val);
			});
		});
	};

	const handleClick = async () => {
		const valRef = collection(notes_main_dir, "notes_main_dir");
		await addDoc(valRef, { name: txt, url: note });
		alert("Data added successfully");
	};

	return (
		<div>
			<input onChange={(e) => setTxt(e.target.value)} />
			<br />
			<input type="file" onChange={(e) => handleUpload(e)} />
			<br />
			<br />
			<button onClick={handleClick}>Add</button>
		</div>
	);
}
export default FirebaseFileUpload;

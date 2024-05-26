import React, { useEffect, useState } from "react";
import { notes_main_dir, users, notesDB, firestore } from "../firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import FileUploadDialog from "./FileUploadDialog";
import {
	addDoc,
	getDoc,
	setDoc,
	updateDoc,
	doc,
	arrayUnion,
	collection,
} from "firebase/firestore";

function FirebaseFileUpload({ user_id }) {
	const [txt, setTxt] = useState("");
	const [note, setNote] = useState("");
	const [isDialogOpen, setIsDialogOpen] = useState(false);

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
	
		setIsDialogOpen(true);
	
	};

	return (
		<div>
			
			<button onClick={handleClick}>Add</button>
			<FileUploadDialog
				isOpen={isDialogOpen}
				handleClose={() => setIsDialogOpen(false)}
				user_email={user_id}
			/>
		</div>
	);
}
export default FirebaseFileUpload;
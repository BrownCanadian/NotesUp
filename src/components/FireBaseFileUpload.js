import React, { useEffect, useState } from "react";
import { notes_main_dir,users, notesDB  ,firestore} from "../firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import FileUploadDialog from "./FileUploadDialog";
import { addDoc,getDoc, setDoc, updateDoc,doc,arrayUnion,collection } from "firebase/firestore";

function FirebaseFileUpload({user_id}) {
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
		// const valRef = collection(notes_main_dir, "notes_main_dir");
		// await addDoc(valRef, { name: txt, url: note });
		// alert("Data added successfully");
		setIsDialogOpen(true);
		const valRef = collection(notes_main_dir, "notes_main_dir");
		await addDoc(valRef, { name: txt, url: note });
		
		const userDocRef = doc(firestore, "users", "rushaan.chawla@gmail.com"); // reference to the user document
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            // If the document exists, update the noteslisted array
            await updateDoc(userDocRef, {
                noteslisted: arrayUnion(note) // append the new string to noteslisted array
            });
        } else {
            // If the document does not exist, create a new one
            await setDoc(userDocRef, {
                noteslisted: [note],
                notesbought: [] // initialize notesbought array if necessary
            });
        }
		alert("Data added successfully");
	};

	return (
		<div>
			{/* <input onChange={(e) => setTxt(e.target.value)} />
			<br />
			<input type="file" onChange={(e) => handleUpload(e)} />
			<br />
			<br /> */}
			<button onClick={handleClick}>Add</button>
			<FileUploadDialog
				isOpen={isDialogOpen}
				handleClose={() => setIsDialogOpen(false)}
			/>
		</div>
	);
}
export default FirebaseFileUpload;

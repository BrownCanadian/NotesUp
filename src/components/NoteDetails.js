import React from "react";
import { useParams } from "react-router-dom";
import { Container, Box, Typography, Button } from "@mui/material";
import { firestore } from "../firebase"; // import firestore correctly
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from "firebase/firestore"; // import Firestore methods


function NoteDetails({ notes , user_id}) {
	const { id } = useParams();
	const note = notes.find((note) => note.id.toString() === id);

	if (!note) {
		return <div>Note not found</div>;
	}

	
    const handleBuyNow = async () => {
        const userDocRef = doc(firestore, "users",user_id); // reference to the user document
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            // If the document exists, update the notesbought array
            await updateDoc(userDocRef, {
                notesbought: arrayUnion(note.url) // append the new string to notesbought array
            });
        } else {
            // If the document does not exist, create a new one
            await setDoc(userDocRef, {
                notesbought: ["byesir"],
                noteslisted: [] // initialize noteslisted array if necessary
            });
        }

        alert("Note bought successfully");
    };

	return (
		<Container>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					mt: 4,
				}}
			>
				<Typography variant="h4">{note.title}</Typography>
				<Typography variant="h6">Course: {note.course_name}</Typography>
				<Typography variant="h6">Price: {note.price}</Typography>
				<Typography variant="body1">Description: {note.description}</Typography>
				<Typography variant="subtitle1">Professor: {note.url}</Typography>
				<Box sx={{ mt: 2, mb: 2 }}>
					{/* <img src={note.note_preview} alt="Note preview" style={{ width: '100%', height: 'auto' }} /> */}
					<Typography variant="caption">
						{note.random} / {note.number_of_pages}
					</Typography>
				</Box>
				<Button variant="contained" color="primary" onClick={handleBuyNow}>
					Buy Now
				</Button>
			</Box>
		</Container>
	);
}

export default NoteDetails;

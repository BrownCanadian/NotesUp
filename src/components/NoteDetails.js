import React from "react";
import { useParams } from "react-router-dom";
import { Container, Box, Typography, Button } from "@mui/material";

function NoteDetails({ notes }) {
	const { id } = useParams();
	const note = notes.find((note) => note.id.toString() === id);

	if (!note) {
		return <div>Note not found</div>;
	}

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
				<Typography variant="subtitle1">Professor: {note.professor}</Typography>
				<Box sx={{ mt: 2, mb: 2 }}>
					{/* <img src={note.note_preview} alt="Note preview" style={{ width: '100%', height: 'auto' }} /> */}
					<Typography variant="caption">
						{note.random} / {note.number_of_pages}
					</Typography>
				</Box>
				<Button variant="contained" color="primary">
					Buy Now
				</Button>
			</Box>
		</Container>
	);
}

export default NoteDetails;

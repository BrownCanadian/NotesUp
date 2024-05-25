import React, { useState } from "react";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Button,
	TextField,
	Box,
} from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { notes_main_dir, notesDB } from "../firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

// const useStyles = makeStyles((theme) => ({
// 	textField: {
// 		marginBottom: theme.spacing(2),
// 	},
// 	uploadButton: {
// 		marginBottom: theme.spacing(2),
// 	},
// }));

const UploadDialog = ({ isOpen, handleClose }) => {
	// const classes = useStyles();
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [course, setCourse] = useState("");
	const [professor, setProfessor] = useState("");
	const [file, setFile] = useState(null);

	// const [txt, setTxt] = useState("");
	const [note, setNote] = useState("");

	const handleUpload = (e) => {
		console.log(file);
		const notes = ref(notesDB, `notes_dir/${v4()}`);
		uploadBytes(notes, file).then((data) => {
			console.log(data, "notes");
			getDownloadURL(data.ref).then((val) => {
				setNote(val);
			});
		});
	};

	const handleClick = async () => {
		const valRef = collection(notes_main_dir, "notes_main_dir");
		await addDoc(valRef, {
			title: title,
			url: note,
			price: price,
			description: description,
			course_name: course,
			professor: professor,
		});
		alert("Data added successfully");
	};

	// const handleFileChange = (event) => {
	// 	setFile(event.target.files[0]);
	// };

	const handleSubmit = async () => {
		// const noteData = { title, price, description, course, professor, file };
		// handleUpload(noteData);
		handleClick();
		setTitle("");
		setPrice("");
		setDescription("");
		setCourse("");
		setProfessor("");
		handleClose();
	};

	return (
		<Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
			<DialogTitle>Upload Document</DialogTitle>
			<DialogContent>
				<input
					// accept="application/pdf"
					// className={classes.uploadButton}
					// style={{ display: "none" }}
					id="raised-button-file"
					type="file"
					onChange={(e) => setFile(e.target.files[0])}
				/>
				{/* <label htmlFor="raised-button-file">
					<Button
						variant="contained"
						color="primary"
						component="span"
						fullWidth
						// className={classes.uploadButton}
					>
						Upload Document Here
					</Button>
				</label> */}
				<TextField
					label="Title"
					fullWidth
					variant="outlined"
					// className={classes.textField}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<TextField
					label="Price"
					type="number"
					fullWidth
					variant="outlined"
					// className={classes.textField}
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					inputProps={{ min: 0 }}
				/>
				<TextField
					label="Description (optional)"
					fullWidth
					variant="outlined"
					// className={classes.textField}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<TextField
					label="Course"
					fullWidth
					variant="outlined"
					// className={classes.textField}
					value={course}
					onChange={(e) => setCourse(e.target.value)}
				/>
				<TextField
					label="Professor"
					fullWidth
					variant="outlined"
					// className={classes.textField}
					value={professor}
					onChange={(e) => setProfessor(e.target.value)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="secondary">
					Cancel
				</Button>
				<Button
					onClick={() => {
						handleUpload();
						handleSubmit();
					}}
					color="primary"
					variant="contained"
				>
					Upload
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default UploadDialog;

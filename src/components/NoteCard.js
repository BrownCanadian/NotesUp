import React from "react";
import {
	Card,
	CardContent,
	CardActions,
	Button,
	Typography,
} from "@mui/material";

function NoteCard({ note }) {
	return (
		<div>
			<Card sx={{ maxWidth: 345, margin: "1rem" }}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{note.title}
					</Typography>
					{/* <Typography variant="body2" color="text.secondary">
          {note.content.substring(0, 100)}...
        </Typography> */}
					{/* <Typography variant="caption" color="text.secondary">
          {new Date(note.createdAt.toDate()).toLocaleDateString()}
        </Typography> */}
					<Typography variant="body2" color="text.secondary">
						Price: ${note.price}
					</Typography>
				</CardContent>
				<CardActions>
					<Button
						size="small"
						color="primary"
						onClick={() => console.log("Buy!")}
					>
						Buy
					</Button>
				</CardActions>
			</Card>
		</div>
	);
}

export default NoteCard;

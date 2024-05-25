import React from "react";
import {
	Container,
	Box,
	Typography,
	Avatar,
	List,
	ListItem,
	ListItemText,
	Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";

const ProfilePage = ({ user, data }) => {
	const { username } = useParams();

	// Placeholder data
	const boughtNotes = []; // This should come from your state or props
	const userListings = []; // This should come from your state or props
	const reviews = []; // This should come from your state or props

	return (
		<Container>
			<Box display="flex" alignItems="center" mt={4}>
				<Avatar sx={{ width: 100, height: 100, mr: 4 }}>P</Avatar>
				<Typography variant="h4">{username}</Typography>
			</Box>

			<Box mt={4}>
				<Typography variant="h5">Bought Notes</Typography>
				<List>
					{boughtNotes.length === 0 ? (
						<Typography variant="body1">
							You have not bought any notes yet.
						</Typography>
					) : (
						boughtNotes.map((note, index) => (
							<ListItem key={index}>
								<ListItemText
									primary={note.title}
									secondary={note.description}
								/>
							</ListItem>
						))
					)}
				</List>
			</Box>

			<Box mt={4}>
				<Typography variant="h5">Your Listings</Typography>
				<List>
					{userListings.length === 0 ? (
						<Typography variant="body1">
							You have not uploaded any listings yet.
						</Typography>
					) : (
						userListings.map((listing, index) => (
							<Box key={index}>
								<ListItem>
									<ListItemText
										primary={listing.title}
										secondary={listing.description}
									/>
								</ListItem>
								{index < userListings.length - 1 && <Divider />}
							</Box>
						))
					)}
				</List>
			</Box>

			{userListings.length > 0 && (
				<Box mt={4}>
					<Typography variant="h5">Reviews</Typography>
					<List>
						{reviews.length === 0 ? (
							<Typography variant="body1">There are no reviews yet.</Typography>
						) : (
							reviews.map((review, index) => (
								<Box key={index}>
									<ListItem>
										<ListItemText
											primary={review.title}
											secondary={review.content}
										/>
									</ListItem>
									{index < reviews.length - 1 && <Divider />}
								</Box>
							))
						)}
					</List>
				</Box>
			)}
		</Container>
	);
};

export default ProfilePage;

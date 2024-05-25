// import React, { useState, useEffect } from "react";
// import { Container, Grid, TextField, Box, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import NoteCard from "./NoteCard";

// function NoteListings({ notes }) {
// 	const handleBuy = () => {
// 		console.log("BUY NOW!");
// 	};

// 	const [searchQuery, setSearchQuery] = useState("");

// 	const [filteredNotes, setFilteredNotes] = useState(notes);

// 	const [sortOrder, setSortOrder] = useState("asc");

// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		notes &&
// 			setFilteredNotes(
// 				notes.filter((note) =>
// 					note && note.title.toLowerCase().includes(searchQuery.toLowerCase())
// 				)
// 			);
// 	}, [searchQuery, notes]);

// 	const handleSort = () => {
// 		const sortedNotes = [...filteredNotes].sort((a, b) => {
// 			if (sortOrder === "asc") {
// 				return a.price - b.price;
// 			} else {
// 				return b.price - a.price;
// 			}
// 		});
// 		setFilteredNotes(sortedNotes);
// 		setSortOrder(sortOrder === "asc" ? "desc" : "asc");
// 	};

// 	const handleCardClick = (noteId) => {
// 		navigate(`/note/${noteId}`);
// 	};

// 	return (
// 		<div>
// 			<Container>
// 				<Grid container spacing={1}>
// 					<Grid item xs={8}>
// 						<Box sx={{ mb: 2 }}>
// 							<TextField
// 								fullWidth
// 								label="Search Note Listings"
// 								variant="outlined"
// 								value={searchQuery}
// 								onChange={(e) => setSearchQuery(e.target.value)}
// 							/>
// 						</Box>
// 					</Grid>
// 					<Grid item xs={4}>
// 						<Box sx={{ mb: 2, textAlign: "right" }}>
// 							<Button variant="contained" onClick={handleSort}>
// 								Sort by Price (
// 								{sortOrder === "asc" ? "Ascending" : "Descending"})
// 							</Button>
// 						</Box>
// 					</Grid>
// 				</Grid>
// 				<Grid container spacing={2}>
// 					{filteredNotes &&
// 						filteredNotes.map((note, index) => (
// 							<Grid
// 								item
// 								xs={12}
// 								sm={6}
// 								md={4}
// 								key={note.id}
// 								onClick={() => handleCardClick(note.id)}
// 							>
// 								<NoteCard key={index} note={note} onBuy={handleBuy} />
// 							</Grid>
// 						))}
// 				</Grid>
// 			</Container>
// 		</div>
// 	);
// }

// export default NoteListings;










import React, { useState, useEffect } from "react";
import { Container, Grid, TextField, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NoteCard from "./NoteCard";

function NoteListings({ notes }) {
    const handleBuy = () => {
        console.log("BUY NOW!");
    };

    const [searchQuery, setSearchQuery] = useState("");

    const [filteredNotes, setFilteredNotes] = useState(notes);

    const [sortOrder, setSortOrder] = useState("asc");

    const navigate = useNavigate();

    useEffect(() => {
        if (notes) {
            setFilteredNotes(
                notes.filter((note) =>
                    note && note.title && note.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [searchQuery, notes]);

    const handleSort = () => {
        const sortedNotes = [...filteredNotes].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });
        setFilteredNotes(sortedNotes);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    const handleCardClick = (noteId) => {
        navigate(`/note/${noteId}`);
    };

    return (
        <div>
            <Container>
                <Grid container spacing={1}>
                    <Grid item xs={8}>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                fullWidth
                                label="Search Note Listings"
                                variant="outlined"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{ mb: 2, textAlign: "right" }}>
                            <Button variant="contained" onClick={handleSort}>
                                Sort by Price ({sortOrder === "asc" ? "Ascending" : "Descending"})
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    {filteredNotes &&
                        filteredNotes.map((note, index) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                key={note.id}
                                onClick={() => handleCardClick(note.id)}
                            >
                                <NoteCard key={index} note={note} onBuy={handleBuy} />
                            </Grid>
                        ))}
                </Grid>
            </Container>
        </div>
    );
}

export default NoteListings;

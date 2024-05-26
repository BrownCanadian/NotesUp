import React from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase"; // import firestore correctly
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from "firebase/firestore"; // import Firestore methods

function NoteDetails({ notes, user_id }) {
    const { id } = useParams();
    const note = notes && notes.find((note) => note.id.toString() === id);

    if (!note) {
        return <div>Note not found</div>;
    }

    const handleBuyNow = async () => {
        const userDocRef = doc(firestore, "users", user_id); // reference to the user document
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            // If the document exists, update the notesbought array
            await updateDoc(userDocRef, {
                notesbought: arrayUnion(note.url) // append the new string to notesbought array
            });
        } else {
            // If the document does not exist, create a new one
            await setDoc(userDocRef, {
                notesbought: [note.url],
                noteslisted: [] // initialize noteslisted array if necessary
            });
        }

        alert("Note bought successfully");
    };

    return (<div className="bg-gray-200 py-10">
        <div className="container mx-auto p-6 max-w-lg bg-gray-800 text-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">{note.title}</h1>
            </div>
            <div className="mb-4">
                <p className="text-lg">Course: {note.course_name}</p>
                <p className="text-lg">Price: {note.price}</p>
                <p className="text-base">Description: {note.description}</p>
                <p className="text-base">Professor: {note.professor}</p>
            </div>
            <div className="mb-4">
                <p className="text-sm text-gray-400">{note.random} / {note.number_of_pages}</p>
            </div>
            <div className="mb-4 flex justify-center">
                {<img src={note.url} alt="Note preview" className="w-full h-auto rounded-lg" /> }
            </div>
            <div className="flex justify-center">
                <button
                    onClick={handleBuyNow}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                >
                    Buy Now
                </button>
            </div>
        </div>
		</div>
    );
}

export default NoteDetails;

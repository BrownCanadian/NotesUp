import React, { useState, useEffect } from "react";
import {
    getDoc,
    doc
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase"; // Import Firestore

const ProfilePage = ({ user }) => {
    const { username } = useParams();
    const [noteslisted, setNotesListed] = useState([]);
    const [notesbought, setNotesBought] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDocRef = doc(firestore, "users", "rushaan.chawla@gmail.com"); // Reference to the user document
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    console.log("User Data:", userData); // Debugging: Log user data
                    setNotesListed(userData.noteslisted || []);
                    setNotesBought(userData.notesbought || []);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center mt-4">
                <div className="w-24 h-24 mr-4">
                    <div className="rounded-full bg-gray-300 flex items-center justify-center text-4xl text-white">
                        {username.charAt(0).toUpperCase()}
                    </div>
                </div>
                <h1 className="text-4xl">{username}</h1>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl mb-4">Bought Notes</h2>
                <div className="flex space-x-4 overflow-x-auto">
                    {notesbought.length === 0 ? (
                        <p className="text-lg">You have not bought any notes yet.</p>
                    ) : (
                        notesbought.map((note, index) => (
                            <div key={index} className="bg-white shadow rounded p-4">
                                <img src={note} alt="Note" className="w-10% h-auto" />
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl mb-4">Your Listings</h2>
                <div className="flex space-x-4 overflow-x-auto">
                    {noteslisted.length === 0 ? (
                        <p className="text-lg">You have not uploaded any listings yet.</p>
                    ) : (
                        noteslisted.map((listing, index) => (
                            <div key={index} className="bg-white shadow rounded p-4">
                                <img src={listing} alt="Note" className="w-1/5 h-auto" />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

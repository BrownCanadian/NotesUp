import React from 'react';
import { auth } from '../firebase.js';
import { signOut } from 'firebase/auth';
import Indi_List from './indi_list.js';

function Home({ user }) {
    const handleLogout = () => {
        signOut(auth).then(() => {
            console.log("User signed out");
        }).catch((error) => {
            console.error("Error during sign out: ", error);
        });
    };

    return (
        <div>
            <h1>Hello, {user.displayName}</h1>
            <Indi_List/>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
}

export default Home;

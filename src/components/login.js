import React, { useEffect, useState } from 'react';
import { auth, googleProvider } from '../firebase.js';
import { signInWithPopup, signOut } from 'firebase/auth';
import Home from './home.js';

function Login() {
    const [user, setUser] = useState(null);

    const handleClick = () => {
        signInWithPopup(auth, googleProvider).then((result) => {
            setUser(result.user);
        }).catch((error) => {
            console.error("Error during sign in: ", error);
        });
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div>
            {user ? <Home user={user} /> : 
                <button onClick={handleClick}>Sign In with Google</button>
            }
        </div>
    );
}

export default Login;

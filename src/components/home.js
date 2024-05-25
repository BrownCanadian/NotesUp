import React, {useEffect, useState} from "react";
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";
import Indi_List from "./indi_list.js";
import FirebaseFileUpload from "./FireBaseFileUpload.js";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { notes_main_dir } from "../firebase";
import { Document , Page} from 'react-pdf'
function Home({ user }) {
    const [data,setData] = useState([])
	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				console.log("User signed out");
			})
			.catch((error) => {
				console.error("Error during sign out: ", error);
			});
	};

    const getData = async () =>{
        const valRef = collection(notes_main_dir,'notes_main_dir')
        const dataDb = await getDocs(valRef)
        const allData = dataDb.docs.map(val=>({...val.data(),id:val.id}))
        setData(allData)
   
    }

    useEffect(()=>{
        getData()
}, [])
 

	return (
		<div>
			<h1>Hello, {user.displayName}</h1>
		
            {
                data.map(value=><div>
                <h1>{value.name}</h1>
                <img src={value.url} height='200px' width='200px' /> 
                </div>)
             }


			<FirebaseFileUpload />
			<button onClick={handleLogout}>Log Out</button>
		</div>
	);
}

export default Home;

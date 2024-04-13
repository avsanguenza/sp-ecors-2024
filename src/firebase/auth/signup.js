import firebase_app from "../config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import { collection, doc, setDoc } from "firebase/firestore"; 


const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

export default async function signUp(name,email, password) { //name,email,password
    let result = null,
        error = null;
  
    try {
        await createUserWithEmailAndPassword(auth, email, password).then( cred =>{
            setUserData(db,cred.user.uid, name);
        }
         );

    } catch (e) {
        error = e;
    }

    return { result, error };
}

function setUserData(db,userid,accName){
    try{
        result = setDoc(doc(db, 'users', userid),{
            displayName:accName
        });
    }
    catch(e){
        console.log(e);
    }

}

//setdefault picture
//set 



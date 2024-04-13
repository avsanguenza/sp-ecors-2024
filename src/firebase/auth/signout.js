
import { signOut, getAuth } from "firebase/auth";
import firebase_app from "../config";

const auth = getAuth(firebase_app);

export default  async function signOutUser(){
    let result = null,
        error=null ;
    try{
        console.log("here")
        signOut(auth).then((result) => {
            console.log('here');
        })
    } catch (e){
        error=e;
    }

   return {result,error}
}

export function getCurrentUser(){
    return this.auth.currentUser;
}
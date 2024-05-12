import { getAuth,onAuthStateChanged,sendPasswordResetEmail,updateProfile } from "firebase/auth";
import { imageData } from "@/firebase/data/storage";
import firebase_app from "@/firebase/config";
import userDBClass from "@/firebase/data/userDB";
const auth = getAuth(firebase_app);

export default class userData{
    constructor(){
        //getLocalStorage
        this.data = localStorage.getItem('currentUser')
        this.auth = auth
        this.name =''
        this.uid='';
        this.userType=''
    }
    parseData(){
        //parsedata here
        var accInfo = JSON.parse(this.data)
        this.name = accInfo.name;
        this.uid = accInfo.uid
        this.userType = accInfo.accountType;
        this.email = accInfo.email
    }
    getUserUID(){
        
        return this.uid;
    }
    getName(){
        return this.name;
    }
    getUserType(){
        return this.userType;
    } 
    async setNewProfile(firstName, lastName){
        console.log(firstName)
        let tempString= firstName+" "+lastName
        updateProfile(auth.currentUser,{
            displayName: tempString
           // photoURL: firebaseURL
        }).then(()=>{
          let udbc = new userDBClass(auth.currentUser)
          udbc.setAccValues()
        })
    }
    async setnewEmail(email){
      updateEmail(this.auth.currentUser, email).then(()=>{
        console.log('updated')
      }).catch((err)=>{
        console.log("setNewEmail = " + err)
      })
    }
    
    async changePasswordviaEnail(email){
        sendPasswordResetEmail(this.auth,email).then(()=>{
                console.log('password sent')
        }).catch((err)=>{
            console.log('changePassword - '+err)
        })
    }

    async setPhoto(){

    }
}
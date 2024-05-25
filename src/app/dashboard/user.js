import { getAuth,onAuthStateChanged,sendPasswordResetEmail,updatePassword,updateProfile } from "firebase/auth";
import { imageData } from "@/firebase/data/storage";
import firebase_app from "@/firebase/config";
import userDBClass from "@/firebase/data/userDB";
import { getFirestore,doc,getDoc } from "firebase/firestore";
const auth = getAuth(firebase_app);
let udbc = new  userDBClass(auth)
const dbInstance = getFirestore(firebase_app);
export default class userData{
    constructor(){
        //getLocalStorage
        this.data = localStorage.getItem('currentUser')
        this.auth = auth
        this.name =''
        this.uid='';
        this.userType=''
        this.photoURL =''
//        this.userAddress = anotherudbc.address
    }
    parseData(){
        //parsedata here
        var accInfo = JSON.parse(this.data)
        this.name = accInfo.name;
        this.uid = accInfo.uid
        this.userType = accInfo.accountType;
        this.email = accInfo.email
        this.userProvince = accInfo.userProvince;
        this.userCity = accInfo.userCity
        this.userCat = accInfo.userCat,
        this.userJob = accInfo.userJob,
        this.photoURL =accInfo.photoURL
    }
    checkUser(){
        this.auth.onAuthStateChanged((auth)=>{
            console.log(auth)
        })
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
    
    async fetchPhotoURL(){
        const docRef = doc(dbInstance,'users',this.uid)
        const docSnap=  await getDoc(docRef)
        this.photoURL = docSnap.data().userImage
    }  
    async setNewProfile(firstName, lastName, billAddress,aProvince,aCity,userPos,userJob,pURL){
        let img = (pURL=='')? this.photoURL : pURL
        let tempString= firstName+" "+lastName
      await updateProfile(auth.currentUser,{
            displayName: tempString,
            photoURL: img
        }).then((f)=>{
          let udbc = new userDBClass(auth.currentUser)
          udbc.setAccValues().then(async()=>{
            this.parseData()
            await udbc.updateAtrribute('displayName',tempString,auth.currentUser.uid).then(async()=>{
                await udbc.updateAtrribute('userImage',img,auth.currentUser.uid).then(async()=>{
                    await udbc.updateAtrribute('address',billAddress,auth.currentUser.uid).then(async()=>{
                        await udbc.updateAtrribute('userProvince',aProvince, auth.currentUser.uid).then(async()=>{
                            await udbc.updateAtrribute('userCity',aCity,auth.currentUser.uid).then(async()=>{
                                await udbc.updateAtrribute('userCategory',userPos,auth.currentUser.uid).then(async()=>{
                                        await udbc.updateAtrribute('userJob',userJob,auth.currentUser.uid)
                                })
                            })
                        })
                    })
                })
            })
          })
          
        }).then(async()=>{
            var val = auth.currentUser.metadata.creationTime
            await udbc.updateAtrribute('creationDate',val,auth.currentUser.uid)
        })
        await new Promise ((resolve)=> setTimeout(resolve,2000));
   //   window.location.reload()
        }
    async setnewEmail(email){
     await updateEmail(this.auth.currentUser, email).then(()=>{
        console.log('updated')
      }).catch((err)=>{
        console.log("setNewEmail = " + err)
      })
    }
    
    async changePassword(p1,p2){
        if(! p1 === p2){
            //eror
        }
        else{
            await updatePassword(auth.currentUser, p1).then(()=>{
                return true
            }).catch((err)=>{
                console.log(err)
            })
        }
    }

    async setPhoto(){

    }
}
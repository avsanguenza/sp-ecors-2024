

import firebase_app from "../config";
import {getFirestore,doc, getDocs,updateDoc} from 'firebase/firestore';

import { collection, query,where, onSnapshot} from 'firebase/firestore';

const firebase_app_init = firebase_app;
const db = getFirestore(firebase_app);

export default class userDBClass{
  constructor(auth){
    this.uid = auth.uid
    this.name = auth.displayName
    this.email = auth.email
    this.photoURL = auth.photoURL
    this.db = db
  }
  async setAccValues (){
   try{
    const unsub = onSnapshot(doc(db,"users",this.uid),(doc)=>{
      const userData = doc.data()
      let data = (doc.data().isOrganizer== true ? 'Event Organizer' : 'User');
      if(doc.data().isAdmin==true){
        data = 'Admin'
      }
      var obj = {
        'name' : this.name,
        'uid' : this.uid,
        'accountType' : data,
        'email': this.email,
        'photoURL':this.photoURL
      }
      console.log(obj)
      var toJSON = JSON.stringify(obj);
      localStorage.setItem('currentUser', toJSON);
  });
   }
   catch(err){
  }
}
async updateAtrribute(attrName, value,uid){
  const docRef = doc(this.db,"users",uid)
  await updateDoc(docRef,{
    [attrName]: value
  }).catch((err)=>{
    console.log(docRef.path + "   "+err)
  })
}

  async getUsers(arg0, queryOp, arg1){  
    const q = query(collection(db,'users'),where(arg0,queryOp,arg1))
    const qsnapshot = await getDocs()
  }
  }


function getDatatoDB(uid){
    const unsub = onSnapshot(doc(db,"users",uid),(doc)=>{
        const docData = doc.data();
        const dataArray = dbToArray(docData);
        console.log(dataArray[0]);
      //  name = getUserDisplayName(dataArray);
        //return name;
      //  console.log(getUserDisplayName(dataArray));
    });
}

export class userData{
  constructor(){
    this.db = db
    this.displayName = ''
  }
  async getData(collectionRef, arg0,queryOp,arg1){
    const q = query(collection(this.db,collectionRef),where(arg0,queryOp,arg1))
    const qsnapshot= await getDocs(q)
    qsnapshot.forEach((doc)=>{
      this.displayName = doc.data().displayName
    })
  }
}



export function getData(){
    const unsub = onSnapshot(doc(db,"users",uid),(doc)=>{
        const userData = doc.data()
       var value = (doc.data().isOrganizer == true) ? 'eOrganizer' : 'eConcess'
       this.accTypeValue = value;
    });
}

export function getAccTypeValue(){
  return accTypeValue;
}

//get and set values here


import firebase_app from "../config";
import {getFirestore,doc, getDoc} from 'firebase/firestore';

import { collection, query,where, onSnapshot} from 'firebase/firestore';

const firebase_app_init = firebase_app;
const db = getFirestore(firebase_app);

export default class userDBClass{
  constructor(uid,value){
    this.uid = uid
    this.name = value;
  }
  setAccValues (){
    const unsub = onSnapshot(doc(db,"users",this.uid),(doc)=>{
      const userData = doc.data()
      let data = (doc.data().isOrganizer== true ? 'Event Organizer' : 'User');
      data = (doc.data().isAdmin == true ? 'Admin' : 'User')
      var obj = {
        'name' : this.name,
        'uid' : this.uid,
        'accountType' : data
      }
      var toJSON = JSON.stringify(obj);
      localStorage.setItem('currentUser', toJSON);
      //console.log(data);
  });
}
  async getUsers(){
    
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
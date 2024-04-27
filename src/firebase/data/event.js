import firebase_app from "../config";
import {getFirestore,doc, getDocs, query,collection} from 'firebase/firestore';

import {where, onSnapshot} from 'firebase/firestore';

const firebase_app_init = firebase_app;
const dbInstance = getFirestore(firebase_app);

//events - get Event data/ set event data 
//event application - getEvent data/ set event data
export default class appData{
    constructor(){
        this.db= dbInstance;
        this.baseDocument;
        this.docFieldData = [];
    }
    
   async getData(collectionRef,arg0, queryOp, arg1){//REWRITE ASG GET()
       //const q = query(collection(this.db,collectionRef),where(arg0,queryOp,arg1))
      const qsnapshot = this.db.collection(collectionref).where(arg0,queryOp,arg1).get()
      qsnapshot.forEach((doc)=>{
        console.log(doc.data().eventName)
      })
      
    }
    async setData(collectionRef){

    }

}

//Event Postings 
export  class eventData extends appData{
    constructor(){
      super()
      this.eventName="";
      this.eventUID = new Array()
    }

    async setData(eventNameInput, eventDateInfo, eventLocInfo, eventDescriptionInput){ //override
        const res = await this.db.collection('events').add({
            userid: this.uid,
            eventName: eventNameInput,
            eventDate: eventDateInfo,
            eventLocation:eventLoc,
            description:eventDescriptionInput,
            eventWageType:'',
            eventWageTypeValue:'',
            isOpen: true
        })
    }
    async getData(collectionRef,arg0, queryOp, arg1){
        const q = query(collection(this.db,collectionRef),where(arg0,queryOp,arg1))
       const qsnapshot = await getDocs(q);
        qsnapshot.forEach((doc)=>{
        this.eventName= doc.data().eventName;
        this.eventUID.push(doc.id);
        //this.eventDoc.set({id: doc.id},doc.data())
       })
      

     }

     getEventName(){
        var temp = this.eventName;
        return temp;

     }

    getEventUID(){
        return this.eventUID;
    }

     getEventDoc(){
        return this.eventDoc
     }

}


//Event Applications extend Data

export class eventFormData extends appData{
    constructor(uid,eventUID){
        super()
        this.uid= uid;
        this.eventUID = eventUID;
    }

    async setData(collectionRef){
       
    }
}
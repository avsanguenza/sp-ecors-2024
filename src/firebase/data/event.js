import firebase_app from "../config";
import {getFirestore,doc, getDocs, setDoc, query,collection, addDoc} from 'firebase/firestore';
import {where} from 'firebase/firestore';
import userData from "@/app/dashboard/user";
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
      this.eventCName='';
      this.eventLocation = '';
      this.wageType='';
      this.wageTypeVal='';
      this.eventUID = '';
      this.dataobjMap = new Map();
      this.eventKeys = new Array();
    }

    async setData(uid, eventCName, eventNameInput, eventDateInfo, eventLocInfo, eventDescriptionInput,eventWType, eventWTypeVal){ //override
        const docRef = doc(collection(this.db,"events"))
        await setDoc(docRef,{
            userid: uid,
            eventCreatorName: eventCName,
            eventName: eventNameInput,
            eventDate: eventDateInfo,
            eventLocation:eventLocInfo,
            description:eventDescriptionInput,
            eventWageType:eventWType,
            eventWageTypeValue:eventWTypeVal,
            isOpen: true
        })

    }

    async getData(collectionRef,arg0, queryOp, arg1){
        const q = query(collection(this.db,collectionRef),where(arg0,queryOp,arg1))
       const qsnapshot = await getDocs(q);
        qsnapshot.forEach((doc)=>{
        this.eventName= doc.data().eventName;
        this.eventUID = doc.id;
        this.eventKeys.push(doc.id);
        this.eventLocation=doc.data().eventLocation;
        this.wageType = doc.data().eventWageType;
        this.wageTypeVal = doc.data().eventWageTypeValue;  
        this.dataToJSON()
         })

        //dataToJSON(this.eventUID,this.eventName, this.eventLocation,this.eventWageType,this.eventWageTypeVal)

     }

     dataToJSON(){
        let data ={
            'eventName' : this.eventName,
            'eventLocation': this.eventLocation,
            'eventWageType' : this.wageType,
            'eventWageTypeVal' : this.wageTypeVal
        }
        const dataobj = JSON.stringify(data)
        this.dataobjMap.set(this.eventUID,dataobj)
     }

     getResults(){
        return this.dataobjMap;
     }
     getEventName(){
        var temp = this.eventName;
        return temp;
     }

    getEventLocation(){
        return this.eventLocation;
    }
    getEventUID(){
        return this.eventUID;
    }

     getEventDoc(){
        return this.eventDoc
     }
    
     getWageType(){
        return this.wageType;
     }
     getWageTypeVal(){
        return this.wageTypeVal;
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
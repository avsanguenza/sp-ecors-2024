import firebase_app from "../config";
import {getFirestore,doc, getDocs, setDoc, query,collection, addDoc, updateDoc, deleteDoc} from 'firebase/firestore';
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
      this.eventImageURL=""
      this.wageType='';
      this.wageTypeVal='';
      this.eventUID = '';
      this.eventStatus='';
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
        this.eventCreatorName=doc.data().eventCreatorName;        
        this.eventUID = doc.id;
        this.eventImageURL = doc.data().eventImage
        this.eventDate = doc.data().eventDate;
        this.eventKeys.push(doc.id);
        this.eventLocation=doc.data().eventLocation;
        this.wageType = doc.data().eventWageType;
        this.wageTypeVal = doc.data().eventWageTypeValue;  
        this.description = doc.data().description;
        this.eventStatus = doc.data().isOpen;
        this.dataToJSON()
         })

        //dataToJSON(this.eventUID,this.eventName, this.eventLocation,this.eventWageType,this.eventWageTypeVal)

     }

    async updateData(eventUID, eventNameInput, eventDateInfo, eventLocInfo, eventDescriptionInput,eventWType, eventWTypeVal){
        const docRef = doc(this.db,"events",eventUID)
        await updateDoc(docRef,{
            eventName: eventNameInput,
            eventDate: eventDateInfo,
            eventLocation:eventLocInfo,
            description:eventDescriptionInput,
            eventWageType:eventWType,
            eventWageTypeValue:eventWTypeVal
          //  isOpen: true
        }).then(()=>{
            return true
        }).catch((err)=>console.log(err))
    }

    async updateStatus(eventUID, eventStatus){
        const docRef = doc(this.db,"events",eventUID)
        await updateDoc(docRef,{
            isOpen: eventStatus
        })
    }

     dataToJSON(){
        let data ={
            'eventid' : this.eventUID,
            'eventName' : this.eventName,
            'eventCreatorName': this.eventCreatorName,
            'eventLocation': this.eventLocation,
            'eventWageType' : this.wageType,
            'eventWageTypeVal' : this.wageTypeVal,
            'eventDate' :  this.eventDate,
            'eventDescription' : this.description,
            'eventImageURL': this.eventImageURL,
            'isOpen' : this.eventStatus
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
    
    getEventKeys(){
        return this.eventKeys;
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
    constructor(userUID,eventUID){
        super()
        this.uid= userUID;
        this.eventUID = eventUID;
        this.applicantID='';
        this.applicantEmail ='';
        this.applicantPhone = '';
        this.count = 0
        this.eventDataObj = new Map();
    }

    async setData(phoneNum,emailAdd){
       const docRef = doc(this.db,'event-application',this.eventUID);
       const colRef = collection(docRef,'entries')
        addDoc(colRef,{
            userid: this.uid,
            phoneNumber: phoneNum,
            emailAddress: emailAdd,
            applicationStatus:'pending'
        })
    }
    async getData(){
        const docRef = doc(this.db, 'event-application',this.eventUID)
        const colRef = collection(docRef,'entries')
        const snapshot = await getDocs(colRef);
        snapshot.forEach((doc)=>{
            this.count = this.count +1
            this.applicantID = doc.data().userid;
            this.applicantEmail = doc.data().emailAddress;
            this.applicantPhone = doc.data().phoneNumber;
            //add for file later-> downloadlink!
            this.dataToJSON();
        })

    }

    dataToJSON(){
       let data= {
        'eventid' : this.eventUID,
        'applicantName': this.applicantID,
        'applicantEmail': this.applicantEmail,
        'applicantPhone' : this.applicantPhone,
    }
    const dataobj = JSON.stringify(data)
    this.eventDataObj.set(this.eventUID,dataobj)
    }
    
}
import firebase_app from "../config";
import {getFirestore,doc, getDocs, setDoc, query,collection, addDoc, updateDoc, getCountFromServer} from 'firebase/firestore';
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
      this.eventImageURL='';
      this.dataobjMap = new Map();
      this.eventKeys = new Array();
      this.eventDataObj = new Array()
    }

    async setData(uid, eventCName, eventNameInput, eventDateInfo, eventLocInfo, eventDescriptionInput,eventWType, eventWTypeVal,eventimg){
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
            eventImage:eventimg,
            isFeatured: false,
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
      //  this.eventKeys.push(doc.id);
        this.eventLocation=doc.data().eventLocation;
        this.wageType = doc.data().eventWageType;
        this.wageTypeVal = doc.data().eventWageTypeValue;  
        this.description = doc.data().description;
        this.eventStatus = doc.data().isOpen;
        this.dataToJSON()
         })

        //dataToJSON(this.eventUID,this.eventName, this.eventLocation,this.eventWageType,this.eventWageTypeVal)

     }

     async getAllData(){
        const q= query(collection(this.db,'events'))
        const qSnapshot = await getDocs(q)
        qSnapshot.forEach((doc)=>{
           if(doc.data().isOpen){
            var data ={
                'eventuid': doc.id,
                'eventName': doc.data().eventName,
                'eventCreatorName': doc.data().eventCreatorName,
                'eventDate' :doc.data().eventDate,
                'eventLocation': doc.data().eventLocation,
                'isFeatured': doc.data().isFeatured
            }
            this.eventDataObj.push(data)
           }
        })
    }

    async fetchEventID(){
        const q= query(collection(this.db,'events'))
        const qSnapshot = await getDocs(q)
        qSnapshot.forEach((doc)=>{
            this.eventKeys.push(doc.id)
        })
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

    async updateAttribute(uid,attr,value){
        const docRef = doc(this.db,'events',uid)
        await updateDoc(docRef,{
            [attr]: value
        }, {merge:true})
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
        this.docid=''
        this.applicantID='';
        this.applicantEmail ='';
        this.applicantPhone = '';
        this.applicationStatus=''
        this.applicantFile='';
        this.eventDataObj = new Map();
        this.applicantFileObj = new Array()
    }

    async setData(phoneNum,emailAdd,appFile){
      try{
        const docRef = doc(this.db,'event-application',this.eventUID);
        const colRef = collection(docRef,'entries')
        await addDoc(colRef,{
            userid: this.uid,
            phoneNumber: phoneNum,
            emailAddress: emailAdd,
            applicantFile: appFile,
            applicationStatus:'pending'
        })
      }catch(err){
        console.log("setData: "+ err)
      }
    }
    async getData(){
        //const docRef = doc(this.db, 'event-application',this.eventUID)

       // const colRef = collection(docRef,'entries')
        const snapshot = await getDocs(collection(this.db,'event-application/'+this.eventUID+"/entries"));
        snapshot.forEach((doc)=>{
          //  console.log(doc.data())
          this.docid = doc.id
            this.applicantID = doc.data().userid;
            this.applicantEmail = doc.data().emailAddress;
            this.applicantPhone = doc.data().phoneNumber;
            this.applicantFile = doc.data().applicantFile;
            this.applicationStatus = doc.data().applicationStatus;
            //add for file later-> downloadlink!
            this.dataToJSON();
        })

    }
    async updateAttribute(docid,attrName,value){
        const docRef = doc(this.db,'event-application',this.eventUID);
        const colRef = collection(docRef,'entries')
        const doc1Ref = doc(colRef,docid)
        await updateDoc(doc1Ref,{
            [attrName]: value
        })
    }

    async getSpecificData(uid,arg0,qOp,arg1){
    
        const col0Ref = query(collection(this.db,'events')) 
        const snapshot0 = await getDocs(col0Ref)
        snapshot0.forEach(async (d)=>{
          var tempData = d
          const colRef = collection(this.db,'event-application/'+uid+"/entries")
          const qColRef = query(colRef,where(arg0,qOp,arg1))
          const snapshot = await getDocs(qColRef)
          snapshot.forEach((doc)=>{
              var data={
                  'eventuid': tempData.id,
                  'eventName': tempData.data().eventName,
                  'eventCreatorName': tempData.data().eventCreatorName,
                  'eventLocation' :tempData.data().eventLocation,
                  'eventWageType': tempData.data().eventWageType,
                  'eventWageTypeVal': tempData.data().eventWageTypeValue,
  
                  'applicationStatus': doc.data().applicationStatus,
                  'emailAddress': doc.data().emailAddress,
                  'phoneNumber': doc.data().phoneNumber

              }
            //  console.log(data)
              if(!this.applicantFileObj.includes(data)){
                this.applicantFileObj.push(data)
              }
          })
    
        })
        

    }
    dataToJSON(){
       let data= {
        'docid': this.docid,
        'eventid' : this.eventUID,
        'applicantID' : this.applicantID,
        'applicantName': this.applicantID,
        'applicantEmail': this.applicantEmail,
        'applicantPhone' : this.applicantPhone,
        'applicationStatus':this.applicationStatus,
        'applicantFile': this.applicantFile
    }
    const dataobj = JSON.stringify(data)
    this.eventDataObj.set(this.applicantID,dataobj)
    }

    async getEntryCount(eventid){
            const coll = collection(this.db,'event-application/'+eventid+"/entries")
            const snap = await getCountFromServer(coll)
            //console.log(eventid+"-"+snap.data().count)
            var finalCount = snap.data().count
            return(
                finalCount
            )
    }
    
}
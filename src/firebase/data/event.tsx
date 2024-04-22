import firebase_app from "../config";
import {getFirestore,doc, getDoc, query,collection} from 'firebase/firestore';

import {where, onSnapshot} from 'firebase/firestore';

const firebase_app_init = firebase_app;
const db = getFirestore(firebase_app);

//events - get Event data/ set event data 
//event application - getEvent data/ set event data
//use abstraction 

abstract class EventData{
    db : string;
    document : string;
    constructor(db:string, document:string){
        this.db=db;
        this.document = document;
        
    }

    setData(): void{

    }

    async getData(document:string, arg0:string, queryOp?string, arg1:string ){
        const dataQuery = query((collection(db,document)),where(arg0,queryOp,arg1));
           
    }

}

//Event Postings 

//Event Applications extend Data
import firebase_app from "../config";
import {getFirestore,doc, getDoc} from 'firebase/firestore';

import { collection, query,where, onSnapshot} from 'firebase/firestore';

const firebase_app_init = firebase_app;
const db = getFirestore(firebase_app);

//events - get Event data/ set event data 
//event application - getEvent data/ set event data
//use abstraction 

abstract class Data{
    abstract getData()
    

}

//get and set values here


import firebase_app from "../config";
import {getFirestore,doc, getDoc} from 'firebase/firestore';

import { collection, query,where, onSnapshot} from 'firebase/firestore';
import { getDisplayName } from "next/dist/shared/lib/utils";

const firebase_app_init = firebase_app;
const db = getFirestore(firebase_app);
var dName="";
/**
 * 
 * @param {*} data 
 * @returns dbToArrayList - a map containg key = index value = firebase value
 */
function dbToArray(data){
    const dbToArrayList = Object.keys(data).map(d =>{
        return data[d];
    });
    return dbToArrayList;
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

export default function test(uid){
    let name; 
    const unsub = onSnapshot(doc(db,"users",uid),(doc)=>{
        const docData = doc.data();
        const dataArray = dbToArray(docData);
        console.log(dataArray[0]);
      //  name = getUserDisplayName(dataArray);
        //return name;
      //  console.log(getUserDisplayName(dataArray));
    });
}


export function getUserDisplayName(uid){
    const unsub = onSnapshot(doc(db,"users",uid),(doc)=>{
        const docData = doc.data();
        const dataArray = dbToArray(docData);
        dName = dataArray[0];
       
      //  name = getUserDisplayName(dataArray);
        //return name;
      //  console.log(getUserDisplayName(dataArray));
    });
    return dName;
}

//update function here

function privGetUserImage(dataArray){
    return dataArray[3];
}

export function getUserImage(dataArray){
    return privGetUserImage(dataArray);
}

function isUserOrganizer(dataArray){
    return ((dataArray[1]== true) ? true :false);
}

export function getUserType(dataArray){
    return isUserOrganizer(dataArray);
}
//update function here 

 
//getuserAccessPriv
//update getPriv

//construct a class for user then extend that 
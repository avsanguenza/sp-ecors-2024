import firebase_app from "../config";
import {getFirestore,doc, getDocs, setDoc, query,collection, addDoc, updateDoc, getCountFromServer} from 'firebase/firestore';
import {where} from 'firebase/firestore';
import userData from "@/app/dashboard/user";
const firebase_app_init = firebase_app;
const dbInstance = getFirestore(firebase_app);

export default class Messages{
    constructor(){
        this.db =dbInstance
    }

    async getData(){
        //FORMAT OF DB-> messaging (db) / convo id {check send0, send1} / messages / messageID {SORT} 
        const tRef  = doc(this.db, 'messaging')
    }
    async createT(sender0uid, sender1uid){
        const tRef = collection(this.db,'messaging')
        await addDoc(tRef,{
            sender0:sender0uid,
            sender1:sender1uid
        }).then(async (snap)=>{
           // console.log(snap)
           // console.log(snap.path)
           var docRef = await addDoc(
            collection(this.db,'messaging',snap.id,'chat'),{
              //  title:'Test',
            }
           )
        

    })
}
}
import firebase_app from "../config";
import {getFirestore,doc, getDocs, setDoc, query,collection, addDoc, updateDoc,serverTimestamp, getDoc, orderBy, onSnapshot,or} from 'firebase/firestore';
import {where} from 'firebase/firestore';
import userData from "@/app/dashboard/user";
const firebase_app_init = firebase_app;
const dbInstance = getFirestore(firebase_app);

export default class Messages{
    constructor(sender0uid, sender0Name, sender1uid, sender1Name){
        this.db =dbInstance
        this.sender0uid = sender0uid
        this.sender0Name = sender0Name
        this.sender1uid = sender1uid
        this.sender1Name = sender1Name
        this.messageHistory= new Array()
        this.userConvos = new Array()
        this.newMessage = 'initial';
    }

    async getData(){
        //FORMAT OF DB-> messaging (db) / convo id {check send0, send1} / messages / messageID {SORT} 
        if(!await this.checkExistingConvo()){
            const qRef = query(collection(this.db,'messaging'),or(where('sender0','==',this.sender0uid),where('sender1','==',this.sender0uid)))
            const snapshot = await getDocs(qRef).then(async(sn)=>{
                var convoid= sn.docs[0].id
                const q0 = query(collection(this.db,'messaging/'+convoid+'/chat'),orderBy('timeSent'))
                await new Promise ((resolve)=> setTimeout(resolve,2000));
                var convoRef = await getDocs(q0)
                
                convoRef.forEach((c)=>{
                    //console.log(c.data().message)
                    var data={
                            'message' :c.data().message,
                            'senderID' :c.data().msgSenderID,
                            'timeSent' : c.data().timeSent
                    }
                  //  console.log(data)
                    this.messageHistory.push(data)
                })
                this.updateMessageListener()
               // var convoRef = await getDocs(collection(this.db,'messaging/'+convoid+'/chat'))
               // convoRef.forEach((c)=>{
              //      console.log(c.id)
            //    })
               
            })
        
           }
    }

    async checkExistingConvo(){
        const colRef = collection(this.db,'messaging')
        const qRef = query(collection(this.db,'messaging'),or(where('sender0','==',this.sender0uid),where('sender1','==',this.sender0uid)))
        const snapshot = (await getDocs(qRef)).empty
       // console.log((await snapshot).docs[0].id)
        return snapshot
    }
    async updateAttribute(docid,attrName,value){
        const docRef = doc(this.db,'messaging',docid)
        await updateDoc(docRef,{
            [attrName]: value
        })
    }
    async updateConvo (msgData){
       if(!await this.checkExistingConvo()){
        const qRef = query(collection(this.db,'messaging'),or(where('sender0','==',this.sender0uid),where('sender1','==',this.sender0uid)))
        const snapshot = await getDocs(qRef).then(async(sn)=>{
            var convoid= sn.docs[0].id
            await this.updateAttribute(convoid,'lastUpdates',serverTimestamp()).then(async()=>{
                
            await addDoc(collection(this.db,'messaging/'+convoid+'/chat'),{
                msgSenderID: this.sender0uid,
                message: msgData,
                timeSent: serverTimestamp()
            }).then(()=>{
                this.newMessage='added'
            })
            })
           // var convoRef = await getDocs(collection(this.db,'messaging/'+convoid+'/chat'))
           // convoRef.forEach((c)=>{
          //      console.log(c.id)
        //    })
           
        })
    
       }
    }
    async updateMessageListener(){
        const observerQ =  query(collection(this.db,'messaging'),where('sender0','==',this.sender0uid),where('sender1','==',this.sender1uid))
        const unsub= onSnapshot(observerQ,(qnSnap)=>{
            qnSnap.docChanges().forEach((ch)=>{
                if(ch.type==='added'|| ch.type ==='modified'){
                    this.newMessage='changed'
                }
            })

            unsub();
        })
    }
    async fetchUserMessage(){
        const qRef = query(collection(this.db,'messaging'),or(where('sender0','==',this.sender0uid),where('sender1','==',this.sender0uid)))
        const snapshot = await getDocs(qRef,orderBy('lastUpdates'))
            snapshot.forEach((doc)=>{
              if(!this.userConvos.includes(doc.id)){
                var data ={
                    'convoid': doc.id,
                    'sender0': doc.data().sender0,
                    'sender0Name': doc.data().sender0Name,
                    'sender1': doc.data().sender1,
                    'sender1Name': doc.data().sender1Name
                }
                this.userConvos.push(data)
              }
            }) 
           }
    async createT(msgData){
        const tRef = collection(this.db,'messaging')
      if(await this.checkExistingConvo(this.sender0uid,this.sender1uid)){
        await addDoc(tRef,{
            sender0:this.sender0uid,
            sender1:this.sender1uid,
            lastUpdates: serverTimestamp()
        }).then(async (snap)=>{
           // console.log(snap)
           // console.log(snap.path)
           var docRef = await addDoc(
            collection(this.db,'messaging',snap.id,'chat'),{
                msgSenderID: this.sender0uid,
                message: msgData,
                timeSent: serverTimestamp()
              //  title:'Test',
            }
           )
        

    })
      }
}
}
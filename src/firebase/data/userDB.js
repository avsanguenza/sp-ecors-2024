

import firebase_app from "../config";
import {getFirestore,doc, getDocs,updateDoc,setDoc} from 'firebase/firestore';

import { collection, query,where, onSnapshot} from 'firebase/firestore';
import toast from "react-hot-toast";
import province from '@/assets/provinces.json'
const firebase_app_init = firebase_app;
const db = getFirestore(firebase_app);

export default class userDBClass{
  constructor(auth){
    this.uid = auth.uid
    this.name = auth.displayName
    this.email = auth.email
    this.photoURL = auth.photoURL
    this.address =''
    this.db = db
  }
  async setAccValues (){
   try{
    const unsub = onSnapshot(doc(db,"users",this.uid),(doc)=>{
      console.log(doc.data())
      const userData = doc.data()
      let data = (doc.data().isOrganizer== true ? 'Event Organizer' : 'User');
      if(doc.data().isAdmin==true){
        data = 'Admin'
      }
      this.address = doc.data().address
      var obj = {
        'name' : this.name,
        'uid' : this.uid,
        'accountType' : data,
        'email': this.email,
      //  'address': doc.data().address,
        //'genLocation': doc.data().userProvince+", "+doc.data().userCity,
        'userProvince': doc.data().userProvince,
        'userCity': doc.data().userCity,
        'userJob': doc.data().userJob,
        'userCat':doc.data().userCategory,
        'photoURL':this.photoURL
      }
      var toJSON = JSON.stringify(obj);
      localStorage.setItem('currentUser', toJSON);
  })
   }
   catch(err){
  }
}

async updateAtrribute(attrName, value,uid){
  const docRef = doc(this.db,"users",uid)
  await setDoc(docRef,{
    [attrName]:value
  },{merge:true})
  .catch((err)=>{
    console.log(docRef.path + "   "+err)
  })
}

  async getUsers(arg0, queryOp, arg1){  
    const q = query(collection(db,'users'),where(arg0,queryOp,arg1))
    const qsnapshot = await getDocs()
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

export class userData{
  constructor(){
    this.db = db
    this.displayName = ''
    this.userDataObj = new Array();
  }
  async getData(collectionRef, arg0,queryOp,arg1){
    const q = query(collection(this.db,collectionRef),where(arg0,queryOp,arg1))
    const qsnapshot= await getDocs(q)
    qsnapshot.forEach((doc)=>{
    // this.displayName = doc.data().displayName
      var data={
        'uid': doc.id,
            'displayName': doc.data().displayName,
            'isActive': doc.data().isAccountActive,
            'isConcess': doc.data().isConcess,
            'isOrganizer':doc.data().isOrganizer,
            'userProvince': this.getNormalName(doc.data().userProvince),
            'userCity': doc.data().userCity,
            'userCat': doc.data().userCategory,
            'userJob': doc.data().userJob,
            'userImage': doc.data().userImage
      }
      this.userDataObj.push(data)

    })
  }
  
  getNormalName(data){
    var temp=''
    province.map((v,k)=>{
      if(v.key==data){
        temp= v.name
      }
    })
    return temp
  }
  async getAllData(){
    const q= query(collection(this.db,'users'))
    const qSnapshot = await getDocs(q)
    qSnapshot.forEach((doc)=>{
        if(!doc.data().isAdmin == true){
          var data={
            'uid': doc.id,
            'displayName': doc.data().displayName,
            'isActive': doc.data().isAccountActive,
            'isConcess': doc.data().isConcess,
            'isOrganizer':doc.data().isOrganizer,
            'userImage': doc.data().userImage
          }
          this.userDataObj.push(data)
        }
    })
  }
  async updateAttribute(uid,attrName,value){
   // const docRef = doc(this.db,'users',uid);
    try{
      const docRef = doc(this.db,'users',uid)
   // const doc1Ref = doc(colRef,docid)
    await updateDoc(docRef,{
        [attrName]: value
    },{merge:true})
    }catch(err){
      toast.error('Something has occurred. Please try again.')
    }
}
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
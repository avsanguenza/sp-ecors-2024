import { getDoc } from "firebase/firestore";
import { storage } from "../config";
import { ref,uploadBytesResumable,getDownloadURL, getStorage, uploadString } from "firebase/storage";


export default class storageData{
    constructor(){
        this.storage = storage
    }
    async uploadFile(file, fileName){

    }
}

export class imageData extends storageData{
    constructor(folderName){
        super()
        this.imageFolder = folderName+'Image/'
        this.metadata = {contentType: 'image/jpeg'}
        this.eventURL =''
    }
    async uploadImage(file, fileName){
        //fix the storage
      // type: e.target.files[0].name.split(".").pop(),
     //  this.metadata = this.getMetadata(this.getMetadata(file.type))
        const imageRef = ref(this.storage, this.imageFolder+fileName,this.metadata)
         return uploadBytesResumable(imageRef, file.blob).then((snapshot)=>{
            return getDownloadURL(snapshot.ref).then((sn)=>{
                return sn
            })
        }) 
        
    }
    async getURL(data){
       
    }
    async getFile(path){
        try{
        const fileRef = ref(this.storage,path);
        getDownloadURL(fileRef).then((url)=>{
            console.log(url)
                this.eventURL = url
        })
    }
        catch(err){
            console.log(err)
        }
    }
    getEventURL(){
        return this.eventURL;
    } 
    getMetadata(type){
        if(type=='jpg' || type=='jpeg'){
            return({  contentType: 'image/jpeg'})
        }
        else if( type =='png'){
            return({ contentType: 'image/png'})
        }
       
    }
}

export class fileData extends storageData{
    constructor(eventid){
        super()
        this.dataFolder = 'eventApplicationForms/'+eventid
        this.folder = eventid
        this.metadata= '';
    }
    async uploadFile(file){
        console.log(file.type)
        this.metadata = this.getMetadata(file.type)
        const docUploadRef = ref(this.storage,this.dataFolder+"/"+file.name,this.metadata)
        return uploadBytesResumable(docUploadRef,file.b64).then((snapshot)=>{
            return getDownloadURL(snapshot.ref).then((sn)=>{
                return sn
            })
        })

    
    }

    getMetadata(type){
        if(type=='pdf'){
            return({  contentType: 'application/pdf'})
        }
        else if( type =='doc'){
            return({ contentType: 'application/msword'})
        }
        else{
            return ({ contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'})
        }
    }
}
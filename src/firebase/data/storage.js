import { getDoc } from "firebase/firestore";
import { storage } from "../config";
import { ref,uploadBytesResumable,getDownloadURL, getStorage } from "firebase/storage";


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
        const imageRef = ref(this.storage, this.imageFolder+"/"+fileName,this.metadata)
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
}

export class fileData extends storageData{

}
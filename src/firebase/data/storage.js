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
        const imageRef = ref(this.storage, this.imageFolder+"/"+fileName)
        const res =  uploadBytesResumable(imageRef, file.blob)

        res.on('state_changed', (s)=>{
            switch(s.state){
                case "running": "is running"
                case "paused": "is pasued"
                case "success": "upload success!"
                case "canceled": "canceled"
                case "error": "error"
            }
        }, (error)=>{
            console.log(error)
        })

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
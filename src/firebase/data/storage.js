import { storage } from "../storageConfig";
import { ref,uploadBytes,getDownloadURL, getStorage } from "firebase/storage";

const storageRef = getStorage(storage)

export default class storageData{
    constructor(){
        this.storage = storageRef;
    }
    async uploadFile(file, fileName){

    }
}

export class imageData extends storageData{
    constructor(folderName){
        super()
        this.imageFolder = folderName+'Image/'
    }
    async uploadImage(file, fileName){
        const imageRef = ref(this.storage, this.imageFolder+"/"+fileName)
        uploadBytes(imageRef, file).then((s)=>{
            console.log("uploaded")
        }).catch((err)=>{
            console.log(err)
        })
    }
}

export default class userData{
    constructor(){
        //getLocalStorage
        this.data = localStorage.getItem('currentUser')
        this.name =''
        this.uid='';
        this.userType=''
    }
    parseData(){
        //parsedata here
        var accInfo = JSON.parse(this.data)
        this.name = accInfo.name;
        this.uid = accInfo.uid
        this.userType = accInfo.accountType;
    }
    getUserUID(){
        
        return this.uid;
    }
    getName(){
        return this.name;
    }
    getUserType(){
        return this.userType;
    }
}
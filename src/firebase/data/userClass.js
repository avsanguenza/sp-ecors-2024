//create a constructor for the basic user 

//class organizer/concessionaire extends basic user 
//get export classes

import test, { getUserDisplayName } from "../data/userDB"; //change name 
class User{
    constructor(uid){
        this.userUID = uid;
        this.displayName = getUserDisplayName(uid);
        //get displayImage 

    }
}

export default User;

class eventOrganizer extends User{
    constructor(uid){
        super(uid);
    }

    //
}

class concessionaire extends User{
    constructor(uid){
        super(uid);
        
    }
}

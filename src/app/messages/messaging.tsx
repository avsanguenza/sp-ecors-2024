export default class MessageClass{

    constructor(){
        this.messageArray = new Array()
    }
    
    sender0Bubble(message){
        return(
         <>
          <div class="chat chat-end">
          <div class="chat-bubble bg-pink-500 text-white">{message}</div>
      
          </div>
         </>
        )
      }
    sender1Bubble(message){
        return(
          <div className="chat-bubble bg-gray-500 text-white">
            {message}
          </div>
      
        )
      }
    intializeChat(){
        Array.from({length:10}, (v,i)=>{
          this.messageArray.push(this.sender1Bubble('Loren ipsum'))
        })
      }

}      
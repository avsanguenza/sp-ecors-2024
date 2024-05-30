
async function ChatBubbles(messageHistory,sender0,sender1){
  await new Promise ((resolve)=> setTimeout(resolve,3000));

    var msgHistory = messageHistory.reverse().sort()
    var sender_end = sender0
    var sender_star = sender1
    return (
        <>
        {
            msgHistory.map((d)=>{
              const {message} = d
              const {timeSent} = d
              const {senderID} = d
             //S console.log(message)
              if(senderID == sender_end){
                return(
                    sender0Bubble(message,timeSent)
                )
               }
               else{
                return(
                  sender1Bubble(message,timeSent)
                )
               }
            })
        }
        </>
    )

}

export default ChatBubbles

function sender0Bubble(message,time){
    const date = time.toDate().toDateString() //too fast
    return(
      <div class="chat chat-end">
    <div class="chat-header text-start ">
      {
      //sessionStorage.getItem('sender0name').split(' ')[0]
      }
    </div>
   <div className="inline-flex">
   <time class="text-xs opacity-50 pr-4">{date} </time>
    <div class="chat-bubble bg-pink-500 text-white ">
    {message}
  </div>
   </div>
    <div class="chat-footer opacity-50">
     {
      //status here
     }
    </div>
    </div>
     
    )
  }

  function sender1Bubble(message,time){

    const date = time.toDate().toDateString() //too fast throw 
    return(
      <div class="chat chat-start">
    <div class="chat-header text-start ">
      {
      //sessionStorage.getItem('sender0name').split(' ')[0]
      }
    </div>
   <div className="inline-flex">
    <div class="chat-bubble bg-grey-500 text-white ">
    {message}
  </div>
  <time class="ml-3 inline text-xs opacity-50 pr-4">{date} </time>

   </div>
    <div class="chat-footer opacity-50">
     {
      //status here
     }
    </div>
    </div>
     
    )
  
  }
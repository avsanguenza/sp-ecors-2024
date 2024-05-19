
async function ChatBubbles(messageHistory,sender0,sender1){
    var msgHistory =  messageHistory
    var sender_end = sender0
    var sender_star = sender1
    return (
        <>
        {
            msgHistory.map((d)=>{
               if(d.senderID == sender_end){
                return(
                    sender0Bubble(d.message,d.timeSent)
                )
               }
            })
        }
        </>
    )

}

export default ChatBubbles

function sender0Bubble(message,time){
    const date = time.toDate().toDateString()
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

    const date = time.toDate().toDateString()
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
'use client'
import navBar from "../navBar";
function messagePage(){ //sender0, sender1; sender0 - active user
    //when accessing a message, you should check if the currentUser == sender0 or sender1
    //if it passes, sort out the subcollection by time 
    //and determine if the accessing user is 0 or 1, then put the messages based on the access
    //(if sender 0 is the one accessing the message, they should go to chat-end <div> tags)
    const handleMessageSend= (e)=>{
      e.preventDefault()

    //  console.log(document.getElementById('chatMsg').value)
    }
    return(
        <>
        {navBar()}
        
        <div class="flex size-full h-lvh">
          <div className="w-1/4 bg-gray-100 rounded-lg z-10">
          {messageList()}
          </div>
          <div className="w-3/4 text center bg-white ">
          <div className=" w-full bg-white">
      <p className="px-10 py-4 text-grey-900 text-3xl font-bold">User client name</p>
    </div>  
        <div className="grid grid-cols-1 divide-y">
          <div >
          {message()}
          </div>
          <div class="justify-center">

        <form >
              <input type="text" id="chatMsg" class=" w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="Send a message" required />
                  <div className="static -mt-[50px] mr-3 flex-1 text-end ">
                  <button type="submit" class=" text-white bg-pink-500 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-full text-sm px-8 py-3 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800" onClick={handleMessageSend}>Send</button>
                  </div>
        </form>
        </div>

        </div>
          
          </div>
        </div>
        </>
    )
}
export default messagePage;

function messageList(){
  return(
    <>
       <p className="ml-3 mt-3 font-bold text-grey-900 text-4xl  ">Messages</p>
            <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
            <div className="bg-gray-200 rounded lg px-4 py-3" >
                <div class="flex items-center">
                <img className="bg-left rounded-full h-16 w-16  " src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"/>
                <div className="ml-3">
                <strong>Client name</strong>
                <p>Message </p>

                </div>
                </div>
              
            
            </div>
    </>
  )
}

function message(){
  //push/pop situation
  return(
    <>
    <div className="ml-3">
    <div className="grid grid-rows-2">
    <div class="chat-bubble bg-white text-white"></div>
    <div class="chat-bubble bg-white text-white"></div>
    <div class="chat-bubble bg-white text-white"></div>
    <div class="chat-bubble bg-white text-white"></div>
    <div class="chat-bubble bg-white text-white"></div>
    <div class="chat-bubble bg-white text-white"></div>
    <div class="chat-bubble bg-white text-white"></div>

      <div class="chat-bubble bg-white text-white"></div>
      <div class="chat-bubble bg-white text-white"></div>
      <div class="chat-bubble bg-white text-white"></div>
      <div class="chat-bubble bg-white text-white"></div>
      <div class="chat-bubble bg-white text-white"></div>
      <div class="chat-bubble bg-white text-white"></div>
          <div class="chat-bubble bg-gray-500 text-white">It's over Anakin, I have the high ground.</div>
          <div class="chat chat-end">
          <div class="chat-bubble bg-pink-500 text-white">You underestimate my power!</div>

          </div>
          <div class="chat chat-end">
          <div class="chat-bubble bg-pink-500 text-white">You underestimate my power!</div>

          </div>
         
      
    </div>
    </div>
   
    </>
  )
}
function messageInput(){}
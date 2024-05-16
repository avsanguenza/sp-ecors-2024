'use client'
import { useState } from "react";
import navBar from "../navBar";

var messageArray = new Array()
function messagePage(){ //sender0, sender1; sender0 - active user
    //when accessing a message, you should check if the currentUser == sender0 or sender1
    //if it passes, sort out the subcollection by time 
    //and determine if the accessing user is 0 or 1, then put the messages based on the access
    //(if sender 0 is the one accessing the message, they should go to chat-end <div> tags)
    //const [chatData, setChatData] =  useState([])
    const [sender0, setSender0] = useState({uid:sessionStorage.getItem('sender0uid'), name:sessionStorage.getItem('sender0name')})
    const handleMessageSend= (e)=>{
      e.preventDefault()

    console.log(document.getElementById('chatMsg').value)
    }
    return(
        <>
        {navBar()}
        
        
        <div class="grid grid-rows-6 grid-flow-col gap-4 h-dvh">
  <div class="row-start-1 row-end-7 col-span-1 bg-white">
    {messageList()}
  </div>
  <div className="grid grid-rows-subgrid row-span-4 col-span-2 bg-white">
    <div className="row-end-1 bg-white px-5 py-8 font-semibold text-3xl"> Client name here </div>
    <div className="row-start-2 row-end-5 bg-white overflow-y-auto">{message(messageArray)}</div>
  </div>
  <div class="row-start-5 row-end-6 col-span-2 bg-white ">

    
  <form >
              <input type="text" id="chatMsg" class=" w-full p-4 ps-10 text-sm text-gray-900 border border-pink-500 rounded-full bg-gray-50  focus:border-pink-500" placeholder="Send a message" required />
                  <div className="static -mt-[50px] mr-3 flex-1 text-end ">
                  <button type="submit" class=" text-white bg-pink-500 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-full text-sm px-8 py-3 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800" onClick={handleMessageSend}>Send</button>
                  </div>
        </form>
  </div>
</div>
        </>
    )
}
export default messagePage;

function messageList(){
  return(
    <>
             <h2 className="ml-7 px-3 py-4 text-3xl font-bold">Messages</h2> 
            <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
            <div className="bg-gray-200 rounded lg px-4 py-3" >
                <div class="flex items-center grid-rows">
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

function fillerBubble(){
  return(
    <>
    <div class="chat-bubble bg-white text-white"></div>
    </>
  )
}
function sender1Bubble(message){
  return(
    <div class="chat-bubble bg-gray-500 text-white">
      {message}
    </div>

  )
}
function sender0Bubble(message){
  return(
   <>
    <div class="chat chat-end">
  <div class="chat-header text-start ">
    {
    //sessionStorage.getItem('sender0name').split(' ')[0]
    }
  </div>
 <div className="inline-flex">
 <time class="text-xs opacity-50 pr-4">2 hours ago </time>
  <div class="chat-bubble bg-pink-500 text-white ">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
</div>
 </div>
  <div class="chat-footer opacity-50">
   {
    //status here
   }
  </div>
  </div>
   </>
  )
}
function initializeChat(){
  let tempArray= new Array()
  Array.from({length:15}, (v,i)=>{
    tempArray.push(sender0Bubble('test'))
  })
  return tempArray;
}
function messageQueue(){

}
function message(msgArray){
  //push/pop situation
  return(
    <>
   
    <div className="ml-3">
    <div className="grid grid-rows-2 overflow-auto ">
    {
      msgArray.map((d)=>{
        return(
          (d)
        )
      })
    }

         
      
    </div>
    </div>
   
    </>
  )
}
function messageInput(){}
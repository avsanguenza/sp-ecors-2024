'use client'
import { useEffect, useState } from "react";
import navBar from "../navBar";
import { Suspense } from "react";
import Loading from "./loading";
import MessageListLoading from "./messageListLoading";
import ChatBubbles from "./messaging";
import messagePreviewList from "./messageList";
import Messages from '@/firebase/messaging/message'
import userData from "../dashboard/user";
var messageArray = new Array()
function messagePage(){ //sender0, sender1; sender0 - active user
    //when accessing a message, you should check if the currentUser == sender0 or sender1
    //if it passes, sort out the subcollection by time 
    //and determine if the accessing user is 0 or 1, then put the messages based on the access
    //(if sender 0 is the one accessing the message, they should go to chat-end <div> tags)
    //const [chatData, setChatData] =  useState([])
    let udata = new userData()
    udata.parseData()
    const [sender0, setSender0] = useState({uid:udata.getUserUID(), name:udata.getName()})
    const [sender1, setSender1] = useState({uid:sessionStorage.getItem('sender1uid'), name:sessionStorage.getItem('sender1name')})
    const [messageHistory, setMessageHistory] = useState([])
    const [messageHist, setMessageHist] = useState([])
    var msg = new Messages(sender0.uid,sender0.name,sender1.uid,sender1.name)
    const handleMessageSend= async (e)=>{
      e.preventDefault()
      msg.newMessage=''
   if (await msg.checkExistingConvo()){
    await  msg.createT(document.getElementById('chatMsg').value)
    }
    else{
      await   msg.updateConvo(document.getElementById('chatMsg').value).then(()=>{
         msg.updateMessageListener()
      })
      }

  document.getElementById('chatMsg').value=''
  window.location.reload()
  }
useEffect(()=>{
    msg.getData().then(()=>{
      setMessageHistory(msg.messageHistory)    
    })
},[])

useEffect(()=>{
  
  msg.fetchUserMessage().then(()=>{
    setMessageHist(msg.userConvos)
  })
},[])

  return(
        <>
        {navBar()}
        
        
        <div class="grid grid-rows-6 grid-flow-col gap-4 h-dvh">
  <div class="row-start-1 row-end-7 col-span-1 bg-white">
  <h2 className="ml-7 px-3 py-4 text-3xl font-bold">Messages</h2> 
  <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
  <Suspense fallback={<MessageListLoading/>} >{messagePreviewList(messageHist,sender0.name,sender1.name)}</Suspense>

    {
     
    }
  </div>
  <div className="grid grid-rows-subgrid row-span-4 col-span-2 bg-white">
    <div className="row-end-1 bg-white px-5 py-8 font-semibold text-3xl"> {sender1.name} </div>
    <div id='messageWindow'className="row-start-2 row-end-5 bg-white overflow-y-auto">
    {}
    <Suspense fallback={<Loading/>}>{
    ChatBubbles(messageHistory,sender0.uid,sender1.uid)
    }</Suspense>
  </div>
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

function messageList(list){
  return(
    <>
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


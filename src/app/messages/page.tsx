'use client'
import navBar from "../navBar";
function messagePage(){
    //when accessing a message, you should check if the currentUser == sender0 or sender1
    //if it passes, sort out the subcollection by time 
    //and determine if the accessing user is 0 or 1, then put the messages based on the access
    //(if sender 0 is the one accessing the message, they should go to chat-end <div> tags)
    return(
        <>
        {navBar()}
        
        <div class="flex size-full h-lvh">
          <div className="w-1/4 bg-gray-100 rounded-lg">
          {messageList()}
          </div>
          <div className="w-3/4 text center bg-white ">
            {message()}
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
  return(
    <>
    <div className="ml-3 h-lvh w-90  rounded-lg border border-pink-500">
    <div className="grid grid-rows-2">
    <div className="h-16 w-full bg-white">
      <p className="px-10 py-4 text-grey-900 text-3xl font-bold">User client name</p>
    </div>
      <div className="">
      <div class="chat chat-start">
  <div class="chat-bubble bg-gray-500 text-white">It's over Anakin, <br/>I have the high ground.</div>
</div>
<div class="chat chat-end">
  <div class="chat-bubble bg-pink-500 text-white">You underestimate my power!</div>
</div>
<div class="chat chat-end">
  <div class="chat-bubble bg-pink-500 text-white">You underestimate my power!</div>
</div>
<div class="chat chat-end">
  <div class="chat-bubble bg-pink-500 text-white">You underestimate my power!</div>
</div>
      </div>

 <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative ml-3 mr-3">
       <div className="flex items-end">
       <input type="search" id="search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-pink-500 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">Search</button>
       </div>
        </div>
    </div>
    </div>
    </>
  )
}
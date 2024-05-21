async function messagePreviewList(list,sender0,sender1){
    var msgList = list
return(
    <>
    {
        msgList.map((d)=>{
            return(
                convoButton(d.sender1,d.timeSent,d.sender1)
                //listDesign(d.sender1,d.timeSent)
            )
        })
    }
    </>
)
}
export default messagePreviewList


//onclick should change the sender 2 
function listDesign(name,time){
    return(
        
      <>
             <div className="bg-gray-200 rounded lg px-4 py-3" >
                  <div class="flex items-center grid-rows">
                  <img className="bg-left rounded-full h-16 w-16  " src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"/>
                  <div className="ml-3">
                  <strong>{name}</strong>
                  <p>{time} </p>
                
                  </div>
                  </div>
                
              
              </div>
      </>
    )
  }

  function fetchMessage(uid){
    console.log(uid)
    sessionStorage.setItem('sender1uid',uid)
    window.location.replace('/messages')
  }
  
  function convoButton(name,time,uid){
    return(
        <>
       <div>
       <button className='bg-gray-200  w-full rounded lg px-4 py-5' onClick={()=>fetchMessage(uid)}>
       <div class="flex items-center grid-rows">
                  <img className="bg-left rounded-full h-16 w-16  " src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"/>
                  <div className="ml-3">
                  <strong>{name}</strong>
                  <p>{time} </p>
                
                  </div>
                  </div>
                
        </button>
       </div>
        </>
    )
  }
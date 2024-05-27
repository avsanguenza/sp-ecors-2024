async function messagePreviewList(list,viewer){
    var msgList = list

    return(
    <>
    {
        msgList.map((d)=>{
          var s1 = (d.sender1 == viewer) ? d.sender0 : d.sender1
          var sName1 = (s1 ==viewer) ? d.sender1Name: d.sender0Name
            return(
                convoButton(sName1,d.timeSent,s1)
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
             <div className="bg-white rounded lg px-4 py-3" >
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

  function fetchMessage(uid,name){
    console.log(uid)
    sessionStorage.setItem('sender1uid',uid)
    sessionStorage.setItem('sender1Name', name)
    window.location.replace('/messages')
  }
  
  function convoButton(name,time,uid){
    return(
        <>
       <div>
       <button className='border border-gray-50 w-full rounded-lg px-3 py-5 hover:bg-gray-100' onClick={()=>fetchMessage(uid,name)}>
       <div class="flex items-center grid-rows">
                  <img className="bg-left rounded-full h-10 w-10  " src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"/>
                  <div className="ml-3">
                  <span className="-mt-4 text-xl font-medium">{name}</span>
                  <p>{time} </p>
                
                  </div>
                  </div>
                
        </button>
       </div>
        </>
    )
  }
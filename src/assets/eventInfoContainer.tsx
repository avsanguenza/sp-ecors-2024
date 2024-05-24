import userData from "@/app/dashboard/user"
let udata = new userData
udata.parseData()
function eventInfoContainer(d){
    return(
        <dialog id={d.eventid} class="modal">
        <div class="modal-box">
        <form method='dialog'>
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
          <h3 class="font-bold text-xl text-center">{d.eventName}</h3>
          <p class="py-4 text-center font-medium">{d.eventLocation}</p>     
        <img src={d.eventImageURL} className="rounded-lg w-60 h-96 mx-auto mb-2"></img>
        
        <p className='font-bold inline' >Posted by:</p>
          <img src={d.eventImageURL} className=' ml-3 h-5 w-5 mt-1 rounded-full inline'/>  
          <p class=" ml-2 font-normal text-center inline dark:text-gray-400">{d.eventCreatorName}</p>
          <div>
            <p className="font-bold">Price: <text className="font-medium mr-2">&#8369; {d.eventWageTypeVal}</text>  {returnWageType(d.eventWageType)}</p>
          </div>     
          <p className="mt-4 font-bold ">Description:</p>
          <p className="mb-4">{d.eventDescription.substring(0,150)+'...'}</p>

          <div className="text-center">
          <hr className="h-px my-3 bg-gray-300 border-0 dark:bg-gray-700"></hr>

          <button className="bg-pink-500 hover:bg:pink-700 text-white font-bold text-medium px-3 py-2 rounded-full" hidden={udata.name==null}> 
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mr-2 inline">
  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
</svg>

          Contact Organizer</button>
        </div>
        </div>

        <form method="dialog" class="modal-backdrop">
          <button>close</button>
          
        </form>
       
      </dialog>
    )
}
export default eventInfoContainer

function returnWageType(role){
    if(role=='hourly'){
      return(<span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Hourly</span>)
    } else{
      return(
        <span class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">Fixed</span>
  
      )
    }
  }
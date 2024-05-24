import userData from "@/app/dashboard/user"
import EventAppDialog from '@/app/events/eventApp/eventAppDialog'
let udata = new userData
udata.parseData()
function eventInfoContainer(d){
  function eventAppFormDialog(d){
    document.getElementById('closebtn').click()
    document.getElementById(d.eventid+'eventapp').showModal()
  }
    return(
       <>
        <dialog id={d.eventid} class="modal">
        <div class="modal-box">
        <form method='dialog'>
        <button id='closebtn' className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
       
          <h2 class="font-bold text-xl text-center">{d.eventName}</h2>
        <div className=" p-3">
        <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 inline'fill="none" aria-hidden="true" viewBox="0 0 24 24" role="img"><path vector-effect="non-scaling-stroke" stroke="var(--icon-color, #001e00)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M12 10.5a2.1 2.1 0 100-4.2 2.1 2.1 0 000 4.2z"></path><path vector-effect="non-scaling-stroke" stroke="var(--icon-color, #001e00)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M17.4 8.4C17.4 5.4 15 3 12 3 9 3 6.6 5.4 6.6 8.4c0 1.3.5 2.4 1.2 3.4C9 13.2 12 18 12 18s3-4.8 4.1-6.3c.7-.9 1.3-2.1 1.3-3.3zM16 18c2.4.3 4 .8 4 1.4 0 .9-3.6 1.6-8 1.6s-8-.7-8-1.6c0-.6 1.6-1.1 4-1.4"></path></svg>
          <span class="py-4 text-center font-medium">{d.eventLocation}</span> 
        </div>    
        <img src={d.eventImageURL} className="rounded-lg w-60 h-96 mx-auto mb-2"></img>
        <svg xmlns="http://www.w3.org/2000/svg"  className='w-6 h-6 inline' fill="none" aria-hidden="true" viewBox="0 0 24 24" role="img"><path vector-effect="non-scaling-stroke" stroke="var(--icon-color, #001e00)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M12 21a9 9 0 100-18 9 9 0 000 18z"></path><path vector-effect="non-scaling-stroke" stroke="var(--icon-color, #001e00)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M12 11.73a2.97 2.97 0 100-5.94 2.97 2.97 0 000 5.94zm0 1.89c-2.88 0-5.31 2.34-5.31 5.31v.36C8.22 20.37 10.02 21 12 21c1.98 0 3.78-.63 5.31-1.71v-.36c0-2.88-2.43-5.31-5.31-5.31z"></path></svg>
        <span className='font-bold inline' >:</span>
          <img src={d.eventImageURL} className=' ml-3 h-5 w-5 mt-1 rounded-full inline'/>  
          <p class=" ml-2 font-normal text-center inline dark:text-gray-400">{d.eventCreatorName}</p>
          <div>
            <p className="font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 inline" fill="none" aria-hidden="true" viewBox="0 0 24 24" role="img"><path vector-effect="non-scaling-stroke" stroke="var(--icon-color, #001e00)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.17 3H21v7.83L10.83 21 3 13.17 13.17 3z"></path><path vector-effect="non-scaling-stroke" stroke="var(--icon-color, #001e00)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.63 11.51a1.86 1.86 0 00.3 2.56 1.86 1.86 0 002.56.3 1.51 1.51 0 00.27-1.68c-.25-.54-.87-1.56-1.08-2.12A1.4 1.4 0 0112 9.12a1.84 1.84 0 012.55.31 1.84 1.84 0 01.33 2.57m-.31-2.57l.81-.81m-6.26 6.26l.81-.81m7.94-7.39a.55.55 0 100-1.1.55.55 0 000 1.1z"></path></svg>: <text className="font-medium mr-2">&#8369; {d.eventWageTypeVal}</text>  {returnWageType(d.eventWageType)}</p>
          </div>     
          <p className="mt-4 font-bold ">Description:</p>
          <p className="mb-4">{d.eventDescription.substring(0,150)+'...'}</p>

          <div className="text-center">
          <hr className="h-px my-3 bg-gray-300 border-0 dark:bg-gray-700"></hr>

          <button className="bg-pink-500 hover:bg:pink-700 text-white font-bold text-medium px-3 py-2 rounded-full" hidden={udata.name==null} onClick={()=>(udata.getUserType()=='User')? eventAppFormDialog(d): alert(false)}> 
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mr-2 inline">
  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
</svg>

          {(udata.getUserType() =='Event Organizer')? 'Contact Organizer' : 'Apply'}</button>
        </div>
        </div>

        <form method="dialog" class="modal-backdrop">
          <button>close</button>
          
        </form>
      
 
      </dialog>
      <dialog id={d.eventid+'eventapp'} class="modal">
      <div class="modal-box">
      <form method='dialog'>
        <button id='closeBtn'className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h2 class="font-bold text-xl text-center">{d.eventName} Application</h2>
        <div className=" p-3">
        <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 inline'fill="none" aria-hidden="true" viewBox="0 0 24 24" role="img"><path vector-effect="non-scaling-stroke" stroke="var(--icon-color, #001e00)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M12 10.5a2.1 2.1 0 100-4.2 2.1 2.1 0 000 4.2z"></path><path vector-effect="non-scaling-stroke" stroke="var(--icon-color, #001e00)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M17.4 8.4C17.4 5.4 15 3 12 3 9 3 6.6 5.4 6.6 8.4c0 1.3.5 2.4 1.2 3.4C9 13.2 12 18 12 18s3-4.8 4.1-6.3c.7-.9 1.3-2.1 1.3-3.3zM16 18c2.4.3 4 .8 4 1.4 0 .9-3.6 1.6-8 1.6s-8-.7-8-1.6c0-.6 1.6-1.1 4-1.4"></path></svg>
          <span class="py-4 text-center font-medium">{d.eventLocation}</span> 
        </div>
        <EventAppDialog d={d}/>

      </div>
      
      <form method="dialog" class="modal-backdrop">
          <button >close</button>
          
        </form>
       
      </dialog>
       </>
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
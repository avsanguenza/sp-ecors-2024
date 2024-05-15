import { useEffect, useState } from "react"
import { eventFormData } from "@/firebase/data/event";
import Message from '@/firebase/messaging/message'
import userData from "../user";
let udata  = new userData();
udata.parseData()
function jobAppList(eventAppData,eventuid){
function updateState(docid, userid,value){
    let efdata = new eventFormData(userid,eventuid);
    efdata.updateAttribute(docid,'applicationStatus', value).then(()=>{
        alert('updated')
    })
}
function tableHeader(){
    return(
        <thead class="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
        <th scope="col" class="px-6 py-3">
        Applicant Name
        </th>
        <th scope="col" class="px-6 py-3">
        Position
        </th>
        <th scope="col" class="px-6 py-3">
        Email Address
        </th>
        <th scope="col" class="px-6 py-3">
       Phone Number
        </th>
        <th scope="col" class="px-6 py-3">
        Actions
        </th>
        
        </tr>
        </thead>
    )
}

function allTable(eventAppData){
return(
    <table class="w-full text-sm text-left text-center rounded-full text-gray-500 dark:text-gray-400">
    {tableHeader()}
    {
        eventAppData.map((d)=>{
            return(
               <>
                 <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th>
                    {d.applicantName}
                </th>
                <th>
                    {"pos"}
                </th>
                <th>
                    {d.applicantEmail}
                </th>
                <th>
                    {d.applicantPhone}
                </th>
                <th>
                <button type="button" class="mb-10 text-white bg-pink-500 hover:bg-pink-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2 mr-8">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
</svg>

Message Applicant </button>
        <button type="button" class="mb-10 text-white bg-pink-500 hover:bg-pink-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2 mr-8"  onClick={()=>window.open(d.applicantFile)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 me-2">
  <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
</svg>
  View Proposal
</button>
                <button type="button" class="text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={()=>updateState(d.docid,d.applicantID,true)}>Accept</button>  |  
              <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800"onClick={()=>updateState(d.docid,d.applicantID,false)}> Reject</button>
            
                </th>
                </tr>
               </>
            )
        })
    }
    </table>
)
}
function conditionalTable(eventAppData,condition){
    return(
        <table class="w-full text-sm text-left text-center rounded-full text-gray-500 dark:text-gray-400">
        {tableHeader()}
        {
            eventAppData.map((d)=>{
               if(d.applicationStatus==condition){
                return(
                    <>
                      <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                     <th>
                         {d.applicantName}
                     </th>
                     <th>
                         {"pos"}
                     </th>
                     <th>
                         {d.applicantEmail}
                     </th>
                     <th>
                         {d.applicantPhone}
                     </th>
                     <th>
                     <button type="button" class="mb-10 text-white bg-pink-500 hover:bg-pink-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2 mr-8">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
       <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
       <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
     </svg>
     
     Message Applicant </button>
             <button type="button" class="mb-10 text-white bg-pink-500 hover:bg-pink-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2 mr-8"  onClick={()=>window.open(d.applicantFile)}>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 me-2">
       <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
     </svg>
       View Proposal
     </button>
                     </th>
                     </tr>
                    </>
                 )
               }
            })
        }
        </table>
    )
    }
    return(
    <>
      <div role="tablist" className="tabs tabs-lifted">
  <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="All" defaultChecked={true}/>
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-8">{allTable(eventAppData)}</div>
  <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Pending" />
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-8">{conditionalTable(eventAppData,'pending')}</div>
  <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Accepted"  />
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-8">{conditionalTable(eventAppData,true)}</div>

  <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Rejected" />
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-8">{conditionalTable(eventAppData,false)}</div>
</div>
    </>
    )
}

export default jobAppList;

function toMessageUser(sender0,sender1){
    let msg = new Message();
    msg.createT(sender0,sender1)
}

  
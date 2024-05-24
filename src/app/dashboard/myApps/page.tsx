'use client'

import NavBar from "@/app/navBar"
import userData from "../user";
import { eventData } from "@/firebase/data/event";
import { eventFormData } from "@/firebase/data/event";
import { useEffect, useState } from "react";
var udata = new userData()
udata.parseData()
var edata = new eventData()
var efdata = new eventFormData(udata.getUserUID(),'')
let userApplData = new Array()

function manageApplications(){
    const [data,setData] = useState([])
    useEffect(()=>{
        efdata.getSpecificData('userid','==',udata.getUserUID()).then(async()=>{
          await new Promise ((resolve)=> setTimeout(resolve,2000));
              var tempData = efdata.applicantFileObj
            
            setData(tempData) 
        })
    },[])
    return(
      <>
       <NavBar>
       <div role="tablist" className="tabs tabs-lifted mx-auto">
  <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="All" defaultChecked />
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">   {
  tableApps(data)
  }</div>

  <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 2" />
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 2</div>

  <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 3" />
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 3</div>
</div>
     
       </NavBar>
      </>
    )
}
export default manageApplications;

function tableApps(data){
    return(
        <table className="mt-4 w-full text-sm text-left text-center text-gray-500 dark:text-gray-400">
        {tableHeaders()}
        {
            data.map((d)=>{
                return(
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 
                    even:dark:bg-gray-800 border-b dark:border-gray-700">
                     
                     <th className='px-5'> {d.eventuid}</th>
                     <th className='px-5'> {d.eventName}</th>
                     <th className='px-5'> {d.eventWageType}</th>
                     <th className='px-5'> {d.applicationStatus}</th>
                     <th className='px-5'>   <button type="button" class="mr-2 text-white bg-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800" onClick={()=>document.getElementById('editWindow').showModal()}>Edit application</button> 
                     <dialog id="editWindow" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg">Edit Application</h3>
                    Edit other stuff here 
  </div>
</dialog>
                     
                     
                     | 
                     <button type="button" class="ml-2 text-white bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-700 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-900 dark:hover:bg-red-900 dark:focus:ring-red-800" onClick={()=>document.getElementById('cancelWindow').showModal()}>Cancel application</button>
                     <dialog id="cancelWindow" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg">Cancel Application</h3>
                  Cancel prompt to confirm
  </div>
</dialog>
                     
                     </th> 
                    
                     </tr>
                )
            })
        }
        </table>
    )
}

function tableBody(data){
return(
    
    data.map((d)=>{
        return(
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 
            even:dark:bg-gray-800 border-b dark:border-gray-700">
             
             <th className='px-5'> {d.eventuid}</th>
             <th className='px-5'> {d.eventName}</th>
             <th className='px-5'> {d.eventWageType}</th>
             <th className='px-5'> {d.applicationStatus}</th>
             <th className='px-5'> {}</th>
             <th className='px-5'> 
             <button type="button" class="text-white bg-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800" >Edit application</button>
             </th>
             </tr>
        )
    })
)
     }
    
function tableHeaders(){
    return(
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
  
      <th scope="col" className="px-6 py-3">
             EventUID
          </th>
          <th scope="col" className="px-6 py-3">
            EventName
          </th>
          <th>
          Wage 
          </th>
          <th scope="col" className="px-6 py-3">
          Application Status          </th>
          <th scope="col" className="px-6 py-3">
            Actions
          </th>
          <th scope="col" className="px-6 py-3">
             
             </th>
      </tr>
  </thead>
    )
  }


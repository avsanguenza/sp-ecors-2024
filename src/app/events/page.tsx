'use client'

import { useEffect, useState } from "react"
import NavBar from "../navBar"
import { eventData } from "@/firebase/data/event"
let edata = new eventData()
export default function eventsPage(){
    const [data, setData] = useState([])
    let results = new Array()
    const [loading, setLoading] = useState(false)
   useEffect(()=>{
    edata.getData('events','isOpen','==',true).then(async()=>{
        var res = edata.dataobjMap
        res.forEach((v,k)=>{
          var temp = JSON.parse(v)
          results.push(temp)
        })
        setData(results)
        setLoading(true)
   })
},[])
 return(
    <NavBar>
    <h2 className="text-4xl font-bold py-4 mb-3">Newest Events </h2>
    <hr class="h-px w-full bg-gray-200 border-0 dark:bg-gray-700"/>

         <div className='grid grid-cols-5 gap-3'>
 {
    data.map((d)=>{
      return(
        <Panel isActive={loading ===true}>
           <div class="mt-10   max-w-sm p-6 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img className="h-auto max-w-full rounded-lg" src={d.eventImageURL} onClick={()=>  document.getElementById(d.eventName).showModal()
}/>

          <a href="#">
          <h5 class="mt-4 text-2xl text-center font-semibold tracking-tight text-gray-900 dark:text-white">{d.eventName}</h5>
          </a>
          <h2 className="mt-2">{d.eventLocation}</h2>
          <hr className="h-px my-3 bg-gray-300 border-0 dark:bg-gray-700"></hr>

          <ul className="flex items-center w-full me-4">
          <li className='flex items-start'>
          <p className='font-medium'>Posted by:</p>
          <img src={d.eventImageURL} className=' ml-3 h-5 w-5 mt-1 inline rounded-full'/>  
          <p class=" ml-2 text-left font-normal  dark:text-gray-400">{d.eventCreatorName}</p></li>
        
          </ul>
          </div>
          {infoModal(d.eventName,d.eventLocation)}

        </Panel>
      )
    })
  }
 </div>
    </NavBar>
 )
}

function infoModal(eventName,eventLocation){
  return(
    <dialog id={eventName} class="modal">
    <div class="modal-box">
    <form method='dialog'>
    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
      <h3 class="font-bold text-lg">{eventName}</h3>
      <p class="py-4">{eventLocation}</p>
    </div>
  
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
      
    </form>
  
  </dialog>
  )
}
function Panel({
    children,
    isActive
  }){
    return(
      <div className='text-center'>
               {isActive ?  (children) : <LoadingFeature/>}
      </div>
    )
  }
  
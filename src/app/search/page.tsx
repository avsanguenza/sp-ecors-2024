'use client'
import Loading from './loading';
import Results from './results';
import { Suspense } from 'react';
import { eventData } from '@/firebase/data/event';
import { useSearchParams } from "next/navigation";
import NavBar from "../navBar";
import { useState,useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { where } from 'firebase/firestore';
function searchPage({
    searchParams,
  }: {
    searchParams?: {
      page?: string;
    };
  })
  {
    const sParams = useSearchParams()
    const query = searchParams?.query || ''
    const currentPage = Number (searchParams?.page) || 1 
    const [data,setData] = useState([])
    const [filter, setFilter] = useState(false)
    let e = new eventData()
    var results = new Array();
    var conditions = []
    conditions.push(where('eventName','>=',sParams.get('query')))
    const [queryCond, setQueryCond] = useState(conditions)

   const  addCondition= async (e)=>{
     // e.preventDefault()
  
      const {name,value} = e.target
      if(value=='hourly'){
        document.getElementById('fixed-checkbox').checked=false
      }
      else{
        
          document.getElementById('hourly-checkbox').checked=false
      
      }
    //  console.log(name,value)
   // document.getElementsByName(name).checked=true 
      var tempCond = where(name,'==',value)
      conditions[1] = tempCond
       setQueryCond(conditions)
      
      }

    function sideSearchRadio(){
      return(
        <> 
    <h3 class="mb-4 ml-2 font-semibold text-gray-900 dark:text-white">Search Options</h3>
    <ul class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <div class="flex items-center ps-3">
                <input id="hourly-checkbox" type="checkbox" name='eventWageType'value="hourly" class="w-4 h-4 accent-pink-600 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"  onChange={addCondition}/>
       
                <label for="fixed-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hourly</label>
            </div>
        </li>
        <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
            <div class="flex items-center ps-3">
                <input id="fixed-checkbox" type="checkbox" name='eventWageType'value="fixed" class="w-4 h-4 accent-pink-600 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"  onChange={addCondition}/>
       
                <label for="fixed-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fixed</label>
            </div>
        </li>
       
    </ul>
    <div className='mt-4 w-48 text-sm font-medium text-gray-900 bg-white mx-auto rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
    <button type="button" class="text-white bg-pink-500 hover:bg-pink-700 focus:ring-4 focus:ring-pink-500 focus:outline-pink-500 font-medium rounded-full text-sm px-4 py-2 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800" onClick={()=>setFilter(!filter)}> Filter Search</button>
        </div>
        </>
      )
    }
   
     useEffect(()=>{
     // setQueryCond(conditions)
     setQueryCond(conditions)
     console.log(conditions)
    },[filter])

    return(
      <NavBar>
          <Toaster/>
        <div className=" grid grid-row-4 grid-col-4 gap-1">
          <div className="ml-4 row-end-5 col-end-1 h-full  h-[40rem]">
            {sideSearchRadio()}
          </div>
          <div className="col-start-1">
            Search results relating to <h3 className="text-2xl font-semibold">{query}</h3>
          </div>
          <div className="row-end-5 col-start-1 col-end-5 bg-white h-full">
          <div role="tablist" className="tabs tabs-bordered bg-white ">
  <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Events" defaultChecked/>
  <div role="tabpanel" className="tab-content p-10">
  <div className='overflow-x-auto'>
    <table className='table'>
    {searchBodyHeaderEvent()}
    <tbody>
            <Suspense fallback={<Loading/>}>{Results('Events',queryCond,sParams.get('query'))}</Suspense>
            </tbody>
            </table>
            </div>
  </div>

  <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="People"/>
  <div role="tabpanel" className="tab-content p-10">
    <table className='table'>
      {searchBodyHeaderUser()}
      <tbody>
      <Suspense fallback={<Loading/>}>{Results('People',queryCond, sParams.get('query'))}</Suspense>
      </tbody>
    </table>
    </div>

</div>
          </div>
        </div>
   
      </NavBar>
    )
}


function searchBodyHeaderEvent(){
  return(
    <thead>
    <tr>
      <th>Event Name</th>
      <th>Event Organizer</th>
      <th>Type of Wage</th>
      <th>Wage</th>
      <th></th>
    </tr>
  </thead>
  )
}
function searchBodyHeaderUser(){
  return(
    <thead>
    <tr>
      <th>User</th>
      <th>Location</th>
      <th>Profession</th>
      <th></th>
    
    </tr>
  </thead>
  )
}
export default searchPage;
'use client'
import Loading from './loading';
import Results from './results';
import { Suspense } from 'react';
import { eventData } from '@/firebase/data/event';
import { useSearchParams } from "next/navigation";
import navBar from "../navBar";
import { useState,useEffect } from 'react';
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
    let e = new eventData()
    var results = new Array();
    return(
        <>
        {navBar()}
        <div className=" grid grid-row-4 grid-col-4 gap-1">
          <div className="ml-4 row-end-5 col-end-1 h-full  h-dvh">
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
            <Suspense fallback={<Loading/>}>{Results('Events',sParams.get('query'))}</Suspense>
            </tbody>
            </table>
            </div>
  </div>

  <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="People"/>
  <div role="tabpanel" className="tab-content p-10">
    <table className='table'>
      {searchBodyHeaderUser()}
      <tbody>
      <Suspense fallback={<Loading/>}></Suspense>
      </tbody>
    </table>
    </div>

</div>
          </div>
        </div>
        {
     //     query
          
        }
        </>
    )
}

function sideSearchRadio(){
  return(
    <>
    
<h3 class="mb-4 font-semibold text-gray-900 dark:text-white">Search Options</h3>
<ul class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
    <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <div class="flex items-center ps-3">
        <label>
            <input type="checkbox" className="checkbox" />
          </label>
            <input id="list-radio-license" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" hidden/>
            <label for="list-radio-license" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hourly </label>
        </div>
    </li>
    <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <div class="flex items-center ps-3">
        <label>
            <input type="checkbox" className="checkbox" />
          </label>
            <input id="list-radio-id" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" hidden/>
            <label for="list-radio-id" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fixed</label>
        </div>
    </li>

</ul>

    </>
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
      <th>Type</th>
      <th>Profession</th>
      <th>Preferred Type of Wage</th>
      <th></th>
    </tr>
  </thead>
  )
}
export default searchPage;
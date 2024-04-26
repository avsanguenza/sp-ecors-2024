'use client'
import React from "react";
import { useState } from "react";
import {datepicker} from "flowbite-datepicker";
function userForm(){

}


function userSetupPage(){
const [activeIndex, setActiveIndex] = useState(0);
  function showValues(){
      console.log(document.getElementById('eventName').value);
  }
  return(
    <>
 
      <div className="">
      <Panel title="User Information" isActive={activeIndex===0} onShow={()=>setActiveIndex(0)}>
           <div className="">
      <ol class=" mt-10 flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-white dark:border-pink-500 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
          <li class="flex items-center text-pink-500 dark:text-pink-500">
              <span class="flex items-center justify-center w-5 h-5 me-2 text-xs border border-pink-500 rounded-full shrink-0 dark:border-pink-500">
                  1
              </span>
              Job Information<span class="hidden sm:inline-flex sm:ms-2"></span>
              <svg class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
              </svg>
          </li>
          <li class="flex items-center">
              <span class="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                  2
              </span>
              Review Information
          </li>
      </ol>
      
      </div>
      
     <div className="mt-10  mx-auto">
     {jobInformationForm(" ", false)}
      <button className="mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>setActiveIndex(1)}>Next</button>
     </div>
      </Panel>

      <Panel title="Company Information" isActive={activeIndex===1} onShow={()=>setActiveIndex(1)}>
    
      <div className="mx-auto">
      <ol class="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-white dark:border-pink-500 sm:p-4 sm:space-x-4 ">
        <li class="flex items-center text-pink-500 dark:text-pink-500">
            <span class="flex items-center justify-center w-5 h-5 me-2 text-xs border border-pink-500 rounded-full shrink-0 dark:border-pink-500">
                1
            </span>
           Job Information <span class="hidden sm:inline-flex sm:ms-2"></span>
            <svg class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
            </svg>
        </li>

        <li class="flex items-center text-pink-500 dark:text-pink-500">
            <span class="flex items-center justify-center w-5 h-5 me-2 text-xs border border-pink-500 rounded-full shrink-0 dark:border-pink-500">
                2
            </span>
            Review Information
        </li>
    </ol>
      
      </div>
      <div>
      <div className="mt-10  mx-auto">
          {showJobInfoToConfirm()}
        <button className="mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>setActiveIndex(0)}>Back</button>
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>showValues()}>Submit</button>
      </div>
      </div>
      </Panel>

      </div>
      
    </>
  
      )
}

export default userSetupPage;

function Panel({
  title,
  children,
  isActive,
  onShow
}){
  return(
    <div className="text-center space-x-2">
    
      {isActive?(children):null}
    </div>

  )
}
function jobInformationForm(textPlaceholder, isDisabled){
  //add function to dynamically add work experience 
  function fieldHandler(id1, id2){
    document.getElementById(id1).disabled=true;
    document.getElementById(id1).value='';
    document.getElementById(id2).disabled=false;
  }

return(
  
  <form>
    
  <div id= "jobExperienceForm">
    <div className="mx-auto md:w-1/2 px-3 mb-6 md:mb-0">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> Event Name </label>
    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="eventName" type="text" placeholder="Event Name (e.g. Anime Expo)"></input>
 
    </div>
    <div className="mx-auto md:w-1/2 px-3 mb-6 md:mb-0">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> Event Date</label>
    
    <input datepicker type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date">
    </input>
    </div>
    <div>
  
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="file_input">Scope of Work</label>
      <input class=" text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer rounded py-3 px-4 mb-3 " aria-describedby="file_input_help" id="file_input" type="file"/>
    </div>
    <div>
      <label className=" mt-4 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Job Wage</label>
      <ul>
        <li>
      <input type='radio' name='jobWageType' value='hourly' onClick={()=>fieldHandler('jobWageSum','jobWageHourly')}></input>
      <input type="number" id="jobWageHourly" className="ml-3 w-24 ring-2" disabled placeholder="PHP"/>
      <label> per Hour</label></li>
      <li>
      <input type='radio' name='jobWageType' value='sum' onClick={()=> fieldHandler('jobWageHourly','jobWageSum')}>
  
      </input>
      <input type="number" id="jobWageSum" aria-describedby="helper-text-explanation" className="mt-4 mb-5 ml-3 w-24" disabled placeholder="PHP"/>

      <label className='ml-3'>PHP</label></li>
      </ul>
    </div>

  </div>

</form>


)
}


function showJobInfoToConfirm(eventName,eventDateInfo,eventLoc, eventDescription, eventWageType,eventWage){
  return(
    <div>
      <ul>
        <li><label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> Event Name </label>
        </li>

        <li>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> Event Date </label>
    
        </li>

        
        <li>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> Event Location </label>
    
        </li>
        
        <li>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> Description: </label>
    
        </li>
        
        <li>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> Event Wage Type:</label>
    
        </li>
        
        <li>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> Event Wage: </label>
    
        </li>
      </ul>
    </div>
  )
}
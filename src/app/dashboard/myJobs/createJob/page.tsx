'use client'
import React from "react";
import { useState } from "react";
import { Dropdown } from 'flowbite';
import type { DropdownOptions, DropdownInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';
import { create } from "domain";

function userSetupPage(){
const [activeIndex, setActiveIndex] = useState(0);
const [createEventName, setCreateEName] = useState('')
const [createDate, setCreateDate] = useState('')
const [createLoc, setCreateLoc] = useState('')
const [createDescription, setCreateDescription] = useState('')
const [createWageType, setCWageType] = useState('')
const [createWageTypeVal, setCWTypeVal] = useState('')
function reviewInfo(){
  setActiveIndex(1)
  setCreateEName( document.getElementById('eventName').value)
  setCreateDate( document.getElementById('eventDate').value);
  setCreateLoc( document.getElementById('eventWork').value)
  setCWageType(document.querySelector('input[name=jobWageType]:checked').value)
  setCWTypeVal ((createWageType == 'hourly')? document.getElementById('jobWageHourly').value: document.getElementById('jobWageSum').value)
  setCreateDescription(document.getElementById('jobDescription').value);
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
      <button className="mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>  reviewInfo()}>Next</button>
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
   {showJobInfoToConfirm(createEventName,createDate,createLoc,createDescription,createWageType,createWageTypeVal)}
      </div>
      <div>
      <div className="mt-10  mx-auto">
        <button className="mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>setActiveIndex(0)}>Back</button>
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
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


function eventSkill(){
  return(
    <div>
      <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
</svg>
</button>

<div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
      </li>
    </ul>
</div>

    </div>
  )
}
function jobInformationForm(textPlaceholder, isDisabled){
  //add function to dynamically add work experience 
  const [date, setDate] = React.useState<Date>();

  function fieldHandler(id1, id2){
    document.getElementById(id1).disabled=true;
    document.getElementById(id1).value='';
    document.getElementById(id2).disabled=false;
    document.getElementById('jobWType').value=id2
  }

  function dateHandler(eventDate){
    const date  = new Date();
    let currDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
    if(Date.parse(eventDate) < Date.parse(currDate)){
      alert('You cannot set an event in the past.')
    }
  }
  function eventPlaceHandler(){
    var cities = ['Caloocan', 'Manila','Malabon','Makati']
    const select = document.getElementById('eventWork')

    return(
      <div>
         <select id="eventWork" className='bg-gray-200 rounded px-3 py-4' placeholder='select city'>
          <option value='Caloocan'> Caloocan </option>
          <option value='Manila'> Manila</option>
        </select>
      </div>
    )
  }
return(
  
  <form>
    
  <div id= "jobExperienceForm">
    <div className="mx-auto md:w-1/2 px-3 mb-6 md:mb-0">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> Event Name </label>
    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="eventName" type="text" placeholder="Event Name (e.g. Anime Expo)"></input>
 
    </div>
    <div className="mx-auto md:w-1/2 px-3 mb-6 md:mb-0">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold" for="grid-first-name"> Event Date</label>
       
    <input type='date' id='eventDate' className='mt-3 mb-4 rounded py-3 px-4  bg-gray-200 border border-blue-500 focus:ring-blue-500 focus:border-blue-500 ' onChange={()=>dateHandler(document.getElementById('eventDate').value)}placeholder="Select a date"></input>
    </div>
    <div>
  
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="file_input">Event Location</label>
      {eventPlaceHandler()}
    </div>
    <div>
      
    <label class="mt-4 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="file_input">Event Job Description</label>
    <textarea id="message" rows="4" id='jobDescription' className=" text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Job Description"></textarea>

    </div>
    <div>
      <label className=" mt-4 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Job Wage</label>
      <ul>
        <li>
      <input type='radio' id='jobWType'name='jobWageType' value='hourly' onClick={()=>fieldHandler('jobWageSum','jobWageHourly')}></input>
      <label className="ml-3">Hourly Rate:</label>

      <input type="number" id="jobWageHourly" name ='jobWageValue' className="ml-3 w-24 ring-2" disabled placeholder="PHP" required/>
      <label> per Hour</label></li>
      <li>
      <input type='radio' id='jobWType' name='jobWageType' value='fixed' onClick={()=> fieldHandler('jobWageHourly','jobWageSum')}>

      </input>
      <label className="ml-3">Fixed Rate:</label>

      <input type="number" id="jobWageSum" name ='jobWageValue' aria-describedby="helper-text-explanation" className="mt-4 mb-5 ml-3 w-24" disabled placeholder="PHP"/>

      <label className='ml-3'>PHP</label></li>
      </ul>
    </div>

  </div>

</form>


)
}


function showJobInfoToConfirm(createEventName, createDate, createLocation, createDescription, createWageType, createWageTypeValue){
  return(
    <div className="mt-4">
      <ul>
        <li>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"> Event Name :  {createEventName}</label>
        </li>

        <li>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> Event Date :{createDate} </label>
    
        </li>

        
        <li>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> Event Location: {createLocation} </label>
    
        </li>
        
        <li>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> Description: {createDescription}</label>
    
        </li>
        
        <li>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> Event Wage Type: {createWageType}</label>
    
        </li>
        
        <li>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> Event Wage: {createWageTypeValue} </label>
    
        </li>
      </ul>
    </div>
  )
}
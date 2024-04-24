'use client'
import React from "react";
import { useState } from "react";

function userForm(){

}
function userSetupPage(){
const [activeIndex, setActiveIndex] = useState(0);
const [personalName, setPersonalName] = React.useState("")

  return(
    <>
 
      <div className="">
      <Panel title="User Information" isActive={activeIndex===0} onShow={()=>setActiveIndex(0)}>
           <div className="">
      <ol class=" mt-10 flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-white dark:border-pink-500 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
          <li class="flex items-center text-pink-500 dark:text-pink-500">
              <span class="flex items-center justify-center w-5 h-5 me-2 text-xs border border-blue-600 rounded-full shrink-0 dark:border-pink-500">
                  1
              </span>
              Personal <span class="hidden sm:inline-flex sm:ms-2">Info</span>
              <svg class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
              </svg>
          </li>
          <li class="flex items-center">
              <span class="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                  2
              </span>
              Professional <span class="hidden sm:inline-flex sm:ms-2">Info</span>
              <svg class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
              </svg>
          </li>
          <li class="flex items-center">
              <span class="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                  3
              </span>
              Review
          </li>
      </ol>
      
      </div>
      
     <div className="mt-10  mx-auto">
     {professionalForm(" ", false)}
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
              Personal <span class="hidden sm:inline-flex sm:ms-2">Info</span>
              <svg class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
              </svg>
          </li>

          <li class="flex items-center text-pink-500 dark:text-pink-500">
              <span class="flex items-center justify-center w-5 h-5 me-2 text-xs border border-pink-500 rounded-full shrink-0 dark:border-pink-500">
                2
              </span>
              Professional<span class="hidden sm:inline-flex sm:ms-2">Info</span>
              <svg class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
              </svg>
          </li>
         
          <li class="flex items-center">
              <span class="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                  3
              </span>
              Review 
          </li>
      </ol>
      
      </div>
      <div>
      <div className="mt-10  mx-auto">
          {userForm2()}
        <button className="mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>setActiveIndex(0)}>Back</button>
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>setActiveIndex(2)}>Next</button>
      </div>
      </div>
      </Panel>

      <Panel title="Company Information" isActive={activeIndex===2} onShow={()=>setActiveIndex(2)}>
    
    <div className="mx-auto">
    <ol class="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-white dark:border-pink-500 sm:p-4 sm:space-x-4 ">
        <li class="flex items-center text-pink-500 dark:text-pink-500">
            <span class="flex items-center justify-center w-5 h-5 me-2 text-xs border border-pink-500 rounded-full shrink-0 dark:border-pink-500">
                1
            </span>
            Personal <span class="hidden sm:inline-flex sm:ms-2">Info</span>
            <svg class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
            </svg>
        </li>

        <li class="flex items-center text-pink-500 dark:text-pink-500">
            <span class="flex items-center justify-center w-5 h-5 me-2 text-xs border border-pink-500 rounded-full shrink-0 dark:border-pink-500">
              2
            </span>
            Professional<span class="hidden sm:inline-flex sm:ms-2">Info</span>
            <svg class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
            </svg>
        </li>
       
        <li class="flex items-center">
            <span class="flex items-center justify-center w-5 h-5 me-2 text-xs border border-pink-500 rounded-full shrink-0 dark:border-pink-500">
                3
            </span>
            Review 
        </li>
    </ol>
    
    </div>
    <div>
    <div className="mt-10  mx-auto">
        {userForm1()}{userForm2()}
      <button className="mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>setActiveIndex(0)}>Back to Start</button>
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>setActiveIndex(1)}>Confirm</button>
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
function professionalForm(textPlaceholder, isDisabled){
  //add function to dynamically add work experience 
  var baseDoc = document.getElementById("jobExperience form")

return(
  <form id = "jobExperienceForm">
  <div>
    <div className="mx-auto md:w-1/2 px-3 mb-6 md:mb-0">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> Merchant Name </label>
    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-second-name" type="text" placeholder="First Name"></input>
    {//line here}
    }
    </div>
    <div className="mx-auto md:w-1/2 px-3 mb-6 md:mb-0">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">  </label>
    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-second-name" type="text" placeholder="First Name"></input>
    <button className="text-white bg-pink-500 hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-16 py-2.5 text-center me-2 mb-2 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"><a className='mt-3 inline-flex items-center' onClick={()=> jobExperience('jobExperienceForm')}>
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
</svg>
      Add Work/Event Experience
      </a>
      </button>

    </div>

  </div>
</form>


)
}


function userForm1(textPlaceholder, isDisabled){
  //send everything to session storage
  //review with disabled input + whatever's stored in sessionstorage
  return(
      <form>
    <div>
      <div className="mx-auto md:w-1/2 px-3 mb-6 md:mb-0">
        <div className="flex items-center mb-5 space-x-10">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name" > First Name</label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-second-name" type="text" placeholder={textPlaceholder} disabled={isDisabled} onChange={(e)=> sessionStorage.setItem("firstName",e.target.value)}></input>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> Last Name</label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-second-name" type="text" placeholder={textPlaceholder}></input>
        </div>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> Home Address (Lot No./Street/Barangay)</label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-second-name" type="text"placeholder={textPlaceholder}></input>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> Phone Number</label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-second-name" type="text" placeholder={textPlaceholder}></input>
      </div>

    </div>
  </form>
  )
}

function userForm2(){
return(
  <form>
  <div>
    <div className="mx-auto md:w-1/2 px-3 mb-6 md:mb-0">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> Company Name</label>
    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-second-name" type="text" placeholder="First Name"></input>
    
    </div>

  </div>
</form>
)
}

function checkForms(){
  //disabled forms
}

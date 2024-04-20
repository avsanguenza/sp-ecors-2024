'use client'
import React from "react";
import { useState } from "react";

function userForm(){

}
function userSetupPage(){
const [activeIndex, setActiveIndex] = useState(0);
const [innerActiveIndex, setInnerActiveIndex] = useState(0);
const [personalName, setPersonalName] = React.useState("")

  return(
    <>
 
      <div className="flex text-center">
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
      
      {userForm1()}
      </Panel>

      <Panel title="Company Information" isActive={activeIndex===1} onShow={()=>setActiveIndex(1)}>
    
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

          <li class="flex items-center text-pink-500 dark:text-pink-500">
              <span class="flex items-center justify-center w-5 h-5 me-2 text-xs border border-blue-600 rounded-full shrink-0 dark:border-pink-500">
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
        {userForm2()}
      </Panel>

      <Panel title="Review" isActive={activeIndex===2} onShow={()=>setActiveIndex(2)}>
        
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

          <li class="flex items-center text-pink-500 dark:text-pink-500">
              <span class="flex items-center justify-center w-5 h-5 me-2 text-xs border border-blue-600 rounded-full shrink-0 dark:border-pink-500">
                2
              </span>
              Personal <span class="hidden sm:inline-flex sm:ms-2">Info</span>
              <svg class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
              </svg>
          </li>
          <li class="flex items-center text-pink-500 dark:text-pink-500">
              <span class="flex items-center justify-center w-5 h-5 me-2 text-xs border border-blue-600 rounded-full shrink-0 dark:border-pink-500">
                3
              </span>
              Personal <span class="hidden sm:inline-flex sm:ms-2">Info</span>
              <svg class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
              </svg>
          </li>
      </ol>
      
      </div>
        
        
        {userForm1()} {userForm2()}</Panel>
      </div>
      
    </>
  
      )
}

export default userSetupPage;
function stepperHead(){

}
function Panel({
  title,
  children,
  isActive,
  onShow
}){
  return(
    <div className="text-center space-x-2">
    
      {isActive?(children):(<button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={onShow}>Next</button>)}
    </div>

  )
}

function userForm1(){
  return(
    <form>
      <div className="flex flex-weap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> First Name</label>
        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="First Name"></input>
        </div>

      </div>
    </form>
  )
}

function userForm2(){
return(
  <form>
  <div>
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> Company Name</label>
    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-second-name" type="text" placeholder="First Name"></input>
    </div>

  </div>
</form>
)
}


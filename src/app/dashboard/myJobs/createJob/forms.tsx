import { useState } from 'react';
import React, {useRef} from 'react';
import { eventData } from '@/firebase/data/event';
import userData from '@/app/dashboard/user'
import { Disclosure, Dialog, Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react';
import { useRouter } from "next/navigation";


 const jobRegistrationForm = () =>{
  //GET UID FIRST 
    const eventName = useRef(null);
    const createDate = useRef(null);
    const createLoc = useRef(null);
    const createDescription = useRef(null)
    const createWageType = useRef(null)
    const createWageTypeVal = useRef(null)
    //event instance
    let edata = new eventData();
    let udata = new userData();
    udata.parseData();

    let [isOpen, setIsOpen] = useState(false)

        
      function closeModal(){
        setIsOpen(false)
    }
    
    function openModal(){
      setIsOpen(true)
    }

      const handleSubmit = (event) =>{
        event.preventDefault();
        sessionStorage.setItem('eventName',eventName.current.value)
        sessionStorage.setItem('createLoc',createLoc.current.value);
        sessionStorage.setItem('createDate', createDate.current.value)
        sessionStorage.setItem('createDesc', createDescription.current.value)
        sessionStorage.setItem('createWageType',document.querySelector('input[name="jobWageType"]:checked').value)
        sessionStorage.setItem('createWageTypeVal',createWageTypeVal.current.value)
    }

    function dateHandler(eventDate){
        const date  = new Date();
        let currDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
        if(Date.parse(eventDate) < Date.parse(currDate)){
          alert('You cannot set an event in the past.')
        }
      }

    function fieldHandler(id1, id2){
        document.getElementById(id1).disabled=true;
        document.getElementById(id1).value='';
        document.getElementById(id2).disabled=false;
        document.getElementById('jobWType').value=id2
    }

    function eventPlaceHandler(){
        var cities = ['Caloocan', 'Manila','Malabon','Makati']
        const select = document.getElementById('eventWork')
    
        return(
          <div>
             <select id="eventWork" className='bg-gray-200 rounded px-3 py-4' placeholder='select city' ref={createLoc}>
              <option value='Caloocan'> Caloocan </option>
              <option value='Manila'> Manila</option>
            </select>
          </div>
        )
      }
      function form(){
        return(
          <form onSubmit={handleSubmit}>
          <div className="mx-auto md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> Event Name </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="eventName" placeholder="Event Name (e.g. Anime Expo)"  ref={eventName}></input>
       
          </div>
          <div className="mx-auto md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold" for="grid-first-name"> Event Date</label>
             
          <input type='date' id='eventDate' className='mt-3 mb-4 rounded py-3 px-4  bg-gray-200 border border-blue-500 focus:ring-blue-500 focus:border-blue-500 ' onChange={()=>dateHandler(document.getElementById('eventDate').value)} placeholder="Select a date" ref={createDate}></input>
          </div>
          <div>
        
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="file_input">Event Location</label>
            {eventPlaceHandler()}
          </div>
          <div>
            
          <label class="mt-4 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="file_input">Event Job Description</label>
          <textarea id="message" rows="4" id='jobDescription' className=" text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Job Description" ref={createDescription}></textarea>
      
          </div>
          <div>
            <label className=" mt-4 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Job Wage</label>
            <ul>
              <li>
                
            <input type='radio' id='jobWType' name='jobWageType' value='hourly' onClick={()=>fieldHandler('jobWageSum','jobWageHourly')} ref={createWageType}></input>
            <label className="ml-3">Hourly Rate:</label>
      
            <input type="number" min="0" id="jobWageHourly" name ='jobWageValue' className="ml-3 w-24 ring-2" placeholder="PHP" required ref={createWageTypeVal}/>
            <label> per Hour</label></li>
            <li>
            <input type='radio' id='jobWType' name='jobWageType' value='fixed' onClick={()=> fieldHandler('jobWageHourly','jobWageSum') } ref={createWageType}>
      
            </input>
            <label className="ml-3">Fixed Rate:</label>
            <input type="number" min="0" id="jobWageSum" name ='jobWageValue' className="ml-3 w-24 ring-2" placeholder="PHP" required ref={createWageTypeVal}/>
      
            <label className='ml-3'>PHP</label></li>
            </ul>
          </div>      
          <button  type='submit' className="mx-auto mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>openModal()}>Next</button>
      </form>
        )
      }

function showJobInfoToConfirm(){
  return(
    <div className="mt-4">
      <ul>
      <li>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"> Event Organizer :  {udata.getName()}</label>
        </li>
        <li>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"> Event Name :  {sessionStorage.getItem('eventName')}</label>
        </li>

        <li>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> Event Date :{sessionStorage.getItem('createLoc')} </label>
    
        </li>

        
        <li>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> Event Location: {} </label>
    
        </li>
        
        <li>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> Description: {}</label>
    
        </li>
        
        <li>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> Event Wage Type: {}</label>
    
        </li>
        
        <li>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name"> Event Wage: {} PHP </label>
    
        </li>
      </ul>
    </div>
  )
}
  function sendData(){
    closeModal()

    let edata = new eventData();
    edata.setData(udata.getUserUID(),udata.getName(),sessionStorage.getItem("eventName"),sessionStorage.getItem("createDate"),sessionStorage.getItem("createLoc"),sessionStorage.getItem("createDesc"),sessionStorage.getItem("createWageType"),sessionStorage.getItem('createWageTypeVal'))

    alert("Successfully created event!")
    useRouter().push('/dashboard/myJobs')
    sessionStorage.clear()
  }
    return(
        <>
      {form()}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=>closeModal()}>

        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom='opacity-100' leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-black/25'/>
        </Transition.Child>
        <div className="fixed inset-0 overfly-auto">
          <div className='flex min-h-full items-center justify-center p-8 text-center'>
            <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95'>
              <Dialog.Panel className='w-full max-w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
              <div className='inset-x-0'> <button type='button' onClick={()=>closeModal()} className=" rounded-md border"> x </button></div>

                <div className="text-center">
                <Dialog.Title as="h3">{sessionStorage.getItem("eventName")} Confirmation</Dialog.Title>
                </div>
                <div className='mt-8 text-center space-x-2'>
                  {showJobInfoToConfirm()}
              
                </div>
                <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={()=> sendData()}
                    >
                      Confirm
                    </button>
                  </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
        </Dialog>

    </Transition>
      </>
    )
}

export default jobRegistrationForm;

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




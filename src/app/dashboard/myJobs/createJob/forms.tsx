import { useState } from 'react';
import React, {useRef} from 'react';
import { eventData } from '@/firebase/data/event';
import userData from '@/app/dashboard/user'
import { Disclosure, Dialog, Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react';
import { useRouter } from "next/navigation";
import { imageData } from '@/firebase/data/storage';

 const jobRegistrationForm = () =>{
  //GET UID FIRST 
    const eventName = useRef(null);
    const createDate = useRef(null);
    const createLoc = useRef(null);
    const createDescription = useRef(null)
    const createWageType = useRef(null)
    const createWageTypeVal = useRef(null)
    const [selectedFile, setSelectedFile] = useState({src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp9hZ_fn1p0GQsP8Ehynpd7sNAHWz0CZXiMNLGo0b0RA&s',blob:'',name:''})
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

    function handleUploadChange(e){
      setSelectedFile({
        ...selectedFile,
        src: URL.createObjectURL(e.target.files[0]),
        blob: e.target.files[0],
        name: eventName
      })
    }
    
  function handleUpload () {
    const folderName = 'event'
    let imgup = new imageData(folderName);
  //  console.log(selectedFile)
    imgup.uploadImage(selectedFile,eventName.current.value).then(()=>
      alert("File uploaded.")
    ).catch((err)=>{
      console.log(err)
    })
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
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" > Event Image: </label>
        <img src={selectedFile.src} className="mx-auto h-32 max-w-lg rounded-lg border border-pink-500 mb-4"></img>  

        <input id="file_input" type="file" className='bg-white border text-gray-900 border-pink-300 rounded-lg px-3 py-4 text-slate-500 file:bg-pink-500 
        file:block-mb-2 file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-pink-500 file:text-white
        hover:file:bg-pink-700'  onChange={handleUploadChange}/>

        <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
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
          <button  type='submit' className="mx-auto mt-4 text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800" onClick={()=>openModal()}>Next</button>
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
    //handleUpload
    let imgup = new imageData('event');
    //  console.log(selectedFile)
      imgup.uploadImage(selectedFile,eventName.current.value).then((sn)=>{
    //   console.log(sn)
    var eventimg = sn;
      console.log(eventimg)
        return(
          eventimg
        )
      }).then((eventimg)=>{
        let edata = new eventData();
        edata.setData(udata.getUserUID(),udata.getName(),sessionStorage.getItem("eventName"),sessionStorage.getItem("createDate"),sessionStorage.getItem("createLoc"),sessionStorage.getItem("createDesc"),sessionStorage.getItem("createWageType"),sessionStorage.getItem('createWageTypeVal'),eventimg).then(()=>{
          alert("Successfully created event!")
          window.location.replace('/dashboard/myJobs')
     // useRouter().push('/dashboard/myJobs')
      sessionStorage.clear()    
        })
      })
   
    
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
                      className="inline-flex justify-center rounded-md border border-transparent bg-pink-100 px-4 py-2 text-sm font-medium text-pink-900 hover:bg-pink-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
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




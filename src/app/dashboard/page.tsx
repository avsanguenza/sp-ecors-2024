'use client'
import {Fragment, useState,useEffect} from 'react';
import { Disclosure, Dialog, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import firebase_app from '@/firebase/config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from "next/navigation";

import {eventData} from '@/firebase/data/event'
import userSetupPage from '../userSetup/page';
import navBar from '../navBar';
import { imageData } from '@/firebase/data/storage';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import Loading from './loading-dashboard';
const auth = getAuth(firebase_app);
let imgdata = new imageData('event')


const navigation = [
    { name: 'Browse Work', href: '/dashboard', current: true },
    { name: 'My Jobs', href: '/dashboard/myJobs', current: false },
    { name: 'Profile', href: '#', current: false },
    { name: '', href: '#', current: false },
  ]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function currUser(){
  const router = useRouter()
  var activeUser = ""
 auth.onAuthStateChanged((auth) =>{
  if (auth){
  }
    else{
      router.push("/");
      alert("Please log-in to continue!");
  }
 }

 );
} 




export default function Page(){
  const[activeIndex, setActiveIndex] = useState(false);
  const [data,setData] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [dbData, setDBdata] = useState({eventuid:'', eventName: '', eventCreator:'', eventLocation:'', eventWType:'',eventWTypeVal:'', eventDate:'', description:''})
  const[eventName, setEventName] = useState('');
  const[eventUID, setEventUID] = useState('')

  function closeModal(){
     setIsOpen(false)
  }
  
  function openModal(){
    setIsOpen(true)
  }
  function apply(d){
    setDBdata(d)
    setEventName(d.eventName)
    setEventUID(d.eventUID)
    openModal()
    
  }
  
  function dialogAppBody(dbData){
    return(
      <div className='flex flex-wrap divide-x-2 '>
        <div className='w-1/2 ml-auto border-border-gray-200'>
            <p className='text-2xl font-bold'>{dbData.eventName}</p>
            <p className='text-xl font-semibold'>{dbData.eventLocation}</p>

            <p className='mt-3 text-xl'> Looking for event position</p>
            <div className='mt-6 inline-flex'>
              <div className='px-3 inline-flex'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-3">
  <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
  <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clip-rule="evenodd" />
                </svg>
                {dbData.eventDate} </div>
                <div className='px-3 inline-flex'> 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-3">
  <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
  <path fill-rule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clip-rule="evenodd" />
</svg>
                {dbData.eventWageType}</div>
              <div className='px-3 inline-flex'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-3">
  <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z" clip-rule="evenodd" />
</svg>

              {dbData.eventWageTypeVal}</div>
            </div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
            <div className='text-2xl text-bold font-bold'>Job Description</div>

            <p className='mt-8 text-ms text-justified' >{dbData.eventDescription}</p>
        </div>
        <div className='w-1/2 ml-auto border-border-gray-200'>
        {userSetupPage(dbData.eventid)}
        </div>
      </div>
    )
  }
  //currUser(); //DISABLED BECAUSE TESTING
  var obj = localStorage.getItem('currentUser')
  var accInfo = JSON.parse(obj)
  var edata = new eventData();
  var results = new Array;


  useEffect(()=>{
    //fetch all possible eventUID ->procedurally create cards -> update states
  edata.getData('events','isOpen','==',true).then(async()=>{
     var output = edata.dataobjMap
      output.forEach((v,k)=>{
       var temp = JSON.parse(v)
        //add appcount here
      results.push(temp)
      })
    setData(results)
    await new Promise ((resolve)=> setTimeout(resolve,1000));

     setActiveIndex(true)
   }).catch(()=>{
    setActiveIndex(false)
    toast.error('Something went wrong. Please try again.')
   })
  },[])

    return (
      <>
     {navBar()}
        <Toaster/>

      <div className='grid grid-cols-5 gap-3'>
    
      { data.map((d)=>{ 
        return(
          <Panel  isActive={activeIndex===true}>
               <div class="mt-10 ml-5  max-w-sm p-6 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img className="h-auto max-w-full rounded-lg" src={d.eventImageURL}/>

          <a href="#">
          <h5 class="mt-4 text-2xl text-center font-semibold tracking-tight text-gray-900 dark:text-white">{d.eventName}</h5>
          </a>
          <h2 className="mt-2">{d.eventLocation}</h2>
          <hr className="h-px my-3 bg-gray-300 border-0 dark:bg-gray-700"></hr>

          <ul className="flex items-center w-full me-4">
          <li><p class="mt-2  text-left font-normal  dark:text-gray-400">{d.eventCreatorName}</p></li>
          <li>
          <a href="#" className='mt-3 inline-flex items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-24 w-8 h-4">
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" /> 5
          </svg>
              4.0
          </a>
          </li>
          </ul>
          <button type="button" onClick={() =>apply(d)} className="mt-4 text-white bg-pink-500 hover:bg-pink-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">Apply</button>
          </div>

          </Panel>
        )
      }
      )
      }

      </div>   
    
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=>closeModal()}>
        
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom='opacity-100' leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-black/25'/>
        </Transition.Child>
        <div className="fixed inset-0 overfly-auto">
          <div className='flex min-h-full items-center justify-center p-8 text-center'>
            <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95'>
              
              <Dialog.Panel className='w-5/6 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
              <div className='text-end'>
                   <button type="button" class="text-gray-800 bg-white border border-gray-800 hover:bg-pink-200 hover:text-white font-medium rounded-lg text-xs px-2.5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2" onClick={()=>closeModal()}>
      
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-3">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

      </button>
              </div>

                <div className="text-center ">
                <Dialog.Title className='h3 mb-8'> {dbData.eventName} Details</Dialog.Title>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

                </div>
                {dialogAppBody(dbData)}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
        </Dialog>

    </Transition>


</>
    );

}


function Panel({
  children,
  isActive
}){
  return(
    <div className='text-center'>
             {isActive ?  (children) : <Loading/>}
    </div>
  )
}

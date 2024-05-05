'use client'
import {Fragment, useState,useEffect, useRef} from 'react';
import { Disclosure, Dialog, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import firebase_app from '@/firebase/config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from "next/navigation";

import {appData, eventData} from '@/firebase/data/event'
import editForm from './editJobForm';

const auth = getAuth(firebase_app);


const navigation = [
    { name: 'Browse Work', href: '/dashboard', current: false },
    { name: 'My Jobs', href: '/dashboard/myJobs', current: true },
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
  const[activeIndex, setActiveIndex] = useState(0);
  const [data,setData] = useState([])
  const [eKeys, setEKeys] = useState([]);
  const [isOpen, setIsOpen] = useState(false)

  function closeModal(){
     setIsOpen(false)
  }
  
  function openModal(){
    setIsOpen(true)
  }
  async function getEventData(){
    //call from a different file
  }

  //currUser(); //DISABLED BECAUSE TESTING
  var obj = localStorage.getItem('currentUser')
  var accInfo = JSON.parse(obj)
  var edata = new eventData();
  var results = new Array;
  

  useEffect(()=>{
    edata.getData('events','userid','==', accInfo.uid).then(()=>{
      var output = edata.dataobjMap
     // console.log(output.values())
     output.forEach((v,k)=>{
      var temp = JSON.parse(v)
      results.push(temp)
     })
     // console.log(keys)
     // return(keys)
       setData(results)
       setActiveIndex(1)

    }
    
    )

  },[])

    return (
      <>
        <header className="bg-pink-500">
                  <nav className=" flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                  <div className="flex lg:flex-1">
                  <div className="flex space-x-4 pl-24">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-pink-700 text-white' : 'text-gray-300 hover:bg-base hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-64">
                        
                  <button
                  type="button"
                  className="relative rounded-full bg-base p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="ml-5 relative flex rounded-full text-white bg-base text-sm focus:outline-none  focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                      <div className ="text-center py-2">
                        <ul>
                          <li className="font-medium">{accInfo.name}</li>
                          <li className="text-sm">{accInfo.accountType}</li>
                        </ul>
                      </div>

            <div className="px-1 py-1 ">
              <Menu.Item>
                
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-pink-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <EditActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <EditInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Settings
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a href="/signout">
                  <button
                    className={`${
                      active ? 'bg-pink-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`
                  } >
                    {active ? (
                      <ArchiveActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"/>
                    ) : (
                      <ArchiveInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"/>
)}
                     Sign out
                  </button>
                </a>)}
              </Menu.Item>
             
              </div>

          </Menu.Items>
                  </Transition>
                </Menu>


                  </div>    
                
                </div>
                    </nav>
        </header>
        
        <div className='mt-4 mx-auto '>
        <button type="button" class="mb-10 text-white bg-pink-500 hover:bg-pink-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"  onClick={()=>window.location.href="/dashboard/myJobs/createJob"}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 me-2">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd" />
</svg>
  Create Event
</button>

        </div>
        {
          eventDataTabs(data)
        } 
      
</>
    );

}

function eventApplicationTabs(){
  return(
    <div className='px-3 mt-8 flex flex-wrap mx-auto text-center'>
      

      <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <li class="me-2">
              <a href="#" aria-current="page" class="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500">Profile</a>
          </li>
          <li class="me-2">
              <a href="#" class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Dashboard</a>
          </li>
          <li class="me-2">
              <a href="#" class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Settings</a>
          </li>
          <li class="me-2">
              <a href="#" class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Contacts</a>
          </li>
          <li>
              <a class="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">Disabled</a>
          </li>
      </ul>

    </div>
  )
}

function eventDataTabs(data){
  const[activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false)
  const [isDel, setIsDel] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')
  const [date, setDate] = useState('');
  const [desc,setDesc] = useState('')
  const [location,setLocation] = useState('')
  const [eventWT, setEventWT] = useState('')
  const [eventWTVal, setEventWTVal] = useState('')
  const [eventUID, setEventUID] = useState('')

  const [isChecked, setIsChecked] = useState()

  const isChRef = useRef(false)
  var edata = new eventData();

  useEffect(()=>{
      setActiveIndex(1)
  },[])

  function closeModal(){
    setIsOpen(false)
 }
 function openModal(){
   setIsOpen(true)
 }

function editDialog(uid,title, eDate, eLoc, eDescrip,eWageWT, eWageTVal){
  setDialogTitle(title)
  setDate(eDate)
  setLocation(eLoc)
  setDesc(eDescrip)
  setEventWT(eWageWT)
  setEventWTVal(eWageTVal)
  setEventUID(uid)
  openModal()
}

function update(uid){ 
  checkHandler()
  console.log(isChecked)
  // edata.updateStatus(uid, isChecked)
 // window.location.replace('/dashboard/myJobs')
}
const checkHandler = () =>{
  setIsChecked(!isChecked)
}
function tableHeaders(){
  return(
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
    <th scope="col" class="px-6 py-3">
           
        </th>
    <th scope="col" class="px-6 py-3">
           Status
        </th>
        <th scope="col" class="px-6 py-3">
           Event name
        </th>
        <th scope="col" class="px-6 py-3">
            Location
        </th>
        <th scope="col" class="px-6 py-3">
            Wage Type
        </th>
        <th scope="col" class="px-6 py-3">
            Wage Posted
        </th>
        <th scope="col" class="px-6 py-3">
            Action
        </th>
        
    </tr>
</thead>
  )
}

function statusTag(status){
  if(!status){
   return( 
    <span class="bg-gray-300 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Inactive</span>
  )
  }
  else{
    return(
      <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">Active</span>
    )
  }
}

function returnCheckID(eventuid){
  return ("checkbox-"+eventuid)
}

  return(
    <div>
      

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-center text-gray-500 dark:text-gray-400">

      {tableHeaders()}
        
        <tbody id='tablebody'>
          <Panel isActive={activeIndex===0}>
            {
           data.map((d)=>{
            return(
              <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th className='px-5'>
                            
              <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" id={returnCheckID(d.eventid)} value="" class="sr-only peer" defaultChecked={d.isOpen} onClick={()=>update(d.eventid)}/>
              <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"/>
              </label>
              </th>
              <th>

              {statusTag(d.isOpen) }

              </th>
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {d.eventName}
              </th>
              <td class="px-6 py-4">
                  {d.eventLocation}
              </td>
              <td class="px-6 py-4">
                  {d.eventWageType}
              </td>
              <td class="px-6 py-4">
              &#8369; {d.eventWageTypeVal}
              </td>
              <td class="px-6 py-4 space-x-2" >
                
              <button type="button" class="text-white bg-pink-500 hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">View Applications</button>  |  
              <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>editDialog(d.eventid,d.eventName,d.eventDate, d.eventLocation, d.description,d.eventWageType,d.eventWageTypeVal )}> Edit</button>
            
              </td>
          </tr>
            )
           })
        }
        
          </Panel>
        </tbody>
    </table>
  

    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=>closeModal()}>

        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom='opacity-100' leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-black/25'/>
        </Transition.Child>
        <div className="fixed inset-0 overfly-auto">
          <div className='flex min-h-full items-center justify-center p-8 text-center'>
            
            <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95'>


              <Dialog.Panel className='w-full max-w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>      
                <div className="text-center">
                <Dialog.Title as="h3">{dialogTitle}</Dialog.Title>
                </div>
                <div className='mt-8 text-center space-x-2'>
                
                  {
                    editForm(eventUID,dialogTitle,date,location,desc,eventWT,eventWTVal)

                  }
                  
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
        </Dialog>

    </Transition>
</div>

    </div>
  )
}


function Panel({
  children,
  isActive
}){
  return(
    <>
        {isActive ? skeleton() : (children) }
    </>
  )
}

function skeleton(){
  return(
       <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <div class="mt-3 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                </th>
                <td class="px-6 py-4">
                <div class="mt-3 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                </td>
                <td class="px-6 py-4">
                <div class="mt-3 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
                </td>
                <td class="px-6 py-4">
                <div class="mt-3 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
                </td>
                <td class="px-6 py-4">
                <div class="mt-3 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
                </td>
            </tr>
  )
}
function EditInactiveIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 pr-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

  )
}

function EditActiveIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 pr-2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
  
  )
}

function ArchiveInactiveIcon(props) {
  return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 pr-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
</svg>

  )
}

function ArchiveActiveIcon(props) {
  return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 pr-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
</svg>

  )
}


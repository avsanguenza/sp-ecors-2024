import userData from './dashboard/user';
import {Fragment, useState,useEffect} from 'react';
import {Dialog, Menu, Transition } from '@headlessui/react'
import searchPage from './search/page';
import { Metadata, ResolvedMetadata } from 'next';
import { title } from 'process';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
let accInfo = new userData();
accInfo.parseData()

const Admin = [
  'admin',
  '',
  '/search'
]
const User = [

]

const publicUser = [
  'events',
  '',
  'people',
  'login',
  'search',
  'signupPrompt',
  'signup'
]

var titleName=''
  export  const metadata :Metadata={
    title: titleName, 
}


function NavBar ({children}){

    const [title,setTitle] = useState('ECORS')
    useEffect(()=>{

        document.title = title
        isUserSupposedToBeHere(accInfo.userType,accInfo.auth.currentUser)
      })
    
   
  
    return(
      <>
      <nav id='navBar 'className={setClass("relative flex flex-wrap items-center justify-between px-2 py-3 bg-pink-500 mb-3")}>
      <div className="container px-2 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
          <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" href="/">
            {icon()}
            ECORS
          </a>
          <button className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button">
            <span className="block relative w-6 h-px rounded-sm bg-white"></span>
            <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
            <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
          </button>
        </div>
        <div className="lg:flex flex-grow items-center" id="example-navbar-warning">
          <ul className="flex flex-col lg:flex-row list-none mr-auto">
            {navBarContent(accInfo.getUserType())}
          </ul>
            {searchBar()}
            {checkUser()}
        </div>
      </div>
    </nav>
    <Toaster/>
    <div className='ml-8 mr-8 mb-8'>
    {children}
    </div>
      {footer()}
      </>
    )
}

export default NavBar;
function icon(){
  return(
    <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6 inline mx-auto fill-white mr-4 ' viewBox="0 0 24 24"><path d="M19 5c-2.321 0-4.025 2.127-5 3.779a2.952 2.952 0 0 0-4 0C9.025 7.127 7.32 5 5 5a3.718 3.718 0 0 0-3.52 2.053A4.711 4.711 0 0 0 1 9a6.549 6.549 0 0 0 .753 3A6.549 6.549 0 0 0 1 15a4.711 4.711 0 0 0 .48 1.947A3.718 3.718 0 0 0 5 19c2.32 0 4.025-2.127 5-3.779a2.952 2.952 0 0 0 4 0C14.975 16.873 16.679 19 19 19a3.888 3.888 0 0 0 4-4 6.549 6.549 0 0 0-.753-3A6.549 6.549 0 0 0 23 9a3.888 3.888 0 0 0-4-4zM5 17a1.881 1.881 0 0 1-2-2 3.927 3.927 0 0 1 .707-2.3 1 1 0 0 0 0-1.414A3.918 3.918 0 0 1 3 9.008 1.884 1.884 0 0 1 5 7c1.71 0 3.288 2.657 3.909 4H7a1 1 0 0 0 0 2h1.909C8.288 14.343 6.71 17 5 17zm7-3a1 1 0 0 1-1-1v-2a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1zm8.293-1.293A3.918 3.918 0 0 1 21 14.992 1.885 1.885 0 0 1 19 17c-1.711 0-3.288-2.657-3.909-4H17a1 1 0 0 0 0-2h-1.909c.621-1.343 2.2-4 3.909-4a1.882 1.882 0 0 1 2 2 3.927 3.927 0 0 1-.707 2.3 1 1 0 0 0 0 1.407z"/></svg>
  )
}
function footer(){
  return(
    

<footer className={setClass("bg-pink-500 rounded-lg shadow m-4 dark:bg-gray-800 z-999")}>
  <div className='sm:absolute left-0 ml-16 md:flex'> 
  <span class=" text-sm text-white dark:text-gray-400 py-4">© 2024 Alyssa Fatima V. Sanguenza 
    </span>
  </div>
    <div class="w-full mx-auto p-4 md:flex items-end md:justify-end -ml-16">

    <ul class="flex items-end mt-3 text-sm font-medium text-white sm:mt-0">
        <li>
            <a href="#" class="hover:underline me-4 md:me-6">About</a>
        </li>
        <li>
            <a href="mailto:avsanguenza@up.edu.ph" class="hover:underline">Contact</a>
        </li>
    </ul>
    </div>
</footer>

  )
}
function searchBar(){
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()
  const replace = useRouter().replace

 const handleSearch = useDebouncedCallback((term: string)=>{
      const params = new URLSearchParams(searchParams)
    if(!term){
         params.delete('query')   
    }
  
    params.set('query',term)
    window.location.replace('/search/?'+`${params.toString()}`)
 //   replace()
  },300)

const handleNewSearch = ()=>{
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  params.delete('query')   
  params.delete('typeQuery')
}
    return(
        <>
        
<form class="max-w mx-auto"  >   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="text" id="searchQuery" placeholder='Search' class="flex w-[32rem] p-4 ps-20 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500"  onChange={()=>handleNewSearch}/>
        <button type="button" class={setClass("text-white absolute end-1.5 bottom-2.5 bg-pink-500 hover:bg-pink-800 focus:ring-4 focus:outline-none font-medium rounded-full text-sm px-4 py-2 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800")} onClick={()=>handleSearch(document.getElementById('searchQuery').value)}>Search</button>
    </div>
</form>

        </>
    )
}

function checkUser(){
    if(accInfo.uid!=null){
        return(
            <Menu as="div" className="relative ml-3 z-10">
            <div>
              <Menu.Button className="ml-5 relative flex rounded-full text-white bg-base text-sm focus:outline-none  focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                {(accInfo.getUserType()=='Admin')? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 inline">
<path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>: <img src={accInfo.photoURL} className='w-12 h-12 rounded-full'></img>}
                <span className='mt-3 px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'>{accInfo.getName()}</span>
              </Menu.Button>
              <p className='text-start ml-20 -mt-1 text-xs text-white font-medium tracing-wide'>{accInfo.getUserType()}</p>

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
                    <li className="font-medium">{accInfo.getName()}</li>
                    <li className="text-sm">{accInfo.userType}</li>
                  </ul>
                </div>

      <div className="px-1 py-1 ">
        <Menu.Item>
          
          {({ active }) => (
            <a href="/dashboard/settings" hidden={(accInfo.getUserType()=='Admin')}>
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
            </a>
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

          )
    }
    else{
        return(
            <div>
            <a href="/login" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-pink-500 hover:bg-white mt-4 lg:mt-0">Login/Signup</a>
          </div>
         
        )
    }

}

function setClass(string){
  if(accInfo.userType=='Admin'){
    let temp = string 
    let newString = string.replace('pink','gray')
    return (newString)
  }
  else{
    return string
  }
  }
 

export function isUserSupposedToBeHere(user,auth){
const loc = window.location.pathname
  if(loc.includes('dashboard') && user==null){
    window.location.replace('/')
  }
  if(loc.includes('admin') && user==null){
    window.location.replace('/')
  }
  if(loc.includes('messages') && user==null){
    window.location.replace('/')
  }
}
export function useTitle(title){
    useEffect(()=>{
        const prevTitle = document.title;
        document.title = title;
            return()=>{
                document.title = prevTitle;
            }
      })
}

function navBarContent(type){
    if(type=='Event Organizer'){

       return(
        <>
        
        <li className="nav-item">
          <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="/events" >
            <i className="fab fa-twitter text-lg leading-lg text-white opacity-75" /> <span className="ml-2" onClick={()=>titleName='Events'}>Events</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="/dashboard/myJobs">
            <span className="ml-2">Manage Events</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="/messages">
            <span className="ml-2">Messaging</span>
          </a>
        </li>
        </>
       )
    }
    if(type =='Admin'){
      return(
        <>
        
        <li className="nav-item">
          <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="/admin/manageUsers" >
            <i className="fab fa-twitter text-lg leading-lg text-white opacity-75" /> <span className="ml-2">Manage Users</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="/admin/manageAssets">
            <span className="ml-2">Manage Assets</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="/admin/manageComplaints">
            <span className="ml-2">Manage Complaints</span>
          </a>
        </li>
        </>
      )
    }
    if(type=='User'){
     return(
      <>
      <li className="nav-item">
          <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="/events" >
            <i className="fab fa-twitter text-lg leading-lg text-white opacity-75" /> <span className="ml-2">Events</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="/dashboard/myApps">
            <span className="ml-2">Manage Applications</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="/messages">
            <span className="ml-2">Messaging</span>
          </a>
        </li>
        </>
     ) 
    }
    else{
        return(
            <>
       
            <li className="nav-item">
              <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="/events">
                <i className="fab fa-twitter text-lg leading-lg text-white opacity-75" /> <span className="ml-2">Events</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="/people">
                <span className="ml-2">People</span>
              </a>
            </li>
            </>
        )
    }
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
  
  function  ArchiveActiveIcon(props) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 pr-2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
  
    )
  }

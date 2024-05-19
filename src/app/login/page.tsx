'use client'

import React from 'react'
import signIn from "@/firebase/auth/signin";
import {useRouter} from 'next/navigation';
import firebase_app from '@/firebase/config';
import { getAuth } from 'firebase/auth';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import  userDBClass from '@/firebase/data/userDB';
import { useState } from 'react';
const auth = getAuth(firebase_app);

const top= () =>{
  return(
    <>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=pink&shade=500"
              alt="Your Company"
            />
            
              
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
    </>
  )
};



function Page(){

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading,setLoading] = useState(false)
  const router = useRouter()

  const handleForm = async (event) => {
      event.preventDefault()
      setLoading(true)
        await signIn(email, password).then(async()=>{
        var udbc = new userDBClass(auth.currentUser);
        udbc.setAccValues()
      
        await new Promise ((resolve)=> setTimeout(resolve,2000));
        setLoading(false)
        toast.success('Login success')
        await new Promise ((resolve)=> setTimeout(resolve,500));

        router.push("/dashboard")
   
      }).catch((err)=>{
        setLoading(false)
        toast.error('Login failed. Please try again.')
        console.log("error dialogue") 
      })
      
    }


    
  return (

      <>
        
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
         {top()}
          <Toaster
          />
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleForm} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address                 
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-pink-600 hover:text-pink-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                {fetchButton(loading)}
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <a href="/signUpPrompt" className="font-semibold leading-6 text-pink-500 hover:text-pink-700">
                Sign up!
              </a>
            </p>
          </div>
        </div>
      </>
    );
  }
    export default Page;

function fetchButton(state){
      if(state){
         return( <button type="submit" class="flex w-full inline justify-center rounded-md bg-pink-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " > 
          {spinnerButton()}
          Signing In</button>)
      }
      else{return(<button
        type="submit"
        className="flex w-full justify-center rounded-md bg-pink-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        Sign in
      </button>)
      }
  }
  
  const spinnerButton = ()=>{
      return(
          <svg aria-hidden="true" class="w-4 h-4 mt-1 me-2 text-gray-200 animate-spin dark:text-gray-600 inline fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
      )
  }

  
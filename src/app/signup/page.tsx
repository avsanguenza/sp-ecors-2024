//TODO: send to firebase, update the firebase

'use client'
import React from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from 'next/navigation'

function Page() {
    //name, location, name of company, email, address, contact number
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await signUp(name,email, password);
        
        if (error) {
            return console.log(error);
        }

            // else successful
        console.log(result)
        //get uid, to server
        return router.push("/")
        
    }

    return (
    
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="form-wrapper">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up</h2>
                <form onSubmit={handleForm} className="space-y-6 mt-16" >
                    
                    <div>
                        
                        <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 mt-4">
                                Name               
                        </label>

                        <div className="mt-4">
                            <input onChange={(e)=> setName(e.target.value)} 
                        id="name"
                        name="name"
                        type="name"
                        autoComplete="name"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>

                        </div>

                        
                        <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mt-4">
                                E-mail                
                        </label>

                        <div className="mt-4">
                            <input onChange={(e)=> setEmail(e.target.value)} 
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required type="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>

                        </div>

                            <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 mt-4">
                                Password               
                    </label>

                        <div className="mt-4">
                            <input onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>

                        </div>

                    </div>
                     <div>

               <div>
               <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-pink-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
               </div>

              </div>
                </form>
            </div>
        </div>
        
    );
}

export default Page;
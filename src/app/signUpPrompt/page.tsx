//ask join as a what
'use client'

//join as an event organizer/concessionaire 

//i'm an event organize hiring people for my event 
//im a concessionaire looking for events to partner with 

function Page(){
const handleChoice =(type)=>{
    type.preventDefault()


}
   return(
       <><h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up as a:</h2>
         <form onSubmit={handleChoice}>

             <ul className="mt-64 grid w-full gap-6 md:grid-cols-2 p-6">
            <li>        
            
                    <input type="radio" id="eOrganizer" value="eOrganizer" name="signUpChoice" className="hidden peer" required/>
                    <label htmlFor="eOrganizer" className="inline-flex items-center justify-between w-full p-5 text-pink-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-pink-500 dark:border-gray-700 dark:peer-checked:text-pink-500 peer-checked:border-pink-500 peer-checked:text-pink-500 hover:text-white hover:bg-pink-200 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">

                        <div className="block">
                        <div className="w-full text-lg font-semibold">Event Organizer</div>
                <div className="w-full">I'm someone that deals with events! </div>
                        </div>  
                        <svg className="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
                    </label>

                 </li> 
                 <li>
                    
                 <input type="radio" id="eConcess" value="eConess" name="signUpChoice" className="hidden peer" required/>
                    <label htmlFor="eConcess" className="inline-flex items-center justify-between w-full p-5 text-pink-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-pink-500 dark:border-gray-700 dark:peer-checked:text-pink-500 peer-checked:border-pink-500 peer-checked:text-pink-500 hover:text-white hover:bg-pink-200 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">

                        <div className="block">
                        <div className="w-full text-lg font-semibold">Event Concessionaire</div>
                <div className="w-full">I'm someone that provides services! </div>
                        </div>  
                        <svg className="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
                    </label>

                </li>  
       </ul>
            <div className="text-center">
            <button type="button" className="mt-10 text-2xl font-bold text-white bg-pink-500 hover:bg-pink-700 tracking-normal rounded-full px-24 py-8">Register</button>

            </div>
       </form>
       </>
       )
    }
    export default Page;


function concessionaireSign(){
return("hi");
}

function organizerSign(){
    return("hi");
}
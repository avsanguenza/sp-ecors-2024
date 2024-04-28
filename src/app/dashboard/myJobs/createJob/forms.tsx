import React, {useRef} from 'react';
import { eventData } from '@/firebase/data/event';


 const jobRegistrationForm = () =>{
  //GET UID FIRST 
    const eventName = useRef(null);
    const createDate = useRef(null);
    const createLoc = useRef(null);
    const createDescription = useRef(null)
    const createWageType = useRef(null)
    const createWageTypeVal = useRef(null)
    
    
      const handleSubmit = (event) =>{
        event.preventDefault();
    
        const eName = eventName.current.value;
        const cDate = createDate.current.value;
        const cLoc = createLoc.current.value;
        const cDescription = createDescription.current.value;
        const cWageType = document.querySelector('input[name="jobWageType"]:checked').value
        const cWageTypeVal = createWageTypeVal.current.value;
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
          <button  type='submit' className="mx-auto mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Next</button>
      </form>
      
    )
}

export default jobRegistrationForm;

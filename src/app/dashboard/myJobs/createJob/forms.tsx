import { useState ,useEffect} from 'react';
import React, {useRef} from 'react';
import { eventData } from '@/firebase/data/event';
import userData from '@/app/dashboard/user'
import { Disclosure, Dialog, Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react';
import { useRouter } from "next/navigation";
import { imageData } from '@/firebase/data/storage';
import toast from 'react-hot-toast';
import citiesData from './citiesData.json'
import positionData from './positionCategory.json'
import { json } from 'stream/consumers';
import { input } from '@material-tailwind/react';

function jobRegistrationForm(inputData,mode){
  //console.log(inputData)
  const [formData, setFormData] = useState(
    {
    eventuniqueid : inputData.eventid,
    eventName:inputData.eventName,
    createDateStart:inputData.createDateStart,
    createDateEnd:inputData.createDateEnd,
    createJob0:inputData.createJob0,
    createJob1:inputData.createJob1, 
    createLoc0:inputData.createLoc0,
    createLoc:inputData.createLoc,
    createWageType:inputData.createWageType,
    createWageTypeVal:inputData.createWageTypeVal,
    createDescription:inputData.createDescription,
    createEventImage: inputData.eventImageURL
  })
  const [selectOptions, setSelectOptions] = useState([])
  const [jobCategory, setJobCategory] = useState([])
  const [jobList, setJobList] = useState([])
  const [loading,setLoading] = useState(false)
  const [changeList, setChangeList] = useState('')
  const [selectedFile, setSelectedFile] = useState({src:(inputData.eventImageURL =='' ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp9hZ_fn1p0GQsP8Ehynpd7sNAHWz0CZXiMNLGo0b0RA&s': inputData.eventImageURL),blob:'',name:''})
    //event instance

    let edata = new eventData();
    let udata = new userData();
    udata.parseData();

    const handleStateChange = (e) =>{
      e.preventDefault()
      const {name,value} = e.target
      try{
        if(name =='createDateStart' && !dateHandler(value)){
          document.getElementById('eventDate0').value=''
          throw 'You cannot set an event into the past... yet.'
        }
      
        if(name =='jobCreate0'){
          setChangeList(value)
        }
       setFormData({
        ...formData,
        [name]:value,
       })
      }
     catch(err){
      toast.error(err)
     }
    }
    
    const modifiedHandleStateChange = (e)=>{
      const {name,value} = e.target
      try{
        if(name =='createDateEnd' && formData.createDateStart!== ''){
          if(value < formData.createDateStart){
            throw 'You cannot set an ending date prior your start date.'
          }
          else{
            setFormData({
              ...formData,
              [name]:value,
             })
          }
        }
        if(name =='createDateStart'){
          if(dateHandler(value)){
            setFormData({
              ...formData,
              [name]:value,
             })
          }
          else{
           throw 'You cannot set an event into the past... yet.'
          }
        }
      }catch(err){
        toast.error(err)
        e.target.value =''
      }
    }
    const checkInput = ()=>{
      try{
        if(formData.eventName =="" || formData.createWageType=='' || formData.createWageTypeVal=='' || formData.createDateStart=='' || formData.createDateEnd==''){
          throw 'Please check your input.'
        }
        else{
          document.getElementById(formData.eventName).showModal()
        }
      }
      catch(err){
        toast.error(err)
      }
    }
    function handleUploadChange(e){
      setSelectedFile({
        ...selectedFile,
        src: URL.createObjectURL(e.target.files[0]),
        blob: e.target.files[0],
        name: formData.eventName
      })
    }
    
    function dateHandler(eventDate){
        const date  = new Date();
        let currDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
        if(Date.parse(eventDate) < Date.parse(currDate)){
            return false
          // alert('You cannot set an event in the past.')
        }
        else{
          return true
        }
      }

    function fieldHandler(id1, id2){
        document.getElementById(id1).disabled=true;
        document.getElementById(id1).value='';
        document.getElementById(id2).disabled=false;
      //  document.getElementById('jobWType').value=id2
    }

  function sendData(){
    setLoading(true)
    let imgup = new imageData('event');
    if(selectedFile.name!=''){
      const uploading =imgup.uploadImage(selectedFile,formData.eventName).then(async(sn)=>{
        var eventimg = sn;
        let edata = new eventData();
        const savingData= await edata.setData(udata.getUserUID(),udata.getName(),formData.eventName,formData.createDateStart,formData.createDateEnd,formData.createLoc,formData.createDescription,formData.createWageType,formData.createWageTypeVal,eventimg).then(()=>{
     
            setLoading(false)
            window.location.replace('/dashboard/myJobs')
        })
  
          }) 
          
          const firstToast=  toast.promise(uploading,{
                loading:'Saving your progress',
                success:'Event data saved successfully',
                error: 'An error has occurred. Please try again.'
                })
             
    }
    else{
      let eventimg = selectedFile.src
      const savingData= edata.setData(udata.getUserUID(),udata.getName(),formData.eventName,formData.createDateStart,formData.createDateEnd,formData.createLoc,formData.createDescription,formData.createWageType,formData.createWageTypeVal,eventimg).then(()=>{
        setLoading(false)
        window.location.replace('/dashboard/myJobs')

      })
      toast.promise(
        savingData, {
          loading:'Saving your progress',
          success:'Event data saved successfully',
          error: 'An error has occurred. Please try again.'
        }
      )
    }
   
  }
  function sendEditedData(){
    setLoading(true)
    console.log('edit')
    let imgup = new imageData('event');
    if(selectedFile.name!=''){
      console.log('uploading')
      const uploading = imgup.uploadImage(selectedFile,formData.eventName).then(async(sn)=>{
          var eventimg = sn
          let edata = new eventData()
          const savingData = await edata.updateData(formData.eventuniqueid,formData.eventName,formData.createDateStart,formData.createDateEnd,formData.createJob0,formData.createJob1,formData.createLoc,formData.createDescription,formData.createWageType,formData.createWageTypeVal,eventimg)
      }).then(()=>{
        setLoading(false)
        window.location.replace('/dashboard/myJobs')
      })
      const firstToast=  toast.promise(uploading,{
        loading:'Saving your progress',
        success:'Event data saved successfully',
        error: 'An error has occurred. Please try again.'
        })
    }
    else{
       console.log('not uploading')
        let eventimg = selectedFile.src
        const savingEditedData = edata.updateData(formData.eventuniqueid,formData.eventName,formData.createDateStart,formData.createDateEnd,formData.createJob0,formData.createJob1,formData.createLoc,formData.createDescription,formData.createWageType,formData.createWageTypeVal,eventimg).then(()=>{
              setLoading(false)
              window.location.replace('/dashboard/myJobs')
        })
        toast.promise(
          savingEditedData, {
            loading:'Saving your progress',
            success:'Event data saved successfully',
            error: 'An error has occurred. Please try again.'
          }
        )
    }
  }

  function fetchButton(state,mode){
    if(state){
      return( <button type='button' class=" w-48 text-center rounded-lg bg-pink-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " > 
       {spinnerButton()}
       {(mode =='add' )?  "Saving new event..." : "Saving changes..." }
  </button>)
   }
   else{return(
   <button type='button'
     className="w-48 text-center rounded-lg bg-pink-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    onClick={()=>{mode=='add'? sendData(): sendEditedData()}}>
      {(mode =='add' )?  "Confirm Event" : "Save Changes" }
   </button>)
   }
  }
  
  const spinnerButton = ()=>{
    return(
        <svg aria-hidden="true" class="w-4 h-4 mt-1 me-2 text-gray-200 animate-spin dark:text-gray-600 inline fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
    )
  }
  
  useEffect(()=>{
    const getOptions = async()=>{
      try{
        var jsonRes = new Array()
        citiesData.map((v,k)=>{
          jsonRes.push(v.name)
        })
        setSelectOptions(jsonRes)
      }
      catch(err){
        console.log()
      }

    }
    const getPositionOptions = async()=>{
      try{
        var jsonCatRes = new Array()
        var jsonJobRes = new Array()
        positionData.map((v,k)=>{
        if(!(jsonCatRes.includes(v.category))){
          jsonCatRes.push(v.category)
        }
        var data = {
          'category':v.category,
          'job':v.job
        }
        jsonJobRes.push(data)
        })
        setJobCategory(jsonCatRes)
      }
      catch(err){
        console.log()
      }
    }
    
    getPositionOptions()
    getOptions()
  },[])  
  useEffect(()=>{
   //)
   const getJobList = async ()=>{
    try{
      var jsonJobRes = new Array()
    positionData.map((v,k)=>{
      if(v.category==changeList){
        jsonJobRes.push(v.job)
      }
    })
    setJobList(jsonJobRes)
    }catch(err){
      console.log(err)
    }
   }
   getJobList()
  },[changeList])
    return(
        <>
        
        <form>
       
          <div className='ml-24 grid grid-flow-col auto-cols-max '>
       
          <div className="ml-12 mx-auto ml-8 py-12 border border-white bg-white rounded-lg w-[50rem]"> 
          
          <div className='text-start ml-4 mb-6'>
          <label className="block text-gray-700 text-xl font-semibold mb-2" for="eventCreatorName">Event Organizer: </label>
          <input className="appearance-none block w-96 bg-gray-50 disabled:bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="eventCreatorName" value={udata.getName()} disabled></input>
          </div>
         <div className='inline text-start mt-8'>

          <div className='grid grid-cols-4 gap-4'>
            
            <div className='col-span-3'>
            <label className="block text-gray-700 text-xl font-semibold mb-2 ml-4" for="eventName"> Event Name: <span className='text-xl font-semibold text-red-500'>&#42;</span></label>
          <input className="appearance-none block w-96 bg-gray-50 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ml-4" id='eventName' name="eventName" type='text' placeholder={formData.eventName}onChange={handleStateChange} />
            </div>
              <div>
              <button className=' mt-8 -ml-36 bg-pink-500 px-6 py-3 text-medium font-bold border border-pink text-white rounded-full' onClick={()=>document.getElementById('descripModal').showModal()}> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 inline mr-2">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd" />
</svg>
Add description</button>
              </div>
          </div>          
          <div className='grid grid-cols-4 gap-4' >
          <div className='mt-8'>
          <label className="ml-4 mb-2 block text-gray-700 tracking-wide text-xl font-semibold " for="eventWork"> Category:</label>
          <div className='ml-4'>
             <select id="eventWorkCategory" name='jobCreate0'className='rounded py-3 px-9 w-48 bg-gray-50 border border-pink-500 focus:ring-pink-500 focus:border-pink-500'  onChange={handleStateChange}>
              <option defaultChecked>{(formData.createJob0=='')? 'Select Position': formData.createJob0}</option>
              {jobCategory.map((d)=>{
             
               return(
                <option value={d}>{d}</option>
              )
              })}
            </select>
          </div>
          </div>
          <div className='mt-8 ml-8'>
          <label className="ml-20 mb-2 block text-gray-700 tracking-wide text-xl font-semibold " for="eventWorkPos"> Position</label>
          <div className='ml-20'>
             <select id="eventWorkPos" name='jobCreate1' className='rounded py-3 px-9 w-48 bg-gray-50 border border-pink-500 focus:ring-pink-500 focus:border-pink-500'  onChange={handleStateChange}>
             <option defaultChecked>{(formData.createJob1=='')? 'Select Position': formData.createJob1}</option>              {jobList.map((d)=>{
                return(
                  <option value={d}>{d}</option>
                )
              })}
            </select>
          </div>
          </div>
          </div>
          
          <div className='grid grid-cols-4 gap-4 mt-8'>
          <div className=''>
          <label className="ml-4 mt-4 mb-2 block text-gray-700 br-gray-40 tracking-wide text-xl font-semibold ">Job Wage: <span className='text-xl font-semibold text-red-500'>&#42;</span></label>
              <div>
              <input type='radio' className='py-4 accent-pink-500 bg-gray-50 ml-4 mb-4' id='jobWType' name='createWageType' value='hourly' onClick={()=>fieldHandler('jobWageSum','jobWageHourly')}  onChange={handleStateChange}></input>
            <label className="ml-3 mb-6" for='jobWType'>Hourly Rate:</label>
      
            <input type="number" min="0" id="jobWageHourly" name ='createWageTypeVal' className="px-4 py-3 text-center bg-gray-50 border border-pink-500 disabled:bg-gray-200 rounded-full ml-8 ring-pink-500" placeholder="&#8369;" onChange={handleStateChange} />
            </div>  
        
          </div>
          <div className='ml-24 mt-[3.15rem]' >
            <input type='radio' id='jobWType' className='accent-pink-500 bg-gray-50 ml-4 mb-4' name='createWageType' value='fixed' onClick={()=> fieldHandler('jobWageHourly','jobWageSum') } onChange={handleStateChange}>
            
            </input>
            <label className="ml-4 mb-4">Fixed:</label>
            <input type="number" min="0" id="jobWageSum" name ='createWageTypeVal' className="px-4 py-3 text-center bg-gray-50 border border-pink-500 rounded-full ml-8 disabled:bg-gray-200  ring-pink-500"  placeholder="	&#8369;"  onChange={handleStateChange} required />
            </div>
          </div>
         </div>

  
         
          </div>
          <div className='mx-auto ml-8 py-12 border border-white bg-white rounded-lg w-[50rem]'>
          <div className='grid grid-cols-4 gap-4' >
          <div className=''>
          <label className="-ml-6 mb-2 block text-gray-700 tracking-wide text-xl font-semibold "> Location:</label>
          <div className='mt- grid grid-flow-col auto-cols-max'>
          <label className='ml-8 mt-2  text-gray-700 text-lg font-normal'>City:</label>
             <select id="eventWork" name='createLoc' className='ml-10 rounded py-3 px-9 bg-gray-50 border border-pink-500 focus:ring-pink-500 focus:border-pink-500'  onChange={handleStateChange}>
             <option defaultChecked>{(formData.createLoc=='')? 'Select Position': formData.createLoc}</option>              {selectOptions.map((d)=>{
                return(
                  <option value={d}>{d}</option>
                )
              })}
            </select>
          </div>
          </div>
          </div>
          <div className='ml-4 mb-8 grid grid-flow-col auto-cols-max '>
            <div>
          <label className="mt-4 -ml-48 mb-4 block text-gray-700 tracking-wide text-xl font-semibold mb-4" for="eventDate"> Event Date: <span className='text-xl font-semibold text-red-500'>&#42;</span></label>
          <label className='ml-4 text-gray-700 text-lg font-normal'> Start date:</label>
          <input type='date' id='eventDate0' name='createDateStart' className=' ml-12 rounded py-3 px-4  bg-gray-50 border border-pink-500 focus:ring-pink-500 focus:border-pink-500 ' onChange={handleStateChange} placeholder="Select a date" required/>      
          </div>
          <div className='mt-[3.72rem] ml-8'>
            
          <label className='ml-4 mb-2 text-gray-700 text-lg font-normal'> End date:</label>
          <input type='date' name='createDateEnd' className=' ml-4 rounded py-3 px-4  bg-gray-50 border border-pink-500 focus:ring-pink-500 focus:border-pink-500 ' onChange={modifiedHandleStateChange} placeholder="Select a date" disabled={formData.createDateStart==''} required/>
          </div>
        
          </div>
          <label className="text-start ml-7 mb-4 block text-gray-700 tracking-wide text-xl font-semibold mb-4"> Event Feature Image</label>
              <img src={selectedFile.src} className="mx-auto h-auto max-w-lg rounded-lg mb-4"></img>  

              <input id="file_input" type="file" className='bg-white border text-gray-900 border-pink-300 rounded-lg px-3 py-4 text-slate-500 file:bg-pink-500 
              file:block-mb-2 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-pink-500 file:text-white
              hover:file:bg-pink-700'  onChange={handleUploadChange}/>

              <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
          </div>

          </div>
               
          <button type='button' className="mx-auto mt-2 text-white bg-pink-500 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-semibold rounded-full text-xl tracking-wide px-8 py-2 me-2 mb-2 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800" onClick={checkInput}>Next</button>
      </form>

      <dialog id="descripModal" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                    <h3 className="font-bold text-lg text-center ">Add description</h3>
                    <p className="py-4 text-center">Enter your event's description:</p>
                   <div className='text-center'>
                  <form method='dialog'>
                  <textarea id="message" rows="4" id='jobDescription' className=" text-center ext-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='createDescription'  placeholder="Job Description" onChange={handleStateChange}></textarea>
                  <button type="btn"
        className="flex w-full justify-center rounded-md bg-pink-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
      Save description
      </button>
                  </form>
                   </div>
                    <div className="modal-action">
                    <form method="dialog">
                    <button className="btn absolute top-0 right-0">X </button>
                    </form>
                    </div>
                    </div>
                    </dialog>
                    
      <dialog id={formData.eventName} className="modal modal-bottom sm:modal-middle">

                    <div className="modal-box bg-white">
                   <div className='text-center'>
                  <form method='dialog'>
                  <div className='border border-white bg-white'>
                  <h3 className="font-bold text-lg text-center ">{mode}:</h3>
                  <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

                    <ul>
                      <li className='text-lg font-semibold'> Event Organizer: <text className='text-lg font-normal'>{udata.getName()}</text></li>
                      <li className='text-lg font-semibold'> Event Name: <text className='text-lg font-normal'>{formData.eventName}</text></li>
                      <li className='text-lg font-semibold'> Event Location:{formData.createLoc} <text className='text-lg font-normal'></text></li>
                      <li className='text-lg font-semibold'> Event Date:{formData.createDateStart} ~ {formData.createDateEnd} <text className='text-lg font-normal'></text></li>
                      <li className='text-lg font-semibold'> Wage Type:{formData.createWageType} <text className='text-lg font-normal'></text></li>
                      <li className='text-lg font-semibold'> Wage Value:{formData.createWageTypeVal} <text className='text-lg font-normal'></text></li>
                    </ul>
                  </div>
                  <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

                  <div className='mx-auto mt-4 '>
                  {fetchButton(loading,mode)}

                  </div>
                  </form>
                   </div>
                    <div className="modal-action">
                    <form method="dialog">
                    <button className="btn absolute top-0 right-0 rounded-lg">X </button>
                    </form>
                    </div>
                    </div>
                    </dialog>
      </>
    )
}

export default jobRegistrationForm;

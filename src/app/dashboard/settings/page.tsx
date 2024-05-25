'use client'

import NavBar from "@/app/navBar"
import { useEffect, useState } from "react"
import userData from "../user"
import { imageData } from "@/firebase/data/storage"
import { select } from "@material-tailwind/react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import toast, { Toaster } from "react-hot-toast"
import provinces from '@/assets/provinces.json'
import cities from '@/assets/cities.json'
import categoryJSON from '@/assets/positionCategory.json'
import userDBClass from "@/firebase/data/userDB"
import { userInfo } from "os"

let udata = new userData()
udata.parseData();
let udbc = new userDBClass(udata.auth)
export default function Page(){

 return(
        <>
            <NavBar>
            <Toaster/>
            {settingTabs()}

            </NavBar>     
        </>
 )
}
function settingTabs(){
   
    return(
        

        <div class="ml-10 mt-10 md:flex">
        <ul class="flex-column space-y space-y-2 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
        <li>
        <a href="#" class="inline-flex items-center px-3 py-5 text-white bg-pink-500 rounded-lg active w-full dark:bg-pink-600" aria-current="page">
        <svg class="w-4 h-4 me-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
        </svg>
        Profile Settings
        </a>
        </li>
        <li>
        <a href="/dashboard/settings/accountSettings" class="inline-flex items-center px-3 py-5 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
        <svg class="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18"><path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/></svg>
        Account Settings
        </a>
        </li>
        </ul>
        <div class="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
        <h3 class="text-4xl font-bold text-gray-900 dark:text-white mb-[2rem]">Profile Settings</h3>       
        <hr class="h-px my-full bg-gray-200 border-0 dark:bg-gray-700 mb-5"/>
        <div className="mt-2 h-[50rem] w-[35rem] mx-auto border border-gray-300 rounded-lg p-4 auto-cols">
         <div>
         {settingsInterface()}
         </div>
         
        </div>
        </div>
        </div>


    )
}
function settingsInterface(){

    const [userChange, setUserChange]= useState({firstName:'',  lastName:'',email:'',address:'',userProvince:'',userCity:'',userPos:'', userJob:''})
    const [loading,setLoading] = useState(false)
    const [aProvince, setAProvince] = useState('')
    const [aCities, setACities]= useState([])
    const [selectedFile, setSelectedFile] = useState({src:(udata.photoURL==''? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp9hZ_fn1p0GQsP8Ehynpd7sNAHWz0CZXiMNLGo0b0RA&s': udata.photoURL),blob:'',name:'',type:''})
    const [job,setJob] = useState([])
    const [category,setCategory] = useState([])
    const [subCat, setSubCat] = useState('')
   const handleFormSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true)
        const folderName ='user'
        let imgup = new imageData(folderName);
        let process
       if(selectedFile.name!=''){
       process = imgup.uploadImage(selectedFile,selectedFile.name).then((res)=>{
           process= udata.setNewProfile(userChange.firstName.trim(),userChange.lastName.trim(),userChange.address.trim(),userChange.userProvince,userChange.userCity,userChange.userPos,userChange.userJob,res).then(()=>{
                setLoading(false)
    
            })
        })
       }
       else{
            process = udata.setNewProfile(userChange.firstName.trim(),userChange.lastName.trim(),userChange.address.trim(),userChange.userProvince,userChange.userCity,userChange.userPos,userChange.userJob,'').then(()=>{
                setLoading(false)
            })
       }
       
        toast.promise(process,{
            loading:'Saving your changes',
            success: 'Changes saved successfully',
            error: 'An error has occured. Please try again.'
        })
  
    }   
    const handleFormChange =  (e )=>
        {
        const {name,value} = e.target
        if(name=='userProvince'){
            setAProvince(value)
        }
        if(name=='userPos'){
            setSubCat(value)
        }
        setUserChange({
          ...userChange,
          [name]:value,
        })  
        }
    function getNormalName(data){
            var temp=''
            provinces.map((v,k)=>{
              if(v.key==data){
                temp= v.name
              }
            })
            return temp
          }
    const handleUploadChange = (e)=>{
        setSelectedFile({
            ...selectedFile,
            src: URL.createObjectURL(e.target.files[0]),
            blob: e.target.files[0],
            type: e.target.files[0].name.split(".").pop(),
            name: udata.getUserUID()
          })
         
    }
    useEffect(()=>{
        let userInfoData = new userData()
        userInfoData.parseData()
        var name = userInfoData.getName().split(' ')
        var surName = name.at(name.length-1)
        var frontName = ''
        name.forEach(d=>{
            if (d!=surName){
                frontName+=" "+d
            }
        })
      
        setUserChange({
            ...userChange,
            ['firstName']: frontName,
            ['lastName']: surName,
            ['email'] : userInfoData.email,
            ['address']: userInfoData.userAddress,
            ['userProvince']: userInfoData.userProvince,
            ['userCity']: userInfoData.userCity,
            ['userPos']: userInfoData.userCat,
            ['userJob']: userInfoData.userJob

          })  
    },[])
    useEffect(()=>{
        let tempCities = new Array()
     cities.map((v,k)=>{
        if(v.province == aProvince){
            tempCities.push(v)
        }
     })
     setACities(tempCities)
    },[aProvince])

useEffect(()=>{
    let tempArray = new Array()
    categoryJSON.map((v,k)=>{
        if(!tempArray.includes(v.category)){
            tempArray.push(v.category)
        }
    })
    setCategory(tempArray)
},[])

  useEffect(()=>{
   //)
   const getJobList = async ()=>{
    try{
      var jsonJobRes = new Array()
    categoryJSON.map((v,k)=>{
      if(v.category==subCat){
        jsonJobRes.push(v.job)
      }
    })
    setJob(jsonJobRes)
    }catch(err){
      console.log(err)
    }
   }
   getJobList()
  },[subCat])
    return(
      <div className="ml-4 mr-4 h-lvh">
<form class="max-w-md mx-auto" onSubmit={handleFormSubmit}>
   <div className="relative z-0  w-full mb-5 group">
   <label for="imgprev" class="font-medium text-sm relative text-sm text-gray-500 scale-100 ">Profile Picture</label>
   <img src={(udata.photoURL != null) ? udata.photoURL:selectedFile.src} className="mt-6 mx-auto w-24 h-24 rounded-full border border-pink-500 mb-4" id='imgprev'></img> 

   <input id="file_input" type="file" className='bg-white border text-gray-900 border-pink-300 rounded-lg px-3 py-4 text-slate-500 file:bg-pink-500 
        file:block-mb-2 file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-pink-500 file:text-white
        hover:file:bg-pink-700'  accept='image/png,image/jpeg' onChange={handleUploadChange}/>
        <hr class="mt-4 h-px my-full bg-gray-200 border-0 dark:bg-gray-900 mb-6"/>

        <div class="relative z-0 w-full mb-5 group">
      <input type="email" name="email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" defaultValue={userChange.email} onClick={(e)=>e.target.value=""} onChange={handleFormChange} required/>
      <label for="email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-5 group">
        <input type="text" name="firstName" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" defaultValue={userChange.firstName} onClick={(e)=>e.target.value=""} onChange={handleFormChange} required />
        <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
        <input type="text" name="lastName" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" defaultValue={userChange.lastName} onChange={handleFormChange} onClick={(e)=> e.target.value=""}required />
        <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
    </div>
  </div>

        <hr class="mt-4 h-px my-full bg-gray-200 border-0 dark:bg-gray-900 mb-2"/>
        
        <label  class="font-medium text-sm relative text-sm text-gray-500 scale-100 ">Billing Address:</label>
        <div class=" mt-3 relative z-0 w-full mb-5 group" >
      <input type="text" name="address" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" defaultValue={userChange.address} onClick={(e)=>e.target.value=""} onChange={handleFormChange} required/>
      <label for="address0" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">House no./ Street Name / Barangay</label>
  </div>
        <div className="grid grid-cols-2 gap-1 mt-2 text-center mt-1 mb-2">
        
       <div className="text-start">
       <label for='userProvince' className="font-medium relative text-sm text-gray-500 scale-100 mr-4">Province:</label>
       <select id='userPos' name='userProvince' className="rounded py-3 px-9 w-48 bg-gray-50 border border-pink-500 focus:ring-pink-500 focus:border-pink-500 text-xs" defaultValue={userChange.address} onChange={handleFormChange}>
       <option defaultChecked>{userChange.userProvince==''? 'Select City': getNormalName( userChange.userProvince)}</option>        {
            provinces.map((v,k)=>{
                return(
                    <option value={v.key}>{v.name}</option>
                )
            })
        }
       </select>
       
        </div> 
        <div className="text-start">
        <label for='userCity' className="font-medium relative text-sm text-gray-500 scale-100 mr-4" >City</label>
       <select name='userPos' id='userPos' className="rounded py-3 px-9 w-48 bg-gray-50 border border-pink-500 focus:ring-pink-500 focus:border-pink-500 text-xs text-center " onChange={handleFormChange}>
       <option defaultChecked>{userChange.userCity==''? 'Select City': userChange.userCity}</option>
       {
        aCities.map((v,k)=>{
            return(
                <option value={v.name}>{v.name}</option>
            )
        })
       }
       </select>
        </div>
        </div>
   </div>

  
  <hr class="h-px my-full bg-gray-200 border-0 dark:bg-gray-900 mb-4"/>

  <div className="grid grid-cols-2 gap-1 mt-2 text-center mt-1 mb-2">
        
        <div className="text-start">
        <label for='userPos' className="font-medium relative text-sm text-gray-500 scale-100 mr-4">Category:</label>
        <select id='userJob' name='userPos' className="rounded py-3 px-9 w-48 bg-gray-50 border border-pink-500 focus:ring-pink-500 focus:border-pink-500 text-xs" defaultValue={userChange.userPos} onChange={handleFormChange}>
        <option defaultChecked>{userChange.userPos==''? 'Select Category': userChange.userPos}</option>         {
           category.map((v,k)=>{
                 return(
                     <option value={v}>{v}</option>
                 )
             })
         }
        </select>
        
         </div> 
         <div className="text-start">
         <label for='userCity' className="font-medium relative text-sm text-gray-500 scale-100 mr-4" >Sub-Category</label>
        <select name='userJob' id='userJob' className="rounded py-3 px-9 w-48 bg-gray-50 border border-pink-500 focus:ring-pink-500 focus:border-pink-500 text-xs text-center " defaultValue={userChange.userJob} onChange={handleFormChange}>
        <option defaultChecked>{userChange.userJob==''? 'Select Job': userChange.userJob}</option>        {
         job.map((v,k)=>{
             return(
                 <option value={v}>{v}</option>
             )
         })
        }
        </select>
         </div>
         </div>
  
  {fetchButton(loading)}
</form>

      </div>
    )
}


function fetchButton(state){
    if(state){
       return( <button type="submit" class="mx-auto text-center text-white bg-pink-500 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800" > 
        {spinnerButton()}
        Saving Changes</button>)
    }
    else{
      return(  <button type="submit" class="mx-auto text-center text-white bg-pink-500 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800" > 
        Save Changes</button>)
    }
}

const spinnerButton = ()=>{
    return(
        <svg aria-hidden="true" class="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 inline fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
    )
}
'use client'
import navBar from "@/app/navBar";
import { adminData } from "@/firebase/data/storage";
import { eventData } from "@/firebase/data/event";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { select } from "@material-tailwind/react";
let edata = new eventData()
let adata = new adminData()
function manageAssets(){
const [data, setData] = useState([])
const [imageData, setImageData] = useState([])
    useEffect(()=>{
    edata.getAllData().then(()=>{
        setData(edata.eventDataObj)
    })
    },[])
    useEffect(()=>{
        adata.getFiles().then(async()=>{
            await new Promise ((resolve)=> setTimeout(resolve,2000));
          //  console.log(adata.imageDataObj)
            setImageData(adata.imageDataObj)
        })
    },[])
    return(
        <>
        {navBar()}
        <Toaster
        containerStyle={{zIndex:99999}}/>
        {assetWindow(data,imageData)}
        </>
    )
}

export default manageAssets;
function carousel(imageData){
    return(
      <>
      <div className="carousel w-full">
    <div id="slide1" className="carousel-item relative w-full">
      <img src={imageData[0]} className="w-full hover:opacity-60" onClick={()=>document.getElementById('image0modal').showModal()} />
      <dialog id="image0modal" className="modal z-500">
      <div className="modal-box">
    <form method="dialog">
      <button className="btn btn-sm btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg text-center"></h3>
   {
    editImageAssets(imageData,'image0')

   }
  </div>
</dialog>
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href="#slide3" className="btn btn-circle">❮</a> 
        <a href="#slide2" className="btn btn-circle">❯</a>
      </div>
    </div> 
    <div id="slide2" className="carousel-item relative w-full">
      <img src={imageData[1]} className="w-full hover:opacity-60" onClick={()=>document.getElementById('image1modal').showModal()} />
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <dialog id="image1modal" className="modal">
      <div className="modal-box">
    <form method="dialog">
      <button className="btn btn-sm btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg text-center">Update Image</h3>
   {
    editImageAssets('image1')

   }
  </div>
</dialog>
        <a href="#slide1" className="btn btn-circle">❮</a> 
        <a href="#slide3" className="btn btn-circle">❯</a>
      </div>
    </div> 
    <div id="slide3" className="carousel-item relative w-full">
      <img src={imageData[2]} className="w-full hover:opacity-60" onClick={()=>document.getElementById('image2modal').showModal()} />
      <dialog id="image2modal" className="modal">
      <div className="modal-box">
    <form method="dialog">
      <button className="btn btn-sm btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg text-center">Update Image </h3>
   {
    editImageAssets('image2')

   }
  </div>
</dialog>
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a href="#slide2" className="btn btn-circle">❮</a> 
        <a href="#slide1" className="btn btn-circle">❯</a>
      </div>
    </div> 
   
  </div>
      </>
    )
  }
function assetWindow(data,imageData){
    return(
        <>
        <div className="grid grid-rows-2 flex inline gap-2 h-lvh ">
            <div className="bg-gray-200 rounded-lg ">
            <h2 className="text-center mt-5 mb-4"> Edit Assets</h2>
            {carousel(imageData)}
            </div>
            <div className="bg-gray-100 rounded-lg" >
            <h2 className="text-center mt-5 mb-4"> Edit Featured Events</h2>
            {featureEvents(data)}
            </div>
        </div>
        </>
    )
}

function editImageAssets(imageData,targetName){
    const [selectedFile, setSelectedFile] = useState({src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp9hZ_fn1p0GQsP8Ehynpd7sNAHWz0CZXiMNLGo0b0RA&s',blob:'',name:'',type:''})
    const [loading,setLoading] = useState(false)
    const handleFormSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true)
        const uploadImage= adata.uploadAssets(selectedFile).then(async()=>{
            setLoading(false)
            await new Promise ((resolve)=> setTimeout(resolve,1000));
            window.location.reload()
        })
        toast.promise(uploadImage,{
            loading:'Uploading image',
            success:'Carousel successfully updated!',
            error:'Uploading has failed. Please try again.'
        })
        }
        const handleUploadChange = (e)=>{
            setSelectedFile({
                ...selectedFile,
                src: URL.createObjectURL(e.target.files[0]),
                blob: e.target.files[0],
                type: e.target.files[0].name.split(".").pop(),
                name: targetName
              })
        }
        function fetchButton(state){
            if(state){
               return( <button type="submit" class="mx-auto text-center text-white bg-pink-500 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800" > 
                {spinnerButton()}
                Uploading</button>)
            }
            else{
              return(  <button type="submit" class="mx-auto text-center text-white bg-pink-500 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800" > 
               Upload Image</button>)
            }
        }
    return(
    <form class="text-center max-w-md mx-auto" onSubmit={handleFormSubmit}>
    <img className="h-auto max-w-full rounded-lg" src={imageData[0]}/>
    <input id="file_input" type="file" className='mt-5 mb-5 bg-white border text-gray-900 border-pink-300 rounded-lg px-3 py-4 text-slate-500 file:bg-pink-500 
        file:block-mb-2 file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-pink-500 file:text-white
        hover:file:bg-pink-700'  accept='image/png,image/jpeg' onChange={handleUploadChange}/>
       {fetchButton(loading)}
    </form>
   )
}

const spinnerButton = ()=>{
    return(
        <svg aria-hidden="true" class="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 inline fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
    )
}
function featureEvents(data){
    //list all events here 
    //check box 
    //displays
    return(
        <table className="mt-4 w-full text-sm text-left text-center text-gray-500 dark:text-gray-400">
        {tableHeaders()}
        {dataTableBody(data)}
        </table>
    )
}

function tableHeaders(){
    return(
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
   
      <th scope="col" className="px-6 py-3">
             Event UID
          </th>
          <th scope="col" className="px-6 py-3">
            Event Name
          </th>
          <th>
            Event Organizer
          </th>
          <th scope="col" className="px-6 py-3">
             Event Date
          </th>
          <th scope="col" className="px-6 py-3">
            Event Location
          </th>
          <th scope="col" className="px-6 py-3">
             Actions
             </th>
      </tr>
  </thead>
    )
  }

function dataTableBody(data){
    return(
       data.map((d)=>{
        return(
           <>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 
            even:dark:bg-gray-800 border-b dark:border-gray-700">
             
             <th className='px-5'> {d.eventuid}</th>
             <th className='px-5'> {d.eventName}</th>
             <th className='px-5'> {d.eventCreatorName}</th>
             <th className='px-5'> {d.eventDate}</th>
             <th className='px-5'> {d.eventLocation}</th>
             <th className='px-5'> 
             
           {featureButton(d.isFeatured,d.eventuid)}
             </th>
             </tr>
           </>
        )
       })
    )
}

function featureButton(featured,uid){
    if(featured){
        return(
            <button type="button" class="text-white bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-grayw600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" onClick={()=>updateFeature(uid,false)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 inline mr-2">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clip-rule="evenodd" />
</svg>

           Remove Feature</button>
        )
    }
    else{
        return(
            <button type="button" class="text-white bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800" onClick={()=>updateFeature(uid,true)} >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 inline mr-2">
 <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
</svg>
           Feature</button> 
        )
    }
}

function updateFeature(uid,value){
  const updateRole=  edata.updateAttribute(uid,'isFeatured',value)
  toast.promise(updateRole,{
    loading:'Updating featured events',
    success:'Successfully updated!',
    error:'Something has occurred. Please try again.'
  }).then(()=>{
    setTimeout(()=>{window.location.reload()},2000)
  })
}


'use client'
import navBar from "@/app/navBar";
import {admin_getUser, admin_updateUser} from '@/firebase/admin/manageAdmin'
import { userData } from "@/firebase/data/userDB";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
let uidata = new userData()

function manageUsers(){
const [data,setData] = useState([])

let results = new Array;
   useEffect(()=>{
    uidata.getAllData().then(()=>{
    //  results = uidata.userDataObj;
      setData(uidata.userDataObj)
    })
   // admin_getUser('TUW58vakjmSFutrNLEEgtbV3BuM2')
  // admin_updateUser('jo8Tdbv8pnMnVUc2mAb32VqJ7AZ2', 'Alecs Sanguenza')
   },[])
return(
    <>
    {navBar()}

    <div role="tablist" className="tabs tabs-lifted">
  <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="All" defaultChecked />
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">{allTable(data,'all')}</div>

  <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Active" />
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">{allTable(data,true)}</div>

  <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Inactive" />
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">{allTable(data,false)}</div>
</div>
 <Toaster
  
    />
    </>
)
}
export default manageUsers;

function allTable(data,cond){
  return(
    <table className="mt-4 w-full text-sm text-left text-center text-gray-500 dark:text-gray-400">

    {tableHeaders()}
    {
       data.map((d)=>{
        if(d.isActive === cond || cond =='all'){
          return(
            
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 
            even:dark:bg-gray-800 border-b dark:border-gray-700">
             
             <th className='px-5'></th>
  
                              <th scope="row" class="px-6 py-4">
                                 {d.uid}
                              </th>
                              <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {d.displayName}
                              </td>
                              <td class="px-6 py-4">
                                  {returnIsActiveRole(d.isActive)}
                              </td>
                              <td class="px-6 py-4">
                                  {returnRole(d.isOrganizer)}
                              </td>
                               <td class="px-6 py-4 space-x-2" >
                                
                             {roleOrgButton(d.uid,d.isOrganizer,d.isActive)}  |  
                              {roleConcessButton(d.uid,d.isConcess,d.isActive)}
                             {accountActionButton(d.uid,d.isActive)}
                            
                              </td>
            </tr>
            
          )
        }
      })
    }
    </table>
  )
}

function returnRole(role){
  if(role){
    return(
      <span class="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-700 dark:text-pink-400 border border-pink-400">Organizer</span>

    )
  }
  else{
    return(
      <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">Concessionaire</span>

    )
  }
}

function returnIsActiveRole(activeRole){
  if(activeRole){
    return(
      <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">Active</span>


    )
  }
  else{
    return(
      <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">Inactive</span>


    )
  }
}
function roleOrgButton(uid,role, isActive){

  if(role || !isActive){
    return(
      <button type="button" class="text-white bg-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800 opacity-75 cursor-not-allowed" disabled >Event Organizer</button>
    )
  }
  else{
    return(
      <button type="button" class="text-white bg-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800" onClick={()=>updateRole(uid,'isConcess','isOrganizer',true)}>Event Organizer</button>
    )
  }
}
function roleConcessButton(uid,role, isActive){

  if(role || !isActive){
    return(
      <button type="button" class="text-white bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 opacity-75 cursor-not-allowed" disabled >Event Organizer</button>
    )
  }
  else{
    return(
      <button type="button" class="text-white bg-blue-700 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>updateRole(uid,'isOrganizer','isConcess',true)}>Event Organizer</button>
    )
  }
}

function accountActionButton(uid,role){
  if(role){
    return(
    <>
      <button type="button" class="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" onClick={()=>updateActiveRole(uid,false)}> Deactivate</button>
      <dialog id="my_modal_1" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Deactivating Account - {uid}</h3>
    <p class="py-4"> Are you sure you would like to deactivate this account?
</p>
    <div class="modal-action flex flex-col items-center">
      <form method="dialog">
                <button type="btn" class="text-white bg-gray-400 hover:bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2">
  
  Cancel        </button>
                <button type="btn" class="text-white bg-red-700 hover:bg-red-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2" onClick={()=>console.log(uid)}>
  Continue 
    </button>
                </form>
    </div>
  </div>
</dialog>
    </>
    )
  }
  else{
    return(
    <>
    <button type="button" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"  onClick={()=>updateActiveRole(uid,true)}> Reactivate</button>
    <dialog id="reactivate_modal" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Reactivating Account - {uid}</h3>
      <p class="py-4"> Are you sure you would like to reactivate this account?
  </p>
      <div class="modal-action flex flex-col items-center">
        <form method="dialog">
                  <button type="btn" class="text-white bg-gray-400 hover:bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2">
    
    Cancel        </button>
                  <button type="btn" class="text-white bg-green-700 hover:bg-green-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2" onClick={()=>updateActiveRole(uid,true)}>
    Reactivate
      </button>
                  </form>
      </div>
    </div>
  </dialog>
    </>)
  }

}

function tableHeaders(){
    return(
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
      <th scope="col" className="px-6 py-3">
             
          </th>
      <th scope="col" className="px-6 py-3">
             Account UID
          </th>
          <th scope="col" className="px-6 py-3">
            Account Name
          </th>
          <th>
            Account Status
          </th>
          <th scope="col" className="px-6 py-3">
             Type of User
          </th>
          <th scope="col" className="px-6 py-3">
            Actions
          </th>
          
      </tr>
  </thead>
    )
  }

function updateRole(uid,prevrole,newrole,value){
  const update = uidata.updateAttribute(uid,newrole,value).then(async()=>{
   await  uidata.updateAttribute(uid,prevrole,!value).catch(()=>{
      toast.error('Something has occurred. Please try again.')
   })

  })
  toast.promise(update,{
    loading:'Updating user role',
    success:'Successfully updated role',
    error:'Something has occurred. Please try again.'
  }).then(()=>{
    setTimeout(()=>{window.location.reload()},2000)
  })

}

function updateActiveRole(uid,value){
  const update = uidata.updateAttribute(uid,'isAccountActive',value);
  toast.promise(update,{
    loading:'Updating account role',
    success:'Successfully updated account',
    error:'Something has occurred. Please try again.'
  }).then(()=>{
    setTimeout(()=>{window.location.reload()},2000)
  })
}



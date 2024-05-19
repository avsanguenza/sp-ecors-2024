'use client'
import navBar from "@/app/navBar";
import {admin_getUser, admin_updateUser} from '@/firebase/admin/manageAdmin'
import { userInfoData } from "@/firebase/data/userDB";
import { useEffect, useState } from "react";
function manageUsers(){
const [data,setData] = useState([])

//let uidata = new userData()
let results = new Array;
   useEffect(()=>{
  //  uidata.getAllData().then(()=>{
   //   var output = uidata.userDataObj
    //  output.forEach((v,k)=>{
     //   var temp = JSON.parse(v)
      //  results.push(temp)
     // })
    // // setData(results)
    //})
    
   // admin_getUser('TUW58vakjmSFutrNLEEgtbV3BuM2')
  // admin_updateUser('jo8Tdbv8pnMnVUc2mAb32VqJ7AZ2', 'Alecs Sanguenza')
   },[])
return(
    <>
    {navBar()}
    <table className="mt-4 w-full text-sm text-left text-center text-gray-500 dark:text-gray-400">
    {tableHeaders()}
    {
       data.map((d)=>{
        return(
          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 
          even:dark:bg-gray-800 border-b dark:border-gray-700">
           
           <th className='px-5'></th>

                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                               {d.userid}
                            </th>
                            <td class="px-6 py-4">
                                {d.displayName}
                            </td>
                            <td class="px-6 py-4">
                                {d.accountType}
                            </td>
                             <td class="px-6 py-4 space-x-2" >
                              
                            <button type="button" class="text-white bg-pink-500 hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">Event Organizer</button>  |  
                            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Event Concessionaire</button>
                            <button type="button" class="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"> Deactivate</button>
                          
                            </td>
          </tr>
        )
      })
    }
    </table>
    </>
)
}
export default manageUsers;

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

function listUsers(data){
 
}
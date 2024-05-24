import { eventData } from "@/firebase/data/event"
import { userData } from "@/firebase/data/userDB"
import userInfoContainer from "@/assets/userInfoContainer"
import eventInfoContainer from "@/assets/eventInfoContainer"
import toast from "react-hot-toast"
export default async function Results(type,data,query){
    
    let results = await getEventResults(type,data,query)
  
if(type=='Events'){  
   return(
      events(results)
    )
}
else{
  return(
    people(results)
  )
}
}

function events(results){
  return(
<>
{results.map((d)=>{
      if(results.length>0){
          return(
          <tr onClick={()=>document.getElementById(d.eventid).showModal()} className="hover:bg-gray-50">
          <td>
            <div className="flex items-center gap-3 ">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img src={d.eventImageURL} alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
              <div>
                <div className="font-bold">{d.eventName}</div>
                <div className="text-sm opacity-50">{d.eventLocation}</div>
              </div>
            </div>
          </td>
          <td>
            {d.eventCreatorName}
            <br/>
          </td>
          <th>
            {returnWageType(d.eventWageType)}
          </th>
          <th>
            {d.eventWageTypeVal}
          </th>
          <th>
          </th>
          {eventInfoContainer(d)}

        </tr>
        
      )
      
      }
  })}
</>
  )
}

function people(results){
  return(
<>
{results.map((d)=>{
      if(results.length>0){
          return(
          <tr onClick={()=>document.getElementById(d.uid).showModal()} className="hover:bg-gray-50">
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img src={d.userImage}/>
                </div>
              </div>
              <div>
                <div className="font-bold">{d.displayName}</div>
                <div className="text-sm opacity-50">{d.eventLocation}</div>
              </div>
            </div>
          </td>
          <td>
           {returnRole(d.isOrganizer)}
            <br/>
          </td>
          <th>
              here
          </th>
          <th>
            here
          </th>
          <th>
          
          </th>
          {userInfoContainer(d)}
        </tr>
      )
      }
  })}
</>
  )
}
async function getEventResults(type,data,query){
 let e = new eventData()
 let u = new userData()
 let tempResults = new Array()
 var conditions = []
try{
  if(data.length>0){
    switch(type){
        case 'Events':  e.getMultipleFieldData('events',data)
        await new Promise ((resolve)=> setTimeout(resolve,2000));
        var obj= e.dataobjMap
        obj.forEach((v,k)=>{
           var temp = JSON.parse(v)
           if(temp.eventName.includes(query) || temp.eventCreatorName.includes(query)|| temp.eventLocation.includes(query)){
            tempResults.push(temp)

           }
    
       })
       break;
       case 'People' : u.getData('users','displayName','>=',query)
       await new Promise ((resolve)=> setTimeout(resolve,2000));
      let Uobj = u.userDataObj
       Uobj.forEach((v)=>{
     var temp = v.displayName
        if(v.displayName.includes(query)){
            tempResults.push(v)
    
        }
    })
       break;
       default: break;
    }
 }
} catch(err){
toast.error('An error has occured please try again.')
}
return tempResults
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

function returnWageType(role){
  if(role=='hourly'){
    return(<span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Hourly</span>)
  } else{
    return(
      <span class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">Fixed</span>

    )
  }
}
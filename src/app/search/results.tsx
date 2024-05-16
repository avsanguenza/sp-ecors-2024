import { eventData } from "@/firebase/data/event"
export default async function Results(type,data){
    
    let results = await getEventResults(type,data)
   
    return(
    
     <>
        
        {results.map((d)=>{
            if(results.length>0){
                return(
                <tr>
                <td>
                  <div className="flex items-center gap-3">
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
                  {d.eventWageType}
                </th>
                <th>
                  {d.eventWageTypeVal}
                </th>
                <th>
                <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            )
            }
        })}
     </>
    )
}

async function getEventResults(type,data){
 let e = new eventData()
 let tempResults = new Array()
 if(data.length>0){
    switch(type){
        case 'Events':    e.getData('events','eventName','>=', data)
        await new Promise ((resolve)=> setTimeout(resolve,2000));
        var obj= e.dataobjMap  
        obj.forEach((v,k)=>{
           var temp = JSON.parse(v)
           if(temp.eventName.includes(data)){
               tempResults.push(temp)
       
           }
       })
       break;
       case 'People' : break;
       default: break;
    }
 }
return tempResults
}

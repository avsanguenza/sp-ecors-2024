'use client'
import { useEffect,useState} from "react";
import NavBar from "../navBar";
import { userData } from "@/firebase/data/userDB";
import { eventData } from "@/firebase/data/event";
function peoplePage(){
const [orgData, orgSetData] = useState([])
const [concessData, setConcessData] = useState([])
    useEffect(()=>{
        const getEventOrganizers = async()=>{
            let user = new userData()
            await user.getData('users','isOrganizer','==',true).then(()=>{
            orgSetData(user.userDataObj)
            })
        }
        getEventOrganizers()
    },[])
    useEffect(()=>{
        const getEventOrganizers = async()=>{
            let user = new userData()
            await user.getData('users','isConcess','==',true).then(()=>{
            setConcessData(user.userDataObj)
            })
        }
        getEventOrganizers()
    },[])
    
            return(
            <>
            <NavBar>
            <h2 className="text-4xl font-bold py-4  ml-6 mb-3">ECORS Users </h2>
            <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

           <div role="tablist" className="py-4 tabs tabs-bordered tabs-lg space-x-8 [--tab-border-color:pink]" >
  <input type="radio" name="my_tabs_1" role="tab" className="tab ml-8 border-pink-500" aria-label="Organizers" defaultChecked />
  <div role="tabpanel" className="tab-content p-10">
  <div className="grid grid-cols-5 gap-3">
                {rollData(orgData)}
          </div>
  </div>

  <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Concessioanires"  />
  <div role="tabpanel" className="tab-content p-10">
    {rollData(concessData)}
  </div>
</div>
            </NavBar>
         
      </>
            
            )
            }

        export default peoplePage;

function rollData(data){
    return(
        <>
          {data.map((d)=>{
        return(
            <div class="mt-10 ml-5  max-w-sm p-6 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" onClick={()=>document.getElementById(d.uid).showModal()}>
    <img className="h-48 w-48 rounded-full mx-auto" src={d.userImage}/>

  <a href="#">
    
  <h5 class="mt-4 text-2xl text-center font-semibold tracking-tight text-gray-900 dark:text-white">{d.displayName}</h5>
  </a>
  <h2 className="mt-2">{(d.isOrganizer==true)? 'Event Organizer': 'Event Concessionaire'}</h2>

  {infoModal(d.uid,d.displayName,d.userImage)}

  </div>
        )
    })}
        </>
    )
}

export function infoModal(uid, name, image){
return(
    <dialog id={uid} class="modal">
    <div class="modal-box">
    <form method='dialog'>
    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h5 class="font-bold text-2xl mb-4">User Details</h5>
    <div className="flex items-start">
    <img src={image} className="h-12 w-12 rounded-full"></img>
    <h3 class="font-regular text-lg ml-4 mt-3">{name}</h3>
    <h2 className="text-lg font-medium ml-8 mt-3">Member Since:</h2>
    </div>
    <hr className="h-px my-3 bg-gray-300 border-0 dark:bg-gray-700"></hr>
    <p class="py-4 font-bold text-2xl mb-4">Events</p>
    </div>

    <form method="dialog" class="modal-backdrop">
    <button>close</button>
    
    </form>

</dialog>
)
}

function getUserCreatedEvents(uid){
    const [data, setData] = useState([])
    useEffect(()=>{
        const getCreatedEvents = async()=>{
            let user = new userData()
            await user.getData('events','isConcess','==',true).then(()=>{
            setData(user.userDataObj)
            })
        }
        getCreatedEvents()
    },[])
    return(
        data
    )
}
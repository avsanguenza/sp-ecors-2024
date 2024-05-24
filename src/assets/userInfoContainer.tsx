import userData from "@/app/dashboard/user";
let udata = new userData();
udata.parseData()
function userInfoContainer(d){
    return(
        <dialog id={d.uid} class="modal">
        <div class="modal-box">
        <form method='dialog'>
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h5 class="font-bold text-2xl mb-4">User Details</h5>
        <div className="flex items-start">
        <img src={d.userImage} className="h-12 w-12 rounded-full"></img>
        <h3 class="font-regular text-lg ml-4 mt-3">{d.displayName}</h3>
        <h2 className="text-lg font-medium ml-8 mt-3">Member Since:</h2>
        </div>
        <hr className="h-px my-3 bg-gray-300 border-0 dark:bg-gray-700"></hr>
        <p class="py-4 font-bold text-2xl mb-4">Events</p>
        <div className="text-center">
          <hr className="h-px my-3 bg-gray-300 border-0 dark:bg-gray-700"></hr>

          <button className="bg-pink-500 hover:bg:pink-700 text-white font-bold text-medium px-3 py-2 rounded-full" hidden={udata.name==null}> 
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mr-2 inline">
  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
</svg>

          Contact user</button>
        </div>
        </div>
    
        <form method="dialog" class="modal-backdrop">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        
        </form>
    
    </dialog>
    )
}
export default userInfoContainer;
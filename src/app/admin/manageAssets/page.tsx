'use client'
import navBar from "@/app/navBar";
import { imageData } from "@/firebase/data/storage";
import { eventData } from "@/firebase/data/event";
function manageAssets(){
    return(
        <>
        {navBar()}
        {assetWindow()}
        </>
    )
}

export default manageAssets;

function assetWindow(){
    return(
        <>
        <div className="grid grid-rows-2 flex inline gap-2 h-lvh ">
            <div className="bg-gray-200 rounded-lg ">
            <h2 className="text-center mt-5 mb-4"> Edit Assets</h2>
            {editImageAssets()}
            </div>
            <div className="bg-gray-100 rounded-lg" >
            <h2 className="text-center mt-5 mb-4"> Edit Featured Events</h2>
            </div>
        </div>
        </>
    )
}

function editImageAssets(){
    return(
        <>
        <div className="border border-gray-300 rounded-lg text-center">
            <ul>
                <li><label class="mt-4 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="file_input">Work Experience</label>
      <input class='bg-white border text-gray-900 border-pink-300 rounded-lg px-3 py-4 text-slate-500 file:bg-pink-500 
        file:block-mb-2 file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-pink-500 file:text-white
        hover:file:bg-pink-700' id="file_input" type="file" accept=".doc,.docx,.pdf" />
  <p class="text-sm text-gray-500 dark:text-gray-300" id="file_input" >DOCX or PDF (2MB)</p>
  </li>
                <li>
      <input class='bg-white border text-gray-900 border-pink-300 rounded-lg px-3 py-4 text-slate-500 file:bg-pink-500 
        file:block-mb-2 file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-pink-500 file:text-white
        hover:file:bg-pink-700' id="file_input" type="file" accept=".doc,.docx,.pdf"/>
  <p class="text-sm text-gray-500 dark:text-gray-300" id="file_input" >DOCX or PDF (2MB)</p>
  </li>
                <li>
      <input class='bg-white border text-gray-900 border-pink-300 rounded-lg px-3 py-4 text-slate-500 file:bg-pink-500 
        file:block-mb-2 file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-pink-500 file:text-white
        hover:file:bg-pink-700' id="file_input" type="file" accept=".doc,.docx,.pdf"/>
  <p class="text-sm text-gray-500 dark:text-gray-300" id="file_input" >DOCX or PDF (2MB)</p>
  </li>
  
            </ul>
        </div>
        </>
    )
}

function featureEvents(){
    //list all events here 
    //check box 
    //displays
}

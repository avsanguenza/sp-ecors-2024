'use client'
import navBar from "@/app/navBar";
function manageUsers(){
return(
    <>
    {navBar()}
    <table className="mt-4 w-full text-sm text-left text-center text-gray-500 dark:text-gray-400">
    {tableHeaders()}
    </table>
    </>
)
}
export default manageUsers;

function tableHeaders(){
    return(
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
      <th scope="col" class="px-6 py-3">
             
          </th>
      <th scope="col" class="px-6 py-3">
             Account UID
          </th>
          <th scope="col" class="px-6 py-3">
            Account Name
          </th>
          <th scope="col" class="px-6 py-3">
             Type of User
          </th>
          <th scope="col" class="px-6 py-3">
            Actions
          </th>

          
      </tr>
  </thead>
    )
  }
function listUsers(){

}
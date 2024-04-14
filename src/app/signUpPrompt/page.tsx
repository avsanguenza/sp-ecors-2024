//ask join as a what


//join as an event organizer/concessionaire 

//i'm an event organize hiring people for my event 
//im a concessionaire looking for events to partner with 
//change href links to function calls, 

function Page(){
   return(
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
             <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up as a:</h2>
                <div className = "grid grid-cols-2 gap-8  pt-64 p-16">
                
        
                <a href="/signup" className="rounded-full py-3 px-6 inline font-bold text-white text-center bg-pink-600 pt-8 pl-8 pr-4 pb-8 hover:bg-pink-700">Event Organizer</a>
                <div className="rounded-full py-3 px-6 inline font-bold text-white text-center bg-pink-600 pt-8 pl-8 pr-4 pb-8 hover:bg-pink-700"> Event Concessionaire</div>

                </div>
        </div>
   )
    }
    export default Page;


function concessionaireSign(){
return("hi");
}

function organizerSign(){
    return("hi");
}
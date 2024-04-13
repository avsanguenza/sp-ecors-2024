'use client'
export default function content(){
    return (
        <>
        <div class="h-screen w-1/12 bg-gray-400 mt-16">
        <div class="text-l space-y-16">
      <a href="#responsive-header" class="block mt-4 lg:block lg:mt-0 text-teal-200 hover:text-white mr-4">
        Home
      </a>
      <a href="#responsive-header" class="block mt-4 lg:block lg:mt-0 text-teal-200 hover:text-white mr-4">
        Examples
      </a>
      <a href="#responsive-header" class="block mt-4 lg:block lg:mt-0 text-teal-200 hover:text-white">
        Blog
      </a>
      <a href="#responsive-header" class="block mt-4 lg:block lg:mt-0 text-teal-200 hover:text-white">
        Logout
      </a>
    </div>
        </div>
      
      <div class="h-screen w-2/12 bg-white absolute inset-x-48 inset-y-24 right-0 mt-4 mr-64">
      <ul class="flex border-b">
  <li class="-mb-px mr-1">
    <a class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold" href="#">Active</a>
  </li>
  <li class="mr-1">
    <a class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#">Tab</a>
  </li>
  <li class="mr-1">
    <a class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#">Tab</a>
  </li>
  <li class="mr-1">
    <a class="bg-white inline-block py-2 px-4 text-gray-400 font-semibold" href="#">Tab</a>
  </li>
</ul>
      </div>
        </>
    );
}

export function navHead(){
  return(
      <>
        <div class="h-screen w-1/12 bg-gray-400 mt-16">
        <div class="text-l space-y-16">
      <a href="#responsive-header" class="block mt-4 lg:block lg:mt-0 text-teal-200 hover:text-white mr-4">
        Home
      </a>
      <a href="#responsive-header" class="block mt-4 lg:block lg:mt-0 text-teal-200 hover:text-white mr-4">
        Examples
      </a>
      <a href="#responsive-header" class="block mt-4 lg:block lg:mt-0 text-teal-200 hover:text-white">
        Blog
      </a>
      <a href="#responsive-header" class="block mt-4 lg:block lg:mt-0 text-teal-200 hover:text-white">
        Logout
      </a>
    </div>
        </div>
      </>
  );
}
'use client'
import Image from 'next/image';
import navBar from './navBar';
import { Suspense, useEffect, useState } from 'react';
import { eventData } from '@/firebase/data/event';
import { adminData } from '@/firebase/data/storage';
import LoadingFeature from './loadingFeature';
import { CarouselLoadingSkeleton } from './loadingFeature';
//make loading screen -> loading animation ->navbar 
//featured events
let edata = new eventData()
let adata = new adminData()

export default function Page() {
  const [data, setData] = useState([])
  const [imageData, setImageData] = useState([])
  const [loading, setLoading] = useState(false)
  let dataImageMap = new Map()
  let results = new Array()
  useEffect(()=>{
    edata.getData('events','isFeatured','==',true).then(async()=>{
      var res = edata.dataobjMap
      res.forEach((v,k)=>{
        var temp = JSON.parse(v)
        results.push(temp)
      })
      setData(results)
      setLoading(true)
    })
  },[])
  useEffect(()=>{
    adata.getFiles().then(async()=>{
      await new Promise ((resolve)=> setTimeout(resolve,1000));
       setImageData(adata.imageDataObj)
     
    })
},[])
  return (
  <>
  {navBar()}
  
  <Suspense fallback={<CarouselLoadingSkeleton/>}>{carousel(imageData)}</Suspense>
  <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
  <h2 className='text-2xl font-bold text-center'>Featured Events</h2>
 <div className='grid grid-cols-5 gap-3'>
 {
    data.map((d)=>{
      return(
        <Panel isActive={loading ===true}>
           <div class="mt-10 ml-5  max-w-sm p-6 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img className="h-auto max-w-full rounded-lg" src={d.eventImageURL}/>

          <a href="#">
          <h5 class="mt-4 text-2xl text-center font-semibold tracking-tight text-gray-900 dark:text-white">{d.eventName}</h5>
          </a>
          <h2 className="mt-2">{d.eventLocation}</h2>
          <hr className="h-px my-3 bg-gray-300 border-0 dark:bg-gray-700"></hr>

          <ul className="flex items-center w-full me-4">
          <li><p class="mt-2  text-left font-normal  dark:text-gray-400">{d.eventCreatorName}</p></li>
          <li>
          <a href="#" className='mt-3 inline-flex items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-24 w-8 h-4">
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" /> 5
          </svg>
              4.0
          </a>
          </li>
          </ul>
          </div>

        </Panel>
      )
    })
  }
 </div>
  </>
  )

function carousel(dataMap){
  return(
    <>
    <div className="carousel w-full">
  <div id="slide1" className="carousel-item relative w-full">
    <img src={dataMap[0]} className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id='slide2' className="carousel-item relative w-full">
    <img src={dataMap[1]} className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
    <img src={dataMap[2]} className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div> 
</div>
    </>
  )
}
}

function Panel({
  children,
  isActive
}){
  return(
    <div className='text-center'>
             {isActive ?  (children) : <LoadingFeature/>}
    </div>
  )
}

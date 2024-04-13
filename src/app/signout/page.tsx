'use client'

import React from 'react'
import signOutUser from '@/firebase/auth/signout';
import getCurrentUser from '@/firebase/auth/signout';
import {useRouter} from 'next/navigation';

function Page(){
    const router = useRouter();
    const{result,error} = signOutUser();
    if(error){
        console.log("error")
    }
    else{
        return router.push("/")
    }   

    return(
        <>
        
       <h1>Logging off user</h1>
        </>
    );

}

export default Page;
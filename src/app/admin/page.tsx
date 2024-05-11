'use client'
import {Fragment} from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase_app from '@/firebase/config';
import navBar from '../navBar';
const auth = getAuth(firebase_app);

const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
  ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function currUser(){
  const router = useRouter()
  var activeUser = "";
 auth.onAuthStateChanged((auth) =>{
  if (auth){
  }
    else{
      router.push("/error");
      
  }
 }

 );
} 

export default function Page(){

//add stuff here , figure out how to load the database first before the page
    currUser();
    return (
     <>
       {navBar()}
     </>

    );

}
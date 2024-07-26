"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { Button } from '../../components/ui/button'
import {useUser , UserButton} from "@clerk/nextjs"
import Link from 'next/link'
const Header = () => {
   
    const {user , isSignedIn}=useUser();
    useEffect(()=>{
      console.log(isSignedIn)
    })


  return (
    <div className='p-5 flex justify-between items-center border shadow-lg'>
     
        <Image  src={'/logo.svg'} 
        width={160} 
        height={100}
        alt='logo'/>
        

        {
            isSignedIn ? ( <UserButton afterSignOutUrl='/' />  )
            : <Link href={"/sign-in"}>
            <Button>Get Started </Button>
            </Link>
        }
         
       
    </div>
  )
}

export default Header
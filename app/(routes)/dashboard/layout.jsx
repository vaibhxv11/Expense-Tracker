"use client"

import React, { useEffect } from 'react'
import SideNav from "./_components/SideNav"
import DashboardHeader from "./_components/DashboardHeader"
import { useUser } from '@clerk/nextjs'
import {db} from "../../../utils/dbConfig"
import { Budgets } from "../../../utils/schema"
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation'

function DashboardLayout({children}) {

  const {user}=useUser();

  const router=useRouter();

  

  useEffect(()=>{
    checkUserBudgets();
  } , [user])



  const checkUserBudgets = async (userEmail) => {
    try {
      const result = await db.select()
        .from(Budgets)
        .where(eq(Budgets.createdBy, userEmail))
        .execute(); // Ensure execute is called if required by your ORM
     
        // if(result?.length==0)
        //    {
        //      router.replace('/dashboard/budgets')
        
        //    }
      return result;
    } catch (error) {
      console.error('Error fetching budgets:', error);
      return [];
    }
  };


  return (
    <div>
       <div className='fixed md:w-64 hidden md:block  '>
        <SideNav/>
       </div>
       <div className='md:ml-64  '>
       <DashboardHeader/>
        {children}
       </div>
    </div>
  )
}

export default DashboardLayout

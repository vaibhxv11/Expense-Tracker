"use client"
import React , {useEffect , useState} from 'react'
import { SignOutButton, UserButton, useUser } from '@clerk/nextjs'
import CardInfo from "./_components/CardInfo"
import { db } from '../../../utils/dbConfig'
import { Budgets, Expenses } from '../../../utils/schema'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
const Dashboard = () => {

  const {user}=useUser();

  const [budgetList , setBudgetList]=useState();



  useEffect(() => {
    
     user &&  getBudgetList();
    
  }, [user]);

  const getBudgetList = async () => {
    try {
      // Create the SQL query
      const query = db.select({
        ...getTableColumns(Budgets),
        totalSpend:sql `SUM(${Expenses.amount}::numeric)`.mapWith(Number), // Explicitly cast to numeric
        totalItem:sql `COUNT(${Expenses.id}::int)`.mapWith(Number)

      }).from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .groupBy(Budgets.id)
        .orderBy(desc(Budgets.id));

      
      const result = await query.execute();
     
      setBudgetList(result);
     

    } catch (error) {
      console.error('Error fetching budget list:', error);
    }
  };

  return (
    <div className='p-8' >
      <h2 className='font-bold text-3xl '>Hi ,{user?.fullName}👋</h2>

      <p className='text-gray-500'>Here's what happening with your money, Let's Manage your expense</p>

      <CardInfo budgetList={budgetList}/>

      <div className='grid grid-cols-1 md:grid-cols-3 mt-6'>

        <div className='md:col-span-2 '>
       Chart
        </div>

        <div>Other Content

        </div>


      </div>


    </div>
  )
}

export default Dashboard
"use client"
import React , {useState , useEffect} from 'react'
import {db}  from "../../../../../utils/dbConfig"
import { Budgets, Expenses } from '../../../../../utils/schema'
import { eq, getTableColumns, sql } from 'drizzle-orm'
import BudgetItem from '../../budgets/_components/BudgetItem'
import AddExpense from '../_components/AddExpense'
import { useUser } from '@clerk/nextjs';
function ExpensesScreen({params}) {

  const { user } = useUser()

  const [budgetInfo ,setBudgetInfo]=useState();

  useEffect(()=>{
    
     user && getBudgetInfo()
  } , [params])

  const getBudgetInfo=async ()=>{
    const query =  db.select({
      ...getTableColumns(Budgets) ,
      totalSpend:sql `SUM(${Expenses.amount}::numeric)`.mapWith(Number), // Explicitly cast to numeric
        totalItem:sql `COUNT(${Expenses.id}::int)`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
    .where(eq(Budgets.id , params.id))
    .groupBy(Budgets.id)

    const result = await query.execute();
    setBudgetInfo(result[0]);
    
     console.log(result)

    
  }


  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold'>My Expenses</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 mt-6
      '>
       { budgetInfo ?  <BudgetItem
        budget={budgetInfo}
        /> : 
        <div className='h-[150px]  w-full bg-slate-200 rounded-lg animate-pulse'>

        </div>}
        <AddExpense budgetId={params.Id} user={user}
         refreshData={()=>getBudgetInfo()}  />
      </div>
    </div>
  )
}

export default ExpensesScreen
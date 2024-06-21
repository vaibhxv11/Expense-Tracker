"use client"
import React , {useEffect , useState} from 'react'
import {  UserButton, useUser } from '@clerk/nextjs'
import { db } from '../../../../utils/dbConfig'
import { Budgets, Expenses } from '../../../../utils/schema'
import { desc, eq ,  getTableColumns, sql } from 'drizzle-orm'
import ExpensesListTable from '../expenses/_components/ExpensesListTable'
import BarChartDashboard from '../_components/BarChartDashboard'
function page() {

  const {user}=useUser();

  const [budgetList , setBudgetList]=useState([]);
  const [expensesList , setExpensesList]=useState([]);
 

   useEffect(() => {
    
     user &&  getAllExpenses();
    
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
      getAllExpenses();
     

    } catch (error) {
      console.error('Error fetching budget list:', error);
    }
  };
   //to fetch all expenses
  const getAllExpenses=async()=>{
    const result=await db.select({
      id:Expenses.id ,
      name:Expenses.name ,
      amount :Expenses.amount,
      createdAt: Expenses.createdAt
    }).from(Budgets)
    .rightJoin(Expenses , eq(Budgets.id , Expenses.budgetId))
    .where(eq(Budgets.createdBy , user?.primaryEmailAddress.emailAddress))
    .orderBy(desc(Expenses.id))

    setExpensesList(result)

    console.log(result)

  }
  return (
    <div className='p-6'>
          
          

        <ExpensesListTable
         expensesList={expensesList}
         refreshData={()=>getBudgetList()}
        />
    </div>
  )
}

export default page
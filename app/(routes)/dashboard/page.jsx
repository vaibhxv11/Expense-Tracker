"use client"
import React , {useEffect , useState} from 'react'
import {  UserButton, useUser } from '@clerk/nextjs'
import CardInfo from "./_components/CardInfo"
import { db } from '../../../utils/dbConfig'
import { Budgets, Expenses } from '../../../utils/schema'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import BarChartDashboard from "./_components/BarChartDashboard"
import BudgetItem from './budgets/_components/BudgetItem'
import ExpensesListTable from './expenses/_components/ExpensesListTable'
const Dashboard = () => {

  const {user}=useUser();

  const [budgetList , setBudgetList]=useState([]);
  const [expensesList , setExpensesList]=useState([]);
 

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
    <div className='p-8' >
      <h2 className='font-bold text-3xl '>Hi ,{user?.fullName}👋</h2>

      <p className='text-gray-500'>Here's what happening with your money, Let's Manage your expense</p>

      <CardInfo budgetList={budgetList}/>

      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
       
        <div className='md:col-span-2 '>
        <h2 className='font-bold text-lg mb-4'>Activity</h2>
        
          
       <BarChartDashboard
       budgetList={budgetList}/>

<ExpensesListTable
        expensesList={expensesList}
        refreshData={()=>getBudgetList()}
        />

        </div>

       
        <div className='grid gap-4'>
          <h2 className='font-bold text-lg'>Latest Budgets</h2>
          {
            budgetList?.map((budget , index)=>(
              <BudgetItem budget={budget} key={index} />
            ))
          }

        </div>


      </div>


    </div>
  )
}

export default Dashboard
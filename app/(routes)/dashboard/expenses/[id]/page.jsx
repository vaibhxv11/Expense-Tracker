"use client"
import React , {useState , useEffect} from 'react'
import {db}  from "../../../../../utils/dbConfig"
import { Budgets, Expenses } from '../../../../../utils/schema'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import BudgetItem from '../../budgets/_components/BudgetItem'
import AddExpense from '../_components/AddExpense'
import { useUser } from '@clerk/nextjs';
import ExpensesListTable from "../../expenses/_components/ExpensesListTable"
import { Button } from '../../../../../components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../../components/ui/alert-dialog"
import { useRouter } from 'next/navigation'
import {  Trash } from 'lucide-react'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import EditBudget from "../_components/EditBudget"
function ExpensesScreen({params}) {

  const { user } = useUser()

  const [budgetInfo ,setBudgetInfo]=useState();
  const [expensesList , setExpensesList]=useState([])
   const router=useRouter();
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
    console.log("budgetInfo is:" , budgetInfo)
    getExpensesList();
   
    
    
     

    
  }

  //recent expenses list
  const getExpensesList=async ()=>{
    const result=await db.select().from(Expenses)
    .where(eq(Expenses.budgetId , params.id))
    .orderBy(desc(Expenses.id));
    setExpensesList(result)
    console.log(result)
  }
 
  //delete budget
  const deleteBudget=async ()=>{

    const deleteExpenseResult=await db.delete(Expenses)
    .where(eq(Expenses.budgetId , params.id))
    .returning();
    
    if(deleteExpenseResult){
      const result=await db.delete(Budgets)
     .where(eq(Budgets.id , params.id))
     .returning();


    }
    toast("Budget Deleted!")
    router.replace('/dashboard/budgets');
      

  }


  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold flex justify-between items-center' >

      <span className='flex gap-2 items-center'>
        <ArrowLeft onClick={()=>router.back()} className='cursor-pointer' />
        My Expenses
      </span>
      <div className='flex gap-2 items-center'>

        <EditBudget  budgetInfo={budgetInfo} refreshData={()=> getBudgetInfo()} />
         
             <AlertDialog>
  <AlertDialogTrigger asChilld>
  <Button className="flex gap-2" variant="destructive"> 
  <Trash/> Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your current budget 
        along with expenses and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>deleteBudget()} >Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
         </AlertDialog>
          </div> 

 

        
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 mt-6
      '>
       { budgetInfo ?  <BudgetItem
        budget={budgetInfo}
        /> : 
        <div className='h-[150px]  w-full bg-slate-200 rounded-lg animate-pulse'>

        </div>}
        <AddExpense budgetId={params.id} user={user}
         refreshData={()=>getBudgetInfo()}  />
      </div>

         <div className='mt-4'>

      
          <ExpensesListTable
          expensesList={expensesList}
          refreshData={()=>getBudgetInfo()}
          />


         </div>

    </div>
  )
}

export default ExpensesScreen
"use client"
import React, { useEffect , useState } from 'react';
import CreateBudget from "./CreateBudget";
import { db } from '../../../../../utils/dbConfig';
import { useUser } from '@clerk/nextjs';
import { eq, sql, getTableColumns, desc } from 'drizzle-orm'; // Ensure sql is imported
import { Budgets, Expenses } from '../../../../../utils/schema';
import BudgetItem from "./BudgetItem"


function BudgetList() {
  const { user } = useUser(); 
  const [budgetList, setBudgetList] = useState([]);

  useEffect(() => {
    if (user) {
      getBudgetList();
    }
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
       console.log('Budget List:', result);
      console.log('Generated SQL Query:', query.toSQL());
    } catch (error) {
      console.error('Error fetching budget list:', error);
    }
  };

  return (
    <div className='mt-7'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <CreateBudget refreshData={() => getBudgetList()} />
        {budgetList?.length > 0 ? (
          budgetList.map((budget, index) => (
            <BudgetItem key={index} budget={budget} />
          ))
        ) : (
          [1, 2, 3, 4, 5].map((item, index) => (
            <div key={index} className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'></div>
          ))
        )}
      </div>
    </div>
  );
}

export default BudgetList;

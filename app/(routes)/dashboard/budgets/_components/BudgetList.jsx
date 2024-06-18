"use client"
import React, { useEffect } from 'react';
import CreateBudget from "./CreateBudget";
import { db } from '../../../../../utils/dbConfig';
import { useUser } from '@clerk/nextjs';
import { eq, sql, getTableColumns } from 'drizzle-orm'; // Ensure sql is imported
import { Budgets, Expenses } from '../../../../../utils/schema';

function BudgetList() {
  const { user } = useUser(); // Correctly invoke useUser hook

  useEffect(() => {
    if (user) {
      console.log('User found:', user); // Debugging log
      getBudgetList();
    }
  }, [user]);

  const getBudgetList = async () => {
    try {
      const result = await db.select({
        ...getTableColumns(Budgets),
        totalSpend: sql `sum(${Expenses.amount})`.mapWith(Number), 
        totalItem: sql `count(${Expenses.id})`.mapWith(Number) 
      }).from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress)) // Corrected where clause
        .groupBy(Budgets.id)
        .execute(); // Ensure the query is executed if required

      console.log('Budget List:', result);
    } catch (error) {
      console.error('Error fetching budget list:', error); // Error logging
    }
  };

  return (
    <div className='mt-7'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        <CreateBudget />
      </div>
    </div>
  );
}

export default BudgetList;

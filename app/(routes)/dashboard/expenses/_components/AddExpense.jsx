"use client"
import React, { useState } from 'react'
import { Input } from "../../../../../components/ui/input"
import { db } from '../../../../../utils/dbConfig';
import { Budgets, Expenses } from '../../../../../utils/schema';
import { toast } from 'sonner';
import { Button } from '../../../../../components/ui/button'
import moment from 'moment';
import { Loader } from 'lucide-react';


function AddExpense({ budgetId, user, refreshData }) {

  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false)

  const addNewExpense = async () => {
    const result = await db.insert(Expenses).values({
      name: name,
      amount: amount,
      budgetId: budgetId,
      createdAt: moment().format('DD/MM/yyyy')
    }).returning({ insertedId: Budgets.id })


    setAmount('');
    setName('');

    if (result) {
      setLoading(false)
      refreshData()
      toast("New Expense Added")

    }
    setLoading(false);


  }
  return (
    <div className='border ml-3 p-5 rounded-md'>
      <h2 className='font-bold text-lg'>
        Add Expense
      </h2>
      <div className='mt-2 '>
        <h2 className='text-black font-medium my-1 '>Expense Name</h2>
        <Input placeholder="eg. Pizza "
          value={name}
          onChange={(e) => setName(e.target.value)}

        />
      </div>

      <div className='mt-2'>
        <h2 className='text-black font-medium my-3 '>Expense Amount</h2>
        <Input placeholder="eg. 1000 "
          value={amount}
          onChange={(e) => setAmount(e.target.value)}

        />
      </div>

      <Button disabled={!(amount && name) || loading}
        onClick={() => addNewExpense()}
        className="mt-3 w-full"
      >
        {loading ?
          <Loader className='animate-spin' /> : "  Add New Expense"}

      </Button>


    </div>
  )
}

export default AddExpense
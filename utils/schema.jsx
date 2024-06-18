import { integer, pgTable, serial , varchar } from "drizzle-orm/pg-core";


export const Budgets=pgTable('budgets' , {
    id:serial('id').primaryKey() ,
    name:varchar('name').notNull() ,
    amount:varchar('amount').notNull() ,
    icon:varchar('icon'),
    createdBy:varchar('createdBy').notNull()
})

export const Expenses=pgTable('Expenses' , {
    id:serial('id').primaryKey() ,
    name:varchar('name').notNull().default(0),
    budgetId:integer('budgetId').references(()=>Budgets.id) ,
    createdAt:varchar('createdAt').notNull()
})
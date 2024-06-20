import { integer, pgTable, serial , varchar , numeric  } from "drizzle-orm/pg-core";


export const Budgets = pgTable('Budgets', {
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount:varchar('amount').notNull(), // Use numeric for amounts
    icon: varchar('icon'),
    createdBy: varchar('createdBy').notNull()
  });

export const Expenses=pgTable('Expenses' , {
    id:serial('id').primaryKey() ,
    name:varchar('name').notNull(),
    amount:varchar('amount').notNull().default(0),
    budgetId:integer('budgetId').references(()=>Budgets.id) ,
    createdAt:varchar('createdAt').notNull()
})
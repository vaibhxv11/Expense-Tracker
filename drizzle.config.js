/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://expense-tracker_owner:muRBZKx3XOq1@ep-solitary-pond-a5biltol.us-east-2.aws.neon.tech/expense-tracker?sslmode=require' ,
        // process.env.NEXT_PUBLIC_DATABASE_URL,
    }
  };
  
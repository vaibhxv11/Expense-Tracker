/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://expense-tracker_owner:mFPj5hwDcps4@ep-lingering-bird-a1c9ik8x.ap-southeast-1.aws.neon.tech/expense-tracker?sslmode=require' ,
        // process.env.NEXT_PUBLIC_DATABASE_URL,
    }
  };
  
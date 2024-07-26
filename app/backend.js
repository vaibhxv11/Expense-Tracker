const {Suprsend}=require("@suprsend/node-sdk");

const supr_client=new Suprsend(
    process.env.WORKSPACE_KEY ,
    process.env.WORKSPACE_SECRET 
) 

const response=supr_client.track(
    "balasodudhal775@gmail.com",
    "VAIBHAV" ,
    {
        user:"vaibhavshru"
    }
);
response.then((res)=>console.log("response" , res));
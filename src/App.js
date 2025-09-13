import express from "express";


const app = express();
app.get("/",(req,res)=>{
    res.send("Hello API");
})
export default app;
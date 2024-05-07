const express =require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const CustomerModel= require("./models/customer")

const app=express()
app.use(express.json())
app.use(cors())


app.post('/register',(req,res)=>{
    CustomerModel.create(req.body)
    .then(Customer=>res.json(Customer))
    .catch(err=>res.json(err))
})



mongoose.connect("mongodb://127.0.0.1:27017/customers")
const db=mongoose.connection
db.on("error",()=>{
    console.log("Error connecting the database")
})


db.once("open",()=>{
    console.log("Successfully connected to Mongodb")
   
})

app.listen=(3001,()=>{
    console.log("server is running")
})
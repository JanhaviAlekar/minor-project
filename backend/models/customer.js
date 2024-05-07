const mongoose=require("mongoose")

const customerSchema=new mongoose.Schema(
    {
        name:String,
        email:String,
        password:String
    }
)
    const CustomerModel=mongoose.model("Customer",customerSchema)
    module.exports=CustomerModel
    
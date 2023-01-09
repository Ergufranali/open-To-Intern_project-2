const collegModel=require("../models/collegeModel")
const validator=require("validator")
const {isValid}=require("../validation/validation")

const createCollege=async function(req,res){
    try{
        let data=req.body
    const {name,fullName,logoLink}=data
    if(!isValid(name)) return res.status(400).send({status:false,msg:"please enter the name"})
    if(!isValid(fullName)) return res.status(400).send({status:false,msg:"please enter the fullName"})
    if(!logoLink) return res.status(400).send({status:false,msg:"please enter the logoLink"})
   
    //if(!isValid(name)) return res.status(400).send({status:false,msg:"invalid Name"})
    let saveData=await collegModel.create(data)
     res.status(201).send({status:true,data:saveData})
    }
    catch(err){
        res.status(500).send({status:false,msg:err.messege})
    }
    
}

module.exports.createCollege=createCollege
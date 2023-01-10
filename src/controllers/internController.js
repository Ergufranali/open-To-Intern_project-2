const internModel = require ("../models/internModel")
const collegeModel = require ("../models/collegeModel")
const { isValid } = require("../validator/validation")
const validator = require('validator')

exports.createIntern = async function (req,res){
    try{
    let data = req.body
    const {name, mobile, email, collegeName} = data
    let saveData = {}

    // name ---------------------------------------------------------------------

    if(!name) return res.status(400).send({status:false,message:"name is required"})
    if(!isValid(name))return res.status(400).send({status:false,message:"please enter valid name"})
    if (!/^[a-zA-Z ,]{3,20}$/.test(name)) {
        return res.status(400).send({ status: false, message: "Invalid  Name" })
    }
    saveData.name=name


    //mobile number -------------------------------------------------------------------------
    if(!mobile) return res.status(400).send({status:false,message:"mobile number is required"})
    if(!isValid(mobile))return res.status(400).send({status:false,message:"please enter valid mobile number"})
    if (!/^[6-9]{1}[0-9]{9}$/.test(mobile)) {
        return res.status(400).send({ status: false, message: "Invalid mobile number " })
    }
    let mob = await internModel.findOne({mobile:mobile})
    if(mob)return res.status(400).send({status:false,message:"mobile number already exist"})
    saveData.mobile=mobile


    // email---------------------------------------------------------------------------------
    if(!email) return res.status(400).send({status:false,message:"email is required"})
    if(!isValid(email))return res.status(400).send({status:false,message:"please enter valid E-mail"})
    if(!validator.isEmail(email)) return res.status(400).send({status:false,message:"invalid E-mail"})
    let mail = await internModel.findOne({email:email})
    if(mail)return res.status(400).send({status:false,message:"E-mail is already exist"})
    saveData.email=email


    // college------------------------------------------------------------------------------

    if(!collegeName) return res.status(400).send({status:false,message:"college is required"})
    if(!isValid(collegeName))return res.status(400).send({status:false,message:"please enter valid college name"})
    let alphaCollege= collegeName.toLowerCase()
    let college = await collegeModel.findOne({name:alphaCollege})
    if(!college) return res.status(404).send({status:false, message:"data not found"})
    saveData.collegeId=college._id
    let data2 = await internModel.create(saveData)
    
   return res.status(201).send({status:true,message:"Intern Created Succesfully",data:data2})   
}
    catch(err) {res.status(500).send({status:false,msg: err.message})}
}



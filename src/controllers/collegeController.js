 const collegeModel = require('../models/collegeModel')
const validator = require('validator')
const isValid = function(value) {
    if (typeof value=== "undefined" || typeof value ===null) return false
    if (typeof value=== "string" &&  value.trim().length===0) return false
    if (typeof value=== "number" &&  value.trim().length===0) return false
    return true
}
const valid = /^https?:\/\/.*\.(?:png|jpg|jpeg)/

const createCollege = async function(req, res) {

    try {
        const { name, fullName, logoLink } = req.body

        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, message: "Kindly enter your details." })
        }


        let final = {}
        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: "Invalid College name or college name is not mentioned." })
        }
        if (!/^[a-zA-Z]{2,10}$/.test(name)) {
            return res.status(400).send({ status: false, message: "Invalid College Name" })
        }
        const duplicateName = await collegeModel.findOne({ name: name.toLowerCase() }) 
        if (duplicateName) {
            return res.status(400).send({ status: false, message: "The college name is already there, you can directly apply for the internship." })
        }
        final.name = name.toLowerCase()


        if (!isValid(fullName)) {
            return res.status(400).send({ status: false, message: "Invalid College full name or College full name is not mentioned." })
        }
        if (!/^[a-zA-Z ,]{3,50}$/.test(fullName)) {
            return res.status(400).send({ status: false, message: "Invalid College full name" })
        }
        const duplicate = await collegeModel.findOne({ fullName: fullName })
        if (duplicate) {
            return res.status(400).send({ status: false, message: "The college full name is already there, you can directly apply for the internship." })
        }
        final.fullName = fullName

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

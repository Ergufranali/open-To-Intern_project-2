const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')
const { isValid } = require("../validator/validation")
const validator = require('validator')

// regex for link ---------------------------------------------------------------
const valid = /^https?:\/\/.*\.[s3].*\.(png|gif|webp|jpeg|jpg)\??.*$/

// create-college api
exports.createCollege = async function(req, res) {
    try {
        const { name, fullName, logoLink } = req.body

        //name -------------------------------------------------------------------------------------
        if (!name) {   return res.status(400).send({ status: false, message: "name is required" }) }
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

        //fullName------------------------------------------------------------------------------------

        if (!fullName) {return res.status(400).send({ status: false, message: "Full-name is required" }) }
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

        //logoLink--------------------------------------------------------------------------------------------

        if (!logoLink) {   return res.status(400).send({ status: false, message: "logo-Link is required" }) }
        if (!isValid(logoLink)) {
            return res.status(400).send({ status: false, message: "Invalid College Logolink." })
        }
        if (!valid.test(logoLink) || !validator.isURL(logoLink)) {
            return res.status(400).send({ status: false, message: "The logoLink is not valid." })
        }
        final.logoLink = logoLink

        let saveData = await collegeModel.create(final)

        return res.status(201).send({ status: true, data: saveData})

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

    // get intern ----------------------------------------------------------------------------

    exports.getInterns = async function(req,res){
        
       let collegeName = req.query.collegeName 
       if (!isValid(collegeName)) {
        return res.status(400).send({ status: false, message: "Invalid College name." })
    }  
        let collegeId = await collegeModel.findOne({name:collegeName}).select({name:1,fullName:1,logoLink:1})
        if(!collegeId) return res.status(404).send({status:false,msg:"data not found"})

        let intern = await internModel.find({collegeId: collegeId._id}).select({name:1,email:1,mobile:1})
        let final = { name: collegeId.name, fullName: collegeId.fullName, logoLink: collegeId.logoLink }

        if(intern.length == 0) {
            let data = {...final,intern:"no intern applied to this college"}
            return res.status(200).send({status:false,msg:data})}

        let finalData = {...final,intern:intern} 
        return  res.status(200).send({status:true,data:finalData})

        
    }

 


  
const express = require('express');
const route = express.Router()
const collegeController = require('../controllers/collegeController')
const internController = require('../controllers/internController')

// -- create college------------------------------------------------
route.post('/functionup/colleges', collegeController.createCollege)

//-- create intern--------------------------------------------------
route.post('/functionup/interns', internController.createIntern)

//-- get data ------------------------------------------------------
route.get('/functionup/collegeDetails', collegeController.getInterns)


//Default
route.all('/*',function(req,res){
    return res.status(400).send({status:false,message:"Please give right path"})
})

//practice api
// route.post('/practice/api',internController,createApi)

module.exports = route;

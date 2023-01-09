const express=required('express')
const bodyparser=required("body-parser")
const routes=required("./routes/route.js")
const mongoose=required("mongoose")
const app=express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoder({extended:true}))
mongoose.connect("")
.then(()=>console.log("mongo connect"))
.catch(err=>console.log(err))
app.use('/',routes)

app.listen(3000,function(){
    console.log("Express app running on port 3000")
})
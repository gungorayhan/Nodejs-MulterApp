const express = require("express")
const mongoose = require("mongoose")
const multer = require("multer")
const cors =require("cors")
const fs = require("fs")
const bodyParser = require("body-parser")
const ImageModel= require("./image.model")
const port = 8000;
const mongodb="mongodb://127.0.0.1:27017/multer-app"
const app=express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

mongoose.connect(mongodb,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>console.log("Db is Connected"))
.catch((err)=>{console.log(err , " db didn't connect")})

const Storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload=multer({
    storage:Storage
})

app.post("/",upload.single("testImage"),(req,res)=>{
    
 
    const saveImage= new ImageModel({
         name:req.body.name,
         image:{
            data:fs.readFileSync("uploads/"+req.file.filename),
            contentType:"image/png"
         }
    })
    saveImage
        .save()
        .then((res)=>{
            console.log("image is saved")
        })
        .catch((err)=>{
            console.log(err,"error has occur")
        })

    res.send("image is saved")

})

app.get("/",async(req,res)=>{
    const allData = await ImageModel.find();
    res.json({allData}); 
   
})


app.listen(port, ()=>{
    console.log("successfully running")
})
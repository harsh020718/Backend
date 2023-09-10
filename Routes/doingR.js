const express = require('express')
const router = express.Router()
const fetchuser = require('../Middleware/fetchuser')
const Doing =  require('../Models/doing')
const { body, validationResult } = require('express-validator');

router.get('/fetchallDoing',fetchuser,async(req,res)=>{
    try {
        const doing = await Doing.find({user : req.user.id})
        
       res.json(doing)
        
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
        }
})
router.post('/addDoing',fetchuser,[
    
    body('title','Enter a Valid title').isLength({ min:3 }),
    body('description','Description must be atleast 5 characters.').isLength({ min:5 })
],async(req,res)=>{
    try{
    const {title, description} = req.body
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const doing = new Doing({
        title,description, user: req.user.id
    })
    const savedDoing = await doing.save()
res.json(savedDoing)}
 catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error")
    }
})

router.put('/updateDoing/:id',fetchuser, async(req,res)=>{
     const{title, description} = req.body
     try {
        
     
     const newDoing = {}
     if(title) {newDoing.title = title}  // agar hume title mila hai tab newDoing k title ko uske barabar kar do

     if(description) {newDoing.description = description}
     

     let doing = await Doing.findById(req.params.id)
     if(!doing){return res.status(404).send("Not Found")}

     if(doing.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
     }

     doing = await Doing.findByIdAndUpdate(req.params.id, {$set: newDoing}, {new:true})
     res.json({doing})} catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
        }
})

router.delete('/deleteDoing/:id',fetchuser, async(req,res)=>{
    try {
        
   
     
     let doing = await Doing.findById(req.params.id)
     if(!doing){return res.status(404).send("Not Found")}

     if(doing.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
     }

     doing = await Doing.findByIdAndDelete(req.params.id)
     res.json({"Success": `Doing with the id ${req.params.id}  has been deleted`})
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
        }
})


  

module.exports = router
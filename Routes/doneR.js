const express = require('express')
const router = express.Router()
const fetchuser = require('../Middleware/fetchuser')
const Done =  require('../Models/done')
const { body, validationResult } = require('express-validator');

router.get('/fetchallDone',fetchuser,async(req,res)=>{
    try {
        const done = await Done.find({user : req.user.id})
        
       res.json(done)
        
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
        }
})
router.post('/addDone',fetchuser,[
    
    body('title','Enter a Valid title').isLength({ min:3 }),
    body('description','Description must be atleast 5 characters.').isLength({ min:5 })
],async(req,res)=>{
    try{
    const {title, description} = req.body
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const done = new Done({
        title,description, user: req.user.id
    })
    const savedDone = await done.save()
res.json(savedDone)}
 catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error")
    }
})

router.put('/updateDone/:id',fetchuser, async(req,res)=>{
     const{title, description} = req.body
     try {
        
     
     const newDone = {}
     if(title) {newDone.title = title}  // agar hume title mila hai tab newDone k title ko uske barabar kar do

     if(description) {newDone.description = description}
     

     let done = await Done.findById(req.params.id)
     if(!done){return res.status(404).send("Not Found")}

     if(done.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
     }

     done = await Done.findByIdAndUpdate(req.params.id, {$set: newDone}, {new:true})
     res.json({done})} catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
        }
})

router.delete('/deleteDone/:id',fetchuser, async(req,res)=>{
    try {
        
   
     
     let done = await Done.findById(req.params.id)
     if(!done){return res.status(404).send("Not Found")}

     if(done.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
     }

     done = await Done.findByIdAndDelete(req.params.id)
     res.json({"Success": `Done with the id ${req.params.id}  has been deleted`})
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
        }
})


  

module.exports = router
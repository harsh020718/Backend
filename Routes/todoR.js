const express = require('express')
const router = express.Router()
const fetchuser = require('../Middleware/fetchuser')
const Todos =  require('../Models/todo')
const { body, validationResult } = require('express-validator');

router.get('/fetchalltodos',fetchuser,async(req,res)=>{
    try {
        const todos = await Todos.find({user : req.user.id})
        
       res.json(todos)
        
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
        }
})
router.post('/addTodo',fetchuser,[
    
    body('title','Enter a Valid title').isLength({ min:3 }),
    body('description','Description must be atleast 5 characters.').isLength({ min:5 })
],async(req,res)=>{
    try{
    const {title, description} = req.body
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const todos = new Todos({
        title,description, user: req.user.id
    })
    const savedTodo = await todos.save()
res.json(savedTodo)}
 catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error")
    }
})

router.put('/updateTodo/:id',fetchuser, async(req,res)=>{
     const{title, description} = req.body
     try {
        
     
     const newTodos = {}
     if(title) {newTodos.title = title}  // agar hume title mila hai tab newTodos k title ko uske barabar kar do

     if(description) {newTodos.description = description}
     

     let todos = await Todos.findById(req.params.id)
     if(!todos){return res.status(404).send("Not Found")}

     if(todos.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
     }

     todos = await Todos.findByIdAndUpdate(req.params.id, {$set: newTodos}, {new:true})
     res.json({todos})} catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
        }
})

router.delete('/deleteTodo/:id',fetchuser, async(req,res)=>{
    try {
        
   
     
     let todos = await Todos.findById(req.params.id)
     if(!todos){return res.status(404).send("Not Found")}

     if(todos.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
     }

     todos = await Todos.findByIdAndDelete(req.params.id)
     res.json({"Success": `Todo with the id ${req.params.id}  has been deleted`})
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
        }
})


  

module.exports = router
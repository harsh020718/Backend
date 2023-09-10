const mongoose = require('mongoose');
const { Schema } = mongoose
const todosSchema = new Schema({
    // user:{
    //     type: String,
    //     required: true
    // },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },

    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
        
    },
  
})

module.exports = mongoose.model('todos', todosSchema);

const mongoose = require("mongoose");
require('dotenv').config();
const mongoURI = process.env.DATABASE;


// console.log(process.env.DATABASE);
// const connectToMongo = async () => {
//     try {
      
//       await mongoose.connect(mongoURI);
//       console.log("Connected to Mongo Successfully");
  
//       // Create a sample document in a collection to create the database
      
//     } catch (error) {
      
//       console.error("Error connecting to Mongo:", error);
//     }
//   };
 
mongoose.connect(mongoURI,{
useNewUrlParser: true,
useUnifiedTopology: true
}).then(()=>
  console.log("Connection Start")).catch((error)=>console.log(error.message))
// module.exports = connectToMongo;
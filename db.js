const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/todo_doing_done";

const connectToMongo = async () => {
    try {
      await mongoose.connect(mongoURI);
      console.log("Connected to Mongo Successfully");
  
      // Create a sample document in a collection to create the database
      
    } catch (error) {
      console.error("Error connecting to Mongo:", error);
    }
  };

module.exports = connectToMongo;
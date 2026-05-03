const mongoose = require("mongoose")

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to database successfully")
    }
    catch(err){
        console.error("Failed to connect to database : ", err)
    }
}

module.exports = connectDB
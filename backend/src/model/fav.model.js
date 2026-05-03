const mongoose = require("mongoose")

const favSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: [true, "This image is already in your favourites list."]
    },
    imageURL: {
        type: String,
        required: true,
        unique: [true, "This image is already in your favourites list."]
    },
    avg_color: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: true
    }
})

const favModel = mongoose.model("Favourite", favSchema)

module.exports = favModel
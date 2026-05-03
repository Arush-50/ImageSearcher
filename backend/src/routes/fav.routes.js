const express = require("express")
const favModel = require("../Model/fav.model")
const router = express.Router()


router.post("/favourites", async (req, res) => {
    const { id, imageURL, avg_color, alt } = req.body
    if (!id || !imageURL || !avg_color || !alt) {
        return res.status(400).json({ error: "ID, ImageURL, avg_color and alt are required." })
    }

    const fav = await favModel.create({ id, imageURL, avg_color, alt })
    res.status(201).json(fav)
})

router.get("/favourites", async (req, res) => {
    const data = await favModel.find()
    res.status(200).json(data)
})

router.delete("/favourites/remove/:id", async (req, res) => {
    const id = req.params.id
    const deletedFav = await favModel.findOneAndDelete({ id })
    if (!deletedFav) {
        return res.status(404).json({ error: "Favourite not found." })
    }
    res.json({ message: "Favourite removed successfully." })
})


module.exports = router
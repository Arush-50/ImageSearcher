const express = require("express")
const router = express.Router()
const searchImages = require("../services/pexels.service")

router.get("/search/:query", async (req, res) => {
    const query = req.params.query
    const results = await searchImages(query)
    res.json(results)
})

module.exports = router
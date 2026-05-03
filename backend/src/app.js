const express = require("express")
const app = express()
const searchRoutes = require("./routes/search.routes")
const favRoutes = require("./routes/fav.routes")
const cors = require("cors")
app.use(cors())

app.use(express.json())
app.use("/api", searchRoutes)
app.use("/api", favRoutes)

module.exports = app
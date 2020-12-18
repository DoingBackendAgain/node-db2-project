const express = require("express")
const carsRouter = require("./carsRouter")

const server = express()
const port = 9000;

server.use(express.json())

server.use("/cars", carsRouter)

server.listen(port, ()=> {
    console.log(`Server is running at http://localhost:${port}`)
})

module.exports = server
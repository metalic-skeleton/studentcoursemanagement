
const express = require('express')
const cors = require('cors')

const app = express()
const port = 10010

require('dotenv').config()

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'production'

app.use(express.json())
app.use(cors())

const routes = require("./api/routes")
app.use(routes)

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`)
})
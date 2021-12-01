const express = require('express')
require('.//config/db')
require('dotenv').config()
const morgan = require('morgan')
const router = require('./routes/weather_route')

const app = express()
const env = process.env
const port = env.PORT

app.use(express.json())
app.use(morgan('tiny'))
app.use(router)


app.listen(port, ()=>console.log(`server is running on http://localhost:${port}`))
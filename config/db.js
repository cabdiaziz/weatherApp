const mongoose = require('mongoose')
require('dotenv').config()
const env = process.env

const host = env.HOST
const db_name = env.DB_NAME
mongoose.connect(`mongodb://${host}/${db_name}`)
.then(()=>{console.log('Connected To the DB')})
.catch((err)=>{console.log(err, 'Uable to connect to DB')})

require('../models/weather')
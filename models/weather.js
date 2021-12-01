const mongoose = require('mongoose')

const weatherSchema = mongoose.Schema({
    location:{
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
},{
    timeStamp: true,
})

const weather = mongoose.model('Weather',weatherSchema)

module.exports =weather 
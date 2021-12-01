const {geocode, weather} = require('../functions/functions')
const GeocodeWeather = require('../models/weather')
//functions

const dashboard = (req, res) => {
    res.send('welcome to the weather app.')
}

const weather_call =  (req, res) => {
    const address = req.body.address
//calling the geocode and weather function known as callback chaining.
    if(!address) return console.log('please provide a location.')
    geocode(address, (err, {latitude,longitude,location})=>{
    if(err) return console.log(err)

    weather(latitude,longitude, async(err, forcastData)=>{
        if(err) return console.log(err)
        const responseData = {location, forcastData}

        const PrevieosLocation = await GeocodeWeather.findOne({location})
        if(PrevieosLocation) return res.status(409).send({msg: 'This location already registred'})

        const newWeather = new GeocodeWeather(responseData)
        //saving response into database.
        newWeather.location = location
        newWeather.description = forcastData
        await newWeather.save()

        res.status(200).send({location,forcastData})
       })
})
}

const view_weather = async(req, res) => {
    const weathers = await GeocodeWeather.find().select('location -_id description')
    res.status(200).send(weathers)
}

//geocode function.

module.exports = {
    dashboard,
    weather_call,
    view_weather
}
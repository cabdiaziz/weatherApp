const request = require('request')

const geocode = (address, callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibmFhZGlyIiwiYSI6ImNrd21wa2YxejAzbHUzMm85NHZrcjVlMGQifQ.qRiPWC91fQ-k4MFHlN-UaA&limit=1`

    request({url, json: true},(err, {body})=>{
        if(err) callback('unable to connect to geocode service', undefined)
        else if(body.features.length === 0) {
            callback('unable to find location, try again.', undefined)
        }
        else{
            callback(undefined,{
               latitude : body.features[0].center[0],
               logitude : body.features[0].center[1],
               location : body.features[0].place_name,
            })
        }
    })
}

//weather function.
const weather = (latitude, logitude, callback) => {
    const url =`http://api.weatherstack.com/current?access_key=b380d20800642d1be954a1164bdc1367&query=${latitude},${logitude}&units=f`

    request({url, json: true}, (err, {body})=>{
        if(err) callback('unable to connect to internet', undefined)
        else if(body.error) {
            callback('unable to find location.', undefined)
        }
        else{
            callback(undefined,`${body.current.weather_descriptions[0]} It is currently ${body.current.temperature} degree out, It feels like ${body.current.feelslike} degrees out.`)
        }
    })
}

module.exports = {geocode, weather}
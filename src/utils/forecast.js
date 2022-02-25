const request = require('request')


const forecast = (latitud, longitud, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=45efde2995ff0d6b5b63832f684fc88d&query=' + latitud + ',' + longitud
    request({url, json: true},(error, {body}) => {
        if(error)
            callback('Unable to connect to locations services')
        else if(body.error)
                callback('Unnable to find location')
        else{
            callback(undefined,{
                location: body.location.name,
                country: body.location.country,
                dataTime: body.current.observation_time,
                temperature: body.current.temperature,
                description: body.current.weather_descriptions[0],
                humidity: body.current.humidity,
                forecastSentence: body.current.weather_descriptions[0] + " in " + body.location.name + ", " + body.location.country + ". Temperature is " +  body.current.temperature + "°C and " +  body.current.humidity + "% of humidity."
            })
        }
    })
}

module.exports = forecast
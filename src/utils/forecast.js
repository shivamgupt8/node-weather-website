const request = require('request')

 const forecast = (latitude, longitude, callback) => {
    const url ='https://api.darksky.net/forecast/8614439455ca65afb7e2ef9b3e704a1f/'+latitude+','+longitude+'?units=si'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + 'it is currently '+ body.currently.temperature + ' degrees out. There is '+ body.currently.precipProbability+'% chance of rain.')
        }
    })
}

module.exports = forecast

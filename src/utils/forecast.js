const request = require("request")

const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e0ddce1d6eda05793dab0cad55fd805f&query=' + latitude + ',' + longtitude //+'&units=f' per ta bere F
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'Weather description: ' + body.current.weather_descriptions[0] + ". It's currently " +
                body.current.temperature + " degress out. It feels like " + body.current.feelslike
                + " degress out. \nHumidity level is: " + body.current.humidity)
        }
    })
}

module.exports = forecast
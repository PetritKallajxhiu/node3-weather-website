const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGV0cml0a2FsbGFqeGhpdSIsImEiOiJja3Jlbmszdm40cW1lMnlzNmIxazY4ZmtzIn0.q0T47mJGBTuAqxTEembd_Q'
    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect to location services!', undefined)
        }else if(body.features.length === 0){
            callback('Please provide a correct location', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
const request = require('request')


const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmF1bDgxMDMyNCIsImEiOiJja3l4Zzk4aGkwYXpyMndwZ2Jqa3ZwNTZ4In0.ifstyqwLDRuPyblHUwf3KA&limit=1'

    request({url, json: true}, (error, {body}) => {
        if(error)
            callback('Unable to connect to locations services')
        else if(body.features.length === 0)
                callback('Location Not Found, please try a different location.')
        else{
            callback(undefined,{
                placeName: body.features[0].place_name,
                latitud: body.features[0].center[0],
                longitud: body.features[0].center[1]
            })
        }
    })

}

module.exports = geoCode
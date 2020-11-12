const request = require('request')


const geolocation = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2xva2VzaCIsImEiOiJja2g3ZTdkYzUwOXBmMnhucW8wd284bno5In0.GsiFfyzpQcf7SS06EdHa5g'

    request.get({url:url, json:true}, (error, response)=>{
        if(error){
            callback('Unable to connect to service', undefined)
        }else if(response.body.features.length == 0){
            callback('Unable to find the place, please search other place', undefined)
        }else{
            callback(undefined, 
                {
                lan: response.body.features[0].center[0], 
                lat: response.body.features[0].center[1]}
                    )
        }

    })


}

module.exports = geolocation
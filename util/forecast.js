const { response } = require('express')
const request = require('request')



const forecast = (address, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=3ff8b54d5527ac9e07062aee51c219fc&query='+address.lat+','+address.lan

    request.get({url : url, json : true}, (error, data)=>{
        if(error){
            callback('Problem connecting to forecast service', undefined)
        }else if(data.body.error){
            callback('cant find for this location', undefined)
        }else{
            callback(undefined, {
                location : data.body.location.name,
                region: data.body.location.region,
                weather : data.body.current.weather_descriptions[0],
                temperature : data.body.current.temperature              

            })
        }
    })
    
}


module.exports = forecast
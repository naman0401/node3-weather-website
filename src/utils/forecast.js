const request = require('request')

// const forecast = (latitude, longitude, callback)=>{
//     const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&%20exclude=hourly,daily&appid=774a315353b84c01634c2cd8af8b5fcf&units=metric'
//     request({url : url, json: true},(error, response)=>{
//         if(error){
//             callback('Error in connection',undefined)
//         }else if (response.body.cod){
//             callback('problem with coordinates',undefined)
//         }else{
//             const curr = response.body.current
//             callback(undefined,"It is currently "+curr.temp+" degrees out. There is a "+curr.humidity+"% chance of raining")
//         }     
//     })
// }

const forecast = (latitude, longitude, callback)=>{
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&%20exclude=hourly,daily&appid=774a315353b84c01634c2cd8af8b5fcf&units=metric'
    request({url, json: true},(error, {body})=>{
        if(error){
            callback('Error in connection',undefined)
        }else if (body.cod){
            callback('problem with coordinates',undefined)
        }else{
            const curr = body.current
            callback(undefined,"It is currently "+curr.temp+" degrees out. There is a "+curr.humidity+"% chance of raining")
        }     
    })
}


module.exports = forecast 
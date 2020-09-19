const request = require('request')

// const geocode = (address, callback)=>{
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmFtYW4tMDAiLCJhIjoiY2tlYTl5eWFlMmVrMjJ0b2I2OHR5YnZjeiJ9.JmqDscaSUQWRGi1g0w8Q9Q'
//     request({url: url, json: true}, (error, response)=>{
//         if(error){
//             callback("unable to connect", undefined)
//         } else if(response.body.features.length == 0){
//             callback("unable to find location",undefined)
//         } else{
//             callback(undefined, {
//                 lat : response.body.features[0].center[1],
//                 lon : response.body.features[0].center[0],
//                 location: response.body.features[0].place_name
//             })
//         }
//     })
// }


const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmFtYW4tMDAiLCJhIjoiY2tlYTl5eWFlMmVrMjJ0b2I2OHR5YnZjeiJ9.JmqDscaSUQWRGi1g0w8Q9Q'
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback("unable to connect", undefined)
        } else if(body.features.length == 0){
            callback("unable to find location",undefined)
        } else{
            callback(undefined, {
                lat : body.features[0].center[1],
                lon : body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode
// const express = require('express')

// const app = express()

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req,res)=>{
//     res.send([{
//         name: 'Naman',
//         age: 20
//     }, {
//         name: 'Sanyam',
//         age: 16
//     }])
// })

// app.get('/about', (req,res)=>{
//     res.send('<h1>About Page</h1')
// })

// app.get('/weather', (req,res)=>{
//     res.send({
//         forecast: "none",
//         latitude: "none",
//         longitude: "none"
//     })
// })

// //app.com
// //app.com/help
// //app.com/about

// app.listen(3000, ()=>{
//     console.log('Server is up on port 3000')
// })

//////////////////////////////////////////////

const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// console.log(__dirname)
// // console.log(__filename)
// console.log(path.join(__dirname,'../public'))

const app = express()

const hbs = require('hbs')
//*******define paths for Express config
const publicdirectorypath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//*******Setup handlebars engine and views location
app.set('view engine', 'hbs')//for handlebars
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

///************ setup static directory to serve
app.use(express.static(publicdirectorypath))

app.get('', (req,res)=>{
    res.render("index", {
        title: "Weather App",
        name: "Naman"
    })
})

app.get('/about',(req, res)=>{
    res.render('about', {
        title: "About",
        name: "Naman"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helptext: 'This is some helpful text',
        title: 'HELP',
        name: 'Naman'
    })
})

// app.get('/weather', (req,res)=>{
//     res.send({
//         forecast: "none",
//         latitude: "none",
//         longitude: "none"
//     })
// })


app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address,(error, {lat, lon, location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        // console.log(error)
        // console.log(data)
        forecast(lat, lon, (error, forecastdata) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                lat,
                lon,
                location,
                forecastdata
            })
        })
    })
})


app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=>{
    // res.send("The article not found")
    res.render('404',{
        title: "404 page",
        name: "Naman",
        errortext: "Help article not found"
    })
})

app.get('*', (req,res)=>{
    // res.send('My 404 Page')
    res.render('404',{
        title: "404 Page",
        name: "Naman",
        errortext: "Page not found"
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})
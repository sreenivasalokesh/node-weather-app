const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geolocation = require('./../util/geolocation')
const forecast = require('./../util/forecast')


const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)

app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)


app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather',
        name : 'slokesh'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({error : 'Address must present'})
    }

    if(!req.query.address){
        return res.send({error : 'please provide a valid location'})
    }

    geolocation(req.query.address, (geolocationerror, data)=>{
        if(geolocationerror){
            return res.send({error : geolocationerror})
        }

        forecast(data, (forecasterror, forecastdata)=>{
            if(forecasterror){
                return res.send({error : forecasterror})
            }

            return res.send({
                location : forecastdata.location,
                region: forecastdata.region,
                weather: forecastdata.weather,
                temperature : forecastdata.temperature
            })

        })




    })


})


app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        name: 'slokesh'
    })
})


app.get('/help', (req, res)=>{
    res.render('help', {
        msg : 'Please contact slokesh for help',
        title: 'Help',
        name : 'slokesh'
    })
})


app.get('/help/*', (req, res)=>{
    res.render('error', {
        msg : 'help article not found',
        title: '404',
        name: 'slokesh'
    })
})

app.get('*', (req, res)=>{
    res.render('error', {
        msg : 'Page not found',
        title: '404',
        name: 'slokesh'
    })
})

app.listen(3000, ()=>{
    console.log('server started on port 3000')
})
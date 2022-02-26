const { response } = require('express')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const { dirname } = require('path')
const { request } = require('http')




const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const myPublicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location 
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(myPublicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Juan Raul Pujol F.'
    })
})

app.get('/help', (request, response) => {
    response.render('help', {
        name: 'Juan Raul Pujol F.',
        helpText: 'App to display the weather. This application can be executed in the following link: https://raul-weather-app.herokuapp.com/ -> This link uses Heroku servers to run the nodejs code.',
        title: 'Help Information:'
    })
})

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'Info about the site creator and sources.',
        name: 'Juan Raul Pujol F.'
    })
})

app.get('/weather', (request, response) => {
    if(!request.query.address) {
        return response.send({
            error: 'You must provide an address value.'
        })
    }

    geocode(request.query.address, (error, {latitud, longitud, placeName = ''} = {}) => {
        if(error)
            return response.send({error})

        forecast(longitud, latitud, (error, forecastdata) => {
                if(error)
                    return response.send({error})
                
                response.send({
                    forecast: forecastdata,
                    address: request.query.address
                })
            })
    })
})

    app.get('/products', (req, res) => {
        
        if(!req.query.search){
            return res.send({
                error: 'You must provide a search value.'
            })
        }

        res.send({
            products: []
        })
        
    })

    app.get('/help/*', (request, response) => {
        response.render('404page', {
            title: '404',
            name: 'Juan Raul Pujol F.',
            error: 'Help article not found'
        })
    })

    app.get('*', (request, response) => {
        response.render('404page', {
            title: '404',
            name: 'Juan Raul Pujol F.',
            error: 'Page not found.'
        })
    })

app.listen(port, () => {
    console.log('Server is up and running in port ' + port)
})

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode'); 
const weather = require('./utils/weather'); 
const port = process.env.PORT || 3000;


const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ayush Patel'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ayush Patel'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Just type name of any place, duh.',
        title: 'Help',
        name: 'Ayush Patel'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address)
    {
        return res.send({
            error: 'Please enter an address',
        });
    }

    geocode(req.query.address, (error,{latitude, longitude} = {}) => {
        if(error)
        {
            return res.send({
                error: error,
            })
        }
        //console.log('Lat lon provieded are', latitude, longitude);
        weather(latitude, longitude, (error, {location, forecast} = {}) => {
            if(error)
                return res.send({
                    error: error,
                })
            res.send({
                address: req.query.address,
                location: location,
                forecast: forecast
            });
            //console.log(forecast);
        })
    })

    
})

app.get('/products', (req, res) => {
    //console.log(req);
    //console.log(res);
    res.send({
        products: [],
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ayush Patel',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ayush Patel',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { relative } = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Generate a new instance of an application
const app = express()
const port = process.env.PORT || 3000

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlesbar engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to use 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Home Page",
        name: "Petrit Kallajxhiu"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Written by: Petrit Kallajxhiu",
        date: " on 23-07-2021"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "Help",
        title: "Help",
        name: "Petrit Kallajxhiu",
        date: "on July 19"
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Help",
        error: "Help article not found!",
        name: "Petrit Kallajxhiu"
    })
})

// Jep errore me fetch ngaqe kthen html dhe ka probleme per retrive data nga forms
// app.get('/weather', (req, res) => {
//     if (!req.query.address) {
//         return res.send({
//             error: "Please provide a location!!"
//         })
//     } else {
//         location = req.query.address

//         geocode(location, (error, { latitude, longtitude, location } = {}) => {
//             if (error) {
//                 return res.send(error)
//             }
//             forecast(latitude, longtitude, (error, forecastData) => {
//                 if (error) {
//                     return res.send(error)
//                 }

//                 res.render('weather', {
//                     title: 'Weather',
//                     forecast: forecastData,
//                     location,
//                     name: "Petrit Kallajxhiu"
//                 })

//             })
//         })
//     }
//     // console.log(req.query.address)
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        error: "Page not found - 404",
        name: "Petrit Kallajxhiu2"
    })
})

app.listen(port, () => {
    console.log("Server is up on port ", port)
})
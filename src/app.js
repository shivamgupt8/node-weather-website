const path = require('path')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast') 

const express = require('express')

const hbs = require('hbs')

const app = express()

const port = process.env.PORT || 3000

// define path for express config 
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views' )   
const partialsPath = path.join(__dirname, '../templates/partials')

//setup hbs engine and location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static dir to serve
app.use(express.static(publicDir))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'weatherApp',
        name: 'shivam'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'about me',
        name: 'shivam'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        ThingsOfNeed: 'WantAnyHelp',
        title:'Help',
        name: 'shivam'
    })
})

    app.get('/weather', (req, res)=>{
        if(!req.query.address){
            return res.send({
                error: 'provide location'
            })
         }

         geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
            if(error){
            return res.send({
                    error
                })
            }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })


            }) 
        })
            
        })

app.get('/products',(req,res)=>{
if(!req.query.search){
   return res.send({
       error: 'provide search term'
   })
}

    console.log(req.query.search)
    res.send({
       products: [] 
    })
})

app.get('/help/*', (req, res)=>{
   res.render('404',{
    title: '404',
    name: 'shivam',
    errorMessage: 'Help article not found'

   })
})

app.get('*',(req, res)=>{
    res.render('404', {
        title: '404',
        name: 'shivam',
        errorMessage: 'Page not found'})
    
})
app.listen(port, ()=>{
    console.log('Server is up on port '+ port)
})

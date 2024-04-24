const express = require('express')
const axios = require('axios');
require('dotenv').config()
const app = express()
const port = 3000



const apiURL = 'http://api.weatherapi.com/v1/forecast.json'
const days = 5


app.get('/', async (req, res) => {
    res.set('Access-Control-Allow-Origin','*')
    const { location } = req.query;

    try {
      const response = await axios.get('http://api.weatherapi.com/v1/forecast.json', {
        params: {
          key: process.env.API_KEY, // Replace with your WeatherAPI API key
          q: location, // Location passed from the frontend
          days: 5 // Get forecast for the next 5 days
        }
      });
      res.send(response.data)
      //res.json(response.data);
      console.log(response)
    } catch (error) {
        console.error('Error fetching weather data:', error.response.data);
        res.status(error.response.status).json({ error: 'Error fetching weather data' });
    }
  });



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
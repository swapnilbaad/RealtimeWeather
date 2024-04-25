<template>
  <div>
    <h1 class="heading">Weather Information</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-if="error">{{ error }}</div>
      <div v-else>
        <label for="city" class="select-label">Select City:</label>
        <select v-model="selectedCity" @change="fetchWeatherData" id="city" class="select-dropdown">
          <option v-for="(city, index) in cities" :key="index" :value="city.location">{{ city.name }}, {{ city.country }}</option>
        </select>
        <div v-if="selectedCity">
          <div class="city-container">
            <div class="city">
              <h2 class="city-name">{{ selectedCityName }}</h2>
              <table class="weather-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Condition</th>
                    <th>Max Temp (°C)</th>
                    <th>Min Temp (°C)</th>
                    <th>Wind (km/h)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="day in selectedCityData.forecast.forecastday" :key="day.date_epoch">
                    <td>{{ day.date }}</td>
                    <td class="condition">
                      {{ day.day.condition.text }}
                      <img :src="day.day.condition.icon" :alt="day.day.condition.text" class="weather-icon">
                    </td>
                    <td>{{ day.day.maxtemp_c }}</td>
                    <td>{{ day.day.mintemp_c }}</td>
                    <td>{{ day.day.maxwind_kph }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loading: true,
      error: '',
      selectedCity: '',
      selectedCityName: '',
      selectedCityData: null,
      cities: [
      { name: 'London', location: 'London', country: 'UK', forecast: {} },
        { name: 'Helsinki', location: 'Helsinki', country: 'Finland', forecast: {} },
        { name: 'Milan', location: 'Milan',  country: 'Italy', forecast: {} }
        // Add more cities as needed
      ]
    };
  },
  created() {
    this.selectedCity = this.cities[0].location;
    this.fetchWeatherData(); // Fetch weather data when component is created
    // Fetch weather data every 60 seconds
    this.interval = setInterval(() => {
      this.fetchWeatherData();
    }, 30000);
  },
  beforeDestroy() {
    clearInterval(this.interval); // Clear interval when component is destroyed
  },
  methods: {
    async fetchWeatherData() {
      try {
        this.selectedCityData = this.cities.find(city => city.location === this.selectedCity);
        this.selectedCityName = this.selectedCityData.name + ', ' + this.selectedCityData.country;
        const response = await axios.get('http://localhost:3000/', {
          params: {
            location: this.selectedCity
          }
        });
       
        this.selectedCityData.forecast = response.data.forecast;
        console.log('Weather data fetched at:', new Date());
          
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          this.error = 'Server Error: ' + error.response.status;
        } else if (error.request) {
          // The request was made but no response was received
          this.error = 'Network Error';
        } else {
          // Something happened in setting up the request that triggered an Error
          this.error = 'Error: ' + error.message;
        }
        console.error('Error fetching weather data:', error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style>
.heading {
  text-align: center;
  font-weight: bold;
  text-decoration: underline;
  margin-bottom: 10px;
}

.city-container {
  margin-bottom: 20px;
}

.city-name {
  margin-bottom: 10px;
}

.condition {
  white-space: nowrap;
  width: 200px;
}
.date {
  white-space: nowrap;
  
}

.weather-table th,
.weather-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.select-label {
  font-weight: bold;
  margin-right: 10px;
}

.select-dropdown {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.weather-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}
.weather-icon {
  width: 32px;
  height: 32px;
  margin-left: 5px;
}
</style>

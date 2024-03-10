import React, { Component } from 'react'; 
import './currentconditions.css'; 
 
class CurrentConditions extends Component { 
  constructor() { 
    super(); 
    this.state = { 
      city: '', 
      weatherData: null, 
    }; 
    this.temperatureChartRef = React.createRef(); 
    this.humidityChartRef = React.createRef(); 
  } 
 
  handleCityChange = (event) => { 
    this.setState({ city: event.target.value }); 
  }; 
 
  fetchWeatherData = async () => { 
    const { city } = this.state; 
 
    try { 
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ff7610b1821085eb917a576be3d7ad5b`); 
      const data = await response.json(); 
 
      if (response.ok) { 
        if (data.cod === 200) { 
          this.setState({ weatherData: data }); 
          this.updateCharts(); 
        } else { 
          console.error('Error fetching weather data:', data.message || response.statusText); 
          alert('No City Found!'); // Show an alert if no city is found 
        } 
      } else { 
        console.error('Error fetching weather data:', data.message || response.statusText); 
        alert('No City Found!'); // Show an alert if there's an error in the response 
      } 
    } catch (error) { 
      console.error('Error fetching weather data:', error.message); 
      alert('Error fetching data. Please try again later.'); // Show an alert for other errors 
    } 
  }; 
 
  fetchWeatherSuggestions = async () => { 
    const { weatherData } = this.state; 
 
    if (weatherData) { 
      const weatherCondition = weatherData.weather[0].main.toLowerCase(); 
      let suggestions = []; 
 
      switch (weatherCondition) { 
        case 'clear': 
          suggestions = ['Carry a water bottle.', 'Wear sunscreen.', 'Wear sunglasses.']; 
          break; 
        case 'clouds': 
          suggestions = ['Bring an umbrella.', 'Wear a light jacket.', 'Enjoy outdoor activities.']; 
          break; 
        case 'rain': 
          suggestions = ['Carry an umbrella.', 'Wear waterproof clothing.', 'Drive safely.']; 
          break; 
        case 'thunderstorm': 
          suggestions = ['Stay indoors.', 'Avoid using electronic devices.', 'Keep emergency supplies ready.']; 
          break; 
        case 'snow': 
          suggestions = ['Dress warmly.', 'Use snow boots.', 'Drive carefully on slippery roads.']; 
          break; 
        case 'mist': 
          suggestions = ['Drive with caution.', 'Use headlights.', 'Keep a safe following distance.']; 
          break; 
        case 'haze': 
          suggestions = ['Limit outdoor activities.', 'Use air purifiers indoors.', 'Wear a mask if needed.']; 
          break; 
        case 'smoke': 
          suggestions = ['Limit outdoor exposure.', 'Stay indoors if air quality is poor.', 'Use air purifiers.']; 
          break; 
        case 'dust': 
          suggestions = ['Wear a mask outdoors.', 'Keep windows and doors closed.', 'Use air purifiers.']; 
          break; 
        case 'fog': 
          suggestions = ['Drive with caution.', 'Use headlights.', 'Increase following distance.']; 
          break; 
        default: 
          suggestions = ['No specific suggestions for this weather.']; 
      } 
 
      alert('Weather Suggestions:\n\n' + suggestions.join('\n')); 
    } else { 
      alert('No weather data available. Please get weather data first.'); 
    } 
  }; 
 
  getCurrentLocationWeather = () => { 
    if (navigator.geolocation) { 
      navigator.geolocation.getCurrentPosition(async (position) => { 
        const { latitude, longitude } = position.coords; 
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=dda91d395e5ec4bc1575437970d8d048`); 
        const data = await response.json(); 
 
        if (response.ok && data.cod === 200) { 
          this.setState({ weatherData: data, city: data.name }); 
          this.updateCharts(); 
        } else { 
          console.error('Error fetching weather data:', data.message ||
          response.statusText); 
          alert('Unable to fetch weather data for your current location.'); 
        } 
      }, (error) => { 
        console.error('Error getting current location:', error.message); 
        alert('Unable to get your current location.'); 
      }); 
    } else { 
      alert('Geolocation is not supported by your browser.'); 
    } 
  }; 
 
  clearWeatherData = () => { 
    this.setState({ city: '', weatherData: null }); 
  }; 
 
  getBackgroundClass = () => { 
    const { weatherData } = this.state; 
 
    if (weatherData) { 
      const weatherCondition = weatherData.weather[0].main.toLowerCase(); 
 
      switch (weatherCondition) { 
        case 'clear': 
          return 'clear-background'; 
        case 'clouds': 
          return 'clouds-background'; 
        case 'rain': 
          return 'rain-background'; 
        default: 
          return 'default-background'; 
      } 
    } 
 
    return 'default-background'; 
  }; 
 
  refreshWeatherData = () => { 
    this.fetchWeatherData(); 
    setInterval(this.fetchWeatherData, 300000); // Refresh every 5 minutes 
  }; 
 
  updateCharts = () => { 
    // Implement the logic to update charts 
    // ... 
  }; 
 
  renderCurrentConditions() { 
    const { weatherData } = this.state; 
 
    return ( 
      <div className={`current-conditions-container ${this.getBackgroundClass()}`}> 
        <h1 className="current-conditions-header">Current Conditions</h1> 
        <div className="current-conditions-content"> 
          <label>Enter City: </label> 
          <input type="text" value={this.state.city} onChange={this.handleCityChange} /> 
          
          <button onClick={this.fetchWeatherData}>Get Weather</button>&nbsp;
          <button onClick={this.getCurrentLocationWeather}>Use Current Location</button>&nbsp;
          <button onClick={this.clearWeatherData}>Clear Weather Data</button>

 
          {weatherData && ( 
            <> 
              <p>Temperature: {weatherData.main.temp}°C</p> 
              <p>Humidity: {weatherData.main.humidity}%</p> 
              <p>Description: {weatherData.weather[0].description}</p> 
              <p>Wind Speed: {weatherData.wind.speed} m/s</p> 
              <p>Pressure: {weatherData.main.pressure} hPa</p> 
              <p>Visibility: {weatherData.visibility / 1000} km</p> 
              <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p> 
              <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p> 
              <div className="suggestions-container"> 
                <button onClick={this.fetchWeatherSuggestions}>Get Suggestions</button> 
              </div> 
            </> 
          )} 
        </div> 
      </div> 
    ); 
  } 
 
  render() { 
    return ( 
      <div className="current-conditions-wrapper"> 
        {this.renderCurrentConditions()} 
      </div> 
    ); 
  } 
} 
 
export default CurrentConditions;
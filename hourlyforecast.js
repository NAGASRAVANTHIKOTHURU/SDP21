// HourlyForecast.js

import React, { Component } from 'react';
import './weatherforecast.css'; // Don't forget to create and import the corresponding CSS file

class HourlyForecast extends Component {
  constructor() {
    super();
    this.state = {
      city: '',
      hourlyData: null,
      selectedHour: null,
    };
  }

  handleCityChange = (event) => {
    this.setState({ city: event.target.value });
  };

  fetchHourlyData = async () => {
    const { city } = this.state;

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=ff7610b1821085eb917a576be3d7ad5b`);
      const data = await response.json();

      if (response.ok) {
        if (data.cod === '200' && data.list && data.list.length > 0) {
          this.setState({ hourlyData: data.list, selectedHour: null });
        } else {
          console.error('Error fetching hourly forecast data:', data.message || response.statusText);
          this.setState({ error: 'No City Found!' });
        }
      } else {
        console.error('Error fetching hourly forecast data:', data.message || response.statusText);
        this.setState({ error: 'No City Found!' });
      }
    } catch (error) {
      console.error('Error fetching hourly forecast data:', error.message);
      this.setState({ error: 'Error fetching data. Please try again later.' });
    }
  };

  handleHourClick = (index) => {
    this.setState({ selectedHour: index });
  };

  renderHourlyForecast() {
    const { hourlyData, selectedHour, error } = this.state;
  
    return (
      <div className="hourly-forecast-container">
        <h1 className="hourly-forecast-header">Hourly Forecast</h1>
        <div className="hourly-forecast-content">
          <label>Enter City: </label>
          <input type="text" value={this.state.city} onChange={this.handleCityChange} />
          <button onClick={this.fetchHourlyData}>Get Hourly Forecast</button>
          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            hourlyData && (
              <div className="horizontal-scroll">
                {hourlyData.map((hour, index) => (
                  <div key={index} className="hourly-forecast-item" onClick={() => this.handleHourClick(index)}>
                    <p>Time: {new Date(hour.dt * 1000).toLocaleTimeString()}</p>
                    <p>Temperature: {hour.main.temp}°C</p>
                    <p>Humidity: {hour.main.humidity}%</p>
                    <p>Description: {hour.weather[0].description}</p>
                    <p>Wind Speed: {hour.wind.speed} m/s</p>
                    <img
                      src={`https://openweathermap.org/img/w/${hour.weather[0].icon}.png`}
                      alt={hour.weather[0].description}
                    />
                    {/* Add more details as needed */}
                  </div>
                ))}
              </div>
            )
          )}
  
          {selectedHour !== null && (
            <div className="weatherpopup">
              <p>Popup for selected hour:</p>
              {/* Add details for the selected hour popup */}
            </div>
          )}
        </div>
      </div>
    );
  }  

  render() {
    return (
      <div className="hourly-forecast-wrapper">
        {this.renderHourlyForecast()}
      </div>
    );
  }
}

export default HourlyForecast;
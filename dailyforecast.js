import React, { Component } from 'react';
import './weatherforecast.css';

class DailyForecast extends Component {
  constructor() {
    super();
    this.state = {
      city: '',
      dailyData: null,
      selectedDay: null,
      error: null, // Added error state for better error handling
    };
  }

  handleCityChange = (event) => {
    this.setState({ city: event.target.value });
  };

  fetchDailyData = async () => {
    const { city } = this.state;

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=ff7610b1821085eb917a576be3d7ad5b`);
      const data = await response.json();

      if (response.ok) {
        if (data.cod === '200' && data.list && data.list.length > 0) {
          this.setState({ dailyData: data.list, selectedDay: null, error: null });
        } else {
          console.error('Error fetching daily forecast data:', data.message || response.statusText);
          this.setState({ error: 'No City Found!' });
        }
      } else {
        console.error('Error fetching daily forecast data:', data.message || response.statusText);
        this.setState({ error: 'No City Found!' });
      }
    } catch (error) {
      console.error('Error fetching daily forecast data:', error.message);
      this.setState({ error: 'Error fetching data. Please try again later.' });
    }
  };

  handleDayClick = (index) => {
    this.setState({ selectedDay: index });
  };

  renderDailyForecast() {
    const { dailyData, selectedDay, error } = this.state;
  
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
    return (
      <div className="daily-forecast-container">
        <h1 className="daily-forecast-header">Daily Forecast</h1>
        <div className="daily-forecast-content">
          <label>Enter City: </label>
          <input type="text" value={this.state.city} onChange={this.handleCityChange} />
          <button onClick={this.fetchDailyData}>Get Daily Forecast</button>
  
          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            dailyData && (
              <div className="horizontal-scroll">
                {daysOfWeek.map((day, index) => {
                  const dayData = dailyData.filter(
                    (item) => new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }) === day
                  );
                  const avgTemp = this.calculateAverageTemperature(dayData);
  
                  console.log(day, dayData); // Add this line for debugging
  
                  return (
                    <div
                      key={index}
                      className={`daily-forecast-item ${index === selectedDay ? 'selected' : ''}`}
                      onClick={() => this.handleDayClick(index)}
                    >
                      <p>{day}</p>
  
                      {dayData && dayData.length > 0 ? (
                        <>
                          <p>Date: {new Date(dayData[0].dt * 1000).toLocaleDateString('en-GB')}</p>

                          <p>Average Temperature: {avgTemp}°C</p>
                          <p>Humidity: {this.calculateAverageHumidity(dayData)}%</p>
                          <p>Description: {dayData[0].weather[0].description}</p>
                          <img
                            src={`https://openweathermap.org/img/w/${dayData[0].weather[0].icon}.png`}
                            alt={dayData[0].weather[0].description}
                          />
                        </>
                      ) : (
                        <p>No data available for {day}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )
          )}
  
          {selectedDay !== null && (
            <div className="weather-popup">
              <p>Popup for selected day:</p>
              {/* Add details for the selected day popup */}
            </div>
          )}
        </div>
      </div>
    );
  }
  

  calculateAverageTemperature = (dayData) => {
    // Calculate the average temperature for the day
    if (dayData.length === 0) return '-'; // No data available for the day

    const sumTemperature = dayData.reduce((sum, day) => sum + day.main.temp, 0);
    return (sumTemperature / dayData.length).toFixed(2);
  };

  calculateAverageHumidity = (dayData) => {
    // Calculate the average humidity for the day
    if (dayData.length === 0) return '-'; // No data available for the day

    const sumHumidity = dayData.reduce((sum, day) => sum + day.main.humidity, 0);
    return (sumHumidity / dayData.length).toFixed(2);
  };

  render() {
    return (
      <div className="daily-forecast-wrapper">
        {this.renderDailyForecast()}
      </div>
    );
  }
}

export default DailyForecast;
